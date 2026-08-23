import { useState } from "react";
import { Menu01Icon, Cancel01Icon } from "hugeicons-react";

const links = [
  { label: "Apps", href: "#apps" },
  { label: "Industries", href: "#industries" },
  { label: "Pricing", href: "#pricing" },
  { label: "Help", href: "#help" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur px-4 py-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-ink-900/5 bg-white px-6 py-3 shadow-[0_2px_20px_rgba(11,13,23,0.06)]">
        <a href="#" className="text-xl font-extrabold text-ink-900">
          7shifts
        </a>

        <ul className="hidden md:flex items-center gap-8 text-[15px] font-medium text-ink-900">
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="hover:text-brand-600">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#login"
            className="rounded-full px-5 py-2.5 text-[15px] font-semibold text-ink-900 hover:bg-ink-900/5"
          >
            Login
          </a>
          <a
            href="#signup"
            className="rounded-full bg-brand-600 px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-brand-700"
          >
            Signup
          </a>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          className="md:hidden"
        >
          {open ? <Cancel01Icon size={24} /> : <Menu01Icon size={24} />}
        </button>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-7xl rounded-3xl border border-ink-900/5 bg-white p-4 shadow-lg md:hidden">
          <ul className="flex flex-col gap-3 text-[15px] font-medium text-ink-900">
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            <a
              href="#login"
              className="rounded-full px-5 py-2.5 text-center text-[15px] font-semibold text-ink-900 hover:bg-ink-900/5"
            >
              Login
            </a>
            <a
              href="#signup"
              className="rounded-full bg-brand-600 px-5 py-2.5 text-center text-[15px] font-semibold text-white hover:bg-brand-700"
            >
              Signup
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
