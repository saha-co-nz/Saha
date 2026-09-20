import CareersApplyPage from "@/src/components/careers/CareersApplyPage";
import CareersLanding from "@/src/components/careers/CareersLanding";
import Footer from "@/src/components/common/Footer";
import Header from "@/src/components/common/Header";
import "../globals.css";

/* /careers/apply has folded in here and now 301s to this page; /careers/contact
   301s to /contactus, where the richer enquiry form already lives. */
export default function CareersPage() {
  return (
    <div>
      <Header />
      <CareersLanding />
      <CareersApplyPage />
      <Footer />
    </div>
  );
}
