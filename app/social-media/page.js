"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Globe2,
  Heart,
  MessageSquare,
  PhoneCall,
  Share2,
  Sparkles,
  Target,
  TrendingUp,
  Users
} from "lucide-react";
import { CtaBand } from "@/components/Sections";
import { contact } from "@/data/site";

const smmCaseStudies = [
  {
    id: 1,
    title: "Textile Machinery Manufacturer",
    category: "Textile Machinery",
    region: "India",
    location: "Surat, Gujarat",
    flag: "🇮🇳",
    monthlyReach: "850,000+ Targeted Impressions",
    leadsGenerated: "110+ B2B Direct Message Leads",
    dailyAdSpend: "₹1,500 / day",
    cpl: "₹340 / Lead",
    engagementRate: "8.4% (Meta & LinkedIn)",
    roas: "7.2x",
    topPlatform: "LinkedIn & Meta Lead Ads",
    summary: "Showcased high-speed loom demonstrations and factory machinery reels to textile mill owners and buying agents."
  },
  {
    id: 2,
    title: "Industrial Boiler Manufacturer",
    category: "Boiler Manufacturer",
    region: "India",
    location: "Ahmedabad, Gujarat",
    flag: "🇮🇳",
    monthlyReach: "420,000+ Industrial Reach",
    leadsGenerated: "65+ Plant Head Inquiries",
    dailyAdSpend: "₹2,000 / day",
    cpl: "₹680 / Lead",
    engagementRate: "6.2% (LinkedIn & Facebook)",
    roas: "8.9x",
    topPlatform: "LinkedIn B2B Campaign",
    summary: "Targeted factory directors, chemical engineers, and process plant managers with video case studies and steam boiler efficiency charts."
  },
  {
    id: 3,
    title: "Industrial Motor & Electrical Supplier",
    category: "Industrial Motor",
    region: "India",
    location: "Rajkot & Mumbai",
    flag: "🇮🇳",
    monthlyReach: "610,000+ B2B Impressions",
    leadsGenerated: "140+ Dealer & Wholesale Orders",
    dailyAdSpend: "₹1,200 / day",
    cpl: "₹290 / Lead",
    roas: "6.5x",
    topPlatform: "Meta Instant Lead Forms",
    summary: "Promoted 3-phase electric motors and submersible pumps directly to electrical distributors and OEM machinery manufacturers."
  },
  {
    id: 4,
    title: "Dental & Implant Supercenter",
    category: "Dentist",
    region: "India",
    location: "Surat, Gujarat",
    flag: "🇮🇳",
    monthlyReach: "1,200,000+ Local Reach",
    leadsGenerated: "190+ Patient Consultation Requests",
    dailyAdSpend: "₹1,000 / day",
    cpl: "₹165 / Lead",
    engagementRate: "12.8% (Instagram & FB)",
    roas: "5.9x",
    topPlatform: "Instagram Reels & Stories",
    summary: "Published before/after teeth alignment transformations, patient video testimonials, and implant educational reels."
  },
  {
    id: 5,
    title: "Orthopaedic & Joint Hospital",
    category: "Orthopaedic",
    region: "India",
    location: "Ahmedabad & Surat",
    flag: "🇮🇳",
    monthlyReach: "950,000+ Healthcare Reach",
    leadsGenerated: "135+ OPD Consultation Leads",
    dailyAdSpend: "₹1,800 / day",
    cpl: "₹480 / Lead",
    engagementRate: "9.6% (Meta Ads)",
    roas: "7.8x",
    topPlatform: "Facebook & Instagram Lead Ads",
    summary: "Focused on joint replacement awareness, patient recovery stories, and expert surgeon Q&A sessions."
  },
  {
    id: 6,
    title: "Luxury Real Estate Developer",
    category: "Real Estate",
    region: "India",
    location: "Surat & Mumbai",
    flag: "🇮🇳",
    monthlyReach: "1,500,000+ HNI Reach",
    leadsGenerated: "115+ Qualified Property Leads",
    dailyAdSpend: "₹2,500 / day",
    cpl: "₹850 / Lead",
    engagementRate: "7.1% (Instagram & FB)",
    roas: "11.5x",
    topPlatform: "Meta High-Income Targeting",
    summary: "Ran architectural render tours and lifestyle video walkthroughs targeted strictly at top 10% income households."
  },
  {
    id: 7,
    title: "B2B Machinery Exporter",
    category: "Textile Machinery",
    region: "UAE",
    location: "Dubai & Sharjah, UAE",
    flag: "🇦🇪",
    monthlyReach: "380,000+ GCC Impressions",
    leadsGenerated: "75+ Trade Import Inquiries",
    dailyAdSpend: "AED 90 / day",
    cpl: "AED 38 / Lead",
    engagementRate: "5.8% (LinkedIn & FB)",
    roas: "9.2x",
    topPlatform: "LinkedIn Sponsored InMail",
    summary: "Generated bulk purchase inquiries from textile processors and factory owners across UAE, Saudi Arabia, and Oman."
  },
  {
    id: 8,
    title: "Cosmetic Dental Practice",
    category: "Dentist",
    region: "Australia",
    location: "Sydney, NSW",
    flag: "🇦🇺",
    monthlyReach: "450,000+ Targeted Reach",
    leadsGenerated: "98+ Patient Appointment Bookings",
    dailyAdSpend: "AUD $50 / day",
    cpl: "AUD $16 / Lead",
    engagementRate: "11.2% (Instagram)",
    roas: "6.4x",
    topPlatform: "Instagram Ads & Messenger",
    summary: "Promoted smile makeover packages and clear aligner consultations with instant Messenger automated booking."
  },
  {
    id: 9,
    title: "Specialty Healthcare Clinic",
    category: "Healthcare",
    region: "US",
    location: "California, USA",
    flag: "🇺🇸",
    monthlyReach: "520,000+ Local Reach",
    leadsGenerated: "140+ Patient Consultation Requests",
    dailyAdSpend: "$75 USD / day",
    cpl: "$18.50 USD / Lead",
    engagementRate: "8.9% (Meta Ads)",
    roas: "5.8x",
    topPlatform: "Meta Conversions API",
    summary: "Drove verified patient bookings for specialized outpatient care and wellness consultations."
  },
  {
    id: 10,
    title: "Corporate Legal Advisory",
    category: "Legal",
    region: "UK",
    location: "London, UK",
    flag: "🇬🇧",
    monthlyReach: "310,000+ B2B Impressions",
    leadsGenerated: "72+ Corporate Legal Consultations",
    dailyAdSpend: "£45 UK / day",
    cpl: "£19 UK / Lead",
    engagementRate: "4.9% (LinkedIn)",
    roas: "8.1x",
    topPlatform: "LinkedIn Conversation Ads",
    summary: "Targeted UK business owners and CEOs for commercial contract drafting, dispute resolution, and compliance."
  }
];

