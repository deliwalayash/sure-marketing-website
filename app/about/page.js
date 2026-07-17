import Image from "next/image";
import { CtaBand, StatsBand } from "@/components/Sections";

export const metadata = {
  title: "About Sure Marketing | Digital Marketing Agency in Surat",
  description:
    "Sure Marketing is a Surat-based digital marketing agency. We help businesses grow with Google Ads, SEO, social media, and website design. Meet the team behind the results.",
  alternates: { canonical: "https://www.suremarketing.in/about" },
  openGraph: {
    title: "About Sure Marketing | Digital Marketing Agency in Surat",
    description: "Learn about Sure Marketing — a focused digital marketing agency in Surat delivering measurable business growth.",
    url: "https://www.suremarketing.in/about"
  }
};

export default function AboutPage() {
  return (
    <>
      <section className="section-pad split-page">
        <div>
          <p className="eyebrow">About Sure Marketing</p>
          <h1>Your growth partner for practical, measurable digital marketing.</h1>
          <p>
            Sure Marketing supports businesses with digital strategy, campaign execution, website design, and
            reporting. The focus is simple: help you understand what is working, what needs attention, and where the
            next enquiry should come from.
          </p>
          <p>
            We work best with founders and local teams who want responsive communication, cleaner online presence, and
            marketing decisions grounded in real numbers.
          </p>
        </div>
        <div className="about-visual">
          <Image
            src="/images/yash-about.png"
            alt="Google Ads and marketing analytics dashboard"
            width={720}
            height={520}
            priority
          />
        </div>
      </section>
      <StatsBand />
      <CtaBand />
    </>
  );
}
