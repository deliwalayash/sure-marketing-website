import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

const inter = Inter({
  subsets: ["latin"],
  display: "swap"
});

const baseUrl = "https://www.suremarketing.in";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Sure Marketing | Digital Marketing Agency in Surat",
    template: "%s | Sure Marketing"
  },
  description:
    "Sure Marketing is a digital marketing agency in Surat helping businesses grow with Google Ads, SEO, social media management, website design, and performance marketing.",
  keywords: [
    "digital marketing agency Surat",
    "Google Ads expert Surat",
    "SEO services Surat",
    "social media marketing Surat",
    "performance marketing India",
    "lead generation agency",
    "Sure Marketing",
    "website design Surat",
    "Google Ads management",
    "digital marketing consultant Surat"
  ],
  authors: [{ name: "Sure Marketing", url: baseUrl }],
  creator: "Sure Marketing",
  publisher: "Sure Marketing",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true }
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: baseUrl,
    siteName: "Sure Marketing",
    title: "Sure Marketing | Digital Marketing Agency in Surat",
    description:
      "Sure Marketing helps businesses grow with Google Ads, SEO, social media, and website design. Based in Surat, serving clients across India.",
    images: [{ url: "/images/Untitled design.png", width: 1200, height: 630, alt: "Sure Marketing" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Sure Marketing | Digital Marketing Agency in Surat",
    description: "Google Ads, SEO, Social Media & Web Design — Sure Marketing, Surat.",
    images: ["/images/Untitled design.png"]
  },
  alternates: {
    canonical: baseUrl
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleAnalytics />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
