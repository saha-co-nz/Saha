import Header from "@/src/components/common/Header";
import Footer from "@/src/components/common/Footer";
import ServicesLanding from "@/src/components/services/ServicesLanding";
import StartSmaller from "@/src/components/common/StartSmaller";
import "../globals.css";

export default async function ServicesPage() {
  return (
    <div>
      <Header />
      <ServicesLanding />
      <StartSmaller />
      <Footer />
    </div>
  );
}
