import { Cancel01Icon, Tick02Icon } from "hugeicons-react";

const oldWay = [
  "Shift and team information scattered",
  "More manual follow-up",
  "Slower, reactionary decisions",
];

const withUs = [
  "Everything you need in one place",
  "Fewer gaps between tasks",
  "Faster, more confident decisions",
];

export default function WhyConnected() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-ink-900 md:text-5xl">
          Why connected work wins
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-ink-700">
          When your team works from one place, it's easier to stay
          organized, act faster, and keep shifts running smoothly.
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
              Disconnected tools, less clarity
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
              With 7shifts
            </p>
            <h3 className="mt-1 text-2xl font-extrabold tracking-tight text-white">
              Connected system, clearer next steps
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
          Get my free trial
        </a>
      </div>
    </section>
  );
}
