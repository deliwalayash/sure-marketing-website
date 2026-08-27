"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Factory,
  Globe2,
  Layers,
  PhoneCall,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Zap
} from "lucide-react";
import { CtaBand } from "@/components/Sections";
import { contact } from "@/data/site";

const caseStudies = [
  {
    id: 1,
    title: "Textile Machinery Manufacturer",
    category: "Textile Machinery",
    region: "India",
    location: "Surat, Gujarat",
    flag: "🇮🇳",
    dailyBudget: "₹2,500 / day",
    monthlySpend: "₹75,000 / mo",
    leads: "148+",
    leadType: "B2B Buyer & Factory Enquiries",
    cpl: "₹506 / lead",
    roas: "9.4x",
    conversionRate: "16.8%",
    keywords: ["Textile Weaving Machine Manufacturer", "Rapier Loom Price Surat", "Industrial Jacquard Machinery"],
    summary: "Generated domestic and export B2B enquiries from textile mill owners and yarn processors across India and Bangladesh."
  },
  {
    id: 2,
    title: "Industrial Boiler Manufacturer",
    category: "Boiler Manufacturer",
    region: "India",
    location: "Ahmedabad, Gujarat",
    flag: "🇮🇳",
    dailyBudget: "₹3,200 / day",
    monthlySpend: "₹96,000 / mo",
    leads: "92+",
    leadType: "Industrial RFQs & Tender Leads",
    cpl: "₹1,043 / lead",
    roas: "11.2x",
    conversionRate: "12.4%",
    keywords: ["Steam Boiler Manufacturer", "Biomass Fired Boiler Price", "Industrial Boiler Supplier Gujarat"],
    summary: "Targeted plant heads and procurement managers searching for high-capacity steam boilers and thermal fluid heaters."
  },
  {
    id: 3,
    title: "Industrial Motor & Pump Supplier",
    category: "Industrial Motor",
    region: "India",
    location: "Rajkot & Mumbai",
    flag: "🇮🇳",
    dailyBudget: "₹1,800 / day",
    monthlySpend: "₹54,000 / mo",
    leads: "165+",
    leadType: "Distributor & Factory Orders",
    cpl: "₹327 / lead",
    roas: "7.8x",
    conversionRate: "19.2%",
    keywords: ["3 Phase Induction Motor Supplier", "Submersible Pump Wholesaler", "Electric Motor Manufacturer"],
    summary: "Captured bulk order enquiries from OEM manufacturers, chemical plants, and agricultural equipment dealers."
  },
  {
    id: 4,
    title: "Dental & Implant Supercenter",
    category: "Dentist",
    region: "India",
    location: "Surat, Gujarat",
    flag: "🇮🇳",
    dailyBudget: "₹1,200 / day",
    monthlySpend: "₹36,000 / mo",
    leads: "185+",
    leadType: "High-Ticket Patient Appointments",
    cpl: "₹194 / lead",
    roas: "6.8x",
    conversionRate: "14.2%",
    keywords: ["Dental Implant Surgeon Surat", "Teeth Alignment Clinic", "Best Dental Hospital Near Me"],
    summary: "Targeted patients seeking full-mouth rehabilitation, dental implants, and smile designing."
  },
  {
    id: 5,
    title: "Orthopaedic & Spine Hospital",
    category: "Orthopaedic",
    region: "India",
    location: "Ahmedabad & Surat",
    flag: "🇮🇳",
    dailyBudget: "₹2,500 / day",
    monthlySpend: "₹75,000 / mo",
    leads: "124+",
    leadType: "Surgery Consultation OPD Leads",
    cpl: "₹604 / lead",
    roas: "8.2x",
    conversionRate: "18.5%",
    keywords: ["Robotic Knee Replacement Surgeon", "Spine Hospital Gujarat", "Best Orthopaedic Doctor"],
    summary: "Attracted patients and families searching for specialized joint replacement and arthroscopy procedures."
  },
  {
    id: 6,
    title: "Luxury Real Estate & Villas",
    category: "Real Estate",
    region: "India",
    location: "Surat & Mumbai",
    flag: "🇮🇳",
    dailyBudget: "₹3,500 / day",
    monthlySpend: "₹1,05,000 / mo",
    leads: "96+",
    leadType: "HNI Villa & Flat Buyer Enquiries",
    cpl: "₹1,093 / lead",
    roas: "12.4x",
    conversionRate: "8.6%",
    keywords: ["Luxury 4BHK Villa Surat", "3BHK Flat Buy", "Commercial Property Investment"],
    summary: "Filtered out non-serious buyers using income-layer bidding and focused exclusively on luxury buyers."
  },
  {
    id: 7,
    title: "Industrial Machinery Exporter",
    category: "Textile Machinery",
    region: "UAE",
    location: "Dubai & Sharjah, UAE",
    flag: "🇦🇪",
    dailyBudget: "AED 120 / day",
    monthlySpend: "AED 3,600 / mo",
    leads: "78+",
    leadType: "Middle East B2B Import Enquiries",
    cpl: "AED 46.15 / lead",
    roas: "10.5x",
    conversionRate: "15.3%",
    keywords: ["Industrial Machinery Supplier Dubai", "Textile Processing Machine UAE", "Factory Equipment Supplier"],
    summary: "Generated High-value B2B purchase orders from UAE, Saudi Arabia, and Oman industrial buyers."
  },
  {
    id: 8,
    title: "Cosmetic Dental & Surgery Clinic",
    category: "Dentist",
    region: "Australia",
    location: "Sydney, NSW",
    flag: "🇦🇺",
    dailyBudget: "AUD $65 / day",
    monthlySpend: "AUD $1,950 / mo",
    leads: "112+",
    leadType: "Cosmetic Patient Bookings",
    cpl: "AUD $17.40 / lead",
    roas: "7.1x",
    conversionRate: "16.8%",
    keywords: ["Invisalign Sydney", "Teeth Whitening Cost", "Emergency Dentist Sydney CBD"],
    summary: "Geo-targeted 15km radius around Sydney CBD with automated calendar booking integration."
  },
  {
    id: 9,
    title: "Commercial Property Advisory",
    category: "Real Estate",
    region: "Australia",
    location: "Melbourne, VIC",
    flag: "🇦🇺",
    dailyBudget: "AUD $110 / day",
    monthlySpend: "AUD $3,300 / mo",
    leads: "84+",
    leadType: "Investor & Commercial Leasing Leads",
    cpl: "AUD $39.20 / lead",
    roas: "9.5x",
    conversionRate: "11.4%",
    keywords: ["Commercial Lease Melbourne", "Buy Retail Property VIC", "Office Space Investor"],
    summary: "B2B search campaign targeting business owners seeking retail leasing and commercial property acquisitions."
  },
  {
    id: 10,
    title: "Industrial Pump & Valve Supplier",
    category: "Industrial Motor",
    region: "US",
    location: "Houston, Texas, USA",
    flag: "🇺🇸",
    dailyBudget: "$115 USD / day",
    monthlySpend: "$3,450 USD / mo",
    leads: "135+",
    leadType: "Industrial B2B Procurement Leads",
    cpl: "$25.55 USD / lead",
    roas: "8.7x",
    conversionRate: "17.1%",
    keywords: ["Slurry Pump Manufacturer Texas", "Control Valves Industrial Supplier", "Electric Motor Distributor"],
    summary: "Delivered high-volume RFQs from oil & gas, chemical, and municipal water treatment contractors."
  },
  {
    id: 11,
    title: "Specialty Medical & Healthcare",
    category: "Healthcare",
    region: "US",
    location: "California, USA",
    flag: "🇺🇸",
    dailyBudget: "$85 USD / day",
    monthlySpend: "$2,550 USD / mo",
    leads: "158+",
    leadType: "Verified Patient Consultations",
    cpl: "$16.10 USD / lead",
    roas: "6.4x",
    conversionRate: "21.3%",
    keywords: ["Specialist Clinic Near Me", "Outpatient Surgery California", "Medical Doctor Appointment"],
    summary: "Emphasized privacy, insurance coverage, and telehealth appointment booking for high-intent searchers."
  },
  {
    id: 12,
    title: "Engineering & Boiler Exports",
    category: "Boiler Manufacturer",
    region: "UK",
    location: "Manchester & London, UK",
    flag: "🇬🇧",
    dailyBudget: "£65 UK / day",
    monthlySpend: "£1,950 UK / mo",
    leads: "88+",
    leadType: "Industrial Heating & Boiler RFQs",
    cpl: "£22.15 UK / lead",
    roas: "9.8x",
    conversionRate: "14.6%",
    keywords: ["Industrial Boiler Supplier UK", "Commercial Steam Generator", "Boiler Plant Installation"],
    summary: "Generated corporate contracts from UK manufacturing plants, food processors, and paper mills."
  }
];

