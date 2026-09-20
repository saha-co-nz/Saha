import Header from "@/src/components/common/Header";
import Footer from "@/src/components/common/Footer";
import LegalDocument from "@/src/components/legal/LegalDocument";
import { getTerms } from "src/lib/payload/terms";
import "../globals.css";

export default async function TermsPage() {
  const sections = await getTerms();

  return (
    <div>
      <Header />
      <LegalDocument
        alternateHref="/privacy"
        alternateLabel="View the Privacy Policy"
        lastUpdated="20/09/2026"
        sections={sections}
        title="Terms of Use"
      />
      <Footer />
    </div>
  );
}
