import Footer from "@/src/components/common/Footer";
import Header from "@/src/components/common/Header";
import GovernancePage from "@/src/components/whoweare/GovernancePage";
import PeoplePage from "@/src/components/whoweare/PeoplePage";
import ResponsibleAI from "@/src/components/whoweare/ResponsibleAI";
import ValuesPage from "@/src/components/whoweare/ValuesPage";
import WhoWeAreLanding from "@/src/components/whoweare/WhoWeAreLanding";
import "../globals.css";

/* /whoweare/people, /whoweare/values and /whoweare/governance have folded in
   here as sections and now 301 to this page. Their content is not deleted —
   each renders with asSection so the page keeps a single h1. */
export default async function WhoWeArePage() {
  return (
    <div>
      <Header />
      <WhoWeAreLanding />
      <PeoplePage asSection />
      <ValuesPage asSection />
      <ResponsibleAI />
      <GovernancePage asSection />
      <Footer />
    </div>
  );
}
