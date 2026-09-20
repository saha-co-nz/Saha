import ContactPage from "@/src/components/contact/ContactPage";
import Footer from "@/src/components/common/Footer";
import Header from "@/src/components/common/Header";
import "../globals.css";

/* The Footer was missing here — this was the only one of the nine pages
   without it, so the legal disclaimer and copyright were absent from the one
   page where someone actually submits their details. */
export default function ContactUsPage() {
  return (
    <div>
      <Header />
      <ContactPage />
      <Footer />
    </div>
  );
}
