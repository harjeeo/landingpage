import PolicyLayout from "../components/PolicyLayout";

const intro = (
  <p>
    At <strong>Designs Clue</strong>, we use cookies and similar
    technologies to improve your experience on our website and understand
    how our services are used.
  </p>
);

const sections = [
  {
    heading: "1. What Are Cookies?",
    body: (
      <p>
        Cookies are small text files stored on your device when you visit
        a website. They help websites remember preferences and provide a
        better experience.
      </p>
    ),
  },
  {
    heading: "2. How We Use Cookies",
    body: (
      <>
        <p>We may use cookies to:</p>
        <ul className="list-disc pl-5">
          <li>Keep our website functioning properly</li>
          <li>Remember user preferences</li>
          <li>Analyze website traffic and performance</li>
          <li>Understand how visitors use our website</li>
          <li>Improve our services and user experience</li>
          <li>Support marketing and advertising activities, where applicable</li>
        </ul>
      </>
    ),
  },
  {
    heading: "3. Third-Party Cookies",
    body: (
      <p>
        Some third-party services, such as analytics, advertising,
        payment, or other integrated services, may place their own
        cookies on your device.
      </p>
    ),
  },
  {
    heading: "4. Managing Cookies",
    body: (
      <p>
        You can control or disable cookies through your browser settings.
        Disabling certain cookies may affect some website functionality.
      </p>
    ),
  },
  {
    heading: "5. Changes to This Policy",
    body: (
      <p>
        We may update this Cookie Policy from time to time. Any changes
        will be reflected on this page with an updated{" "}
        <strong>"Last Updated"</strong> date.
      </p>
    ),
  },
  {
    heading: "6. Contact Us",
    body: (
      <p>
        For questions regarding this Cookie Policy:
        <br />
        <br />
        <strong>Designs Clue</strong>
        <br />
        Website:{" "}
        <a href="https://designsclue.com/" className="text-brand-600">
          https://designsclue.com/
        </a>
        <br />
        Email:{" "}
        <a href="mailto:info@designsclue.com" className="text-brand-600">
          info@designsclue.com
        </a>
        <br />
        Phone: +91-9814522993
        <br />
        Address: Bulara Rd, back side G.N.E College, Ludhiana
      </p>
    ),
  },
];

export default function CookiePolicy() {
  return (
    <PolicyLayout
      badge="Cookie Policy"
      title="How we use cookies."
      subtitle="This page explains how cookies and similar technologies are used on our website."
      updated="3 Sep 2026"
      intro={intro}
      sections={sections}
    />
  );
}
