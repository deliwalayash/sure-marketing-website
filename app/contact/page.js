import { Mail, MapPin, Phone } from "lucide-react";
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
    <section className="section-pad contact-page">
      <div className="contact-copy">
        <p className="eyebrow">Contact</p>
        <h1>Let's grow your business together.</h1>
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
        <button className="button" type="submit">
          Submit Message
        </button>
      </form>
    </section>
  );
}
