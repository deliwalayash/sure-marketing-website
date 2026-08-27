import { supabase } from "@/lib/supabase";
import { CtaBand } from "@/components/Sections";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { data } = await supabase
    .from("blogs")
    .select("title, excerpt, slug, category, image_url, created_at")
    .eq("slug", params.slug)
    .eq("published", true)
    .lte("created_at", new Date().toISOString())
    .single();
  if (!data) return { title: "Blog | Sure Marketing" };

  const url = `https://www.suremarketing.in/blog/${data.slug}`;
  const blogImage = data.image_url || "https://www.suremarketing.in/images/yash-about.png";

  return {
    title: `${data.title} | Sure Marketing Blog`,
    description: data.excerpt || `Read ${data.title} on the Sure Marketing blog — digital marketing insights from Surat.`,
    keywords: [data.category, "digital marketing", "Sure Marketing", "Surat"].filter(Boolean),
    alternates: { canonical: url },
    openGraph: {
      title: data.title,
      description: data.excerpt || "",
      url,
      type: "article",
      publishedTime: data.created_at,
      authors: ["Sure Marketing"],
      tags: [data.category].filter(Boolean),
      images: [{ url: blogImage, width: 1200, height: 630, alt: data.title }]
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.excerpt || "",
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
    .select("title, slug, category")
    .eq("published", true)
    .lte("created_at", new Date().toISOString())
    .neq("slug", slug)
    .limit(3);
  return data || [];
}

// Render plain text content with basic formatting
function renderContent(content) {
  if (!content) return null;
  return content.split("\n").map((line, i) => {
    const trimmed = line.trim();
    if (!trimmed) return <div key={i} style={{ height: "0.75rem" }} />;

    // Numbered heading like "1. Title" or "10. Title"
    if (/^\d+\.\s/.test(trimmed)) {
      return (
        <h2 key={i} style={{ margin: "2.5rem 0 1rem", fontSize: "1.55rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.3 }}>
          {trimmed}
        </h2>
      );
    }

    // All-caps short line = subheading
    if (trimmed.length < 60 && trimmed === trimmed.toUpperCase() && /[A-Z]/.test(trimmed)) {
      return (
        <h3 key={i} style={{ margin: "2rem 0 0.75rem", fontSize: "0.9rem", fontWeight: 900, color: "#2563eb", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {trimmed}
        </h3>
      );
    }

    // Bullet lines starting with - or •
    if (/^[-•]/.test(trimmed)) {
      return (
        <div key={i} style={{ display: "flex", gap: "0.75rem", margin: "0.6rem 0 0.8rem", color: "#334155", fontSize: "1.05rem", lineHeight: 1.8, fontWeight: 500 }}>
          <span style={{ color: "#2563eb", flexShrink: 0, marginTop: "0.15rem", fontWeight: 800 }}>→</span>
          <span>{trimmed.replace(/^[-•]\s*/, "")}</span>
        </div>
      );
    }

    // Regular paragraph
    return (
      <p key={i} style={{ margin: "0 0 1.25rem", color: "#334155", fontSize: "1.08rem", lineHeight: 1.85, fontWeight: 400 }}>
        {trimmed}
      </p>
    );
  });
}

export default async function BlogPostPage({ params }) {
  const [blog, related] = await Promise.all([getBlog(params.slug), getRelatedPosts(params.slug)]);
  if (!blog) notFound();

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
      <section className="section-pad">
        <div style={{ maxWidth: "min(100%, 760px)" }}>

          {/* Meta row */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
            <span style={{ color: "#64748b", fontSize: "0.9rem", fontWeight: 600 }}>
              📅 {new Date(blog.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>

          {/* Title */}
          <h1 style={{ margin: "0 0 1.5rem", fontSize: "clamp(2rem, 4.5vw, 3rem)", lineHeight: 1.18, color: "#0f172a", fontWeight: 900 }}>
            {blog.title}
          </h1>

          {/* Excerpt */}
          {blog.excerpt && (
            <p style={{ fontSize: "1.2rem", lineHeight: 1.75, color: "#475569", marginBottom: "2rem", fontWeight: 500 }}>
              {blog.excerpt}
            </p>
          )}

          {/* Featured Image Banner */}
          <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", borderRadius: "20px", overflow: "hidden", marginBottom: "2.5rem", border: "1px solid var(--line)", background: "#f1f5f9" }}>
            <Image
              src={blog.image_url || "/images/yash-about.png"}
              alt={blog.title}
              width={1200}
              height={675}
              priority
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          {/* Content */}
          {blog.content && (
            <div style={{ display: "grid", gap: "0.1rem" }}>
              {renderContent(blog.content)}
            </div>
          )}

          {/* Internal links */}
          <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--line)" }}>
            <p style={{ color: "var(--accent)", fontWeight: 900, fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>Explore Our Services</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem" }}>
              {[
                { label: "Google Ads Management", href: "/google-ads-expert" },
                { label: "Social Media Marketing", href: "/social-media" },
                { label: "All Services", href: "/services" },
                { label: "View Portfolio", href: "/portfolio" },
                { label: "Pricing", href: "/price-list" },
                { label: "Contact Us", href: "/contact" }
              ].map(({ label, href }) => (
                <Link key={href} href={href} style={{ padding: "0.45rem 1rem", border: "1px solid var(--line)", borderRadius: "999px", color: "var(--muted-strong)", fontSize: "0.88rem", fontWeight: 600, transition: "color 180ms" }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <div style={{ marginTop: "2.5rem" }}>
              <p style={{ color: "var(--accent)", fontWeight: 900, fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>More Articles</p>
              <div style={{ display: "grid", gap: "0.75rem" }}>
                {related.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.85rem 1.1rem", border: "1px solid var(--line)", borderRadius: "16px", background: "rgba(255,255,255,0.03)", textDecoration: "none" }}>
                    {post.category && <span className="badge" style={{ flexShrink: 0, fontSize: "0.75rem" }}>{post.category}</span>}
                    <span style={{ color: "var(--text)", fontWeight: 600, fontSize: "0.95rem" }}>{post.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
      <CtaBand />
    </>
  );
}
