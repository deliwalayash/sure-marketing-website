import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Globe2,
  Megaphone,
  Orbit,
  Search,
  Sparkles,
  Star,
  TrendingUp
} from "lucide-react";
import { HeroDashboard } from "@/components/HeroDashboard";
import { caseStats, contact, mockBlogs, plans, services, testimonials } from "@/data/site";

const serviceIcons = [Megaphone, Orbit, Globe2, Search];

export function Hero() {
  return (
    <section className="home-hero">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-kicker">
            <Sparkles size={16} />
            Digital Marketing &amp; IT Agency
          </div>
          <h1>
            Top Digital Marketing &amp;{" "}
            <span className="gradient-text">IT Solutions.</span>
          </h1>
          <p>
            Sure Marketing blends high-performance ads, custom web &amp; IT solutions, SEO, and strategic branding into one powerful growth engine for modern businesses.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/contact">
              Get Free Strategy <ArrowRight size={18} />
            </Link>
            <Link className="button secondary" href="/services">
              <BarChart3 size={18} />
              Explore Services
            </Link>
          </div>
          <div className="hero-social-proof">
            <div className="hero-avatars">
              <span className="hero-avatar" style={{ background: "linear-gradient(135deg, #0284c7, #2563eb)" }}>Y</span>
              <span className="hero-avatar" style={{ background: "linear-gradient(135deg, #38bdf8, #0284c7)" }}>S</span>
              <span className="hero-avatar" style={{ background: "linear-gradient(135deg, #10b981, #0d9488)" }}>M</span>
            </div>
            <div className="hero-proof-text">
              <span>Trusted by 50+ businesses to drive real growth.</span>
              <span className="hero-rating">
                <Star size={14} fill="#fbbf24" stroke="#fbbf24" />
                <Star size={14} fill="#fbbf24" stroke="#fbbf24" />
                <Star size={14} fill="#fbbf24" stroke="#fbbf24" />
                <Star size={14} fill="#fbbf24" stroke="#fbbf24" />
                <Star size={14} fill="#fbbf24" stroke="#fbbf24" />
                <strong>4.9/5</strong> Client Rating
              </span>
            </div>
          </div>
        </div>

        <HeroDashboard />
      </div>
    </section>
  );
}

export function StatsBand() {
  return (
    <section className="stats-strip">
      {caseStats.map((item) => (
        <div key={item.label}>
          <strong>{item.value}</strong>
          <span>{item.label}</span>
        </div>
      ))}
    </section>
  );
}

