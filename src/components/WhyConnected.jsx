import { Cancel01Icon, Tick02Icon } from "hugeicons-react";

const oldWay = [
  "Data scattered across different systems",
  "More manual work and follow-ups",
  "Difficult to track business performance",
];

const withUs = [
  "Everything your business needs in one place",
  "Streamlined operations with less manual work",
  "Faster decisions with real-time business insights",
];

export default function WhyConnected() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-ink-900 md:text-5xl">
          Why smarter business management wins
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-ink-700">
          When your operations, people, finances, and customers work from one
          platform, it's easier to stay organized, save time, and grow your
          business.
        </p>

        <div className="mt-10 grid gap-6 text-left md:grid-cols-2">
          <div className="bg-ink-900/5 p-8" style={{ borderRadius: "20px" }}>
            <p
              className="text-2xl text-ink-900"
              style={{ fontFamily: "var(--font-hand)" }}
            >
              The old way
            </p>
            <h3 className="mt-1 text-2xl font-extrabold tracking-tight text-ink-900">
              Disconnected tools, more work
            </h3>

            <ul className="mt-8 flex flex-col gap-4">
              {oldWay.map((item) => (
                <li key={item} className="flex items-center gap-3 text-ink-900">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink-900 text-white">
                    <Cancel01Icon size={14} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-ink-900 p-8" style={{ borderRadius: "20px" }}>
            <p
              className="text-2xl text-white"
              style={{ fontFamily: "var(--font-hand)" }}
            >
              With Our Platform
            </p>
            <h3 className="mt-1 text-2xl font-extrabold tracking-tight text-white">
              One connected system, complete control
            </h3>

            <ul className="mt-8 flex flex-col gap-4">
              {withUs.map((item) => (
                <li key={item} className="flex items-center gap-3 text-white">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-ink-900">
                    <Tick02Icon size={14} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <a
          href="#get-started"
          className="mt-10 inline-flex items-center rounded-full bg-brand-600 px-6 py-3 text-base font-semibold text-white hover:bg-brand-700"
        >
          Start for Free - No Subscription
        </a>
      </div>
    </section>
  );
}