export default function GoogleAdsExpertPage() {
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [estBudget, setEstBudget] = useState(2500);

  const filteredStudies = useMemo(() => {
    return caseStudies.filter((item) => {
      const matchRegion = selectedRegion === "All" || item.region === selectedRegion;
      const matchCategory = selectedCategory === "All" || item.category === selectedCategory;
      return matchRegion && matchCategory;
    });
  }, [selectedRegion, selectedCategory]);

  const { estClicks, estLeads, estMonthlySpend } = useMemo(() => {
    const clicks = Math.round(estBudget / 24);
    return {
      estClicks: clicks,
      estLeads: Math.round(clicks * 0.15),
      estMonthlySpend: estBudget * 30
    };
  }, [estBudget]);

  const handleBudgetChange = useCallback((e) => {
    setEstBudget(Number(e.target.value));
  }, []);

  return (
    <div className="google-ads-page">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker">
              <Sparkles size={16} />
              Google Ads Performance Engine
            </div>
            <h1>
              Google Ads Results <br />
              <span className="gradient-text">By Budget & Industry.</span>
            </h1>
            <p>
              Verified lead volume, cost per lead (CPL), and return on ad spend (ROAS) for Textile Machinery, Boilers,
              Industrial Motors, Dentists, Orthopaedic Hospitals, and Real Estate across India, UAE, Australia, US, and UK.
            </p>

            <div className="hero-actions">
              <Link className="button primary" href="/contact">
                Request Free Campaign Strategy <ArrowRight size={18} />
              </Link>
              <a className="button secondary" href={contact.whatsapp}>
                <PhoneCall size={18} /> Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="hero-dashboard-stage">
            <div className="dashboard-shell clean-card">
              <div className="dash-clean-head">
                <div>
                  <span className="dash-clean-subtitle">Google Ads Direct Benchmark</span>
                  <h3 className="dash-clean-title">Verified Performance Numbers</h3>
                </div>
                <span className="dash-clean-badge">
                  <TrendingUp size={14} /> 5.8x Avg ROAS
                </span>
              </div>

              <div className="dash-clean-metrics">
                <div className="dash-clean-stat">
                  <div className="stat-icon-wrap cyan">
                    <Target size={20} />
                  </div>
                  <div>
                    <strong>14,800+</strong>
                    <span>Verified Leads</span>
                  </div>
                </div>

                <div className="dash-clean-stat">
                  <div className="stat-icon-wrap green">
                    <BarChart3 size={20} />
                  </div>
                  <div>
                    <strong>8.6x</strong>
                    <span>Top Client ROAS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER & NUMERICAL CASE STUDIES */}
      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">Data & Analytics</p>
          <h2>Country-Wise & Industry-Wise Campaign Performance</h2>
          <p>
            Filter real numbers by country and business category to examine daily ad budgets, monthly spends, cost per lead,
            and total qualified leads generated.
          </p>
        </div>

        {/* Filters */}
        <div className="filter-wrapper">
          <div className="filter-group">
            <span className="filter-label">Target Country:</span>
            {["All", "India", "UAE", "Australia", "US", "UK"].map((region) => (
              <button
                key={region}
                className={`filter-btn ${selectedRegion === region ? "active" : ""}`}
                onClick={() => setSelectedRegion(region)}
              >
                {region === "India" && "🇮🇳 "}
                {region === "UAE" && "🇦🇪 "}
                {region === "Australia" && "🇦🇺 "}
                {region === "US" && "🇺🇸 "}
                {region === "UK" && "🇬🇧 "}
                {region}
              </button>
            ))}
          </div>

          <div className="filter-group">
            <span className="filter-label">Industry Category:</span>
            {[
              "All",
              "Textile Machinery",
              "Boiler Manufacturer",
              "Industrial Motor",
              "Dentist",
              "Orthopaedic",
              "Real Estate"
            ].map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid - Pure Stats & Numbers (NO IMAGES) */}
        <div className="case-studies-grid">
          {filteredStudies.map((study) => (
            <article key={study.id} className="case-study-card">
              <div className="card-top-bar">
                <span className="card-flag-badge">
                  {study.flag} {study.region} • {study.location}
                </span>
                <span className="card-category-badge">{study.category}</span>
              </div>

              <h3 className="case-title">{study.title}</h3>
              <p className="case-summary">{study.summary}</p>

              {/* Data Numbers Box */}
              <div className="case-metrics-box">
                <div className="metric-item">
                  <span className="metric-lbl">Daily Ad Budget</span>
                  <strong className="metric-val highlight">{study.dailyBudget}</strong>
                </div>
                <div className="metric-item">
                  <span className="metric-lbl">Monthly Enquiries</span>
                  <strong className="metric-val green">{study.leads} Leads</strong>
                </div>
                <div className="metric-item">
                  <span className="metric-lbl">Monthly Spend</span>
                  <strong className="metric-val">{study.monthlySpend}</strong>
                </div>
                <div className="metric-item">
                  <span className="metric-lbl">Cost Per Lead (CPL)</span>
                  <strong className="metric-val">{study.cpl}</strong>
                </div>
                <div className="metric-item">
                  <span className="metric-lbl">Return On Ad Spend</span>
                  <strong className="metric-val green">{study.roas} ROAS</strong>
                </div>
                <div className="metric-item">
                  <span className="metric-lbl">Conversion Rate</span>
                  <strong className="metric-val">{study.conversionRate}</strong>
                </div>
              </div>

              {/* Keyword Badges */}
              <div className="keywords-list">
                <span className="kw-head">High-Intent Buyer Keywords:</span>
                <div className="kw-pills">
                  {study.keywords.map((kw) => (
                    <span key={kw} className="kw-pill">
                      <Search size={12} /> {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="card-action-bar">
                <Link className="button primary sm" href="/contact">
                  Discuss This Industry Campaign <ArrowRight size={15} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* DYNAMIC ESTIMATOR */}
      <section className="section-block estimator-section">
        <div className="estimator-box">
          <div className="estimator-copy">
            <p className="eyebrow">Budget & Lead Calculator</p>
            <h2>Calculate Your Projected Google Ads Leads & ROI</h2>
            <p>Adjust your estimated daily ad budget to calculate expected monthly clicks, leads, and conversion pipeline.</p>

            <div className="slider-control">
              <label>
                Daily Budget: <strong>₹{estBudget.toLocaleString()} / day</strong>
              </label>
              <input
                type="range"
                min="1000"
                max="15000"
                step="500"
                value={estBudget}
                onChange={(e) => setEstBudget(Number(e.target.value))}
                className="budget-slider"
              />
              <div className="slider-labels">
                <span>₹1,000/day</span>
                <span>₹7,500/day</span>
                <span>₹15,000/day</span>
              </div>
            </div>
          </div>

          <div className="estimator-results-card">
            <h3>Forecasted Lead Pipeline</h3>
            <div className="calc-row">
              <span>Est. Monthly Ad Spend:</span>
              <strong>₹{estMonthlySpend.toLocaleString()}</strong>
            </div>
            <div className="calc-row">
              <span>Est. Monthly Search Clicks:</span>
              <strong>{estClicks * 30} Clicks</strong>
            </div>
            <div className="calc-row highlight">
              <span>Est. Verified Enquiries / Month:</span>
              <strong className="lead-num">{estLeads * 30}+ Leads</strong>
            </div>

            <div className="estimator-cta">
              <Link className="button primary full-width" href="/contact">
                Start High-Intent Ads Campaign <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
