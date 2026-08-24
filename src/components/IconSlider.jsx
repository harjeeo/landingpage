import { useState } from "react";
import {
  Calendar03Icon,
  Clock01Icon,
  Wallet01Icon,
  Message01Icon,
  Task01Icon,
  ChartBarLineIcon,
  ArrowLeft02Icon,
  ArrowRight02Icon,
} from "hugeicons-react";

const items = [
  { icon: Calendar03Icon, label: "Scheduling" },
  { icon: Clock01Icon, label: "Time Clocking" },
  { icon: Wallet01Icon, label: "Payroll" },
  { icon: Message01Icon, label: "Messaging" },
  { icon: Task01Icon, label: "Tasks" },
  { icon: ChartBarLineIcon, label: "Reporting" },
];

const PER_VIEW = 2;

export default function IconSlider() {
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(items.length / PER_VIEW);

  const goPrev = () => setPage((p) => (p - 1 + pageCount) % pageCount);
  const goNext = () => setPage((p) => (p + 1) % pageCount);

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(-${page * 100}%)` }}
          >
            {Array.from({ length: pageCount }).map((_, pageIndex) => (
              <div
                key={pageIndex}
                className="grid w-full shrink-0 grid-cols-2 gap-6"
              >
                {items
                  .slice(pageIndex * PER_VIEW, pageIndex * PER_VIEW + PER_VIEW)
                  .map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-3 bg-ink-900/5 px-6 py-10"
                      style={{ borderRadius: "20px" }}
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-600">
                        <Icon size={22} strokeWidth={2} />
                      </span>
                      <span className="text-lg font-semibold text-ink-900">
                        {label}
                      </span>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={goPrev}
            aria-label="Previous"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/10 text-ink-900 hover:bg-ink-900/5"
          >
            <ArrowLeft02Icon size={18} strokeWidth={2} />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 w-2 rounded-full ${
                  i === page ? "bg-brand-600" : "bg-ink-900/15"
                }`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            aria-label="Next"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/10 text-ink-900 hover:bg-ink-900/5"
          >
            <ArrowRight02Icon size={18} strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
