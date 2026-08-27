import { BlogPreview, CtaBand, Hero, LocationMap, Process, ServicesPreview, StatsBand } from "@/components/Sections";

const baseUrl = "https://www.suremarketing.in";

export const metadata = {
  title: "Digital Marketing in Surat | Google Ads, SEO & Website Design | Sure Marketing",
  description:
    "Sure Marketing is the leading digital marketing agency in Surat and IT solutions partner. We deliver high-ROI Google Ads, custom website design, SEO, and social media marketing for ambitious businesses.",
  keywords: [
    "digital marketing in surat",
    "digital marketing agency in surat",
    "website design in surat",
    "google ads agency in surat",
    "social media marketing in surat",
    "seo agency in surat",
    "best digital marketing company in surat",
    "web development in surat",
    "performance marketing agency surat",
    "Sure Marketing Surat"
  ],
  alternates: { canonical: baseUrl },
  openGraph: {
    title: "Digital Marketing in Surat | Google Ads, SEO & Website Design | Sure Marketing",
    description: "Top digital marketing agency and IT solutions partner in Surat. Google Ads, SEO, Social Media & Website Design.",
    url: baseUrl,
    type: "website"
  }
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Sure Marketing",
  "image": "https://www.suremarketing.in/images/logo.png",
  "description": "Top digital marketing agency and IT solutions company in Surat offering Google Ads, SEO, social media marketing, and website design services.",
  "url": baseUrl,
  "telephone": "+919712952456",
  "email": "yashdeliwala10@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Surat, Gujarat, India",
    "addressLocality": "Surat",
    "addressRegion": "Gujarat",
    "postalCode": "395001",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "21.1395",
    "longitude": "72.7666"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "09:00",
    "closes": "19:00"
  },
  "areaServed": [
    { "@type": "City", "name": "Surat" },
    { "@type": "State", "name": "Gujarat" },
    { "@type": "Country", "name": "India" }
  ],
  "serviceType": [
    "Digital Marketing in Surat",
    "Google Ads Agency in Surat",
    "Website Design in Surat",
    "Social Media Marketing in Surat",
    "Search Engine Optimization (SEO)"
  ],
  "priceRange": "₹₹",
  "sameAs": [
    "https://www.facebook.com/suremarketingg/",
    "https://www.instagram.com/suremarketing_digi",
    "https://www.linkedin.com/in/yash-deliwala-fsd/"
  ]
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Hero />
      <StatsBand />
      <ServicesPreview />
      <Process />
      <BlogPreview />
      <LocationMap />
      <CtaBand />
    </>
  );
}
