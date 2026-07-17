import { supabase } from "@/lib/supabase";

const baseUrl = "https://www.suremarketing.in";

const staticRoutes = [
  { url: "/", priority: 1.0, changeFrequency: "weekly" },
  { url: "/about", priority: 0.8, changeFrequency: "monthly" },
  { url: "/services", priority: 0.9, changeFrequency: "monthly" },
  { url: "/google-ads-expert", priority: 0.9, changeFrequency: "monthly" },
  { url: "/social-media", priority: 0.9, changeFrequency: "monthly" },
  { url: "/portfolio", priority: 0.8, changeFrequency: "monthly" },
  { url: "/videos", priority: 0.7, changeFrequency: "monthly" },
  { url: "/price-list", priority: 0.8, changeFrequency: "monthly" },
  { url: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { url: "/testimonials", priority: 0.6, changeFrequency: "monthly" },
  { url: "/career", priority: 0.6, changeFrequency: "monthly" },
  { url: "/contact", priority: 0.7, changeFrequency: "monthly" }
];

export default async function sitemap() {
  // Static pages
  const staticEntries = staticRoutes.map(({ url, priority, changeFrequency }) => ({
    url: `${baseUrl}${url}`,
    lastModified: new Date(),
    changeFrequency,
    priority
  }));

  // Dynamic blog posts
  let blogEntries = [];
  try {
    const { data } = await supabase
      .from("blogs")
      .select("slug, created_at")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (data) {
      blogEntries = data.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.created_at),
        changeFrequency: "monthly",
        priority: 0.7
      }));
    }
  } catch {
    // Supabase unavailable during build — skip blog entries
  }

  return [...staticEntries, ...blogEntries];
}
