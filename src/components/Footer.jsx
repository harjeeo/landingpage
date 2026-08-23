import {
  ChartLineData01Icon,
  Facebook02Icon,
  TwitterIcon,
  Linkedin01Icon,
  InstagramIcon,
  YoutubeIcon,
} from "hugeicons-react";

const columns = [
  {
    title: "Menu",
    links: ["Features", "About Us", "Pricing", "Blog", "Contact"],
  },
  {
    title: "Other",
    links: ["Style guide", "404 Page", "Password protected", "Licenses", "Changelog"],
  },
];

const socials = [Facebook02Icon, TwitterIcon, Linkedin01Icon, InstagramIcon, YoutubeIcon];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-brand-500 to-brand-700 pt-16 pb-8 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-10 border-b border-white/15 pb-12 sm:flex-row">
          <div className="max-w-xs">
            <a href="#" className="flex items-center gap-2 text-lg font-semibold">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-brand-600">
                <ChartLineData01Icon size={18} />
              </span>
              Alterx
            </a>
            <p className="mt-4 text-sm text-white/70">
              An AI-powered CRM platform designed to help businesses manage
              leads, automate workflows, and close deals faster.
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map((Icon, i) => (
                <span
                  key={i}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
                >
                  <Icon size={16} />
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-16">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="mb-4 text-sm font-semibold">{col.title}</p>
                <ul className="flex flex-col gap-3 text-sm text-white/70">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="transition hover:text-white">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-6 text-xs text-white/60 sm:flex-row">
          <p>Design by ZLM Studio</p>
          <p>Copyright &copy;Alterx. All Rights Reserved</p>
          <p>Powered by WebZlox</p>
        </div>
      </div>
    </footer>
  );
}
