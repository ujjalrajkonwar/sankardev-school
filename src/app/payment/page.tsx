import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PaymentPortal from "@/components/payment/PaymentPortal";

export default function PaymentPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <PaymentPortal />
      </main>
      <Footer />
    </div>
  );
}