import { Rocket01Icon, ArrowRight02Icon, PlayIcon } from "hugeicons-react";

export default function Cta() {
  return (
    <section>
      <div />
      <div>
        <span>
          <Rocket01Icon size={14} />
          Free trial
        </span>
        <h2>
          Get up and running in just a few minutes
        </h2>
        <p>
          Integrating with our API is quick and easy. Explore our
          documentation, use our SDKs and libraries, and start developing in
          just 5 minutes.
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
    </section>
  );
}
