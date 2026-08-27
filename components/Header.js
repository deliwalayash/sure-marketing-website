"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";

const serviceItems = [
  { label: "Website Design", href: "/website-design" },
  { label: "Google Ads", href: "/google-ads-expert" },
  { label: "SEO Services", href: "/seo-expert" },
  { label: "Social Media Marketing", href: "/social-media" }
];

const pageItems = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Videos", href: "/videos" },
  { label: "Pricing Packages", href: "/price-list" },
  { label: "Blog & Insights", href: "/blog" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Careers", href: "/career" }
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const servicesRef = useRef(null);
  const pagesRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
      if (pagesRef.current && !pagesRef.current.contains(event.target)) {
        setPagesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeAll = useCallback(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setPagesOpen(false);
  }, []);

  return (
    <header className="site-header">
      <Link className="brand" href="/" onClick={closeAll} aria-label="Sure Marketing Home">
        <Image
          src="/images/logo.png"
          alt="Sure Marketing"
          width={180}
          height={60}
          className="brand-logo"
          priority
        />
      </Link>

      <nav className={`nav-menu ${mobileOpen ? "is-open" : ""}`} aria-label="Primary navigation">
        <Link href="/" onClick={closeAll} className="nav-link">
          Home
        </Link>

        {/* ── Services Dropdown ── */}
        <div
          className={`nav-dropdown ${servicesOpen ? "is-active" : ""}`}
          ref={servicesRef}
          onMouseEnter={() => setServicesOpen(true)}
          onMouseLeave={() => setServicesOpen(false)}
        >
          <button
            type="button"
            className="nav-dropdown-trigger"
            onClick={() => setServicesOpen((prev) => !prev)}
            aria-expanded={servicesOpen}
          >
            <span>Services</span>
            <ChevronDown size={14} className={`dropdown-arrow ${servicesOpen ? "open" : ""}`} />
          </button>

          <div className="nav-dropdown-menu">
            {serviceItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={closeAll} className="dropdown-item">
                {item.label}
              </Link>
            ))}
            <div className="dropdown-divider" />
            <Link href="/services" onClick={closeAll} className="dropdown-item dropdown-item-all">
              All Services →
            </Link>
          </div>
        </div>

        <Link href="/about" onClick={closeAll} className="nav-link">
          About Us
        </Link>
        <Link href="/contact" onClick={closeAll} className="nav-link">
          Contact Us
        </Link>

        {/* ── Pages Dropdown ── */}
        <div
          className={`nav-dropdown ${pagesOpen ? "is-active" : ""}`}
          ref={pagesRef}
          onMouseEnter={() => setPagesOpen(true)}
          onMouseLeave={() => setPagesOpen(false)}
        >
          <button
            type="button"
            className="nav-dropdown-trigger"
            onClick={() => setPagesOpen((prev) => !prev)}
            aria-expanded={pagesOpen}
          >
            <span>Pages</span>
            <ChevronDown size={14} className={`dropdown-arrow ${pagesOpen ? "open" : ""}`} />
          </button>

          <div className="nav-dropdown-menu">
            {pageItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={closeAll} className="dropdown-item">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mobile-cta-wrap">
          <Link className="header-cta mobile-only-cta" href="/contact" onClick={closeAll}>
            <span>Start Project</span>
            <Sparkles size={14} />
          </Link>
        </div>
      </nav>

      <div className="header-actions">
        <Link className="header-cta desktop-only-cta" href="/contact" onClick={closeAll}>
          <span>Start Project</span>
          <Sparkles size={14} />
        </Link>

        <button
          className="menu-button"
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((current) => !current)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
