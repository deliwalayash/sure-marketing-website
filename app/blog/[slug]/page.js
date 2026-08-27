import { supabase } from "@/lib/supabase";
import { CtaBand } from "@/components/Sections";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { BlogContent } from "@/components/BlogContent";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { data } = await supabase
    .from("blogs")
    .select("title, excerpt, slug, category, image_url, created_at, seo_title, seo_description")
    .eq("slug", params.slug)
    .eq("published", true)
    .lte("created_at", new Date().toISOString())
    .single();
  if (!data) return { title: "Blog | Sure Marketing" };

  const url = `https://www.suremarketing.in/blog/${data.slug}`;
  const blogImage = data.image_url || "https://www.suremarketing.in/images/yash-about.png";
  const metaTitle = data.seo_title || `${data.title} | Sure Marketing Blog`;
  const metaDescription = data.seo_description || data.excerpt || `Read ${data.title} on the Sure Marketing blog — digital marketing insights from Surat.`;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: [data.category, "digital marketing", "Sure Marketing", "Surat"].filter(Boolean),
    alternates: { canonical: url },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url,
      type: "article",
      publishedTime: data.created_at,
      authors: ["Sure Marketing"],
      tags: [data.category].filter(Boolean),
      images: [{ url: blogImage, width: 1200, height: 630, alt: data.title }]
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [blogImage]
    }
  };
}

async function getBlog(slug) {
  const { data } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .lte("created_at", new Date().toISOString())
    .single();
  return data;
}

async function getRelatedPosts(slug) {
  const { data } = await supabase
    .from("blogs")
    .select("title, slug, category, image_url")
    .eq("published", true)
    .lte("created_at", new Date().toISOString())
    .neq("slug", slug)
    .limit(3);
  return data || [];
}

