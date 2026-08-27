import { Globe2, Megaphone, MonitorSmartphone, Search, ArrowRight } from "lucide-react";
import Link from "next/link";

const heroServices = [
  {
    icon: MonitorSmartphone,
    title: "Website Design",
    desc: "Modern, responsive websites that convert visitors into customers.",
    href: "/website-design",
    color: "#2563eb",
    bg: "rgba(37, 99, 235, 0.1)",
  },
  {
    icon: Megaphone,
    title: "Google Ads",
    desc: "Targeted PPC campaigns for instant leads & measurable ROI.",
    href: "/google-ads-expert",
    color: "#f59e0b",
    bg: "rgba(245, 158, 11, 0.1)",
  },
  {
    icon: Globe2,
    title: "Social Media",
    desc: "Engaging social strategies that build brand & drive traffic.",
    href: "/social-media",
    color: "#8b5cf6",
    bg: "rgba(139, 92, 246, 0.1)",
  },
  {
    icon: Search,
    title: "SEO Services",
    desc: "Rank #1 on Google with proven organic growth strategies.",
    href: "/seo-expert",
    color: "#10b981",
    bg: "rgba(16, 185, 129, 0.1)",
  },
];

export function HeroDashboard() {
  return (
    <div className="hero-dashboard-stage" aria-label="Our core services">
      <div className="dashboard-glow" />
      <div className="dashboard-tilt">
        <div className="hero-services-card">
          <div className="hero-services-head">
            <span className="hero-services-label">What We Do</span>
            <h3 className="hero-services-title">Our Services</h3>
          </div>
          <div className="hero-services-grid">
            {heroServices.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="hero-service-item"
              >
                <div
                  className="hero-service-icon"
                  style={{ background: s.bg, color: s.color }}
                >
                  <s.icon size={20} />
                </div>
                <div className="hero-service-info">
                  <strong>{s.title}</strong>
                  <span>{s.desc}</span>
                </div>
                <ArrowRight size={16} className="hero-service-arrow" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
