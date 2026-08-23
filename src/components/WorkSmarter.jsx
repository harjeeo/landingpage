import { Task01Icon, Location01Icon, Analytics01Icon } from "hugeicons-react";

const cards = [
  {
    title: "Task & Activity Tracking",
    desc: "Assign tasks, conduct meetings and track team activities.",
    icon: Task01Icon,
    preview: (
      <div>
        <div>
          <span>Meet Nic</span>
          <span>$11,000</span>
        </div>
        <div>
          <span /> Synced
        </div>
        <div>
          <span>Quick Books</span>
        </div>
      </div>
    ),
  },
  {
    title: "Real-Time Visits",
    desc: "Generate detailed reports on sales performance, team productivity.",
    icon: Location01Icon,
    preview: (
      <div>
        <div>
          <span>Aiden</span>
          <span>$11,000.00</span>
        </div>
        <div>
          <div />
        </div>
        <div>
          <span>Task</span>
          <span>Timer</span>
        </div>
      </div>
    ),
  },
  {
    title: "Reporting & Analytics",
    desc: "Enable seamless communication and file sharing among team.",
    icon: Analytics01Icon,
    preview: (
      <div>
        <div>
          <span>Manage mc</span>
          <span>$11,000.00</span>
        </div>
        <div>
          <span>Team calenders</span>
          <span />
        </div>
        <div>Frequency</div>
      </div>
    ),
  },
];

export default function WorkSmarter() {
  return (
    <section id="features">
      <div>
        <span>
          ✦ Power Pack
        </span>
        <h2>
          Work Smarter, Grow Faster
        </h2>
        <p>
          Businesses choose Alterx because it simplifies the complexity of sales
          management.
        </p>
      </div>

      <div>
        {cards.map(({ title, desc, icon: Icon, preview }) => (
          <div
            key={title}
          >
            <div>{preview}</div>
            <div>
              <span>
                <Icon size={18} />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
