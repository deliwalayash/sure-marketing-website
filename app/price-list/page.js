import { CtaBand, PricingCards } from "@/components/Sections";

export const metadata = {
  title: "Digital Marketing Pricing | Sure Marketing Surat",
  description:
    "Transparent pricing for digital marketing services in Surat. Sure Marketing offers Starter, Growth, and Scale plans for Google Ads, social media, SEO, and more.",
  alternates: { canonical: "https://www.suremarketing.in/price-list" },
  openGraph: {
    title: "Digital Marketing Pricing | Sure Marketing Surat",
    description: "Simple, transparent pricing for Google Ads, SEO, and social media marketing. Sure Marketing, Surat.",
    url: "https://www.suremarketing.in/price-list"
  }
};

export default function PriceListPage() {
  return (
    <>
      <PricingCards />
      <CtaBand />
    </>
  );
}
