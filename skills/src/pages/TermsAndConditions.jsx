import React from 'react';
import { Link } from 'react-router-dom';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-[#0c0e15] text-slate-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center sm:text-left">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors mb-6">
            ← Back to Home
          </Link>
          <span className="block text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">Legal Information</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Terms & Conditions</h1>
          <p className="mt-2 text-sm text-slate-400">Last updated: September 2026</p>
        </div>

        <div className="bg-[#131520] border border-white/10 rounded-2xl p-6 sm:p-10 space-y-8 text-sm leading-relaxed text-slate-300">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Agreement to Terms</h2>
            <p>
              By accessing or purchasing any course, workshop, or resource from Designs Clue Skills, you agree to be bound by these Terms & Conditions. If you disagree with any part of these terms, please do not use our services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. Intellectual Property & Course License</h2>
            <p>
              All course videos, curriculum materials, Figma files, design templates, downloadable resources, and written guides are the intellectual property of Designs Clue.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-400">
              <li>Purchasing a course grants you a <strong className="text-slate-200">single-user, non-transferable, non-exclusive license</strong> for personal learning and skill enhancement.</li>
              <li>You may not reproduce, redistribute, resell, screen-record for distribution, or publicly broadcast any course materials.</li>
              <li>Account sharing or distributing login credentials to multiple individuals is strictly prohibited and will result in immediate account termination without refund.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. Course Access & Lifetime Updates</h2>
            <p>
              Upon successful payment, you will receive digital access to the course content for the specified duration (e.g., lifetime access where designated). We reserve the right to update, refresh, or modify curriculum lessons to keep pace with industry changes and modern software tools.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">4. Student Conduct & Community Guidelines</h2>
            <p>
              Students are expected to interact respectfully in community channels, Q&A sections, and workshops. Harassment, spam, or abusive behavior will result in revocation of access.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">5. Disclaimer & Educational Outcome</h2>
            <p>
              Our courses are designed to provide practical, industry-standard training. However, individual career outcomes, freelance earnings, or employment success depend on student dedication, practice, portfolio quality, and external market factors. No specific financial or employment outcome is guaranteed.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-white/10">
            <h2 className="text-lg font-bold text-white">6. Contact Information</h2>
            <p>
              For any questions regarding these Terms & Conditions, please contact us at <span className="text-purple-400">info@designsclue.com</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
