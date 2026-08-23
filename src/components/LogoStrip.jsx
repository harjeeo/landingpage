const logos = ["Logobaze", "Primmark", "Logozen", "Graphicraft", "Aurdicons"];

export default function LogoStrip() {
  return (
    <section className="border-y border-ink-900/5 py-10">
      <div className="mx-auto max-w-5xl px-6">
        <p className="mb-6 text-center text-xs font-medium text-ink-400">
          Trusted by 5,000+ founders &amp; business owners
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-ink-400">
          {logos.map((name) => (
            <span key={name} className="text-base font-semibold tracking-tight opacity-70">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
