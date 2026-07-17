import { CtaBand, ServiceDetail, ServicesPreview } from "@/components/Sections";

export const metadata = {
  title: "Digital Marketing Services | Google Ads, SEO, Social Media – Surat",
  description:
    "Sure Marketing offers Google Ads management, SEO, social media marketing, and website design in Surat. Get a connected marketing system that drives enquiries.",
  alternates: { canonical: "https://www.suremarketing.in/services" },
  openGraph: {
    title: "Digital Marketing Services | Google Ads, SEO, Social Media – Sure Marketing",
    description: "Performance ads, social media, SEO, and web design services from Sure Marketing, Surat.",
    url: "https://www.suremarketing.in/services"
  }
};

export default function ServicesPage() {
  return (
    <>
      <ServiceDetail
        eyebrow="Complete digital marketing services"
        title="A connected marketing system for your website, content, and paid campaigns."
        intro="Instead of treating every channel separately, we connect your customer journey from first click to final enquiry."
        bullets={[
          "Google Ads campaign planning and optimization",
          "Social media content and account management",
          "Website design focused on lead generation",
          "SEO improvements for local and organic visibility"
        ]}
      />
      <ServicesPreview />
      <CtaBand />
    </>
  );
}
