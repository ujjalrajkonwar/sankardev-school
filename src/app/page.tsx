import NoticeBoard from "@/components/home/NoticeBoard";
import EventCalendar from "@/components/home/EventCalendar";
import LeadershipSection from "@/components/home/LeadershipSection";
import AboutSchoolSection from "@/components/home/AboutSchoolSection";
import SchoolEventsAcademicsSection from "@/components/home/SchoolEventsAcademicsSection";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <AboutSchoolSection />
        <LeadershipSection />

        {/* Mobile order: Notice Board -> School Events and Academics -> Upcoming Events */}
        <div className="lg:hidden">
          <section className="py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <NoticeBoard />
            </div>
          </section>

          <SchoolEventsAcademicsSection />

          <section className="py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <EventCalendar />
            </div>
          </section>
        </div>

        {/* Desktop layout stays the same */}
        <section className="hidden lg:block py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <NoticeBoard />
              <EventCalendar />
            </div>
          </div>
        </section>

        <section className="hidden lg:block">
          <SchoolEventsAcademicsSection />
        </section>
        
      </main>
      <Footer />
    </>
  );
}

