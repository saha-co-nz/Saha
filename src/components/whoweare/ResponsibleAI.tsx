/* From the design source. This is the standard that makes the Responsible AI
   claim checkable rather than decorative, and it is the same commitment the
   board reporting agent demonstrates on /case-studies — the two-pass gate
   exists precisely because a person reviews before anything is generated. */
const commitments = [
  {
    body: "Client data stays client data. We use enterprise-grade AI tools under strict access controls, and nothing you share with us trains a public model without your explicit agreement.",
    title: "Data security",
  },
  {
    body: "AI augments judgment, it doesn't replace it. Every recommendation we make is reviewed by a person before it reaches you, and we're upfront about where automation ends and human decision-making begins.",
    title: "Ethical AI use",
  },
  {
    body: "We hold ourselves to the same standard we ask of clients. Saha runs on an internal AI use policy covering data handling, tool approval, and disclosure, reviewed as the tools we use evolve.",
    title: "Internal AI policy",
  },
];

export default function ResponsibleAI() {
  return (
    <section className="responsible-ai" id="responsible-ai">
      <div className="responsible-ai-inner">
        <p className="section-label">Responsible AI</p>
        <h2 className="section-title white">
          AI, <em>done responsibly.</em>
        </h2>
        <p className="responsible-ai-lede">
          Trust isn&apos;t just about the outcomes we deliver, it&apos;s about
          how we get there. We hold ourselves to a clear standard on data,
          ethics, and how AI actually gets used inside our own practice.
        </p>

        <div className="responsible-grid">
          {commitments.map((item) => (
            <article className="responsible-card" key={item.title}>
              <h3 className="responsible-card-title">{item.title}</h3>
              <p className="responsible-card-body">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
