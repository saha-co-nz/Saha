import AgentShowcase, { type AgentStat } from "./AgentShowcase";
import MailSorterBody from "./MailSorterBody";

/* Real figures from the run captured in the source material: 12 messages
   classified across a 24-hour window, split 2/4/3/3 across the Eisenhower
   quadrants, every one scored between 85% and 99%.

   The 30-day run across both inboxes will replace this when it lands, and
   should — a single day is a thin window and the auto-filed share is the
   stronger headline. Until then these are the numbers we can actually stand
   behind, and the quadrant split is verifiable from the panel above. */
const stat: AgentStat = {
  kind: "figures",
  primary: {
    caption:
      "Messages read, scored and routed in a 24-hour window — before anyone on the team opened the inbox.",
    unit: "emails",
    value: "12",
  },
  secondary: {
    caption:
      "Confidence range across all twelve classifications. Every one was filed; none needed a second look.",
    value: "85–99%",
  },
};

export default function MailSorter() {
  return (
    <AgentShowcase
      actions={[
        { label: "Sign out", variant: "plain" },
        { label: "Run now", variant: "ghost" },
        { label: "Send digest", variant: "solid" },
      ]}
      id="mail-sorter"
      index="02"
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
      status="12 classified in the last 24 hours · read-only mailbox access · nothing stored beyond message IDs"
      syntheticNote="Senders and subjects are invented for this page. The classification behaviour shown is real; the correspondence is not."
      title="Good morning."
    >
      <MailSorterBody />
    </AgentShowcase>
  );
}
