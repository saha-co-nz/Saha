import Header from "@/src/components/common/Header";
import Footer from "@/src/components/common/Footer";
import LegalDocument from "@/src/components/legal/LegalDocument";
import { getPolicies } from "@/src/lib/payload/policies";
import "../globals.css";

export default async function PrivacyPage() {
  const sections = await getPolicies();

  return (
    <div>
      <Header />
      <LegalDocument
        alternateHref="/termsofuse"
        alternateLabel="View the Terms of Use"
        lastUpdated="20/09/2026"
        sections={sections}
        title="Privacy Policy"
      />
      <Footer />
    </div>
  );
}
