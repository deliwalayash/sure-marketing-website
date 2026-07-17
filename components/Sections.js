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
            Performance Marketing That Delivers
          </div>
          <h1>
            Top Digital{" "}
            <span className="gradient-text">Marketing Agency.</span>
          </h1>
          <p>
            Sure Marketing blends performance ads, conversion-focused websites, SEO, and content into one premium
            digital presence for modern businesses.
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
              <span className="hero-avatar" style={{ background: "linear-gradient(135deg, #a855f7, #7c3aed)" }}>Y</span>
              <span className="hero-avatar" style={{ background: "linear-gradient(135deg, #d946ef, #a855f7)" }}>S</span>
              <span className="hero-avatar" style={{ background: "linear-gradient(135deg, #8b5cf6, #6366f1)" }}>M</span>
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
          <h2>Blog preview now, Supabase-powered posts later.</h2>
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
        <h2>Let's create the first premium version, then connect the admin system.</h2>
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
    <section className="section-block page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{intro}</p>
      <div className="detail-list">
        {bullets.map((item) => (
          <div key={item}>
            <TrendingUp size={20} />
            <span>{item}</span>
          </div>
        ))}
      </div>
      <Link className="button primary" href="/contact">
        Discuss This Service
      </Link>
    </section>
  );
}