export default async function BlogPostPage({ params }) {
  const [blog, related] = await Promise.all([getBlog(params.slug), getRelatedPosts(params.slug)]);
  if (!blog) notFound();

  const wordCount = ((blog.content || "") + " " + (blog.excerpt || "")).split(/\s+/).filter(Boolean).length;
  const readMinutes = Math.max(1, Math.ceil(wordCount / 180));

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.excerpt || blog.title,
    "image": blog.image_url ? [blog.image_url] : ["https://www.suremarketing.in/images/yash-about.png"],
    "datePublished": blog.created_at,
    "dateModified": blog.created_at,
    "author": {
      "@type": "Person",
      "name": "Yash Deliwala",
      "jobTitle": "Founder & Digital Marketing Specialist",
      "url": "https://www.suremarketing.in/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Sure Marketing",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.suremarketing.in/images/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.suremarketing.in/blog/${blog.slug}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <section className="section-pad" style={{ background: "#ffffff" }}>
        <article style={{ maxWidth: "820px", margin: "0 auto", padding: "0 1rem" }}>

          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "#64748b", marginBottom: "1.75rem", flexWrap: "wrap" }}>
            <Link href="/" style={{ color: "#64748b", textDecoration: "none" }}>Home</Link>
            <span>›</span>
            <Link href="/blog" style={{ color: "#64748b", textDecoration: "none" }}>Blog</Link>
            {blog.category && (
              <>
                <span>›</span>
                <span style={{ color: "#2563eb", fontWeight: 600 }}>{blog.category}</span>
              </>
            )}
          </nav>

          {/* Category Badge & Meta Row */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
            {blog.category && (
              <span
                style={{
                  background: "#eff6ff",
                  color: "#2563eb",
                  fontSize: "0.78rem",
                  fontWeight: 800,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  padding: "0.3rem 0.75rem",
                  borderRadius: "999px",
                  border: "1px solid #bfdbfe"
                }}
              >
                {blog.category}
              </span>
            )}
            <span style={{ color: "#64748b", fontSize: "0.9rem", fontWeight: 500 }}>
              📅 {new Date(blog.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            <span style={{ color: "#94a3b8" }}>•</span>
            <span style={{ color: "#64748b", fontSize: "0.9rem", fontWeight: 500 }}>
              ⏱️ {readMinutes} min read
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              margin: "0 0 1.25rem",
              fontSize: "clamp(2rem, 4.5vw, 2.9rem)",
              lineHeight: 1.22,
              color: "#0f172a",
              fontWeight: 900,
              letterSpacing: "-0.025em"
            }}
          >
            {(blog.title || "").replace(/^#{1,6}\s+/, "")}
          </h1>

          {/* Excerpt */}
          {blog.excerpt && (
            <p
              style={{
                fontSize: "1.22rem",
                lineHeight: 1.75,
                color: "#475569",
                marginBottom: "2rem",
                fontWeight: 450,
                borderBottom: "1px solid #f1f5f9",
                paddingBottom: "1.5rem"
              }}
            >
              {blog.excerpt}
            </p>
          )}

          {/* Author info pill */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "2rem", padding: "0.75rem 1rem", background: "#f8fafc", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "50%", overflow: "hidden", border: "2px solid #2563eb", flexShrink: 0 }}>
              <Image src="/images/yash-about.png" alt="Yash Deliwala" width={42} height={42} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div>
              <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#0f172a" }}>Yash Deliwala</div>
              <div style={{ fontSize: "0.8rem", color: "#64748b" }}>Founder & Performance Marketer • Sure Marketing</div>
            </div>
          </div>

          {/* Featured Image Banner - 100% visible, no cut-off */}
          <div
            style={{
              position: "relative",
              width: "100%",
              borderRadius: "20px",
              overflow: "hidden",
              marginBottom: "3rem",
              border: "1px solid #e2e8f0",
              background: "#f8fafc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 30px -5px rgba(15, 23, 42, 0.06)"
            }}
          >
            <Image
              src={blog.image_url || "/images/yash-about.png"}
              alt={blog.title}
              width={1200}
              height={675}
              priority
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "560px",
                objectFit: "contain",
                display: "block"
              }}
            />
          </div>

          {/* Article Content with Rich Markdown & Headline Parsing */}
          {blog.content && <BlogContent content={blog.content} />}

          {/* Share & Consultation Box */}
          <div
            style={{
              marginTop: "4rem",
              padding: "2rem",
              background: "linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%)",
              borderRadius: "20px",
              border: "1px solid #bfdbfe",
              display: "grid",
              gap: "1rem"
            }}
          >
            <h3 style={{ margin: 0, fontSize: "1.35rem", fontWeight: 800, color: "#1e3a8a" }}>
              Need Help With Your Digital Marketing?
            </h3>
            <p style={{ margin: 0, color: "#475569", fontSize: "1.05rem", lineHeight: 1.65 }}>
              Sure Marketing helps businesses scale with data-driven Google Ads, SEO, and WhatsApp automation campaigns.
            </p>
            <div>
              <Link
                href="/contact"
                style={{
                  display: "inline-block",
                  padding: "0.75rem 1.6rem",
                  background: "#2563eb",
                  color: "#ffffff",
                  borderRadius: "999px",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  boxShadow: "0 4px 14px rgba(37, 99, 235, 0.3)"
                }}
              >
                Schedule Free Strategy Call →
              </Link>
            </div>
          </div>

          {/* Internal links */}
          <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid #e2e8f0" }}>
            <p style={{ color: "#2563eb", fontWeight: 800, fontSize: "0.82rem", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>Explore Our Services</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem" }}>
              {[
                { label: "Google Ads Management", href: "/google-ads-expert" },
                { label: "Social Media Marketing", href: "/social-media" },
                { label: "Website Design", href: "/website-design" },
                { label: "SEO Services", href: "/seo-expert" },
                { label: "All Services", href: "/services" },
                { label: "View Portfolio", href: "/portfolio" },
                { label: "Pricing", href: "/price-list" },
                { label: "Contact Us", href: "/contact" }
              ].map(({ label, href }) => (
                <Link key={href} href={href} style={{ padding: "0.5rem 1.1rem", border: "1px solid #cbd5e1", borderRadius: "999px", color: "#334155", fontSize: "0.88rem", fontWeight: 600, textDecoration: "none", background: "#ffffff" }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <div style={{ marginTop: "3rem" }}>
              <p style={{ color: "#2563eb", fontWeight: 800, fontSize: "0.82rem", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>More Articles</p>
              <div style={{ display: "grid", gap: "0.85rem" }}>
                {related.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem 1.25rem", border: "1px solid #e2e8f0", borderRadius: "16px", background: "#ffffff", textDecoration: "none", boxShadow: "0 2px 8px rgba(15, 23, 42, 0.03)" }}>
                    {post.category && (
                      <span style={{ background: "#eff6ff", color: "#2563eb", fontSize: "0.75rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "999px", flexShrink: 0 }}>
                        {post.category}
                      </span>
                    )}
                    <span style={{ color: "#0f172a", fontWeight: 700, fontSize: "1rem" }}>{post.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </article>
      </section>
      <CtaBand />
    </>
  );
}