export default function SocialMediaPage() {
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [estMonthlySpend, setEstMonthlySpend] = useState(30000);

  const filteredStudies = useMemo(() => {
    return smmCaseStudies.filter((item) => {
      const matchRegion = selectedRegion === "All" || item.region === selectedRegion;
      const matchCategory = selectedCategory === "All" || item.category === selectedCategory;
      return matchRegion && matchCategory;
    });
  }, [selectedRegion, selectedCategory]);

  const { estReach, estLeads } = useMemo(() => {
    return {
      estReach: Math.round(estMonthlySpend * 22),
      estLeads: Math.round(estMonthlySpend / 280)
    };
  }, [estMonthlySpend]);

  const handleSpendChange = useCallback((e) => {
    setEstMonthlySpend(Number(e.target.value));
  }, []);

  return (
    <div className="smm-page">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker">
              <Sparkles size={16} />
              Social Media Lead & ROI Engine
            </div>
            <h1>
              Social Media Growth <br />
              <span className="gradient-text">Numbers & Campaign ROI.</span>
            </h1>
            <p>
              Verified monthly reach, cost per lead (CPL), and return on ad spend (ROAS) across Instagram, Facebook, and LinkedIn
              for Textile Machinery, Boilers, Industrial Motors, Dentists, Hospitals, and Real Estate in India, UAE, Australia, US, and UK.
            </p>

            <div className="hero-actions">
              <Link className="button primary" href="/contact">
                Request Free Social Media Plan <ArrowRight size={18} />
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
                  <span className="dash-clean-subtitle">Social Ads Benchmark</span>
                  <h3 className="dash-clean-title">Verified Campaign Metrics</h3>
                </div>
                <span className="dash-clean-badge">
                  <TrendingUp size={14} /> 7.1x Avg ROAS
                </span>
              </div>

              <div className="dash-clean-metrics">
                <div className="dash-clean-stat">
                  <div className="stat-icon-wrap cyan">
                    <Users size={20} />
                  </div>
                  <div>
                    <strong>5.2 Million+</strong>
                    <span>Targeted Monthly Reach</span>
                  </div>
                </div>

                <div className="dash-clean-stat">
                  <div className="stat-icon-wrap green">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <strong>11,200+</strong>
                    <span>Direct Inbound Leads</span>
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
          <p className="eyebrow">Data & Performance</p>
          <h2>Country-Wise & Industry-Wise Social Media Case Studies</h2>
          <p>
            Filter social media performance numbers by country and business category to examine impressions, lead volume,
            cost per lead, engagement rates, and ROI.
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
                  <span className="metric-lbl">Monthly Reach</span>
                  <strong className="metric-val highlight">{study.monthlyReach}</strong>
                </div>
                <div className="metric-item">
                  <span className="metric-lbl">Monthly Direct Leads</span>
                  <strong className="metric-val green">{study.leadsGenerated}</strong>
                </div>
                <div className="metric-item">
                  <span className="metric-lbl">Daily Ad Spend</span>
                  <strong className="metric-val">{study.dailyAdSpend}</strong>
                </div>
                <div className="metric-item">
                  <span className="metric-lbl">Cost Per Lead (CPL)</span>
                  <strong className="metric-val">{study.cpl}</strong>
                </div>
                <div className="metric-item">
                  <span className="metric-lbl">Engagement Rate</span>
                  <strong className="metric-val green">{study.engagementRate}</strong>
                </div>
                <div className="metric-item">
                  <span className="metric-lbl">Return On Ad Spend</span>
                  <strong className="metric-val green">{study.roas} ROAS</strong>
                </div>
              </div>

              <div className="keywords-list">
                <span className="kw-head">Primary Conversion Channel:</span>
                <div className="kw-pills">
                  <span className="kw-pill">
                    <Share2 size={12} /> {study.topPlatform}
                  </span>
                </div>
              </div>

              <div className="card-action-bar">
                <Link className="button primary sm" href="/contact">
                  Request Social Media Campaign <ArrowRight size={15} />
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
            <p className="eyebrow">Social Ads Reach Estimator</p>
            <h2>Calculate Projected Social Media Reach & Direct Inquiries</h2>
            <p>Select your monthly social ads budget to calculate estimated impressions, video views, and direct customer leads.</p>

            <div className="slider-control">
              <label>
                Monthly Social Budget: <strong>₹{estMonthlySpend.toLocaleString()} / mo</strong>
              </label>
              <input
                type="range"
                min="15000"
                max="150000"
                step="5000"
                value={estMonthlySpend}
                onChange={(e) => setEstMonthlySpend(Number(e.target.value))}
                className="budget-slider"
              />
              <div className="slider-labels">
                <span>₹15,000/mo</span>
                <span>₹75,000/mo</span>
                <span>₹1,50,000/mo</span>
              </div>
            </div>
          </div>

          <div className="estimator-results-card">
            <h3>Forecasted Social Media Results</h3>
            <div className="calc-row">
              <span>Target Monthly Impressions:</span>
              <strong>{estReach.toLocaleString()}+ Views</strong>
            </div>
            <div className="calc-row">
              <span>Estimated Cost Per Lead:</span>
              <strong>~₹280 / Lead</strong>
            </div>
            <div className="calc-row highlight">
              <span>Est. Direct Monthly Inquiries:</span>
              <strong className="lead-num">{estLeads}+ High-Intent Leads</strong>
            </div>

            <div className="estimator-cta">
              <Link className="button primary full-width" href="/contact">
                Start Social Growth Campaign <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
