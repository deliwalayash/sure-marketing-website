"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Database,
  Globe2,
  Layers,
  MonitorSmartphone,
  Palette,
  Search,
  Server,
  Shield,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Zap
} from "lucide-react";
import { CtaBand } from "@/components/Sections";
import { contact } from "@/data/site";

/* ── TECH STACK DATA ── */
const techStack = [
  {
    category: "Frontend",
    icon: Code2,
    color: "#2563eb",
    bg: "rgba(37, 99, 235, 0.1)",
    techs: [
      { name: "HTML5", desc: "Semantic, accessible markup" },
      { name: "CSS3", desc: "Modern layouts & animations" },
      { name: "JavaScript", desc: "Dynamic interactivity" },
      { name: "React", desc: "Component-based UI" },
      { name: "Next.js", desc: "SSR & SEO optimized" },
      { name: "Tailwind CSS", desc: "Rapid responsive styling" }
    ]
  },
  {
    category: "Backend",
    icon: Server,
    color: "#10b981",
    bg: "rgba(16, 185, 129, 0.1)",
    techs: [
      { name: "Node.js", desc: "Scalable server runtime" },
      { name: "Express.js", desc: "REST API framework" },
      { name: "Next.js API", desc: "Serverless endpoints" },
      { name: "Python", desc: "Automation & scripting" }
    ]
  },
  {
    category: "Database",
    icon: Database,
    color: "#8b5cf6",
    bg: "rgba(139, 92, 246, 0.1)",
    techs: [
      { name: "PostgreSQL", desc: "Relational & reliable" },
      { name: "MongoDB", desc: "Flexible NoSQL storage" },
      { name: "Supabase", desc: "Realtime backend-as-a-service" },
      { name: "Firebase", desc: "Cloud-hosted NoSQL" },
      { name: "MySQL", desc: "Enterprise SQL database" }
    ]
  },
  {
    category: "DevOps & Hosting",
    icon: Globe2,
    color: "#f59e0b",
    bg: "rgba(245, 158, 11, 0.1)",
    techs: [
      { name: "Vercel", desc: "Zero-config deployments" },
      { name: "AWS", desc: "Enterprise cloud hosting" },
      { name: "Cloudflare", desc: "CDN & DDoS protection" },
      { name: "cPanel", desc: "Traditional hosting" },
      { name: "GitHub", desc: "Version control & CI/CD" }
    ]
  }
];

/* ── WEBSITE TYPES DATA ── */
const websiteTypes = [
  {
    icon: ShoppingCart,
    title: "E-Commerce Websites",
    color: "#ef4444",
    bg: "rgba(239, 68, 68, 0.1)",
    desc: "Full-featured online stores with product catalog, cart, payment gateway, order management & inventory tracking.",
    features: ["Payment Gateway Integration", "Product Catalog & Filters", "Order & Inventory Management", "Customer Dashboard"]
  },
  {
    icon: ShoppingCart,
    title: "Shopify Stores",
    color: "#95bf47",
    bg: "rgba(149, 191, 71, 0.1)",
    desc: "Custom Shopify theme design & development with app integrations, optimized checkout, and brand-aligned design.",
    features: ["Custom Theme Design", "App Integration", "Optimized Checkout", "Multi-Currency Support"]
  },
  {
    icon: MonitorSmartphone,
    title: "Static & Business Websites",
    color: "#2563eb",
    bg: "rgba(37, 99, 235, 0.1)",
    desc: "Lightning-fast static websites for businesses, portfolios, landing pages & corporate presentations.",
    features: ["Ultra-Fast Load Speed", "SEO Optimized Structure", "Contact & Lead Forms", "Google Maps Integration"]
  },
  {
    icon: Layers,
    title: "Custom Software & Web Apps",
    color: "#8b5cf6",
    bg: "rgba(139, 92, 246, 0.1)",
    desc: "Tailor-made software solutions — CRM, ERP, booking systems, dashboards & business automation tools.",
    features: ["Custom Business Logic", "Role-Based Access", "API Integrations", "Real-Time Dashboards"]
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    color: "#0ea5e9",
    bg: "rgba(14, 165, 233, 0.1)",
    desc: "Cross-platform mobile apps for Android & iOS built with React Native — delivery apps, booking apps, & more.",
    features: ["Android & iOS Support", "Push Notifications", "Offline Capability", "App Store Deployment"]
  },
  {
    icon: Shield,
    title: "Admin Panels & Dashboards",
    color: "#f59e0b",
    bg: "rgba(245, 158, 11, 0.1)",
    desc: "Powerful admin panels for managing content, users, orders, analytics & operations from one secure dashboard.",
    features: ["User & Role Management", "Analytics & Reports", "Content Management", "Secure Authentication"]
  }
];

