export const contact = {
  phone: "+91 97129 52456",
  phoneHref: "tel:+919712952456",
  whatsapp: "https://wa.me/919712952456",
  email: "yashdeliwala10@gmail.com",
  emailHref: "mailto:yashdeliwala10@gmail.com",
  address: "Vesu, Surat, India"
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Videos", href: "/videos" },
  { label: "Pricing", href: "/price-list" },
  { label: "Blog", href: "/blog" },
  { label: "Career", href: "/career" },
  { label: "Contact", href: "/contact" }
];

export const footerLinkGroups = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Videos", href: "/videos" },
      { label: "Career", href: "/career" },
      { label: "Contact", href: "/contact" }
    ]
  },
  {
    title: "Services",
    links: [
      { label: "All Services", href: "/services" },
      { label: "Google Ads Expert", href: "/google-ads-expert" },
      { label: "Social Media Marketing", href: "/social-media" },
      { label: "Price List", href: "/price-list" }
    ]
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Free Strategy Call", href: "/contact" },
      { label: "WhatsApp", href: contact.whatsapp }
    ]
  }
];

export const services = [
  {
    title: "Performance Ads",
    slug: "google-ads-expert",
    eyebrow: "Google Ads / Meta Ads",
    summary:
      "Campaign systems built for lead quality, conversion tracking, and budget control.",
    points: ["Search campaigns", "Remarketing", "Weekly optimization"]
  },
  {
    title: "Social Growth",
    slug: "social-media",
    eyebrow: "Content / Reels / Community",
    summary:
      "A consistent content engine that makes your brand look alive, sharp, and trusted.",
    points: ["Content calendar", "Creative direction", "Profile management"]
  },
  {
    title: "Conversion Websites",
    slug: "services",
    eyebrow: "Next.js / Landing Pages",
    summary:
      "Fast dark-mode websites with strong sections, clear CTAs, and enquiry-first layouts.",
    points: ["Responsive UI", "SEO structure", "Lead forms"]
  },
  {
    title: "Search Visibility",
    slug: "services",
    eyebrow: "SEO / Local Search",
    summary:
      "Practical SEO improvements that help people find your business when intent is high.",
    points: ["On-page SEO", "Local SEO", "Content planning"]
  }
];

export const caseStats = [
  { value: "4.8x", label: "average lead clarity improvement" },
  { value: "50+", label: "campaign flows planned" },
  { value: "24h", label: "response rhythm" },
  { value: "2026", label: "modern stack ready" }
];

export const plans = [
  {
    name: "Starter",
    price: "₹9,999",
    detail: "For businesses beginning their digital growth.",
    features: ["Social setup", "8 creatives", "Basic reporting", "WhatsApp support"]
  },
  {
    name: "Growth",
    price: "₹19,999",
    detail: "For lead generation and stronger online presence.",
    featured: true,
    features: ["Ad management", "12 creatives", "Landing suggestions", "Weekly review"]
  },
  {
    name: "Scale",
    price: "Custom",
    detail: "For teams that need a connected growth system.",
    features: ["Multi-channel plan", "SEO roadmap", "Advanced tracking", "Priority support"]
  }
];

export const testimonials = [
  {
    quote:
      "The strategy became easier to understand because the team focused on leads and reporting.",
    name: "Service Business Founder"
  },
  {
    quote:
      "Our online presence finally looked current, and enquiries became easier to track.",
    name: "Local Brand Owner"
  },
  {
    quote:
      "Sharp creative ideas, fast communication, and practical campaign improvements.",
    name: "Retail Partner"
  }
];

export const mockBlogs = [
  {
    title: "How to plan campaigns before spending ad budget",
    category: "Performance",
    date: "Jul 2026"
  },
  {
    title: "Why service businesses need better landing pages",
    category: "Web",
    date: "Jun 2026"
  },
  {
    title: "The simple reporting dashboard every founder needs",
    category: "Analytics",
    date: "Jun 2026"
  }
];
