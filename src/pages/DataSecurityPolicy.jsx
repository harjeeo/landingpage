import PolicyLayout from "../components/PolicyLayout";

const intro = (
  <p>
    At <strong>Designs Clue</strong>, we take the security of our
    customers' personal and business data seriously. This policy explains
    the basic security measures we use to protect information stored and
    processed through our website and software.
  </p>
);

const sections = [
  {
    heading: "1. Data Protection",
    body: (
      <p>
        We take reasonable technical and organizational measures to
        protect customer data against unauthorized access, loss, misuse,
        alteration, or disclosure.
      </p>
    ),
  },
  {
    heading: "2. Secure Access",
    body: (
      <>
        <p>Our software may use:</p>
        <ul className="list-disc pl-5">
          <li>Secure login and authentication</li>
          <li>Role-based access controls</li>
          <li>User permissions</li>
          <li>Password protection</li>
          <li>Session management</li>
        </ul>
        <p>
          Customers are responsible for maintaining the confidentiality of
          their login credentials.
        </p>
      </>
    ),
  },
  {
    heading: "3. Data Transmission",
    body: (
      <p>
        Where applicable, data transmitted between users and our services
        is protected using industry-standard secure communication
        technologies such as <strong>HTTPS/SSL encryption</strong>.
      </p>
    ),
  },
  {
    heading: "4. Data Storage & Backup",
    body: (
      <>
        <p>
          Customer data may be stored on secure cloud infrastructure. We
          may maintain regular backups to help protect against accidental
          data loss and service interruptions.
        </p>
        <p>
          Backup availability and retention may vary depending on the
          service or subscription plan.
        </p>
      </>
    ),
  },
  {
    heading: "5. Monitoring & Security",
    body: (
      <p>
        We may use monitoring, logging, access controls, and security
        updates to identify and prevent unauthorized activity and
        potential security threats.
      </p>
    ),
  },
  {
    heading: "6. Third-Party Services",
    body: (
      <p>
        We may use trusted third-party providers for hosting, payments,
        analytics, communication, and other infrastructure services. Such
        providers may process data as necessary to provide their
        services.
      </p>
    ),
  },
  {
    heading: "7. Security Incidents",
    body: (
      <p>
        If we become aware of a security incident affecting customer
        information, we will take reasonable steps to investigate,
        contain, and address the incident and provide notifications where
        required by applicable law.
      </p>
    ),
  },
  {
    heading: "8. Customer Responsibility",
    body: (
      <p>
        Customers should use strong passwords, assign appropriate user
        permissions, and immediately report any suspected unauthorized
        access or security issue to us.
      </p>
    ),
  },
  {
    heading: "9. Contact Us",
    body: (
      <>
        <p>
          For security-related questions or to report a potential
          security issue:
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
        <p>
          We may update this Data Security Policy from time to time to
          reflect changes in our services, technology, or security
          practices.
        </p>
      </>
    ),
  },
];

export default function DataSecurityPolicy() {
  return (
    <PolicyLayout
      badge="Data Security"
      title="Security you can trust."
      subtitle="This page explains how we protect your data."
      updated="3 Sep 2026"
      intro={intro}
      sections={sections}
    />
  );
}
