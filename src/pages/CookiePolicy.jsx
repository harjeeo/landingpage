import PolicyLayout from "../components/PolicyLayout";

const sections = [
  {
    heading: "1. Overview",
    body: (
      <p>
        This Cookie Policy is placeholder content and will be replaced with
        the final legal text. It describes, in general terms, how Ojar uses
        cookies and similar technologies.
      </p>
    ),
  },
  {
    heading: "2. What Are Cookies",
    body: (
      <p>
        Placeholder text explaining what cookies are and how they work in a
        browser.
      </p>
    ),
  },
  {
    heading: "3. Types of Cookies We Use",
    body: (
      <>
        <p>Placeholder categories of cookies used across the site:</p>
        <ul className="list-disc pl-5">
          <li>Essential cookies (required for the site to function)</li>
          <li>Analytics cookies (to understand how the site is used)</li>
          <li>Preference cookies (to remember your settings)</li>
          <li>Marketing cookies (to measure campaign performance)</li>
        </ul>
      </>
    ),
  },
  {
    heading: "4. Managing Cookies",
    body: (
      <p>
        Placeholder text describing how users can control or disable cookies
        through their browser settings.
      </p>
    ),
  },
  {
    heading: "5. Contact Us",
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

export default function CookiePolicy() {
  return (
    <PolicyLayout
      badge="Cookie Policy"
      title="How we use cookies."
      subtitle="This page explains how cookies and similar technologies are used on Ojar. (Placeholder content — final policy coming soon.)"
      updated="Placeholder date"
      sections={sections}
    />
  );
}
