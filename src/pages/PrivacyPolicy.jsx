import PolicyLayout from "../components/PolicyLayout";

const sections = [
  {
    heading: "1. Overview",
    body: (
      <p>
        This Privacy Policy is placeholder content and will be replaced with
        the final legal text. It describes, in general terms, how Ojar
        collects, uses, and protects information when you use our website
        and products.
      </p>
    ),
  },
  {
    heading: "2. Information We Collect",
    body: (
      <>
        <p>We may collect information such as:</p>
        <ul className="list-disc pl-5">
          <li>Contact details you provide (name, email, phone number)</li>
          <li>Account and billing information</li>
          <li>Usage data and device information</li>
          <li>Cookies and similar tracking technologies</li>
        </ul>
      </>
    ),
  },
  {
    heading: "3. How We Use Your Information",
    body: (
      <p>
        Placeholder text describing how collected information is used to
        provide, maintain, and improve our services, communicate with users,
        and comply with legal obligations.
      </p>
    ),
  },
  {
    heading: "4. Sharing of Information",
    body: (
      <p>
        Placeholder text describing the limited circumstances under which
        information may be shared with third parties, such as service
        providers or as required by law.
      </p>
    ),
  },
  {
    heading: "5. Data Retention",
    body: (
      <p>
        Placeholder text describing how long data is retained and the
        criteria used to determine retention periods.
      </p>
    ),
  },
  {
    heading: "6. Your Rights",
    body: (
      <p>
        Placeholder text describing the rights users may have over their
        personal data, including access, correction, and deletion requests.
      </p>
    ),
  },
  {
    heading: "7. Contact Us",
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

export default function PrivacyPolicy() {
  return (
    <PolicyLayout
      badge="Privacy Policy"
      title="Your privacy, protected."
      subtitle="This page explains what information we collect and how we use it. (Placeholder content — final policy coming soon.)"
      updated="Placeholder date"
      sections={sections}
    />
  );
}
