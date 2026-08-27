import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { CtaBand } from "@/components/Sections";

export const metadata = {
  title: "Digital Marketing Blog | Sure Marketing Surat",
  description:
    "Practical digital marketing tips, Google Ads strategies, SEO guides, and campaign insights from Sure Marketing — a digital marketing agency in Surat.",
  alternates: { canonical: "https://www.suremarketing.in/blog" },
  openGraph: {
    title: "Digital Marketing Blog | Sure Marketing Surat",
    description: "Google Ads, SEO, and social media marketing insights from Sure Marketing, Surat.",
    url: "https://www.suremarketing.in/blog"
  }
};

export const revalidate = 60; // revalidate every 60 seconds

async function getBlogs() {
  const { data } = await supabase
    .from("blogs")
    .select("id, title, slug, category, excerpt, image_url, created_at")
    .eq("published", true)
    .lte("created_at", new Date().toISOString())
    .order("created_at", { ascending: false });
  return data || [];
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <>
      <section className="section-pad">
        <div className="section-heading">
          <p className="eyebrow">Blog & Insights</p>
          <h1>Practical digital marketing insights & strategies.</h1>
        </div>

        {blogs.length === 0 ? (
          <p style={{ color: "var(--muted)", fontSize: "1.05rem" }}>Blog posts coming soon.</p>
        ) : (
          <div className="blog-grid">
            {blogs.map((post) => {
              const imageUrl = post.image_url || "/images/yash-about.png";
              return (
                <Link href={`/blog/${post.slug}`} key={post.id} style={{ textDecoration: "none" }}>
                  <article className="blog-card" style={{ cursor: "pointer" }}>
                    <div className="blog-card-img-wrap" style={{ background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Image
                        src={imageUrl}
                        alt={post.title}
                        width={600}
                        height={338}
                        style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                      />
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                      {post.category && (
                        <span
                          style={{
                            background: "#eff6ff",
                            color: "#2563eb",
                            fontSize: "0.72rem",
                            fontWeight: 800,
                            letterSpacing: "0.04em",
                            textTransform: "uppercase",
                            padding: "0.2rem 0.55rem",
                            borderRadius: "999px",
                            border: "1px solid #bfdbfe"
                          }}
                        >
                          {post.category}
                        </span>
                      )}
                    </div>

                    <h3 style={{ color: "#0f172a", fontSize: "1.2rem", fontWeight: 800, lineHeight: 1.35, margin: "0.2rem 0 0.5rem" }}>
                      {(post.title || "").replace(/^#{1,6}\s+/, "")}
                    </h3>

                    {post.excerpt && (
                      <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.6, marginTop: "0.25rem", flexGrow: 1 }}>
                        {post.excerpt}
                      </p>
                    )}

                    <div style={{ marginTop: "auto", paddingTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9" }}>
                      <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 500 }}>
                        {new Date(post.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                      <span style={{ fontSize: "0.85rem", color: "#2563eb", fontWeight: 700 }}>
                        Read Article →
                      </span>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </section>
      <CtaBand />
    </>
  );
}
