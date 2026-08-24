const logos = ["Chatime", "Pizza Ranch", "Mandy's", "Andy's", "Jamba"];

export default function LogoStrip() {
  return (
    <section className="px-4 py-10">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-14 gap-y-6">
        {logos.map((name) => (
          <span
            key={name}
            className="text-xl font-bold text-ink-900/40 grayscale"
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
