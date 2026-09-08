import React from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0c0e15] text-slate-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center sm:text-left">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors mb-6">
            ← Back to Home
          </Link>
          <span className="block text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">Legal Information</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Privacy Policy</h1>
          <p className="mt-2 text-sm text-slate-400">Last updated: September 2026</p>
        </div>

        <div className="bg-[#131520] border border-white/10 rounded-2xl p-6 sm:p-10 space-y-8 text-sm leading-relaxed text-slate-300">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Introduction</h2>
            <p>
              Welcome to Designs Clue Skills ("we", "our", or "us"). We respect your privacy and are committed to protecting the personal information you share with us when accessing our online courses, resources, community, and services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. Information We Collect</h2>
            <p>We may collect and process the following types of information:</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-400">
              <li><strong className="text-slate-200">Personal Identification Information:</strong> Name, email address, phone number, and billing details provided during course registration.</li>
              <li><strong className="text-slate-200">Account & Course Progress:</strong> Login credentials, video watch history, course completions, and assignments.</li>
              <li><strong className="text-slate-200">Payment Information:</strong> Transaction records and payment statuses processed securely via verified third-party payment gateways.</li>
              <li><strong className="text-slate-200">Technical Data:</strong> Device details, browser version, and platform usage analytics.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. How We Use Your Information</h2>
            <p>Your data is used strictly to:</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-400">
              <li>Deliver course content, updates, and learning materials.</li>
              <li>Process transactions and issue invoices.</li>
              <li>Provide dedicated student support and mentorship communication.</li>
              <li>Maintain platform security and prevent unauthorized sharing of proprietary content.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">4. Data Protection & Security</h2>
            <p>
              We implement industry-standard encryption protocols and secure server architectures to ensure your personal data is protected against unauthorized access or breaches.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">5. Your Rights</h2>
            <p>
              You have the right to request access to, correction of, or deletion of your personal data at any time by contacting our support team.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-white/10">
            <h2 className="text-lg font-bold text-white">6. Contact Us</h2>
            <p>
              For privacy-related inquiries, please email us at <span className="text-purple-400">info@designsclue.com</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
