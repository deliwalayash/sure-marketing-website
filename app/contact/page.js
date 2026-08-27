import { Mail, MapPin, Phone, ExternalLink } from "lucide-react";
import { contact } from "@/data/site";

export const metadata = {
  title: "Contact Sure Marketing | Digital Marketing Agency Surat",
  description:
    "Contact Sure Marketing in Surat for Google Ads, SEO, social media, and website design services. Get a free strategy call and start growing your business today.",
  alternates: { canonical: "https://www.suremarketing.in/contact" },
  openGraph: {
    title: "Contact Sure Marketing | Digital Marketing Agency Surat",
    description: "Get in touch with Sure Marketing in Surat for a free digital marketing strategy call.",
    url: "https://www.suremarketing.in/contact"
  }
};

export default function ContactPage() {
  return (
    <>
      <section className="section-pad contact-page">
        <div className="contact-copy">
          <p className="eyebrow">Contact</p>
          <h1>Let&apos;s grow your business together.</h1>
          <p>Send a message with your goal, service area, and current challenge. We will respond within 24-48 hours.</p>
          <div className="contact-list">
            <a href={contact.phoneHref}>
              <Phone size={19} /> {contact.phone}
            </a>
            <a href={contact.emailHref}>
              <Mail size={19} /> {contact.email}
            </a>
            <span>
              <MapPin size={19} /> {contact.address}
            </span>
          </div>
        </div>

        <form className="contact-form" action="https://api.web3forms.com/submit" method="POST">
          <input type="hidden" name="access_key" value="104e434f-e572-4313-958e-5d00f7e42adb" />
          <label>
            Full Name
            <input name="name" type="text" required />
          </label>
          <label>
            Email
            <input name="email" type="email" required />
          </label>
          <label>
            Phone
            <input name="phone" type="tel" />
          </label>
          <label>
            Service Needed
            <select name="service" defaultValue="Google Ads">
              <option>Google Ads</option>
              <option>Social Media</option>
              <option>Website Design</option>
              <option>SEO</option>
              <option>Full Marketing Plan</option>
            </select>
          </label>
          <label>
            Message
            <textarea name="message" rows="5" required />
          </label>
          <button className="button primary" type="submit">
            Submit Message
          </button>
        </form>
      </section>

      {/* Google Maps Location Section */}
      <section className="map-section" style={{ width: "min(1200px, calc(100% - 2rem))", margin: "0 auto 4.5rem" }}>
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
              <p className="eyebrow" style={{ marginBottom: "0.4rem" }}>Location</p>
              <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.85rem)", fontWeight: 900, color: "#0f172a", margin: 0 }}>
                Visit Sure Marketing Office
              </h2>
              <p style={{ color: "var(--muted-strong)", marginTop: "0.35rem", fontSize: "0.95rem" }}>{contact.address}</p>
            </div>
            <a
              href="https://maps.google.com/?q=Sure+Marketing+Surat"
              target="_blank"
              rel="noopener noreferrer"
              className="button secondary"
              style={{ padding: "0.6rem 1.25rem", fontSize: "0.88rem" }}
            >
              <span>Open in Google Maps</span>
              <ExternalLink size={16} />
            </a>
          </div>

          <div
            style={{
              width: "100%",
              height: "440px",
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
              title="Sure Marketing Location Map"
            />
          </div>
        </div>
      </section>
    </>
  );
}
