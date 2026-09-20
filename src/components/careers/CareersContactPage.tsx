import CareersContactForm from "./CareersContactForm";
import CareersSimpleFooter from "./CareersSimpleFooter";

export default function CareersContactPage() {
  return (
    <div id="section-careers">
      <div id="careers-page-contact" className="page active">
        <CareersContactForm />
        <CareersSimpleFooter note="© 2026 Saha NZ Limited" />
      </div>
    </div>
  );
}
