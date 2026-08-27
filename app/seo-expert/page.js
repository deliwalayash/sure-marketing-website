"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Globe2,
  LineChart,
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

const seoCaseStudies = [
  {
    id: 1,
    title: "Textile Machinery Manufacturer",
    category: "Textile Machinery",
    region: "India",
    location: "Surat, Gujarat",
    flag: "🇮🇳",
    trafficGrowth: "+480% Organic Increase",
    monthlyOrganicTraffic: "18,500 Visitors / mo",
    rankedKeywords: "42 Keywords in #1 Position",
    organicLeads: "195+ Monthly B2B RFQs",
    domainAuthority: "DA 38 (from DA 11)",
    timeframe: "6 Months Strategy",
    topKeywords: ["Textile Machinery Manufacturer India", "Rapier Loom Exporter Surat", "Industrial Weaving Machine Price"],
    summary: "Dominated technical B2B keywords for weaving, spinning, and fabric processing machinery across India and South Asia."
  },
  {
    id: 2,
    title: "Industrial Boiler Manufacturer",
    category: "Boiler Manufacturer",
    region: "India",
    location: "Ahmedabad, Gujarat",
    flag: "🇮🇳",
    trafficGrowth: "+620% Organic Increase",
    monthlyOrganicTraffic: "12,200 Visitors / mo",
    rankedKeywords: "28 Keywords in #1 Position",
    organicLeads: "110+ Industrial RFQs / mo",
    domainAuthority: "DA 42 (from DA 14)",
    timeframe: "8 Months Strategy",
    topKeywords: ["Steam Boiler Manufacturer Gujarat", "Biomass Boiler Supplier", "Thermal Fluid Heater Price"],
    summary: "Built authority through technical schema markup, engineering blogs, and high-value industrial directory backlinks."
  },
  {
    id: 3,
    title: "Industrial Motor & Pump Wholesaler",
    category: "Industrial Motor",
    region: "India",
    location: "Rajkot & Mumbai",
    flag: "🇮🇳",
    trafficGrowth: "+390% Organic Increase",
    monthlyOrganicTraffic: "24,000 Visitors / mo",
    rankedKeywords: "65 Keywords in Top 3",
    organicLeads: "220+ Bulk Buyer Orders / mo",
    domainAuthority: "DA 45 (from DA 18)",
    timeframe: "5 Months Strategy",
    topKeywords: ["3 Phase Induction Motor Supplier", "Submersible Pump Wholesaler India", "Electric Motor Price List"],
    summary: "Optimized 1,200+ product catalog pages with long-tail technical specifications, driving high-volume B2B buyer leads."
  },
  {
    id: 4,
    title: "Dental & Implant Supercenter",
    category: "Dentist",
    region: "India",
    location: "Surat, Gujarat",
    flag: "🇮🇳",
    trafficGrowth: "+510% Local SEO Growth",
    monthlyOrganicTraffic: "14,000 Local Searches / mo",
    rankedKeywords: "#1 in Google 3-Pack Map",
    organicLeads: "145+ Direct Patient Bookings",
    domainAuthority: "DA 32 (from DA 8)",
    timeframe: "4 Months Strategy",
    topKeywords: ["Best Dentist Surat", "Dental Implant Cost Surat", "Teeth Alignment Clinic Near Me"],
    summary: "Dominated Google Maps Local 3-Pack and local search queries for high-ticket dental procedures."
  },
  {
    id: 5,
    title: "Orthopaedic & Spine Hospital",
    category: "Orthopaedic",
    region: "India",
    location: "Ahmedabad & Surat",
    flag: "🇮🇳",
    trafficGrowth: "+740% Organic Increase",
    monthlyOrganicTraffic: "31,000 Visitors / mo",
    rankedKeywords: "52 Health Keywords in Top 3",
    organicLeads: "210+ Surgery OPD Inquiries",
    domainAuthority: "DA 48 (from DA 19)",
    timeframe: "9 Months Strategy",
    topKeywords: ["Knee Replacement Surgeon Gujarat", "Best Spine Specialist Surat", "Joint Hospital OPD Timing"],
    summary: "Created authoritative medical condition hubs verified by chief surgeons, establishing massive search engine trust."
  },
  {
    id: 6,
    title: "Luxury Real Estate Developer",
    category: "Real Estate",
    region: "India",
    location: "Surat & Mumbai",
    flag: "🇮🇳",
    trafficGrowth: "+350% Organic Increase",
    monthlyOrganicTraffic: "16,500 Visitors / mo",
    rankedKeywords: "34 High-Intent Property Terms",
    organicLeads: "85+ Verified HNI Buyer Leads",
    domainAuthority: "DA 36 (from DA 12)",
    timeframe: "6 Months Strategy",
    topKeywords: ["Luxury Villas Buy Surat", "4BHK Apartment Vesu", "Commercial Space Investment Surat"],
    summary: "Targeted location-based high-intent real estate searches with custom neighborhood landing pages and virtual walkthroughs."
  },
  {
    id: 7,
    title: "Industrial Valve & Fitting Exporter",
    category: "Industrial Motor",
    region: "UAE",
    location: "Dubai & Sharjah, UAE",
    flag: "🇦🇪",
    trafficGrowth: "+430% Regional SEO",
    monthlyOrganicTraffic: "15,800 Visitors / mo",
    rankedKeywords: "22 Middle East B2B Terms",
    organicLeads: "95+ Import RFQs / mo",
    domainAuthority: "DA 41 (from DA 15)",
    timeframe: "7 Months Strategy",
    topKeywords: ["Industrial Valve Supplier Dubai", "Pipe Fittings Wholesaler UAE", "Stainless Steel Flanges Supplier"],
    summary: "Optimized regional GCC search presence targeting oil field contractors and MEP procurement managers."
  },
  {
    id: 8,
    title: "Commercial Property Advisory",
    category: "Real Estate",
    region: "Australia",
    location: "Melbourne, VIC",
    flag: "🇦🇺",
    trafficGrowth: "+290% Organic Growth",
    monthlyOrganicTraffic: "9,800 Visitors / mo",
    rankedKeywords: "18 Top 3 Rankings",
    organicLeads: "72+ Commercial Investor Leads",
    domainAuthority: "DA 39 (from DA 16)",
    timeframe: "6 Months Strategy",
    topKeywords: ["Commercial Property Investment Melbourne", "Office Space Lease VIC", "Retail Space Buying Guide"],
    summary: "Rranked in competitive commercial real estate niches using high-value market report content."
  },
  {
    id: 9,
    title: "Industrial Pump Manufacturer",
    category: "Boiler Manufacturer",
    region: "US",
    location: "Houston, Texas, USA",
    flag: "🇺🇸",
    trafficGrowth: "+580% Organic Growth",
    monthlyOrganicTraffic: "21,000 Visitors / mo",
    rankedKeywords: "45 US Industrial Keywords",
    organicLeads: "140+ Corporate RFQs / mo",
    domainAuthority: "DA 52 (from DA 24)",
    timeframe: "10 Months Strategy",
    topKeywords: ["Centrifugal Pump Manufacturer USA", "Industrial Slurry Pump Supplier", "High Pressure Chemical Pump"],
    summary: "Engineered topical authority around industrial fluid handling, outranking legacy US competitors."
  },
  {
    id: 10,
    title: "Legal & Corporate Practice",
    category: "Legal",
    region: "UK",
    location: "London, UK",
    flag: "🇬🇧",
    trafficGrowth: "+310% Organic Traffic",
    monthlyOrganicTraffic: "11,500 Visitors / mo",
    rankedKeywords: "26 High-Value Legal Terms",
    organicLeads: "88+ Corporate Consultations",
    domainAuthority: "DA 44 (from DA 20)",
    timeframe: "7 Months Strategy",
    topKeywords: ["Corporate Law Firm London", "Commercial Dispute Solicitor UK", "Business Acquisition Lawyer"],
    summary: "Built authority through thought leadership case summaries and authoritative legal backlinks."
  }
];

