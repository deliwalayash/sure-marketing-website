import { BlogPreview, CtaBand, Hero, Process, ServicesPreview, StatsBand } from "@/components/Sections";

const baseUrl = "https://www.suremarketing.in";

export const metadata = {
  title: "Sure Marketing | Digital Marketing Agency in Surat",
  description:
    "Sure Marketing is a digital marketing agency in Surat. We run Google Ads, manage SEO, build websites, and handle social media to grow your business with measurable results.",
  keywords: [
    "digital marketing agency Surat",
    "Google Ads Surat",
    "SEO agency Surat",
    "social media marketing Surat",
    "performance marketing Surat",
    "lead generation Surat",
    "website design Surat",
    "Sure Marketing Surat",
    "online marketing Surat",
    "digital marketing consultant Gujarat"
  ],
  alternates: { canonical: baseUrl },
  openGraph: {
    title: "Sure Marketing | Digital Marketing Agency in Surat",
    description: "Google Ads, SEO, Social Media & Website Design — Sure Marketing, Surat.",
    url: baseUrl
  }
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Sure Marketing",
  "description": "Digital marketing agency in Surat offering Google Ads, SEO, social media, and website design services.",
  "url": baseUrl,
  "telephone": "+919712952456",
  "email": "yashdeliwala10@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Surat",
    "addressRegion": "Gujarat",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "21.1702",
    "longitude": "72.8311"
  },
  "areaServed": "India",
  "serviceType": ["Google Ads", "SEO", "Social Media Marketing", "Website Design"],
  "priceRange": "₹₹"
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
      <CtaBand />
    </>
  );
}
