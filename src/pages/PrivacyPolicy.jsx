import PolicyLayout from "../components/PolicyLayout";

const intro = (
  <>
    <p>
      At <strong>Designs Clue</strong>, we respect your privacy and are
      committed to protecting your personal information and business data.
      This Privacy Policy explains how we collect, use, store, protect, and
      process information when you visit our website or use our software,
      applications, and services.
    </p>
    <p>
      Our products include <strong>Cafe/Restaurant POS, Accounting Software,
      HR Management System, Hotel Management System, and Salon Management
      Software</strong>.
    </p>
    <p>
      By accessing or using our website or services, you acknowledge that
      you have read and understood this Privacy Policy.
    </p>
  </>
);

const sections = [
  {
    heading: "1. Information We Collect",
    body: (
      <>
        <p>
          We may collect information that you provide directly to us when
          you register, contact us, request a demo, purchase a
          subscription, or use our software.
        </p>
        <p className="font-semibold text-ink-900">Personal Information</p>
        <p>This may include:</p>
        <ul className="list-disc pl-5">
          <li>Full name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Company/business name</li>
          <li>Job title or designation</li>
          <li>Business address</li>
          <li>Billing information</li>
          <li>Login credentials</li>
          <li>Account information</li>
          <li>Information provided through contact or support requests</li>
        </ul>
        <p className="font-semibold text-ink-900">Business & Operational Data</p>
        <p>
          Depending on the software you use, you or your organization may
          enter information such as:
        </p>
        <ul className="list-disc pl-5">
          <li>Customer information</li>
          <li>Employee information</li>
          <li>Sales and purchase records</li>
          <li>Invoices and billing records</li>
          <li>Inventory and stock information</li>
          <li>Vendor information</li>
          <li>Restaurant orders and transactions</li>
          <li>Hotel booking and guest information</li>
          <li>Salon appointments and customer information</li>
          <li>Payroll and attendance information</li>
          <li>Other business or operational information</li>
        </ul>
        <p>
          The type of information collected depends on the product and
          features used by your organization.
        </p>
      </>
    ),
  },
  {
    heading: "2. Information Collected Automatically",
    body: (
      <>
        <p>
          When you access our website or software, certain technical
          information may be collected automatically, including:
        </p>
        <ul className="list-disc pl-5">
          <li>IP address</li>
          <li>Browser type</li>
          <li>Device type</li>
          <li>Operating system</li>
          <li>Date and time of access</li>
          <li>Pages or features accessed</li>
          <li>Login and usage activity</li>
          <li>Error logs</li>
          <li>Device and connection information</li>
        </ul>
        <p>
          This information helps us maintain security, improve performance,
          troubleshoot issues, and understand how our services are used.
        </p>
      </>
    ),
  },
  {
    heading: "3. How We Use Your Information",
    body: (
      <>
        <p>We may use collected information to:</p>
        <ul className="list-disc pl-5">
          <li>Provide and operate our software and services</li>
          <li>Create and manage user accounts</li>
          <li>Process subscriptions and payments</li>
          <li>Provide customer support</li>
          <li>Respond to inquiries and requests</li>
          <li>Maintain and improve our software</li>
          <li>Develop new features and services</li>
          <li>Personalize your experience</li>
          <li>Send important service-related notifications</li>
          <li>Detect and prevent fraud, abuse, or unauthorized access</li>
          <li>Maintain system security</li>
          <li>Analyze service performance</li>
          <li>Comply with applicable laws and legal requirements</li>
        </ul>
        <p>
          We do not use customer business data for unrelated purposes
          without appropriate authorization.
        </p>
      </>
    ),
  },
  {
    heading: "4. Customer Business Data",
    body: (
      <>
        <p>
          Our software allows businesses to store and manage operational
          information.
        </p>
        <p>For example:</p>
        <ul className="list-disc pl-5">
          <li>A restaurant may store orders, billing, inventory, and customer information.</li>
          <li>An accounting customer may store invoices, expenses, and financial records.</li>
          <li>An HR customer may store employee, attendance, and payroll information.</li>
          <li>A hotel may store guest and booking information.</li>
          <li>A salon may store appointments and customer records.</li>
        </ul>
        <p>
          The customer or organization using our software generally
          determines what information is entered into the system and how
          that information is used.
        </p>
        <p>
          We process such information primarily to provide, maintain,
          secure, and support the services requested by the customer.
        </p>
      </>
    ),
  },
  {
    heading: "5. Payment Information",
    body: (
      <>
        <p>
          If you purchase our services, payments may be processed through
          third-party payment providers.
        </p>
        <p>We may receive information such as:</p>
        <ul className="list-disc pl-5">
          <li>Transaction ID</li>
          <li>Payment status</li>
          <li>Amount paid</li>
          <li>Payment date</li>
          <li>Subscription or plan details</li>
        </ul>
        <p>
          We do not intend to store complete credit/debit card numbers or
          banking credentials on our own systems unless specifically
          stated.
        </p>
        <p>
          Payment information may be processed directly by the relevant
          payment provider according to its own privacy policy and
          security practices.
        </p>
      </>
    ),
  },
  {
    heading: "6. Cookies & Tracking Technologies",
    body: (
      <>
        <p>Our website may use cookies and similar technologies to:</p>
        <ul className="list-disc pl-5">
          <li>Keep the website functioning properly</li>
          <li>Remember preferences</li>
          <li>Improve website performance</li>
          <li>Understand website traffic</li>
          <li>Analyze website usage</li>
          <li>Improve our marketing and services</li>
        </ul>
        <p>
          You can manage or disable cookies through your browser settings.
          However, disabling certain cookies may affect some website
          functionality.
        </p>
      </>
    ),
  },
  {
    heading: "7. How We Share Information",
    body: (
      <>
        <p>
          We do <strong>not sell or rent your personal information or
          business data</strong>.
        </p>
        <p>
          We may share information with trusted service providers when
          necessary to operate our business and provide our services,
          including:
        </p>
        <ul className="list-disc pl-5">
          <li>Cloud hosting providers</li>
          <li>Payment processors</li>
          <li>Email and communication providers</li>
          <li>Analytics providers</li>
          <li>Customer support platforms</li>
          <li>Security and infrastructure providers</li>
          <li>Professional advisors</li>
        </ul>
        <p>
          We may also disclose information where required by law, legal
          process, government request, or to protect our rights, users,
          services, or property.
        </p>
      </>
    ),
  },
  {
    heading: "8. Data Security",
    body: (
      <>
        <p>
          We take reasonable technical and organizational measures to
          protect your information against unauthorized access, loss,
          misuse, alteration, or disclosure.
        </p>
        <p>
          Depending on the service and infrastructure, security measures
          may include:
        </p>
        <ul className="list-disc pl-5">
          <li>Secure login and authentication</li>
          <li>Role-based access control</li>
          <li>Access permissions</li>
          <li>Secure data transmission</li>
          <li>Server and infrastructure security</li>
          <li>Regular backups</li>
          <li>Monitoring and logging</li>
          <li>Security updates and maintenance</li>
        </ul>
        <p>
          However, no online system or method of data transmission can be
          guaranteed to be completely secure.
        </p>
      </>
    ),
  },
  {
    heading: "9. User Access & Account Security",
    body: (
      <>
        <p>
          Our software may provide role-based access that allows
          administrators to control what different users can access.
        </p>
        <p>Customers are responsible for:</p>
        <ul className="list-disc pl-5">
          <li>Keeping login credentials confidential</li>
          <li>Creating appropriate user permissions</li>
          <li>Removing access for former employees/users</li>
          <li>Using strong passwords</li>
          <li>Informing us about suspected unauthorized access</li>
        </ul>
        <p>
          You should contact us immediately if you believe your account or
          credentials have been compromised.
        </p>
      </>
    ),
  },
  {
    heading: "10. Data Retention",
    body: (
      <>
        <p>We retain information for as long as reasonably necessary to:</p>
        <ul className="list-disc pl-5">
          <li>Provide our services</li>
          <li>Maintain your account</li>
          <li>Fulfill contractual obligations</li>
          <li>Provide customer support</li>
          <li>Maintain business and transaction records</li>
          <li>Resolve disputes</li>
          <li>Comply with applicable legal requirements</li>
          <li>Protect our legitimate business interests</li>
        </ul>
        <p>
          When information is no longer required, we may delete,
          anonymize, or securely dispose of it, subject to applicable
          legal and contractual obligations.
        </p>
      </>
    ),
  },
  {
    heading: "11. Third-Party Services & Links",
    body: (
      <>
        <p>
          Our website or software may contain links or integrations to
          third-party websites, applications, payment gateways, or
          services.
        </p>
        <p>
          We are not responsible for the privacy practices, security, or
          content of third-party services.
        </p>
        <p>
          We recommend reviewing the privacy policies of third-party
          services before providing them with personal information.
        </p>
      </>
    ),
  },
  {
    heading: "12. Marketing Communications",
    body: (
      <>
        <p>We may send you service-related communications such as:</p>
        <ul className="list-disc pl-5">
          <li>Product updates</li>
          <li>Feature announcements</li>
          <li>Important account notifications</li>
          <li>Service updates</li>
          <li>Promotional offers</li>
          <li>Newsletters</li>
        </ul>
        <p>
          You may unsubscribe from promotional communications at any time
          by following the unsubscribe instructions included in the
          communication or by contacting us.
        </p>
        <p>
          You may continue to receive essential communications related to
          your account or services.
        </p>
      </>
    ),
  },
  {
    heading: "13. Your Privacy Rights",
    body: (
      <>
        <p>
          Depending on applicable law, you may have rights regarding your
          personal information, including the right to:
        </p>
        <ul className="list-disc pl-5">
          <li>Request access to your personal information</li>
          <li>Request correction of inaccurate information</li>
          <li>Request deletion where legally permitted</li>
          <li>Withdraw consent where applicable</li>
          <li>Ask about how your information is processed</li>
          <li>Raise a privacy-related concern or complaint</li>
        </ul>
        <p>
          To exercise these rights, you may contact us using the details
          provided below.
        </p>
        <p>
          For business data entered into our software by an organization,
          certain requests may need to be directed to the organization
          that controls that data.
        </p>
      </>
    ),
  },
  {
    heading: "14. Data Breach & Security Incidents",
    body: (
      <>
        <p>
          If we become aware of a security incident involving personal
          information, we will take reasonable steps to investigate,
          contain, and address the incident.
        </p>
        <p>
          Where notification is required under applicable law, we will
          provide appropriate notifications to affected parties or
          relevant authorities.
        </p>
      </>
    ),
  },
  {
    heading: "15. Children's Privacy",
    body: (
      <>
        <p>
          Our services are primarily intended for businesses,
          organizations, and their authorized users.
        </p>
        <p>
          Our services are not intentionally designed to collect personal
          information directly from children for independent use.
        </p>
        <p>
          If information relating to individuals under the applicable age
          is entered into our software by an organization, the
          organization using the service is responsible for ensuring that
          it has the appropriate authority and permissions to collect and
          process such information.
        </p>
      </>
    ),
  },
  {
    heading: "16. International Data Processing",
    body: (
      <>
        <p>
          Depending on our hosting providers, infrastructure, and
          third-party service providers, information may be stored or
          processed in locations outside your state or country.
        </p>
        <p>
          Where applicable, we will take reasonable steps to ensure that
          information is handled in accordance with applicable data
          protection requirements.
        </p>
      </>
    ),
  },
  {
    heading: "17. Changes to This Privacy Policy",
    body: (
      <>
        <p>We may update this Privacy Policy from time to time to reflect:</p>
        <ul className="list-disc pl-5">
          <li>Changes to our services</li>
          <li>New features or technologies</li>
          <li>Changes in our business practices</li>
          <li>Changes in applicable laws or regulations</li>
        </ul>
        <p>
          When we make changes, we will update the{" "}
          <strong>"Last Updated"</strong> date at the top of this page.
        </p>
        <p>We encourage you to periodically review this Privacy Policy.</p>
      </>
    ),
  },
  {
    heading: "18. Contact Us",
    body: (
      <>
        <p>
          If you have any questions, concerns, or requests regarding this
          Privacy Policy or the handling of your information, please
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
        <p>Subject: Privacy Policy / Data Protection Request</p>
      </>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <PolicyLayout
      badge="Privacy Policy"
      title="Your privacy, protected."
      subtitle="How we collect, use, and protect your information."
      updated="3 Sep 2026"
      intro={intro}
      sections={sections}
    />
  );
}
