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
      { label: "About Yash & Team", href: "/about" },
      { label: "Client Portfolio", href: "/portfolio" },
      { label: "Video Showcase", href: "/videos" },
      { label: "Join Our Team (Careers)", href: "/career" },
      { label: "Contact & Location", href: "/contact" }
    ]
  },
  {
    title: "Services in Surat",
    links: [
      { label: "Google Ads Agency in Surat", href: "/google-ads-expert" },
      { label: "Website Design in Surat", href: "/website-design" },
      { label: "Social Media Marketing Surat", href: "/social-media" },
      { label: "SEO Agency in Surat", href: "/seo-expert" },
      { label: "All Marketing Packages", href: "/price-list" }
    ]
  },
  {
    title: "Resources & Insights",
    links: [
      { label: "Marketing Blog & Guides", href: "/blog" },
      { label: "Book Free Strategy Call", href: "/contact" },
      { label: "WhatsApp Direct Chat", href: contact.whatsapp },
      { label: "Client Testimonials", href: "/testimonials" }
    ]
  }
];

export const services = [
  {
    title: "Google Ads Agency Surat",
    slug: "google-ads-expert",
    eyebrow: "Google Ads / PPC Management",
    summary:
      "High-intent PPC search campaigns and Performance Max ads built for verified B2B/B2C leads and maximum ROAS.",
    points: ["Search & Performance Max", "Conversion tracking", "Weekly ROAS optimization"]
  },
  {
    title: "Social Media Marketing Surat",
    slug: "social-media",
    eyebrow: "Instagram / Meta Ads / Content",
    summary:
      "High-engagement reels, carousel campaigns, and targeted Meta ads that build brand authority and customer trust.",
    points: ["Viral reel content", "Meta lead ads", "Community growth"]
  },
  {
    title: "Website Design in Surat",
    slug: "website-design",
    eyebrow: "Next.js / Responsive Web Design",
    summary:
      "Fast, high-converting modern websites designed to capture high-intent leads and rank effortlessly on Google.",
    points: ["Mobile-first responsive UI", "Built-in SEO structure", "Lead capture funnels"]
  },
  {
    title: "SEO Agency in Surat",
    slug: "seo-expert",
    eyebrow: "Google Ranking / Local Map Pack",
    summary:
      "Strategic on-page SEO, technical audits, and local search visibility that rank your business on Google's 1st page.",
    points: ["Google Map Pack SEO", "High-intent keyword ranking", "Authority link building"]
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
