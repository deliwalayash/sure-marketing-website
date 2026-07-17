import {
  BarChart3,
  Home,
  LayoutDashboard,
  Megaphone,
  MessageSquare,
  Settings,
  Target,
  Users
} from "lucide-react";

const kpis = [
  { label: "Clicks", value: "70.00K", change: "+12.2%", color: "#22c55e", spark: "M0,18 L8,14 L16,16 L24,10 L32,12 L40,4" },
  { label: "Conversions", value: "1.22K", change: "+16.6%", color: "#a855f7", spark: "M0,16 L8,12 L16,14 L24,8 L32,10 L40,2" },
  { label: "Cost", value: "$8.28K", change: "+15.2%", color: "#f97316", spark: "M0,14 L8,16 L16,12 L24,14 L32,8 L40,10" },
  { label: "ROAS", value: "4.91", change: "+22.1%", color: "#22c55e", spark: "M0,18 L8,14 L16,10 L24,12 L32,6 L40,2" }
];

const channels = [
  { label: "Paid Search", pct: 45, color: "#a855f7" },
  { label: "Meta Ads", pct: 30, color: "#d946ef" },
  { label: "Display", pct: 15, color: "#8b5cf6" },
  { label: "Others", pct: 10, color: "#6366f1" }
];

const featureCards = [
  { icon: Megaphone, title: "Paid Ads", text: "High intent traffic driving real results." },
  { icon: Users, title: "Leads", text: "Quality leads that convert." },
  { icon: BarChart3, title: "Analytics", text: "Data-driven insights for smarter growth." }
];

const sidebarIcons = [Home, LayoutDashboard, MessageSquare, Target, Settings];

export function HeroDashboard() {
  let donutOffset = 0;
  const donutSegments = channels.map((ch) => {
    const dash = ch.pct * 1.57;
    const seg = { ...ch, dash, offset: -donutOffset };
    donutOffset += dash;
    return seg;
  });

  return (
    <div className="hero-dashboard-stage" aria-label="Marketing analytics dashboard preview">
      <div className="dashboard-glow" />
      <div className="dashboard-tilt">
        <div className="dashboard-shell">
          <aside className="dashboard-sidebar">
            {sidebarIcons.map((Icon, i) => (
              <div key={i} className={i === 1 ? "dash-nav-item active" : "dash-nav-item"}>
                <Icon size={16} />
              </div>
            ))}
          </aside>

          <div className="dashboard-main">
            <div className="dashboard-kpis">
              {kpis.map((kpi) => (
                <div className="dash-kpi" key={kpi.label}>
                  <span className="dash-kpi-label">{kpi.label}</span>
                  <strong className="dash-kpi-value">{kpi.value}</strong>
                  <span className="dash-kpi-change" style={{ color: kpi.color }}>
                    {kpi.change}
                  </span>
                  <svg className="dash-sparkline" viewBox="0 0 40 20" aria-hidden="true">
                    <path d={kpi.spark} fill="none" stroke={kpi.color} strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              ))}
            </div>

            <div className="dashboard-charts">
              <div className="dash-chart-panel">
                <div className="dash-panel-head">
                  <span>Campaign Performance</span>
                  <div className="dash-legend">
                    <span><i style={{ background: "#a855f7" }} /> Clicks</span>
                    <span><i style={{ background: "#22c55e" }} /> Conversions</span>
                  </div>
                </div>
                <svg className="dash-line-chart" viewBox="0 0 280 100" aria-hidden="true">
                  <defs>
                    <linearGradient id="clicksGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="convGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[20, 40, 60, 80].map((y) => (
                    <line key={y} x1="0" y1={y} x2="280" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                  ))}
                  <path
                    d="M0,72 C30,68 50,58 80,52 S140,38 180,42 S240,28 280,18 L280,100 L0,100 Z"
                    fill="url(#clicksGrad)"
                  />
                  <path
                    d="M0,78 C30,74 50,66 80,60 S140,48 180,50 S240,38 280,30"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M0,82 C30,78 50,72 80,68 S140,58 180,56 S240,48 280,42 L280,100 L0,100 Z"
                    fill="url(#convGrad)"
                  />
                  <path
                    d="M0,82 C30,78 50,72 80,68 S140,58 180,56 S240,48 280,42"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="dash-chart-panel donut-panel">
                <div className="dash-panel-head">
                  <span>Top Channels</span>
                </div>
                <div className="donut-wrap">
                  <svg className="dash-donut" viewBox="0 0 100 100" aria-hidden="true">
                    <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" />
                    {donutSegments.map((seg) => (
                      <circle
                        key={seg.label}
                        cx="50"
                        cy="50"
                        r="38"
                        fill="none"
                        stroke={seg.color}
                        strokeWidth="12"
                        strokeDasharray={`${seg.dash} 157`}
                        strokeDashoffset={seg.offset}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                    ))}
                  </svg>
                  <div className="donut-center">
                    <strong>15.6K</strong>
                    <span>Total</span>
                  </div>
                </div>
                <ul className="donut-legend">
                  {channels.map((ch) => (
                    <li key={ch.label}>
                      <i style={{ background: ch.color }} />
                      {ch.label} <em>{ch.pct}%</em>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-feature-cards">
        {featureCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div className={`dash-feature-card card-${i + 1}`} key={card.title}>
              <div className="dash-feature-icon">
                <Icon size={18} />
              </div>
              <div>
                <strong>{card.title}</strong>
                <p>{card.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
