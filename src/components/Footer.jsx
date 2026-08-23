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
    <footer>
      <div>
        <div>
          <div>
            <a href="#">
              <span>
                <ChartLineData01Icon size={18} />
              </span>
              Alterx
            </a>
            <p>
              An AI-powered CRM platform designed to help businesses manage
              leads, automate workflows, and close deals faster.
            </p>
            <div>
              {socials.map((Icon, i) => (
                <span
                  key={i}
                >
                  <Icon size={16} />
                </span>
              ))}
            </div>
          </div>

          <div>
            {columns.map((col) => (
              <div key={col.title}>
                <p>{col.title}</p>
                <ul>
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p>Design by ZLM Studio</p>
          <p>Copyright &copy;Alterx. All Rights Reserved</p>
          <p>Powered by WebZlox</p>
        </div>
      </div>
    </footer>
  );
}
