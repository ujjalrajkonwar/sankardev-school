-- =============================================
-- Sankardev Sishu Vidya Niketan
-- Complete Database Schema for Supabase
-- =============================================

-- 1. Profiles (extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('principal', 'teacher', 'student', 'parent')),
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2. Classes
CREATE TABLE public.classes (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  section TEXT DEFAULT 'A',
  teacher_id UUID REFERENCES public.profiles(id),
  academic_year TEXT NOT NULL DEFAULT '2026-27'
);
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;

-- 3. Students
CREATE TABLE public.students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id),
  parent_id UUID REFERENCES public.profiles(id),
  class_id INTEGER REFERENCES public.classes(id),
  roll_number TEXT NOT NULL,
  admission_number TEXT UNIQUE,
  date_of_birth DATE,
  is_fee_cleared BOOLEAN DEFAULT FALSE,
  achievements JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- 4. Results
CREATE TABLE public.results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  class_id INTEGER REFERENCES public.classes(id),
  exam_type TEXT NOT NULL CHECK (exam_type IN ('mid_term', 'final', 'unit_test')),
  academic_year TEXT NOT NULL DEFAULT '2026-27',
  subjects JSONB NOT NULL, -- [{"name": "Math", "marks": 95, "total": 100, "grade": "A+"}]
  total_marks INTEGER,
  percentage DECIMAL(5,2),
  rank INTEGER,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;

-- 5. Attendance
CREATE TABLE public.attendance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  class_id INTEGER REFERENCES public.classes(id),
  date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('present', 'absent', 'late', 'holiday')),
  marked_by UUID REFERENCES public.profiles(id),
  UNIQUE(student_id, date)
);
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;

-- 6. Notices
CREATE TABLE public.notices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  image_url TEXT,
  category TEXT DEFAULT 'general',
  is_published BOOLEAN DEFAULT TRUE,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;

-- 7. Events
CREATE TABLE public.events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('holiday', 'exam', 'event', 'vacation')),
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- 8. Admission Requests
CREATE TABLE public.admission_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id TEXT UNIQUE NOT NULL, -- e.g., APP-2026-001
  parent_name TEXT NOT NULL,
  parent_email TEXT,
  parent_phone TEXT NOT NULL,
  student_name TEXT NOT NULL,
  date_of_birth DATE,
  applying_for_class TEXT NOT NULL,
  previous_school TEXT,
  address TEXT,
  documents JSONB DEFAULT '[]',
  status TEXT DEFAULT 'applied' CHECK (status IN ('applied', 'test_scheduled', 'selected', 'enrolled', 'rejected')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.admission_requests ENABLE ROW LEVEL SECURITY;

-- 9. School Settings
CREATE TABLE public.school_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_by UUID REFERENCES public.profiles(id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.school_settings ENABLE ROW LEVEL SECURITY;

-- Seed settings
INSERT INTO public.school_settings (key, value) VALUES
  ('admissions_open', 'true'),
  ('results_visible', 'true'),
  ('current_session', '"2026-27"');

-- =============================================
-- Helper function for role checks
-- =============================================
CREATE OR REPLACE FUNCTION public.has_role(user_role TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = user_role
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- RLS Policies
-- =============================================

-- Profiles: users can read all, update own
CREATE POLICY "Anyone can view profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid());
CREATE POLICY "Principal can manage profiles" ON public.profiles FOR ALL TO authenticated USING (public.has_role('principal'));

-- Classes: all auth can read, principal can manage
CREATE POLICY "Auth users can view classes" ON public.classes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Principal can manage classes" ON public.classes FOR ALL TO authenticated USING (public.has_role('principal'));

-- Students: principal full, parent/student own, teacher assigned
CREATE POLICY "Principal manages students" ON public.students FOR ALL TO authenticated USING (public.has_role('principal'));
CREATE POLICY "Parents view own children" ON public.students FOR SELECT TO authenticated USING (parent_id = auth.uid());

-- Results: principal/teacher manage, student/parent view own (if published)
CREATE POLICY "Principal manages results" ON public.results FOR ALL TO authenticated USING (public.has_role('principal'));
CREATE POLICY "Teachers manage class results" ON public.results FOR ALL TO authenticated
  USING (public.has_role('teacher') AND class_id IN (SELECT id FROM public.classes WHERE teacher_id = auth.uid()));
CREATE POLICY "Students view own results" ON public.results FOR SELECT TO authenticated
  USING (published = true AND student_id IN (SELECT id FROM public.students WHERE parent_id = auth.uid() OR profile_id = auth.uid()));

-- Attendance: principal/teacher manage, parent view own
CREATE POLICY "Principal manages attendance" ON public.attendance FOR ALL TO authenticated USING (public.has_role('principal'));
CREATE POLICY "Teachers manage class attendance" ON public.attendance FOR ALL TO authenticated
  USING (public.has_role('teacher') AND class_id IN (SELECT id FROM public.classes WHERE teacher_id = auth.uid()));
CREATE POLICY "Parents view child attendance" ON public.attendance FOR SELECT TO authenticated
  USING (student_id IN (SELECT id FROM public.students WHERE parent_id = auth.uid()));

-- Notices: all can read published, principal manages
CREATE POLICY "Public can read published notices" ON public.notices FOR SELECT USING (is_published = true);
CREATE POLICY "Principal manages notices" ON public.notices FOR ALL TO authenticated USING (public.has_role('principal'));

-- Events: all can read, principal manages
CREATE POLICY "Public can read events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Principal manages events" ON public.events FOR ALL TO authenticated USING (public.has_role('principal'));

-- Admission requests: public can insert, principal manages
CREATE POLICY "Anyone can submit admission" ON public.admission_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Applicants can view own" ON public.admission_requests FOR SELECT USING (parent_email = current_setting('request.jwt.claims', true)::json->>'email');
CREATE POLICY "Principal manages admissions" ON public.admission_requests FOR ALL TO authenticated USING (public.has_role('principal'));

-- School settings: all auth can read, principal can update
CREATE POLICY "Auth users read settings" ON public.school_settings FOR SELECT TO authenticated USING (true);
CREATE POLICY "Principal updates settings" ON public.school_settings FOR UPDATE TO authenticated USING (public.has_role('principal'));
