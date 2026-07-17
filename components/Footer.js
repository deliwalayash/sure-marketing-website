import Link from "next/link";
import { Facebook, Instagram, Linkedin, MessageCircle, Phone } from "lucide-react";
import { contact, footerLinkGroups } from "@/data/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <Link className="brand" href="/">
            <span className="brand-orbit">SM</span>
            <span>Sure Marketing</span>
          </Link>
          <p>
            Dark, modern digital experiences backed by ads, content, search, and sharp reporting.
          </p>
        </div>

        <nav className="footer-sitemap" aria-label="Footer navigation">
          {footerLinkGroups.map((group) => (
            <div className="footer-link-group" key={group.title}>
              <h2>{group.title}</h2>
              <div className="footer-links">
                {group.links.map((item) =>
                  item.href.startsWith("http") ? (
                    <a key={item.href} href={item.href}>
                      {item.label}
                    </a>
                  ) : (
                    <Link key={item.href} href={item.href}>
                      {item.label}
                    </Link>
                  )
                )}
              </div>
            </div>
          ))}
        </nav>

        <div className="social-row">
          <a href="https://www.facebook.com/suremarketingg/" aria-label="Facebook">
            <Facebook size={18} />
          </a>
          <a href="https://www.instagram.com/suremarketing_digi" aria-label="Instagram">
            <Instagram size={18} />
          </a>
          <a href="https://www.linkedin.com/in/yash-deliwala-fsd/" aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Sure Marketing.</span>
        <span>{contact.address}</span>
      </div>

      <div className="floating-actions">
        <a href={contact.whatsapp} aria-label="Chat on WhatsApp">
          <MessageCircle size={21} />
        </a>
        <a href={contact.phoneHref} aria-label="Call Sure Marketing">
          <Phone size={21} />
        </a>
      </div>
    </footer>
  );
}
