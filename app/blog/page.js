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
          <p className="eyebrow">Blog</p>
          <h1>Practical marketing thinking for sharper campaigns.</h1>
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
                    <div className="blog-card-img-wrap">
                      <Image
                        src={imageUrl}
                        alt={post.title}
                        width={600}
                        height={375}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <h3>{post.title}</h3>
                    {post.excerpt && <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.6, marginTop: "0.5rem" }}>{post.excerpt}</p>}
                    <p style={{ marginTop: "auto", paddingTop: "1rem", fontSize: "0.85rem", color: "var(--muted)" }}>
                      {new Date(post.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
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
