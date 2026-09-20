import Link from "next/link";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

type LegalSection = {
  body: SerializedEditorState;
  id: string;
  title: string;
};

type LegalDocumentProps = {
  alternateHref: string;
  alternateLabel: string;
  lastUpdated: string;
  sections: LegalSection[];
  title: string;
};

export default function LegalDocument({
  alternateHref,
  alternateLabel,
  lastUpdated,
  sections,
  title,
}: LegalDocumentProps) {
  return (
    <div className="doc-page-container">
      <div className="doc-header">
        <p className="doc-eyebrow">Legal</p>
        <h1 className="doc-title">{title}</h1>
        <p className="doc-meta">
          Last Updated: {lastUpdated} &nbsp;·&nbsp;
          <Link href={alternateHref}>{alternateLabel} →</Link>
        </p>
      </div>

      {sections.map((section) => (
        <div className="doc-section" key={section.id}>
          <h2>{section.title}</h2>
          <div className="doc-richtext">
            <RichText data={section.body} />
          </div>
        </div>
      ))}

      <div className="doc-footer">
        <Link className="doc-footer-logo" href="/">
          saha.
        </Link>
        <span className="doc-footer-note">
          © 2022–2026 Saha Group ANZ. All rights reserved.
        </span>
      </div>
    </div>
  );
}
