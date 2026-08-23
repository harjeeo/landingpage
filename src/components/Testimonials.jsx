import { StarIcon } from "hugeicons-react";

const testimonials = [
  {
    quote:
      "Alterx's user-centric approach and intuitive design make it the ideal tool for UX research and prototyping.",
    name: "Mark Deemer",
    role: "UX Designer",
  },
  {
    quote:
      "Alterx's seamless integration, extensive features, and intuitive interface make it indispensable for our team.",
    name: "Eric D.",
    role: "Process Optimizer",
  },
  {
    quote:
      "It has transformed our design process, fostering collaboration and innovation to exceptional results.",
    name: "Sarah Z.",
    role: "",
    featured: true,
  },
  {
    quote:
      "Alterx facilitates collaboration, creativity, and streamlines workflows, resulting in outstanding outcomes every time.",
    name: "Mark Marsh",
    role: "Growth Lead",
  },
  {
    quote:
      "Alterx's user-centric approach and intuitive design make it the ideal tool for UX research and prototyping.",
    name: "Bella J.",
    role: "Product Manager",
  },
];

function Stars() {
  return (
    <div>
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} size={14} fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section>
      <div>
        <span>
          ✦ Customer Reviews
        </span>
        <h2>
          Why businesses choose Alterx
        </h2>
        <p>
          Businesses choose Alterx because it simplifies the complexity of
          sales management.
        </p>
      </div>

      <div>
        {testimonials.map((t, i) => (
          <div
            key={i}
          >
            <div>
              <Stars />
              <p>
                {t.quote}
              </p>
            </div>
            <div>
              <span />
              <div>
                <p>{t.name}</p>
                {t.role && (
                  <p>
                    {t.role}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
