import { Link } from "react-router-dom";
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
          <Link
            to="/signup"
          >
            Get Started For Free
            <ArrowRight02Icon size={16} />
          </Link>
          <Link
            to="/contact"
          >
            <PlayIcon size={16} />
            Book A Free Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
