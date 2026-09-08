import React from 'react';
import { Link } from 'react-router-dom';

export default function RefundCancellationPolicy() {
  return (
    <div className="min-h-screen bg-[#0c0e15] text-slate-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center sm:text-left">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors mb-6">
            ← Back to Home
          </Link>
          <span className="block text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">Legal Information</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Refund & Cancellation Policy</h1>
          <p className="mt-2 text-sm text-slate-400">Last updated: September 2026</p>
        </div>

        <div className="bg-[#131520] border border-white/10 rounded-2xl p-6 sm:p-10 space-y-8 text-sm leading-relaxed text-slate-300">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Overview</h2>
            <p>
              At Designs Clue Skills, we strive to deliver the highest quality practical training, resources, and mentorship. Because our digital courses and downloadable assets provide immediate access upon enrollment, this Refund and Cancellation Policy outlines the conditions under which refund requests are evaluated.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. Refund Eligibility & Guarantee</h2>
            <p>
              We want you to feel confident in your learning investment. For eligible comprehensive masterclasses:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-400">
              <li><strong className="text-slate-200">Refund Window:</strong> You may request a refund within <strong className="text-slate-200">7 days of original purchase date</strong>.</li>
              <li><strong className="text-slate-200">Course Consumption Limit:</strong> To prevent misuse, refund requests will only be approved if you have viewed <strong className="text-slate-200">less than 25% of the total course video lessons</strong> and have not downloaded proprietary UI kits / source files.</li>
              <li><strong className="text-slate-200">Proof of Effort:</strong> We may ask for basic feedback or details about your learning experience so we can continuously improve.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. Non-Refundable Purchases</h2>
            <p>Refunds will not be issued in the following circumstances:</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-400">
              <li>Requests submitted after the 7-day refund window has passed.</li>
              <li>Accounts that have completed more than 25% of course content or downloaded Figma master design systems/kits.</li>
              <li>Courses purchased during special flash sales, bundle clearance discounts, or promo code events explicitly marked as non-refundable.</li>
              <li>Accounts banned for violating our Terms & Conditions (e.g., piracy, account sharing, or harassment).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">4. Cancellation of Subscriptions (If applicable)</h2>
            <p>
              If enrolled in a recurring subscription or membership plan, you may cancel your renewal at any time through your student dashboard or by reaching out to support. Your access will remain active until the end of your current paid billing period.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">5. How to Request a Refund</h2>
            <p>
              To initiate a refund request, please email us with your full name, registered email, course title, and transaction/order ID:
            </p>
            <div className="bg-[#181a26] border border-white/10 rounded-xl p-4 text-xs font-mono text-purple-300">
              Email: info@designsclue.com<br />
              Subject: Refund Request - [Your Order ID]
            </div>
            <p className="text-slate-400 text-xs">
              Once approved, refunds are processed within 5–7 business days back to your original payment method.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-white/10">
            <h2 className="text-lg font-bold text-white">6. Questions?</h2>
            <p>
              Our support team is happy to help you with any questions. Please reach out to <span className="text-purple-400">info@designsclue.com</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
