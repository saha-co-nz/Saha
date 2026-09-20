import CareersApplyForm from "./Form";

/* Folded into /careers. The standalone CareersSimpleFooter that used to close
   this page has been dropped — the page-level Footer now does that job, and
   globals.css only suppresses inner footers inside #section-careers. */
export default function CareersApplyPage() {
  return (
    <div id="apply">
      <div className="page active" id="careers-page-apply">
        <CareersApplyForm />
      </div>
    </div>
  );
}
