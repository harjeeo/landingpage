import PolicyLayout from "../components/PolicyLayout";

const intro = (
  <>
    <p>
      Welcome to <strong>Designs Clue</strong>. These Terms & Conditions
      ("Terms") govern your access to and use of our website, software,
      applications, products, and related services.
    </p>
    <p>
      Our services include <strong>Cafe/Restaurant POS, Accounting Software,
      HR Management System, Hotel Management System, and Salon Management
      Software</strong>, as well as customized software and management
      solutions.
    </p>
    <p>
      By accessing our website, creating an account, purchasing a
      subscription, or using our services, you agree to be bound by these
      Terms. If you do not agree with these Terms, please do not use our
      services.
    </p>
  </>
);

const sections = [
  {
    heading: "1. Definitions",
    body: (
      <>
        <p>For the purpose of these Terms:</p>
        <ul className="list-disc pl-5">
          <li><strong>"Company", "We", "Us", or "Our"</strong> means Designs Clue.</li>
          <li><strong>"User", "You", or "Customer"</strong> means any individual or organization accessing or using our services.</li>
          <li><strong>"Software"</strong> means any application, SaaS platform, POS system, ERP, management system, or related software provided by us.</li>
          <li><strong>"Services"</strong> means the software, website, support, hosting, maintenance, integrations, and other services provided by us.</li>
          <li><strong>"Customer Data"</strong> means information, records, files, or other data uploaded or entered by the customer into our software.</li>
        </ul>
      </>
    ),
  },
  {
    heading: "2. Eligibility",
    body: (
      <>
        <p>You must have the legal capacity to enter into these Terms to use our services.</p>
        <p>
          If you are using our services on behalf of a company, business,
          organization, or other entity, you confirm that you have the
          authority to accept these Terms on its behalf.
        </p>
      </>
    ),
  },
  {
    heading: "3. Account Registration",
    body: (
      <>
        <p>Certain features may require you to create an account.</p>
        <p>You agree to:</p>
        <ul className="list-disc pl-5">
          <li>Provide accurate and complete information.</li>
          <li>Keep your account information updated.</li>
          <li>Maintain the confidentiality of your login credentials.</li>
          <li>Not share your account with unauthorized users.</li>
          <li>Notify us of any unauthorized access.</li>
          <li>Take responsibility for activity performed through your account.</li>
        </ul>
        <p>You are responsible for maintaining the security of your account and credentials.</p>
      </>
    ),
  },
  {
    heading: "4. Software Subscription",
    body: (
      <>
        <p>Our software may be offered through different subscription plans.</p>
        <p>Depending on the selected plan, features may include:</p>
        <ul className="list-disc pl-5">
          <li>POS & Billing</li>
          <li>Inventory Management</li>
          <li>Accounting</li>
          <li>HR & Payroll</li>
          <li>Employee Management</li>
          <li>Hotel Operations</li>
          <li>Salon Management</li>
          <li>Reports & Analytics</li>
          <li>Cloud Access</li>
          <li>Multi-user functionality</li>
          <li>Other features specified in the selected plan</li>
        </ul>
        <p>
          Features, usage limits, number of users, locations, storage,
          integrations, and other limitations may vary between plans.
        </p>
      </>
    ),
  },
  {
    heading: "5. Subscription & Billing",
    body: (
      <>
        <p>
          Where applicable, subscription fees must be paid according to the
          pricing and billing terms selected by the customer.
        </p>
        <p>Subscriptions may be:</p>
        <ul className="list-disc pl-5">
          <li>Monthly</li>
          <li>Yearly</li>
          <li>One-time</li>
          <li>Custom/Enterprise</li>
        </ul>
        <p>
          We reserve the right to change pricing, plans, features, or
          subscription terms. Existing customers will be informed of
          material changes where required.
        </p>
        <p>Failure to make required payments may result in suspension or termination of access.</p>
      </>
    ),
  },
  {
    heading: "6. Free Trials & Promotional Offers",
    body: (
      <>
        <p>We may occasionally provide:</p>
        <ul className="list-disc pl-5">
          <li>Free trials</li>
          <li>Promotional plans</li>
          <li>Discounted subscriptions</li>
          <li>Free access for selected customers</li>
          <li>Limited-time offers</li>
        </ul>
        <p>
          Promotional offers may be subject to specific eligibility
          requirements, usage limits, duration, or other conditions.
        </p>
        <p>
          We reserve the right to modify or discontinue promotional offers
          at any time, subject to applicable commitments.
        </p>
      </>
    ),
  },
  {
    heading: "7. Customer Data",
    body: (
      <>
        <p>
          You retain ownership of the business and operational data that
          you upload or enter into our software.
        </p>
        <p>
          You are responsible for ensuring that you have the necessary
          rights, permissions, and lawful authority to collect and process
          such data.
        </p>
        <p>Depending on the software, Customer Data may include:</p>
        <ul className="list-disc pl-5">
          <li>Customer records</li>
          <li>Employee records</li>
          <li>Sales and purchase data</li>
          <li>Financial information</li>
          <li>Inventory information</li>
          <li>Restaurant orders</li>
          <li>Hotel guest and booking information</li>
          <li>Salon customer and appointment information</li>
        </ul>
        <p>
          Our handling of personal information is additionally governed by
          our <strong>Privacy Policy</strong>.
        </p>
      </>
    ),
  },
  {
    heading: "8. Customer Responsibilities",
    body: (
      <>
        <p>You agree to use the software responsibly and lawfully.</p>
        <p>You are responsible for:</p>
        <ul className="list-disc pl-5">
          <li>Entering accurate information.</li>
          <li>Maintaining appropriate user permissions.</li>
          <li>Protecting account credentials.</li>
          <li>Maintaining accurate business records.</li>
          <li>Ensuring compliance with applicable laws.</li>
          <li>Obtaining necessary permissions for customer/employee data.</li>
          <li>Reviewing reports, invoices, calculations, and other outputs before relying on them.</li>
        </ul>
        <p>
          We are not responsible for losses resulting from incorrect data
          entered by the customer or misuse of the software.
        </p>
      </>
    ),
  },
  {
    heading: "9. Prohibited Activities",
    body: (
      <>
        <p>You must not use our services to:</p>
        <ul className="list-disc pl-5">
          <li>Violate applicable laws or regulations.</li>
          <li>Commit fraud or facilitate fraudulent activity.</li>
          <li>Gain unauthorized access to systems or accounts.</li>
          <li>Attempt to bypass security mechanisms.</li>
          <li>Introduce malware, viruses, or harmful code.</li>
          <li>Interfere with the operation of our services.</li>
          <li>Reverse engineer or decompile the software where prohibited by law.</li>
          <li>Copy, reproduce, resell, or redistribute our software without authorization.</li>
          <li>Use the service to infringe intellectual property or privacy rights.</li>
          <li>Abuse APIs, servers, or system resources.</li>
          <li>Attempt to access another customer's data.</li>
        </ul>
        <p>We may suspend or terminate accounts involved in prohibited activities.</p>
      </>
    ),
  },
  {
    heading: "10. Software Availability",
    body: (
      <>
        <p>
          We aim to keep our services available and reliable; however,
          uninterrupted availability cannot be guaranteed.
        </p>
        <p>Services may occasionally be unavailable due to:</p>
        <ul className="list-disc pl-5">
          <li>Scheduled maintenance</li>
          <li>Emergency maintenance</li>
          <li>Server or infrastructure issues</li>
          <li>Internet/network problems</li>
          <li>Third-party service failures</li>
          <li>Security incidents</li>
          <li>Events beyond our reasonable control</li>
        </ul>
        <p>We will make reasonable efforts to restore services as quickly as practicable.</p>
      </>
    ),
  },
  {
    heading: "11. Updates & Changes to Software",
    body: (
      <>
        <p>
          We may modify, improve, update, or discontinue features of our
          software from time to time.
        </p>
        <p>Updates may include:</p>
        <ul className="list-disc pl-5">
          <li>New features</li>
          <li>Security improvements</li>
          <li>Bug fixes</li>
          <li>Performance improvements</li>
          <li>Interface changes</li>
          <li>Feature modifications</li>
        </ul>
        <p>We may also remove features that are no longer technically or commercially viable.</p>
      </>
    ),
  },
  {
    heading: "12. Third-Party Integrations",
    body: (
      <>
        <p>Our software may integrate with third-party services such as:</p>
        <ul className="list-disc pl-5">
          <li>Payment gateways</li>
          <li>Accounting services</li>
          <li>Email providers</li>
          <li>SMS/communication providers</li>
          <li>Cloud services</li>
          <li>Analytics platforms</li>
          <li>Other third-party applications</li>
        </ul>
        <p>
          Your use of third-party services may be subject to their separate
          terms and privacy policies.
        </p>
        <p>
          We are not responsible for the availability, functionality,
          policies, or performance of third-party services.
        </p>
      </>
    ),
  },
  {
    heading: "13. Intellectual Property",
    body: (
      <>
        <p>
          All intellectual property associated with our website and
          software, including but not limited to:
        </p>
        <ul className="list-disc pl-5">
          <li>Software</li>
          <li>Source code</li>
          <li>Designs</li>
          <li>UI/UX</li>
          <li>Logos</li>
          <li>Trademarks</li>
          <li>Graphics</li>
          <li>Content</li>
          <li>Documentation</li>
          <li>Website materials</li>
        </ul>
        <p>
          belongs to or is licensed to <strong>Designs Clue</strong>, unless
          otherwise stated.
        </p>
        <p>These Terms do not transfer ownership of our intellectual property to you.</p>
        <p>
          You receive only the rights necessary to use the software
          according to your subscription or service agreement.
        </p>
      </>
    ),
  },
  {
    heading: "14. Custom Software & Development",
    body: (
      <>
        <p>
          For custom ERP, management systems, integrations, or other
          development projects, additional terms may apply.
        </p>
        <p>These may include:</p>
        <ul className="list-disc pl-5">
          <li>Project scope</li>
          <li>Development milestones</li>
          <li>Payment schedule</li>
          <li>Delivery timelines</li>
          <li>Revision limits</li>
          <li>Hosting requirements</li>
          <li>Maintenance and support</li>
          <li>Source-code ownership</li>
          <li>Third-party licenses</li>
          <li>Deployment responsibilities</li>
        </ul>
        <p>
          Such terms may be defined in a separate proposal, quotation,
          Statement of Work (SOW), or development agreement.
        </p>
        <p>
          In case of conflict, the specific written agreement for the
          project may take precedence over these general Terms.
        </p>
      </>
    ),
  },
  {
    heading: "15. Accounting, Tax & Business Information",
    body: (
      <>
        <p>
          Our Accounting Software and other financial features are provided
          as <strong>business management tools</strong>.
        </p>
        <p>The software may assist with:</p>
        <ul className="list-disc pl-5">
          <li>Invoicing</li>
          <li>Expenses</li>
          <li>Sales</li>
          <li>Purchases</li>
          <li>Tax-related records</li>
          <li>Financial reports</li>
          <li>Business analytics</li>
        </ul>
        <p>
          However, the software does not constitute professional
          accounting, tax, legal, or financial advice.
        </p>
        <p>
          You are responsible for verifying financial records and ensuring
          compliance with applicable tax and accounting requirements.
        </p>
      </>
    ),
  },
  {
    heading: "16. POS, Hotel & Salon Transactions",
    body: (
      <>
        <p>Our software may facilitate operational activities such as:</p>
        <ul className="list-disc pl-5">
          <li>Billing</li>
          <li>Orders</li>
          <li>Payments</li>
          <li>Reservations</li>
          <li>Appointments</li>
          <li>Inventory</li>
          <li>Customer management</li>
        </ul>
        <p>
          The customer remains responsible for verifying transaction
          information, prices, taxes, discounts, refunds, bookings, and
          other business records before completing or relying on them.
        </p>
      </>
    ),
  },
  {
    heading: "17. Data Backup",
    body: (
      <>
        <p>
          We may maintain backups as part of our infrastructure and service
          operations.
        </p>
        <p>
          However, customers should not rely solely on our backup systems
          for critical business records unless specifically agreed under a
          service agreement.
        </p>
        <p>
          Backup frequency, retention, and restoration capabilities may
          vary depending on the service or subscription plan.
        </p>
      </>
    ),
  },
  {
    heading: "18. Suspension & Termination",
    body: (
      <>
        <p>We may suspend or terminate access to our services if:</p>
        <ul className="list-disc pl-5">
          <li>Payments remain unpaid.</li>
          <li>These Terms are violated.</li>
          <li>The account is involved in fraudulent or unlawful activity.</li>
          <li>The service is being abused.</li>
          <li>The account presents a security risk.</li>
          <li>Required by law.</li>
        </ul>
        <p>Where reasonably possible, we may provide notice before suspension or termination.</p>
      </>
    ),
  },
  {
    heading: "19. Cancellation",
    body: (
      <>
        <p>
          Customers may cancel their subscription according to the
          applicable cancellation terms and selected plan.
        </p>
        <p>
          Cancellation procedures, notice requirements, refund eligibility,
          and access after cancellation may vary depending on the
          subscription or agreement.
        </p>
        <p>
          For details, please refer to our{" "}
          <strong>Refund & Cancellation Policy</strong>.
        </p>
      </>
    ),
  },
  {
    heading: "20. Disclaimer",
    body: (
      <>
        <p>
          Our services are provided on an <strong>"as available" and "as
          is"</strong> basis to the extent permitted by applicable law.
        </p>
        <p>
          While we make reasonable efforts to ensure that our software is
          accurate, secure, and reliable, we do not guarantee that:
        </p>
        <ul className="list-disc pl-5">
          <li>The software will always be error-free.</li>
          <li>The service will always be uninterrupted.</li>
          <li>Every feature will meet every individual business requirement.</li>
          <li>Third-party integrations will always remain available.</li>
          <li>Software-generated reports or calculations will be free from errors.</li>
        </ul>
        <p>
          Customers should verify important business, financial, tax,
          payroll, booking, and transaction information before relying upon
          it.
        </p>
      </>
    ),
  },
  {
    heading: "21. Limitation of Liability",
    body: (
      <>
        <p>
          To the maximum extent permitted by applicable law,{" "}
          <strong>Designs Clue</strong> will not be liable for indirect,
          incidental, special, consequential, or business losses arising
          from the use or inability to use our services.
        </p>
        <p>This may include losses related to:</p>
        <ul className="list-disc pl-5">
          <li>Business interruption</li>
          <li>Loss of revenue</li>
          <li>Loss of profits</li>
          <li>Loss of opportunities</li>
          <li>Data loss</li>
          <li>Third-party service failures</li>
        </ul>
        <p>
          Nothing in these Terms is intended to exclude liability that
          cannot legally be excluded under applicable law.
        </p>
      </>
    ),
  },
  {
    heading: "22. Indemnification",
    body: (
      <>
        <p>
          You agree to indemnify and hold <strong>Designs Clue</strong>{" "}
          harmless from claims, losses, damages, liabilities, and expenses
          arising from:
        </p>
        <ul className="list-disc pl-5">
          <li>Your misuse of the services.</li>
          <li>Your violation of these Terms.</li>
          <li>Your violation of applicable laws.</li>
          <li>Your violation of third-party rights.</li>
          <li>Unauthorized use of your account.</li>
          <li>Data or content submitted by you that infringes another party's rights.</li>
        </ul>
      </>
    ),
  },
  {
    heading: "23. Confidentiality",
    body: (
      <>
        <p>
          Both parties may receive confidential information while working
          together.
        </p>
        <p>
          Each party agrees to take reasonable measures to protect
          confidential information and not disclose it to unauthorized
          parties, except where disclosure is required by law or necessary
          to provide the services.
        </p>
        <p>
          Additional confidentiality obligations may be included in a
          separate agreement where required.
        </p>
      </>
    ),
  },
  {
    heading: "24. Changes to These Terms",
    body: (
      <>
        <p>We may update these Terms from time to time.</p>
        <p>
          When changes are made, we will update the{" "}
          <strong>"Last Updated"</strong> date at the top of this page.
        </p>
        <p>
          Your continued use of our services after the updated Terms become
          effective constitutes acceptance of the revised Terms, subject to
          applicable law.
        </p>
      </>
    ),
  },
  {
    heading: "25. Contact Us",
    body: (
      <>
        <p>
          If you have questions regarding these Terms & Conditions, please
          contact us:
        </p>
        <p>
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
        <p>Subject: Terms & Conditions Inquiry</p>
      </>
    ),
  },
];

export default function TermsAndConditions() {
  return (
    <PolicyLayout
      badge="Terms & Conditions"
      title="The rules of the road."
      subtitle="Please read these terms carefully before using our services."
      updated="3 Sep 2026"
      intro={intro}
      sections={sections}
    />
  );
}
