import { CtaBand, ServiceDetail } from "@/components/Sections";

export const metadata = {
  title: "Google Ads Expert in Surat | Sure Marketing",
  description:
    "Hire a Google Ads expert in Surat. Sure Marketing manages search campaigns, conversion tracking, ad copy, and weekly optimization to generate quality leads for your business.",
  alternates: { canonical: "https://www.suremarketing.in/google-ads-expert" },
  openGraph: {
    title: "Google Ads Expert in Surat | Sure Marketing",
    description: "Google Ads campaign planning, tracking, and optimization. Get quality leads with Sure Marketing, Surat.",
    url: "https://www.suremarketing.in/google-ads-expert"
  }
};

export default function GoogleAdsExpertPage() {
  return (
    <>
      <ServiceDetail
        eyebrow="Google Ads expert"
        title="Campaigns built around lead quality, budget control, and clear reporting."
        intro="We plan search campaigns, landing page messages, conversion tracking, and weekly improvements so your ad spend has a cleaner growth path."
        bullets={[
          "Search campaign structure and keyword planning",
          "Conversion tracking and enquiry source clarity",
          "Ad copy, extensions, and landing page alignment",
          "Optimization based on cost, quality, and lead intent"
        ]}
      />
      <CtaBand />
    </>
  );
}
