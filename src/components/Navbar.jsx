import { useState } from "react";
import { Menu01Icon, Cancel01Icon, ChartLineData01Icon } from "hugeicons-react";

const links = [
  { label: "Features", href: "#features" },
  { label: "About Us", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-30">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#" className="flex items-center gap-2 font-semibold text-ink-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white">
            <ChartLineData01Icon size={18} strokeWidth={2} />
          </span>
          Alterx
        </a>

        <ul className="hidden items-center gap-8 text-sm font-medium text-ink-700 md:flex">
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="transition hover:text-brand-600">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <a href="#" className="text-sm font-medium text-ink-700 transition hover:text-brand-600">
            Get CV
          </a>
          <a
            href="#"
            className="rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-500/30 transition hover:bg-brand-600"
          >
            Contact
          </a>
        </div>

        <button
          className="text-ink-900 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <Cancel01Icon size={24} /> : <Menu01Icon size={24} />}
        </button>
      </nav>

      {open && (
        <div className="mx-6 mb-4 rounded-2xl border border-ink-900/5 bg-white p-5 shadow-lg md:hidden">
          <ul className="flex flex-col gap-4 text-sm font-medium text-ink-700">
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#"
            className="mt-4 block rounded-full bg-brand-500 px-5 py-2.5 text-center text-sm font-semibold text-white"
          >
            Contact
          </a>
        </div>
      )}
    </header>
  );
}
