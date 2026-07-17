import Image from "next/image";
import { CtaBand } from "@/components/Sections";

export const metadata = {
  title: "Portfolio | Digital Marketing Work – Sure Marketing Surat",
  description:
    "View Sure Marketing's portfolio — Google Ads dashboards for healthcare clients and websites built for Nitram and Om Steel. Real results from real campaigns.",
  alternates: { canonical: "https://www.suremarketing.in/portfolio" },
  openGraph: {
    title: "Portfolio | Sure Marketing Surat",
    description: "Google Ads campaigns, website projects, and digital marketing work by Sure Marketing.",
    url: "https://www.suremarketing.in/portfolio"
  }
};

export default function PortfolioPage() {
  const projects = [
    {
      title: "Gynaecologist Google Ads Dashboard",
      image: "/images/google-ads-3.png",
      link: null,
      linkLabel: null
    },
    {
      title: "Psychologist Google Ads Dashboard",
      image: "/images/psychologist-google-ads.png",
      link: null,
      linkLabel: null
    },
    {
      title: "Marina Grand Hospital Google Ads Dashboard",
      image: "/images/marina-grand-hospital-goolge-ads.png",
      link: null,
      linkLabel: null
    },
    {
      title: "Nitram Website",
      image: "/images/nitram-website.png",
      link: "https://nitram.co.in",
      linkLabel: "nitram.co.in"
    },
    {
      title: "Om Steel Website",
      image: "/images/omsteel-website.png",
      link: "https://omsteel.co.in",
      linkLabel: "omsteel.co.in"
    }
  ];

  return (
    <>
      <section className="section-pad">
        <div className="section-heading">
          <p className="eyebrow">Portfolio</p>
          <h1>Marketing work shaped around visibility, leads, and performance clarity.</h1>
        </div>
        <div style={{ display: "grid", gap: "2.5rem", maxWidth: "min(100%, 860px)" }}>
          {projects.map(({ title, image, link, linkLabel }) => (
            <article key={title} style={{ border: "1px solid var(--line)", borderRadius: "24px", overflow: "hidden", background: "linear-gradient(180deg, var(--panel-strong), rgba(255,255,255,0.035))", boxShadow: "0 24px 70px rgba(0,0,0,0.22)" }}>
              <Image src={image} alt={title} width={860} height={540} style={{ width: "100%", height: "auto", display: "block" }} />
              <div style={{ padding: "1.25rem 1.5rem 1.5rem" }}>
                <h2 style={{ margin: "0 0 0.5rem", fontSize: "1.35rem", lineHeight: 1.2 }}>{title}</h2>
                {link && (
                  <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", fontSize: "0.95rem", fontWeight: 700 }}>
                    {linkLabel} ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
