import { SparklesIcon } from "hugeicons-react";

export default function PolicyLayout({ badge, title, subtitle, updated, intro, sections }) {
  return (
    <>
      <section className="px-4 pb-10 pt-16 md:pt-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-600">
            <SparklesIcon size={14} strokeWidth={2} />
            <span style={{ fontFamily: "var(--font-hand)", fontSize: "20px" }}>
              {badge}
            </span>
          </span>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink-900 md:text-5xl">
            {title}
          </h1>

          {subtitle && (
            <p className="mx-auto mt-4 max-w-lg text-ink-700">{subtitle}</p>
          )}

          {updated && (
            <p className="mt-3 text-xs font-bold uppercase tracking-wide text-ink-500">
              Last updated: {updated}
            </p>
          )}
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          {intro && (
            <div className="flex flex-col gap-3 text-sm leading-relaxed text-ink-700">
              {intro}
            </div>
          )}
          {sections.map(({ heading, body }) => (
            <div key={heading}>
              <h2 className="text-lg font-bold text-ink-900">{heading}</h2>
              <div className="mt-2 flex flex-col gap-3 text-sm leading-relaxed text-ink-700">
                {body}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
