import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, MessageCircle, Phone } from "lucide-react";
import { contact, footerLinkGroups } from "@/data/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <Link className="brand" href="/" aria-label="Sure Marketing Home">
            <Image
              src="/images/logo.png"
              alt="Sure Marketing"
              width={200}
              height={66}
              className="brand-logo"
            />
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

      {/* Mobile Bottom Sticky Bar (Call Now & WhatsApp) */}
      <div className="mobile-bottom-bar">
        <a href={contact.phoneHref} className="mobile-bar-btn call-btn" aria-label="Call Now">
          <Phone size={19} />
          <span>Call Now</span>
        </a>
        <a href={contact.whatsapp} className="mobile-bar-btn whatsapp-btn" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          <MessageCircle size={19} />
          <span>WhatsApp</span>
        </a>
      </div>

      {/* Desktop Floating Action Buttons */}
      <div className="desktop-floating-actions">
        <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="desktop-fab whatsapp-fab" aria-label="Chat on WhatsApp">
          <MessageCircle size={22} />
        </a>
        <a href={contact.phoneHref} className="desktop-fab phone-fab" aria-label="Call Sure Marketing">
          <Phone size={22} />
        </a>
      </div>
    </footer>
  );
}
