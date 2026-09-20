import AgentShowcase, { type AgentStat } from "./AgentShowcase";
import MailSorterBody from "./MailSorterBody";

/* No headline figure yet. The 30-day run across the two Saha inboxes is still
   being captured, so this ships with a fallback claim rather than a soft or
   invented number. Everything the claim asserts is visible on screen: the
   quadrants, the per-message confidence score, and the below-threshold
   message being handed to a person instead of filed.

   When the run lands, swap `stat` for a "figures" object — primary is the
   auto-filed count, secondary the percentage. Do not publish a derived
   time-saved figure without its assumption. */
const stat: AgentStat = {
  claim:
    "Two inboxes, sorted into Eisenhower quadrants with a confidence score on every classification. Anything it isn't sure about goes to a human.",
  kind: "fallback",
};

export default function MailSorter() {
  return (
    <AgentShowcase
      actions={[
        { label: "Sign out", variant: "plain" },
        { label: "Run now", variant: "ghost" },
        { label: "Send digest", variant: "solid" },
      ]}
      address="saha.co.nz/agents/mail-sorter"
      eyebrow="Internal ops · Mail Sorter"
      headline={
        <>
          Sorting the inbox <em>that never stops.</em>
        </>
      }
      lede="Saha runs on email, like most consulting firms. Every enquiry, every internal update, every follow-up lands in the same place and it doesn't stop for anyone's day. We built the triage layer for ourselves first."
      product="Saha Mail Sorter"
      replaced="The first hour of every morning, spent deciding what mattered. Triage was manual, inconsistent between whoever did it, and started again from scratch the next day."
      stat={stat}
      status="Classified against the Eisenhower matrix · read-only mailbox access · nothing stored beyond message IDs"
      syntheticNote="Senders and subjects are invented for this page. The classification behaviour shown is real; the correspondence is not."
      title="Good morning."
    >
      <MailSorterBody />
    </AgentShowcase>
  );
}
