import PolicyLayout from "../components/PolicyLayout";

const sections = [
  {
    heading: "1. Overview",
    body: (
      <p>
        This Refund & Cancellation Policy is placeholder content and will be
        replaced with the final legal text. It describes, in general terms,
        how refunds and cancellations are handled for Ojar subscriptions.
      </p>
    ),
  },
  {
    heading: "2. Free Trial",
    body: (
      <p>
        Placeholder text describing the free trial period, how it works, and
        what happens when it ends.
      </p>
    ),
  },
  {
    heading: "3. Cancelling a Subscription",
    body: (
      <p>
        Placeholder text describing how customers can cancel their
        subscription and when the cancellation takes effect.
      </p>
    ),
  },
  {
    heading: "4. Refund Eligibility",
    body: (
      <p>
        Placeholder text describing the circumstances under which a refund
        may or may not be issued.
      </p>
    ),
  },
  {
    heading: "5. Refund Process",
    body: (
      <p>
        Placeholder text describing how refunds are processed and the
        expected timeline for funds to be returned.
      </p>
    ),
  },
  {
    heading: "6. Contact Us",
    body: (
      <p>
        For questions about refunds or cancellations, contact us at{" "}
        <a href="mailto:info@designsclue.com" className="text-brand-600">
          info@designsclue.com
        </a>
        .
      </p>
    ),
  },
];

export default function RefundCancellationPolicy() {
  return (
    <PolicyLayout
      badge="Refund & Cancellation"
      title="Fair, transparent refunds."
      subtitle="This page explains how cancellations and refunds work. (Placeholder content — final policy coming soon.)"
      updated="Placeholder date"
      sections={sections}
    />
  );
}
