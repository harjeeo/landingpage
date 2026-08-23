import { SparklesIcon, ArrowRight02Icon, PlayIcon } from "hugeicons-react";
import DashboardMockup from "./DashboardMockup";

export default function Hero() {
  return (
    <section>
      <div />

      <div>
        <span>
          <SparklesIcon size={14} />
          Join 5000+ growing businesses
        </span>

        <h1>
          Smarter Solutions for
          <br /> Better Sales Outcomes
        </h1>

        <p>
          The smarter way to manage sales starts with using tools that
          streamline every step of the process.
        </p>

        <div>
          <a
            href="#pricing"
          >
            Get Started For Free
            <ArrowRight02Icon size={16} />
          </a>
          <a
            href="#"
          >
            <PlayIcon size={16} />
            Book A Free Demo
          </a>
        </div>
      </div>

      <div>
        <DashboardMockup />
      </div>
    </section>
  );
}
