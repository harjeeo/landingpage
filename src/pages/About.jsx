import {
  SparklesIcon,
  Location01Icon,
  ChefHatIcon,
  UserGroupIcon,
  FlashIcon,
  CompassIcon,
  Shield01Icon,
} from "hugeicons-react";

const storyStats = [
  { icon: Location01Icon, label: "Built In", value: "Toronto, Canada" },
  { icon: ChefHatIcon, label: "Tested In", value: "500+ restaurants, every shift" },
  { icon: UserGroupIcon, label: "Trusted By", value: "Restaurants, bars, cafes" },
];

const principles = [
  {
    icon: FlashIcon,
    title: "Built for the rush",
    desc: "Every interaction is measured against a Friday dinner rush. A schedule publishes in seconds. A shift swap gets approved before the next order fires. If a screen makes a manager wait, we cut it.",
  },
  {
    icon: CompassIcon,
    title: "Clarity over cleverness",
    desc: "Restaurant staff change often. Servers, cooks, hosts. Anyone opening the app for the first time should be productive within a minute. We resist the urge to add a setting where a sensible default works.",
  },
  {
    icon: Shield01Icon,
    title: "Reliability is the feature",
    desc: "The schedule needs to post on time. The clock-in needs to work service after service. We design the system for the reality of a restaurant floor, not for a demo.",
  },
];

const numbers = [
  { value: "500+", label: "Active Restaurants" },
  { value: "2M+", label: "Shifts Scheduled" },
  { value: "30 min", label: "Average Setup Time" },
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
              About 7shifts
            </span>
          </span>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink-900 md:text-5xl">
            Built for people who run restaurants.
            <br />
            <span className="italic text-brand-600">Not the other way around.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-ink-700">
            We started 7shifts because scheduling software wasn't built by
            people who'd actually worked a shift.
          </p>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
          <div>
            <SectionLabel>Our Story</SectionLabel>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink-900 md:text-4xl">
              Restaurant software built by people who've worked a shift.
            </h2>

            <p className="mt-6 text-ink-700">
              7shifts started with a shift schedule taped to a kitchen wall.
              The software available to restaurant operators was either a
              clunky enterprise HR suite or a spreadsheet nobody trusted.
            </p>
            <p className="mt-4 text-ink-700">
              So we built what we wished existed: a scheduling and team
              management platform that works from your phone, survives a
              no-call-no-show, and feels obvious to a server working their
              first shift. Thousands of restaurants later, it still has to
              pass the same test: would a new manager be able to build next
              week's schedule in ten minutes?
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
            Three principles, not twelve.
          </h2>
          <p className="mt-3 max-w-xl text-ink-700">
            Most software companies have a wall of values. We stuck with the
            three that actually decide whether we ship a feature.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {principles.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="border border-ink-900/5 bg-white p-6"
                style={{ borderRadius: "20px" }}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon size={20} strokeWidth={2} />
                </span>
                <h3 className="mt-4 text-lg font-bold text-ink-900">{title}</h3>
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
            Numbers we can actually show you.
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
