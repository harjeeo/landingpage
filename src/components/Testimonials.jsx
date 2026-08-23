import { StarIcon } from "hugeicons-react";

const testimonials = [
  {
    quote:
      "Alterx's user-centric approach and intuitive design make it the ideal tool for UX research and prototyping.",
    name: "Mark Deemer",
    role: "UX Designer",
  },
  {
    quote:
      "Alterx's seamless integration, extensive features, and intuitive interface make it indispensable for our team.",
    name: "Eric D.",
    role: "Process Optimizer",
  },
  {
    quote:
      "It has transformed our design process, fostering collaboration and innovation to exceptional results.",
    name: "Sarah Z.",
    role: "",
    featured: true,
  },
  {
    quote:
      "Alterx facilitates collaboration, creativity, and streamlines workflows, resulting in outstanding outcomes every time.",
    name: "Mark Marsh",
    role: "Growth Lead",
  },
  {
    quote:
      "Alterx's user-centric approach and intuitive design make it the ideal tool for UX research and prototyping.",
    name: "Bella J.",
    role: "Product Manager",
  },
];

function Stars() {
  return (
    <div className="mb-3 flex gap-0.5 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} size={14} fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="mx-auto mb-12 max-w-xl text-center">
        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600">
          ✦ Customer Reviews
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
          Why businesses choose Alterx
        </h2>
        <p className="mt-3 text-sm text-ink-500">
          Businesses choose Alterx because it simplifies the complexity of
          sales management.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className={`flex flex-col justify-between rounded-2xl border p-5 ${
              t.featured
                ? "border-brand-500 bg-brand-500 text-white"
                : "border-ink-900/5 bg-white"
            }`}
          >
            <div>
              <Stars />
              <p
                className={`text-xs leading-relaxed ${
                  t.featured ? "text-white" : "text-ink-700"
                }`}
              >
                {t.quote}
              </p>
            </div>
            <div className="mt-5 flex items-center gap-2">
              <span
                className={`h-8 w-8 rounded-full ${
                  t.featured ? "bg-white/30" : "bg-brand-100"
                }`}
              />
              <div>
                <p className="text-xs font-semibold">{t.name}</p>
                {t.role && (
                  <p
                    className={`text-[10px] ${
                      t.featured ? "text-white/70" : "text-ink-400"
                    }`}
                  >
                    {t.role}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
