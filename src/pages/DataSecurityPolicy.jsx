import PolicyLayout from "../components/PolicyLayout";

const sections = [
  {
    heading: "1. Overview",
    body: (
      <p>
        This Data Security Policy is placeholder content and will be
        replaced with the final legal text. It describes, in general terms,
        how Ojar protects customer and business data.
      </p>
    ),
  },
  {
    heading: "2. Infrastructure Security",
    body: (
      <p>
        Placeholder text describing hosting, encryption in transit and at
        rest, and general infrastructure safeguards.
      </p>
    ),
  },
  {
    heading: "3. Access Controls",
    body: (
      <p>
        Placeholder text describing how access to systems and data is
        restricted and monitored internally.
      </p>
    ),
  },
  {
    heading: "4. Data Backups",
    body: (
      <p>
        Placeholder text describing backup frequency and disaster recovery
        practices.
      </p>
    ),
  },
  {
    heading: "5. Incident Response",
    body: (
      <p>
        Placeholder text describing how security incidents are detected,
        handled, and communicated to affected customers.
      </p>
    ),
  },
  {
    heading: "6. Contact Us",
    body: (
      <p>
        For questions about this policy, contact us at{" "}
        <a href="mailto:info@designsclue.com" className="text-brand-600">
          info@designsclue.com
        </a>
        .
      </p>
    ),
  },
];

export default function DataSecurityPolicy() {
  return (
    <PolicyLayout
      badge="Data Security"
      title="Security you can trust."
      subtitle="This page explains how we protect your data. (Placeholder content — final policy coming soon.)"
      updated="Placeholder date"
      sections={sections}
    />
  );
}
