import { ArrowUpRight, BarChart3, TrendingUp, Users } from "lucide-react";

export function HeroDashboard() {
  return (
    <div className="hero-dashboard-stage" aria-label="Marketing performance summary preview">
      <div className="dashboard-glow" />
      <div className="dashboard-tilt">
        <div className="dashboard-shell clean-card">
          <div className="dash-clean-head">
            <div>
              <span className="dash-clean-subtitle">Live Campaign Metric</span>
              <h3 className="dash-clean-title">Lead Growth & Performance</h3>
            </div>
            <span className="dash-clean-badge">
              <TrendingUp size={14} /> +24.8%
            </span>
          </div>

          <div className="dash-clean-metrics">
            <div className="dash-clean-stat">
              <div className="stat-icon-wrap purple">
                <Users size={18} />
              </div>
              <div>
                <strong>1,420+</strong>
                <span>Qualified Leads</span>
              </div>
            </div>

            <div className="dash-clean-stat">
              <div className="stat-icon-wrap green">
                <BarChart3 size={18} />
              </div>
              <div>
                <strong>4.85x</strong>
                <span>Average ROAS</span>
              </div>
            </div>
          </div>

          {/* Simple, sleek single performance curve */}
          <div className="dash-clean-chart">
            <div className="dash-chart-top">
              <span>Monthly Growth Trend</span>
              <span className="dash-accent-text">Real-time tracking</span>
            </div>
            <svg className="dash-line-chart" viewBox="0 0 320 80" aria-hidden="true">
              <defs>
                <linearGradient id="cleanGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,65 C40,60 70,45 110,40 S180,25 220,30 S270,12 320,8 L320,80 L0,80 Z"
                fill="url(#cleanGrad)"
              />
              <path
                d="M0,65 C40,60 70,45 110,40 S180,25 220,30 S270,12 320,8"
                fill="none"
                stroke="#a855f7"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
