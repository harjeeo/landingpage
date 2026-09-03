import PolicyLayout from "../components/PolicyLayout";

const sections = [
  {
    heading: "1. Acceptance of Terms",
    body: (
      <p>
        This Terms & Conditions page is placeholder content and will be
        replaced with the final legal text. By accessing or using Ojar, you
        agree to be bound by these terms.
      </p>
    ),
  },
  {
    heading: "2. Use of Service",
    body: (
      <p>
        Placeholder text describing acceptable use of the platform, account
        responsibilities, and restrictions on misuse.
      </p>
    ),
  },
  {
    heading: "3. Subscriptions & Billing",
    body: (
      <p>
        Placeholder text describing subscription plans, billing cycles,
        trials, and renewal terms.
      </p>
    ),
  },
  {
    heading: "4. Intellectual Property",
    body: (
      <p>
        Placeholder text describing ownership of the platform, trademarks,
        and content, and the limited license granted to users.
      </p>
    ),
  },
  {
    heading: "5. Limitation of Liability",
    body: (
      <p>
        Placeholder text describing the limits of liability for damages
        arising from use of the service.
      </p>
    ),
  },
  {
    heading: "6. Termination",
    body: (
      <p>
        Placeholder text describing the conditions under which accounts may
        be suspended or terminated.
      </p>
    ),
  },
  {
    heading: "7. Governing Law",
    body: (
      <p>
        Placeholder text describing the governing law and jurisdiction
        applicable to these terms.
      </p>
    ),
  },
  {
    heading: "8. Contact Us",
    body: (
      <p>
        For questions about these terms, contact us at{" "}
        <a href="mailto:info@designsclue.com" className="text-brand-600">
          info@designsclue.com
        </a>
        .
      </p>
    ),
  },
];

export default function TermsAndConditions() {
  return (
    <PolicyLayout
      badge="Terms & Conditions"
      title="The rules of the road."
      subtitle="Please read these terms carefully before using Ojar. (Placeholder content — final terms coming soon.)"
      updated="Placeholder date"
      sections={sections}
    />
  );
}
