import { Task01Icon, Location01Icon, Analytics01Icon } from "hugeicons-react";

const cards = [
  {
    title: "Task & Activity Tracking",
    desc: "Assign tasks, conduct meetings and track team activities.",
    icon: Task01Icon,
    preview: (
      <div className="rounded-xl bg-white p-3 shadow-sm">
        <div className="mb-2 flex items-center justify-between text-[11px] text-ink-500">
          <span>Meet Nic</span>
          <span className="font-semibold text-ink-900">$11,000</span>
        </div>
        <div className="mb-2 flex items-center gap-1.5 text-[10px] text-emerald-500">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Synced
        </div>
        <div className="flex gap-1.5">
          <span className="rounded-md bg-brand-50 px-2 py-1 text-[10px] text-brand-600">Quick Books</span>
        </div>
      </div>
    ),
  },
  {
    title: "Real-Time Visits",
    desc: "Generate detailed reports on sales performance, team productivity.",
    icon: Location01Icon,
    preview: (
      <div className="rounded-xl bg-white p-3 shadow-sm">
        <div className="mb-2 flex items-center justify-between text-[11px] text-ink-500">
          <span>Aiden</span>
          <span className="font-semibold text-ink-900">$11,000.00</span>
        </div>
        <div className="mb-2 h-1.5 w-full rounded-full bg-slate-100">
          <div className="h-1.5 w-2/3 rounded-full bg-ink-900" />
        </div>
        <div className="flex justify-between text-[10px] text-ink-400">
          <span>Task</span>
          <span>Timer</span>
        </div>
      </div>
    ),
  },
  {
    title: "Reporting & Analytics",
    desc: "Enable seamless communication and file sharing among team.",
    icon: Analytics01Icon,
    preview: (
      <div className="rounded-xl bg-white p-3 shadow-sm">
        <div className="mb-2 flex items-center justify-between text-[11px] text-ink-500">
          <span>Manage mc</span>
          <span className="font-semibold text-ink-900">$11,000.00</span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-ink-400">
          <span>Team calenders</span>
          <span className="h-4 w-8 rounded-full bg-brand-500" />
        </div>
        <div className="mt-1 text-[10px] text-ink-400">Frequency</div>
      </div>
    ),
  },
];

export default function WorkSmarter() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mx-auto mb-12 max-w-xl text-center">
        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600">
          ✦ Power Pack
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
          Work Smarter, Grow Faster
        </h2>
        <p className="mt-3 text-sm text-ink-500">
          Businesses choose Alterx because it simplifies the complexity of sales
          management.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {cards.map(({ title, desc, icon: Icon, preview }) => (
          <div
            key={title}
            className="rounded-2xl border border-ink-900/5 bg-slate-50/60 p-4"
          >
            <div className="mb-4 rounded-xl bg-slate-100/80 p-4">{preview}</div>
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-brand-500 shadow-sm">
                <Icon size={18} />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-ink-900">{title}</h3>
                <p className="mt-1 text-xs text-ink-500">{desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
