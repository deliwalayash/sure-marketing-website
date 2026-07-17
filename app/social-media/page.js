import { CtaBand, ServiceDetail } from "@/components/Sections";

export const metadata = {
  title: "Social Media Marketing in Surat | Sure Marketing",
  description:
    "Social media marketing services in Surat — content planning, Reels, creatives, and profile management. Sure Marketing helps your brand look active and build trust online.",
  alternates: { canonical: "https://www.suremarketing.in/social-media" },
  openGraph: {
    title: "Social Media Marketing in Surat | Sure Marketing",
    description: "Content planning, Reels, and social media management for Surat businesses. Sure Marketing.",
    url: "https://www.suremarketing.in/social-media"
  }
};

export default function SocialMediaPage() {
  return (
    <>
      <ServiceDetail
        eyebrow="Social media marketing"
        title="A sharper social presence for brands that need trust before the enquiry."
        intro="We organize content ideas, creative direction, posting rhythm, and profile polish so your brand looks active, current, and easier to trust."
        bullets={[
          "Monthly content direction and post planning",
          "Reels, static creatives, and caption support",
          "Profile cleanup for stronger first impressions",
          "Campaign ideas connected to offers and enquiries"
        ]}
      />
      <CtaBand />
    </>
  );
}