/* ── KEY FEATURES DATA ── */
const keyFeatures = [
  { icon: Search, title: "SEO Friendly", desc: "Every website we build is optimized for Google ranking from day one — clean URLs, meta tags, schema markup, sitemaps & fast load times." },
  { icon: Palette, title: "Premium UI/UX Design", desc: "Stunning, modern designs with intuitive navigation, micro-animations & a premium feel that builds trust with visitors." },
  { icon: MonitorSmartphone, title: "Mobile Responsive", desc: "Pixel-perfect responsive design that looks and works flawlessly on phones, tablets, laptops & large monitors." },
  { icon: Zap, title: "Blazing Fast Speed", desc: "Optimized images, code splitting, lazy loading & CDN delivery for under 2-second page load times." },
  { icon: Shield, title: "Secure & Reliable", desc: "SSL certificates, secure authentication, data encryption & regular backups to keep your website safe 24/7." },
  { icon: Code2, title: "Clean & Scalable Code", desc: "Maintainable, well-documented code architecture that makes future updates & feature additions seamless." }
];

/* ── PROCESS STEPS ── */
const processSteps = [
  { step: "01", title: "Discovery & Planning", desc: "We understand your business, goals, target audience & competitors to create a tailored website strategy." },
  { step: "02", title: "UI/UX Design", desc: "Our designers create wireframes & high-fidelity mockups that reflect your brand and optimize user experience." },
  { step: "03", title: "Development", desc: "Our developers bring designs to life with clean code, responsive layouts & all required functionality." },
  { step: "04", title: "Testing & QA", desc: "Rigorous testing across devices, browsers & performance benchmarks before going live." },
  { step: "05", title: "Launch & Support", desc: "We deploy your website, configure analytics & provide ongoing maintenance and support." }
];

