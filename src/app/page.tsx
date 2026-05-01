import NoticeBoard from "@/components/home/NoticeBoard";
import EventCalendar from "@/components/home/EventCalendar";
import LeadershipSection from "@/components/home/LeadershipSection";
import AboutSchoolSection from "@/components/home/AboutSchoolSection";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <AboutSchoolSection />
        <LeadershipSection />

        {/* Notice Board + Calendar Grid */}
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <NoticeBoard />
              <EventCalendar />
            </div>
          </div>
        </section>
        
      </main>
      <Footer />
    </>
  );
}

