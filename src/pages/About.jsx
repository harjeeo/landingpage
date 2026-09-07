import {
  SparklesIcon,
  Location01Icon,
  Store01Icon,
  CloudIcon,
  FlashIcon,
  CompassIcon,
  Shield01Icon,
} from "hugeicons-react";

const storyStats = [
  { icon: Location01Icon, label: "Built In", value: "Ludhiana, Punjab, India" },
  {
    icon: Store01Icon,
    label: "Built For",
    value: "Restaurants, hotels, salons & businesses",
  },
  {
    icon: CloudIcon,
    label: "Powered By",
    value: "Smart software, automation & cloud technology",
  },
];

const principles = [
  {
    icon: FlashIcon,
    title: "Built for simplicity",
    subtitle: "Powerful tools without unnecessary complexity.",
    desc: "We design every feature to be easy to understand, quick to use, and practical for real businesses.",
  },
  {
    icon: CompassIcon,
    title: "Smarter operations",
    subtitle: "Less manual work, more productivity.",
    desc: "From billing and accounting to HR and daily operations, we help businesses automate tasks and work more efficiently.",
  },
  {
    icon: Shield01Icon,
    title: "Security & reliability",
    subtitle: "Your business data deserves protection.",
    desc: "We focus on secure systems, reliable cloud infrastructure, and dependable software you can count on every day.",
  },
];

const numbers = [
  { value: "270+", label: "Active Businesses" },
  { value: "24/7", label: "Cloud Access" },
  { value: "15 min", label: "Average Setup Time" },
  { value: "99.9%", label: "Platform Uptime" },
];

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8 bg-ink-900/20" />
      <span
        className="text-lg text-ink-700"
        style={{ fontFamily: "var(--font-hand)" }}
      >
        {children}
      </span>
    </div>
  );
}

export default function About() {
  return (
    <>
      <section className="px-4 pb-10 pt-16 md:pt-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-600">
            <SparklesIcon size={14} strokeWidth={2} />
            <span style={{ fontFamily: "var(--font-hand)", fontSize: "20px" }}>
              About Ojar
            </span>
          </span>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink-900 md:text-5xl">
            Built for people who run businesses.
            <br />
            <span className="italic text-brand-600">Not the other way around.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-ink-700">
            We started Ojar to make business management simpler, faster, and unified.
          </p>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
          <div>
            <SectionLabel>Our Story</SectionLabel>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink-900 md:text-4xl">
              Software built to simplify the way businesses work.
            </h2>

            <p className="mt-6 text-ink-700">
              We started with a simple idea — businesses shouldn’t have to
              manage their operations across multiple disconnected tools. From
              billing and accounting to employees, customers, and daily
              operations, everything should work together in one place.
            </p>
            <p className="mt-4 text-ink-700">
              So we built a powerful suite of business management solutions
              designed for restaurants, hotels, salons, and growing businesses —
              helping teams save time, stay organized, and make smarter
              decisions.
            </p>
            <p className="mt-4 text-ink-700">
              Today, our goal remains simple: make business management easier,
              smarter, and more efficient.
            </p>
          </div>

          <div
            className="border border-ink-900/5 bg-ink-900/[0.02] p-6"
            style={{ borderRadius: "20px" }}
          >
            <div
              className="mb-6 aspect-video w-full bg-ink-900/5"
              style={{ borderRadius: "16px" }}
            />
            <div className="flex flex-col gap-3">
              {storyStats.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 border border-ink-900/5 bg-white p-4"
                  style={{ borderRadius: "16px" }}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    <Icon size={18} strokeWidth={2} />
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-wide text-ink-500">
                      {label}
                    </span>
                    <span className="block text-sm font-semibold text-ink-900">
                      {value}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <SectionLabel>What We Believe</SectionLabel>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 md:text-4xl">
            Three principles that guide everything we build.
          </h2>
          <p className="mt-3 max-w-2xl text-ink-700">
            We believe great business software should be simple to use, powerful
            enough to scale, and reliable enough for everyday operations.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {principles.map(({ icon: Icon, title, subtitle, desc }) => (
              <div
                key={title}
                className="border border-ink-900/5 bg-white p-6"
                style={{ borderRadius: "20px" }}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon size={20} strokeWidth={2} />
                </span>
                <h3 className="mt-4 text-lg font-bold text-ink-900">{title}</h3>
                {subtitle && (
                  <p className="mt-1 text-sm font-semibold text-ink-700">
                    {subtitle}
                  </p>
                )}
                <p className="mt-2 text-sm text-ink-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 pt-16">
        <div className="mx-auto max-w-5xl">
          <SectionLabel>By The Numbers</SectionLabel>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 md:text-4xl">
            Built with purpose. Real value for everyday businesses.
          </h2>

          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
            {numbers.map(({ value, label }) => (
              <div
                key={label}
                className="border border-ink-900/5 bg-ink-900/[0.02] p-6"
                style={{ borderRadius: "20px" }}
              >
                <p className="text-3xl font-extrabold tracking-tight text-ink-900">
                  {value}
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-ink-500">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
