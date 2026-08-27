import { CtaBand, ServiceDetail, ServicesPreview } from "@/components/Sections";

export const metadata = {
  title: "Digital Marketing in Surat | Website Design, Google Ads & Social Media",
  description:
    "Looking for top digital marketing in Surat? Sure Marketing provides expert Google Ads management, responsive website design in Surat, social media marketing, and SEO to accelerate business growth.",
  keywords: [
    "digital marketing in surat",
    "website design in surat",
    "google ads agency in surat",
    "social media marketing in surat",
    "seo services surat",
    "best website developer in surat",
    "social media marketing agency surat",
    "ppc company in surat"
  ],
  alternates: { canonical: "https://www.suremarketing.in/services" },
  openGraph: {
    title: "Digital Marketing in Surat | Website Design, Google Ads & Social Media | Sure Marketing",
    description: "Expert Google Ads agency, custom website design, SEO, and social media marketing in Surat.",
    url: "https://www.suremarketing.in/services"
  }
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Digital Marketing & IT Solutions",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Sure Marketing",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Surat",
      "addressRegion": "Gujarat",
      "addressCountry": "IN"
    }
  },
  "areaServed": {
    "@type": "City",
    "name": "Surat"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Sure Marketing Digital Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Google Ads Agency in Surat"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Website Design in Surat"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Social Media Marketing in Surat"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Search Engine Optimization (SEO) in Surat"
        }
      }
    ]
  }
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <ServiceDetail
        eyebrow="Digital Marketing & IT Services in Surat"
        title="Full-Stack Digital Marketing in Surat to Scale Revenue & Brand Authority."
        intro="From high-intent Google Ads and custom website design in Surat to organic SEO and viral social media marketing, we build an integrated system that turns visitors into high-paying clients."
        bullets={[
          "Google Ads agency in Surat — High ROI Search, Display & Performance Max campaigns",
          "Website design in Surat — Conversion-optimized, lightning-fast responsive websites",
          "Social media marketing in Surat — High-engagement content & targeted Instagram/Meta ads",
          "SEO in Surat — Local Map Pack rankings & high-converting keyword visibility"
        ]}
      />
      <ServicesPreview />
      <CtaBand />
    </>
  );
}