export default function WebsiteDesignPage() {
  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Website Design & Development",
      provider: {
        "@type": "ProfessionalService",
        name: "Sure Marketing",
        url: "https://www.suremarketing.in",
        telephone: contact.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Surat",
          addressRegion: "Gujarat",
          addressCountry: "IN"
        }
      },
      description:
        "Professional website design & development services in Surat — E-commerce, Shopify, static websites, custom software, mobile apps & admin panels with SEO-friendly, mobile-responsive design.",
      areaServed: "Surat, Gujarat, India",
      serviceType: "Website Design & Development"
    }),
    []
  );

  return (
    <div className="webdesign-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ══════ HERO ══════ */}
      <section className="home-hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker">
              <Sparkles size={16} />
              Website Design & Development Agency
            </div>
            <h1>
              Professional Website Design{" "}
              <span className="gradient-text">in Surat.</span>
            </h1>
            <p>
              We design and develop stunning, SEO-friendly, mobile-responsive websites — from e-commerce stores and Shopify sites to custom software, mobile apps, and powerful admin panels. Built with modern technologies for speed, security & scalability.
            </p>
            <div className="hero-actions">
              <Link className="button primary" href="/contact">
                Get Free Quote <ArrowRight size={18} />
              </Link>
              <Link className="button secondary" href="/services">
                <Layers size={18} />
                All Services
              </Link>
            </div>
          </div>

          {/* Right side: Quick service overview */}
          <div className="wd-hero-services">
            <div className="wd-hero-card">
              <h3>What We Build</h3>
              <div className="wd-hero-list">
                {websiteTypes.map((w) => (
                  <div key={w.title} className="wd-hero-list-item">
                    <div className="wd-hero-list-icon" style={{ background: w.bg, color: w.color }}>
                      <w.icon size={18} />
                    </div>
                    <span>{w.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ WEBSITE TYPES ══════ */}
      <section className="wd-section">
        <div className="section-wrap">
          <div className="section-heading centered">
            <span className="eyebrow"><Layers size={14} /> What We Build</span>
            <h2>Websites & Apps We Develop</h2>
            <p>From simple business sites to complex enterprise software — we build it all.</p>
          </div>
          <div className="wd-types-grid">
            {websiteTypes.map((w) => (
              <div key={w.title} className="wd-type-card" style={{ "--card-accent": w.color }}>
                <div className="wd-type-icon" style={{ background: w.bg, color: w.color }}>
                  <w.icon size={24} />
                </div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
                <ul className="wd-type-features">
                  {w.features.map((f) => (
                    <li key={f}>
                      <CheckCircle2 size={14} /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ TECH STACK ══════ */}
      <section className="wd-section wd-tech-section">
        <div className="section-wrap">
          <div className="section-heading centered">
            <span className="eyebrow"><Code2 size={14} /> Technologies We Use</span>
            <h2>Our Technology Stack</h2>
            <p>We use the latest & most reliable technologies to build your digital products.</p>
          </div>
          <div className="wd-tech-grid">
            {techStack.map((cat) => (
              <div key={cat.category} className="wd-tech-category">
                <div className="wd-tech-cat-head">
                  <div className="wd-tech-cat-icon" style={{ background: cat.bg, color: cat.color }}>
                    <cat.icon size={20} />
                  </div>
                  <h3>{cat.category}</h3>
                </div>
                <div className="wd-tech-list">
                  {cat.techs.map((t) => (
                    <div key={t.name} className="wd-tech-chip">
                      <strong>{t.name}</strong>
                      <span>{t.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ KEY FEATURES ══════ */}
      <section className="wd-section">
        <div className="section-wrap">
          <div className="section-heading centered">
            <span className="eyebrow"><Zap size={14} /> Why Choose Us</span>
            <h2>Every Website We Build Includes</h2>
            <p>Industry-leading standards baked into every project from day one.</p>
          </div>
          <div className="wd-features-grid">
            {keyFeatures.map((f) => (
              <div key={f.title} className="wd-feature-card">
                <div className="wd-feature-icon">
                  <f.icon size={24} />
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ PROCESS ══════ */}
      <section className="wd-section wd-process-section">
        <div className="section-wrap">
          <div className="section-heading centered">
            <span className="eyebrow"><Sparkles size={14} /> Our Process</span>
            <h2>How We Build Your Website</h2>
            <p>A proven 5-step process that delivers results on time, every time.</p>
          </div>
          <div className="wd-process-grid">
            {processSteps.map((s) => (
              <div key={s.step} className="wd-process-step">
                <div className="wd-process-num">{s.step}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ INTERNAL LINKS ══════ */}
      <section className="wd-section">
        <div className="section-wrap">
          <div className="section-heading centered">
            <span className="eyebrow"><Globe2 size={14} /> Complete Digital Growth</span>
            <h2>Explore Our Other Services</h2>
            <p>Website design is just the beginning — grow your business with our full suite of digital marketing services in Surat.</p>
          </div>
          <div className="wd-links-grid">
            <Link href="/google-ads-expert" className="wd-link-card">
              <strong>Google Ads Management</strong>
              <span>Get instant leads with targeted PPC campaigns on Google Search & Display Network.</span>
              <span className="wd-link-arrow"><ArrowRight size={16} /></span>
            </Link>
            <Link href="/seo-expert" className="wd-link-card">
              <strong>SEO Services in Surat</strong>
              <span>Rank #1 on Google with on-page SEO, technical audits & authority backlinks.</span>
              <span className="wd-link-arrow"><ArrowRight size={16} /></span>
            </Link>
            <Link href="/social-media" className="wd-link-card">
              <strong>Social Media Marketing</strong>
              <span>Build brand authority with viral content, Meta ads & community engagement strategies.</span>
              <span className="wd-link-arrow"><ArrowRight size={16} /></span>
            </Link>
            <Link href="/services" className="wd-link-card">
              <strong>All Services Overview</strong>
              <span>See the complete list of digital marketing & IT solutions we offer in Surat.</span>
              <span className="wd-link-arrow"><ArrowRight size={16} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <CtaBand />
    </div>
  );
}
