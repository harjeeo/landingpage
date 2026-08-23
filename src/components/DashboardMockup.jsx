import {
  ChartLineData01Icon,
  Search01Icon,
  Notification03Icon,
  Home01Icon,
  ShoppingBag01Icon,
  ShoppingCart01Icon,
  CreditCardIcon,
  Setting07Icon,
  Layers01Icon,
} from "hugeicons-react";

const stats = [
  { label: "Total assets", value: "89,935", change: "+2.4% this week" },
  { label: "Total sales", value: "23,283.5", change: "+1.8% this week" },
  { label: "Total sales", value: "46,827", change: "-0.6% this week" },
  { label: "Total profit", value: "124,854", change: "+3.1% this week" },
];

const navItems = [
  { label: "Overview", icon: Home01Icon, active: true },
  { label: "Product", icon: ShoppingBag01Icon },
  { label: "Orders", icon: ShoppingCart01Icon },
  { label: "Checkout", icon: CreditCardIcon, dot: true },
  { label: "Setting", icon: Setting07Icon },
];

const orders = [
  { id: "01", date: "Jan 12, 2025", customer: "Alex Morgan", location: "New York", amount: "$1,240", status: "Paid" },
  { id: "02", date: "Jan 11, 2025", customer: "Sarah Lee", location: "Chicago", amount: "$860", status: "Pending" },
  { id: "03", date: "Jan 10, 2025", customer: "James Cook", location: "Austin", amount: "$2,015", status: "Paid" },
];

const bars = [40, 55, 35, 70, 50, 65, 45, 80, 60, 90, 55, 72, 48, 66];

function StatusPill({ status }) {
  return (
    <span>
      {status}
    </span>
  );
}

export default function DashboardMockup() {
  return (
    <div>
      {/* window bar */}
      <div>
        <span />
        <span />
        <span />
      </div>

      <div>
        {/* sidebar */}
        <aside>
          <div>
            <div>
              <span>
                <ChartLineData01Icon size={14} />
              </span>
              Alterx
            </div>
            <nav>
              {navItems.map(({ label, icon: Icon, dot }) => (
                <div
                  key={label}
                >
                  <Icon size={14} />
                  {label}
                  {dot && <span />}
                </div>
              ))}
            </nav>
          </div>
          <div>
            Log out
          </div>
        </aside>

        {/* main */}
        <div>
          <div>
            <div>
              <p>Welcome Back,</p>
              <p>Alex</p>
            </div>
            <div>
              <Search01Icon size={16} />
              <Notification03Icon size={16} />
              <span />
            </div>
          </div>

          {/* stats */}
          <div>
            {stats.map((s) => (
              <div key={s.label}>
                <p>{s.label}</p>
                <p>{s.value}</p>
                <p>
                  {s.change}
                </p>
              </div>
            ))}
          </div>

          {/* chart + earnings */}
          <div>
            <div>
              <div>
                <p>Orders Analytics</p>
                <p>Weekly</p>
              </div>
              <div>
                {bars.map((_, i) => (
                  <div
                    key={i}
                  />
                ))}
              </div>
            </div>
            <div>
              <p>Earnings</p>
              <div />
            </div>
          </div>

          {/* order list */}
          <div>
            <div>
              <p>
                <Layers01Icon size={14} /> Order List
              </p>
              <p>See all</p>
            </div>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{o.date}</td>
                    <td>{o.customer}</td>
                    <td>{o.amount}</td>
                    <td>
                      <StatusPill status={o.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