export default function SeoExpertPage() {
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [estMonthlyTraffic, setEstMonthlyTraffic] = useState(5000);

  const filteredStudies = useMemo(() => {
    return seoCaseStudies.filter((item) => {
      const matchRegion = selectedRegion === "All" || item.region === selectedRegion;
      const matchCategory = selectedCategory === "All" || item.category === selectedCategory;
      return matchRegion && matchCategory;
    });
  }, [selectedRegion, selectedCategory]);

  const estLeads = useMemo(() => {
    return Math.round(estMonthlyTraffic * 0.035);
  }, [estMonthlyTraffic]);

  const handleTrafficChange = useCallback((e) => {
    setEstMonthlyTraffic(Number(e.target.value));
  }, []);

  return (
    <div className="seo-page">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker">
              <Sparkles size={16} />
              SEO & Organic Search Growth Engine
            </div>
            <h1>
              Search Engine Optimization <br />
              <span className="gradient-text">Results & Rank Benchmarks.</span>
            </h1>
            <p>
              Verified organic search traffic growth, #1 keyword rankings, and high-intent organic leads for Textile
              Machinery, Boilers, Industrial Motors, Dentists, Hospitals, and Real Estate across India, UAE, Australia, US, and UK.
            </p>

            <div className="hero-actions">
              <Link className="button primary" href="/contact">
                Request Free SEO Audit <ArrowRight size={18} />
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
                  <span className="dash-clean-subtitle">SEO Direct Analytics</span>
                  <h3 className="dash-clean-title">Verified Organic Results</h3>
                </div>
                <span className="dash-clean-badge">
                  <TrendingUp size={14} /> +450% Avg Growth
                </span>
              </div>

              <div className="dash-clean-metrics">
                <div className="dash-clean-stat">
                  <div className="stat-icon-wrap cyan">
                    <LineChart size={20} />
                  </div>
                  <div>
                    <strong>150,000+</strong>
                    <span>Organic Monthly Visits</span>
                  </div>
                </div>

                <div className="dash-clean-stat">
                  <div className="stat-icon-wrap green">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <strong>450+</strong>
                    <span>Page 1 Ranked Keywords</span>
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
          <p className="eyebrow">Data & Search Rankings</p>
          <h2>Country-Wise & Industry-Wise SEO Case Studies</h2>
          <p>
            Filter organic ranking data by country and business category to examine traffic multipliers, top-ranked keywords,
            domain authority growth, and organic enquiries generated without paid ads.
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
                  <span className="metric-lbl">Organic Growth</span>
                  <strong className="metric-val highlight">{study.trafficGrowth}</strong>
                </div>
                <div className="metric-item">
                  <span className="metric-lbl">Monthly Organic Leads</span>
                  <strong className="metric-val green">{study.organicLeads}</strong>
                </div>
                <div className="metric-item">
                  <span className="metric-lbl">Monthly Organic Visits</span>
                  <strong className="metric-val">{study.monthlyOrganicTraffic}</strong>
                </div>
                <div className="metric-item">
                  <span className="metric-lbl">Keyword Rankings</span>
                  <strong className="metric-val green">{study.rankedKeywords}</strong>
                </div>
                <div className="metric-item">
                  <span className="metric-lbl">Domain Authority</span>
                  <strong className="metric-val">{study.domainAuthority}</strong>
                </div>
                <div className="metric-item">
                  <span className="metric-lbl">Campaign Duration</span>
                  <strong className="metric-val">{study.timeframe}</strong>
                </div>
              </div>

              {/* Keyword Badges */}
              <div className="keywords-list">
                <span className="kw-head">Top Ranked Search Terms:</span>
                <div className="kw-pills">
                  {study.topKeywords.map((kw) => (
                    <span key={kw} className="kw-pill">
                      <Search size={12} /> {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="card-action-bar">
                <Link className="button primary sm" href="/contact">
                  Request SEO Strategy For This Industry <ArrowRight size={15} />
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
            <p className="eyebrow">Organic Traffic Calculator</p>
            <h2>Calculate Potential Free Organic Leads from Google Search</h2>
            <p>Adjust your target monthly organic traffic volume to forecast high-intent inbound customer enquiries.</p>

            <div className="slider-control">
              <label>
                Target Monthly Organic Traffic: <strong>{estMonthlyTraffic.toLocaleString()} Visits / mo</strong>
              </label>
              <input
                type="range"
                min="1000"
                max="50000"
                step="1000"
                value={estMonthlyTraffic}
                onChange={(e) => setEstMonthlyTraffic(Number(e.target.value))}
                className="budget-slider"
              />
              <div className="slider-labels">
                <span>1,000 visits</span>
                <span>25,000 visits</span>
                <span>50,000 visits</span>
              </div>
            </div>
          </div>

          <div className="estimator-results-card">
            <h3>Projected Organic Lead Pipeline</h3>
            <div className="calc-row">
              <span>Target Organic Traffic:</span>
              <strong>{estMonthlyTraffic.toLocaleString()} Visits/mo</strong>
            </div>
            <div className="calc-row">
              <span>Estimated Ad Spend Saved:</span>
              <strong>₹{(estMonthlyTraffic * 25).toLocaleString()} / mo</strong>
            </div>
            <div className="calc-row highlight">
              <span>Est. Organic Inbound Leads:</span>
              <strong className="lead-num">{estLeads}+ High-Intent Leads / mo</strong>
            </div>

            <div className="estimator-cta">
              <Link className="button primary full-width" href="/contact">
                Start Technical & Content SEO <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
