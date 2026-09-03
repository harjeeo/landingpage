import PolicyLayout from "../components/PolicyLayout";

const intro = (
  <p>
    At <strong>Designs Clue</strong>, we aim to provide reliable and
    useful software solutions for businesses. Please review the following
    policy before purchasing our services.
  </p>
);

const sections = [
  {
    heading: "1. Subscription Cancellation",
    body: (
      <>
        <p>
          Customers may cancel their subscription at any time by
          contacting us or through the available account/subscription
          settings.
        </p>
        <p>
          After cancellation, access will generally remain available
          until the end of the current paid billing period, unless
          otherwise specified.
        </p>
      </>
    ),
  },
  {
    heading: "2. Refunds",
    body: (
      <>
        <p>
          Subscription fees are generally <strong>non-refundable</strong>{" "}
          once a billing period has started, except where required by
          applicable law or approved by us on a case-by-case basis.
        </p>
        <p>Refunds may be considered in situations such as:</p>
        <ul className="list-disc pl-5">
          <li>Duplicate payments</li>
          <li>Technical issues that cannot reasonably be resolved</li>
          <li>Incorrect billing</li>
          <li>Other circumstances approved by Designs Clue</li>
        </ul>
      </>
    ),
  },
  {
    heading: "3. Free Trials & Promotional Offers",
    body: (
      <p>
        Free trials, promotional offers, or complimentary access may have
        separate terms and may not be eligible for refunds or extensions.
      </p>
    ),
  },
  {
    heading: "4. Custom Development",
    body: (
      <p>
        Payments made for <strong>custom ERP, software development,
        integrations, or other customized services</strong> may be
        non-refundable once development or work has commenced, subject to
        the applicable project agreement.
      </p>
    ),
  },
  {
    heading: "5. Contact Us",
    body: (
      <p>
        For cancellation or refund-related requests:
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

export default function RefundCancellationPolicy() {
  return (
    <PolicyLayout
      badge="Refund & Cancellation"
      title="Fair, transparent refunds."
      subtitle="This page explains how cancellations and refunds work."
      updated="3 Sep 2026"
      intro={intro}
      sections={sections}
    />
  );
}
