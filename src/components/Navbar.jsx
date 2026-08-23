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
    <header>
      <nav>
        <a href="#">
          <span>
            <ChartLineData01Icon size={18} strokeWidth={2} />
          </span>
          Alterx
        </a>

        <ul>
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div>
          <a href="#">
            Get CV
          </a>
          <a
            href="#"
          >
            Contact
          </a>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <Cancel01Icon size={24} /> : <Menu01Icon size={24} />}
        </button>
      </nav>

      {open && (
        <div>
          <ul>
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
          >
            Contact
          </a>
        </div>
      )}
    </header>
  );
}