export function ServicesPreview() {
  return (
    <section className="section-block">
      <div className="section-heading split-heading">
        <div>
          <p className="eyebrow">What we build</p>
          <h2>Creative execution connected to measurable growth.</h2>
        </div>
        <p>
          Each service is designed to fit into one clear customer journey: attract attention, earn trust, and convert
          it into enquiries.
        </p>
      </div>

      <div className="service-grid">
        {services.map((service, index) => {
          const Icon = serviceIcons[index % serviceIcons.length];
          return (
            <article className="glass-card service-card" key={service.title}>
              <div className="card-icon">
                <Icon size={24} />
              </div>
              <p className="eyebrow">{service.eyebrow}</p>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              <Link href={`/${service.slug}`}>
                Learn more <ArrowRight size={16} />
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function Process() {
  const steps = [
    ["Discover", "We map your audience, offers, current website, and lead gaps."],
    ["Design", "We shape the dark, premium experience and campaign message."],
    ["Launch", "Pages, ads, content, tracking, and reporting go live together."],
    ["Optimize", "We improve based on enquiry quality, conversion cost, and user behavior."]
  ];

  return (
    <section className="section-block process-section">
      <div className="section-heading">
        <p className="eyebrow">Our rhythm</p>
        <h2>A clear process for moving from idea to growth engine.</h2>
      </div>
      <div className="process-grid">
        {steps.map(([title, text], index) => (
          <article className="process-card" key={title}>
            <span>0{index + 1}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function BlogPreview() {
  return (
    <section className="section-block">
      <div className="section-heading split-heading">
        <div>
          <p className="eyebrow">Latest thinking</p>
          <h2>Insights & Growth Strategies.</h2>
        </div>
        <Link className="text-link" href="/blog">
          View all posts <ArrowRight size={16} />
        </Link>
      </div>
      <div className="blog-grid">
        {mockBlogs.map((post) => (
          <article className="blog-card" key={post.title}>
            <span>{post.category}</span>
            <h3>{post.title}</h3>
            <p>{post.date}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="cta-band">
      <div>
        <p className="eyebrow">Next step</p>
        <h2>Ready to scale your business with measurable marketing?</h2>
      </div>
      <div className="hero-actions">
        <Link className="button primary" href="/contact">
          Start Project
        </Link>
        <a className="button secondary" href={contact.whatsapp}>
          WhatsApp
        </a>
      </div>
    </section>
  );
}

export function PricingCards() {
  return (
    <section className="section-block">
      <div className="section-heading">
        <p className="eyebrow">Pricing</p>
        <h1>Simple packages for growth experiments.</h1>
      </div>
      <div className="service-grid">
        {plans.map((plan) => (
          <article className={plan.featured ? "glass-card price-card featured" : "glass-card price-card"} key={plan.name}>
            {plan.featured && <span className="badge">Popular</span>}
            <h3>{plan.name}</h3>
            <strong>{plan.price}</strong>
            <p>{plan.detail}</p>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <CheckCircle2 size={17} /> {feature}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="section-block">
      <div className="section-heading">
        <p className="eyebrow">Client signal</p>
        <h2>Built for founders who want clarity, creative polish, and useful reports.</h2>
      </div>
      <div className="service-grid">
        {testimonials.map((item) => (
          <article className="glass-card quote-card" key={item.name}>
            <Star size={19} />
            <p>"{item.quote}"</p>
            <strong>{item.name}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ServiceDetail({ title, eyebrow, intro, bullets }) {
  return (
    <section className="section-block service-detail-hero">
      <div className="service-detail-inner">
        {eyebrow && (
          <div className="hero-kicker" style={{ marginBottom: "0.85rem" }}>
            <Sparkles size={15} />
            {eyebrow}
          </div>
        )}
        <h1>{title}</h1>
        {intro && <p className="service-detail-intro">{intro}</p>}

        {bullets && bullets.length > 0 && (
          <div className="service-bullets-grid">
            {bullets.map((item) => (
              <div className="service-bullet-item" key={item}>
                <span className="bullet-icon-wrap">
                  <CheckCircle2 size={18} />
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}

        <div className="hero-actions" style={{ marginTop: "2rem" }}>
          <Link className="button primary" href="/contact">
            Discuss This Service <ArrowRight size={17} />
          </Link>
          <a className="button secondary" href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}

export function LocationMap() {
  return (
    <section className="section-block map-section" style={{ width: "min(1200px, calc(100% - 2rem))", margin: "4rem auto 1rem" }}>
      <div
        style={{
          background: "#ffffff",
          border: "1px solid var(--line)",
          borderRadius: "28px",
          padding: "clamp(1.5rem, 3vw, 2.5rem)",
          boxShadow: "0 10px 30px -5px rgba(15, 23, 42, 0.05)"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          <div>
            <p className="eyebrow" style={{ marginBottom: "0.4rem" }}>Our Location</p>
            <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.85rem)", fontWeight: 900, color: "#0f172a", margin: 0 }}>
              Visit Sure Marketing in Surat
            </h2>
            <p style={{ color: "var(--muted-strong)", marginTop: "0.35rem", fontSize: "0.95rem" }}>{contact.address}</p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <a
              href="https://maps.google.com/?q=Sure+Marketing+Surat"
              target="_blank"
              rel="noopener noreferrer"
              className="button secondary"
              style={{ padding: "0.6rem 1.25rem", fontSize: "0.88rem" }}
            >
              Get Directions ↗
            </a>
            <Link
              href="/contact"
              className="button primary"
              style={{ padding: "0.6rem 1.25rem", fontSize: "0.88rem" }}
            >
              Book Strategy Call
            </Link>
          </div>
        </div>

        <div
          style={{
            width: "100%",
            height: "420px",
            borderRadius: "20px",
            overflow: "hidden",
            border: "1px solid var(--line)",
            background: "#f1f5f9"
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.3232854357366!2d72.76660747681186!3d21.13952898053771!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa4c04785ca442b21%3A0x27461d81a67074fa!2sSure%20Marketing!5e0!3m2!1sen!2sin!4v1787812661293!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, display: "block" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Sure Marketing Office Location"
          />
        </div>
      </div>
    </section>
  );
}
