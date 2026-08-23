import {
  Target02Icon,
  Money01Icon,
  GameController01Icon,
  Calendar03Icon,
  WorkflowSquare01Icon,
  Shield01Icon,
} from "hugeicons-react";

const features = [
  {
    title: "Sales Goal Tracking",
    desc: "Sales Goal Tracking helps teams stay aligned, focused.",
    icon: Target02Icon,
  },
  {
    title: "Price Management",
    desc: "Price management helps adjust and control pricing strategies.",
    icon: Money01Icon,
  },
  {
    title: "Sales Gamification",
    desc: "Sales gamification is the use of game-like elements.",
    icon: GameController01Icon,
  },
  {
    title: "Smart Forecasting",
    desc: "Smart forecasting uses real-time data and AI to predict future.",
    icon: Calendar03Icon,
  },
  {
    title: "Sales Workflows",
    desc: "Sales workflows are structured processes that guide deals.",
    icon: WorkflowSquare01Icon,
  },
  {
    title: "Access Control",
    desc: "Access control ensures that only the right people can view.",
    icon: Shield01Icon,
  },
];

export default function FeatureGrid() {
  return (
    <section>
      <div>
        <h2>
          We Make Work Feel Effortless
        </h2>
        <p>
          Automation squeezes out tasks like follow-ups, reminders, and data
          entry to save time.
        </p>
      </div>

      <div>
        {features.map(({ title, desc, icon: Icon }) => (
          <div
            key={title}
          >
            <span>
              <Icon size={20} />
            </span>
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
