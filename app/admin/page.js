"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [session, setSession] = useState(undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [tab, setTab] = useState("applications"); // applications | blogs

  // Check session
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setLoginError(error.message);
    setLoginLoading(false);
  }

  if (session === undefined) return <div style={pageStyle}><p style={{ color: "var(--muted)" }}>Loading…</p></div>;

  if (!session) {
    return (
      <div style={pageStyle}>
        <div style={cardStyle}>
          <p style={{ color: "var(--accent)", fontWeight: 900, fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Admin</p>
          <h1 style={{ margin: "0 0 1.75rem", fontSize: "1.75rem" }}>Sure Marketing</h1>
          <form style={{ display: "grid", gap: "1rem" }} onSubmit={handleLogin}>
            <label style={labelStyle}>Email<input style={inputStyle} type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@email.com" /></label>
            <label style={labelStyle}>Password<input style={inputStyle} type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" /></label>
            {loginError && <p style={{ color: "#f87171", margin: 0, fontSize: "0.9rem" }}>{loginError}</p>}
            <button style={btnStyle} type="submit" disabled={loginLoading}>{loginLoading ? "Logging in…" : "Login"}</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", padding: "2rem 1rem" }}>
      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", paddingBottom: "1.25rem", borderBottom: "1px solid #e2e8f0" }}>
          <div>
            <p style={{ color: "#2563eb", fontWeight: 800, fontSize: "0.82rem", letterSpacing: "0.08em", textTransform: "uppercase", margin: 0 }}>Admin Panel</p>
            <h1 style={{ margin: "0.25rem 0 0", fontSize: "1.85rem", fontWeight: 900, color: "#0f172a" }}>Sure Marketing</h1>
          </div>
          <button
            onClick={() => supabase.auth.signOut()}
            style={{
              padding: "0.6rem 1.4rem",
              borderRadius: "999px",
              border: "1px solid #cbd5e1",
              background: "#ffffff",
              color: "#334155",
              fontSize: "0.9rem",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.04)"
            }}
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2rem" }}>
          <button
            onClick={() => setTab("applications")}
            style={{
              minHeight: "44px",
              padding: "0 1.5rem",
              borderRadius: "999px",
              fontSize: "0.95rem",
              fontWeight: 800,
              cursor: "pointer",
              border: tab === "applications" ? "none" : "1px solid #cbd5e1",
              background: tab === "applications" ? "#2563eb" : "#ffffff",
              color: tab === "applications" ? "#ffffff" : "#475569",
              boxShadow: tab === "applications" ? "0 4px 14px rgba(37, 99, 235, 0.3)" : "none",
              transition: "all 0.2s ease"
            }}
          >
            📋 Career Applications
          </button>

          <button
            onClick={() => setTab("blogs")}
            style={{
              minHeight: "44px",
              padding: "0 1.5rem",
              borderRadius: "999px",
              fontSize: "0.95rem",
              fontWeight: 800,
              cursor: "pointer",
              border: tab === "blogs" ? "none" : "1px solid #cbd5e1",
              background: tab === "blogs" ? "#2563eb" : "#ffffff",
              color: tab === "blogs" ? "#ffffff" : "#475569",
              boxShadow: tab === "blogs" ? "0 4px 14px rgba(37, 99, 235, 0.3)" : "none",
              transition: "all 0.2s ease"
            }}
          >
            ✍️ Blog Posts
          </button>
        </div>

        {tab === "applications" ? <ApplicationsTab /> : <BlogsTab />}
      </div>
    </div>
  );
}

/* ── Applications Tab ── */
function ApplicationsTab() {
  const [applications, setApplications] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    supabase.from("applications").select("*").order("created_at", { ascending: false })
      .then(({ data }) => { setApplications(data || []); setFetching(false); });
  }, []);

  if (fetching) return <p style={{ color: "var(--muted)" }}>Loading…</p>;
  if (!applications.length) return <p style={{ color: "var(--muted)" }}>No applications yet.</p>;

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      <div style={{ display: "inline-block", padding: "0.6rem 1.2rem", border: "1px solid var(--line)", borderRadius: "999px", color: "var(--muted)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
        Total: <strong style={{ color: "var(--text)" }}>{applications.length}</strong>
      </div>
      {applications.map((app) => (
        <div key={app.id} style={rowStyle}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "0.75rem" }}>
            <div><span style={metaLabel}>Name</span><span style={metaValue}>{app.name}</span></div>
            <div><span style={metaLabel}>Email</span><a href={`mailto:${app.email}`} style={{ ...metaValue, color: "var(--accent)", wordBreak: "break-all" }}>{app.email}</a></div>
            <div><span style={metaLabel}>Phone</span><span style={metaValue}>{app.phone || "—"}</span></div>
            <div><span style={metaLabel}>Role</span><span style={metaValue}>{app.role}</span></div>
            <div><span style={metaLabel}>Experience</span><span style={metaValue}>{app.experience_level ? app.experience_level.charAt(0).toUpperCase() + app.experience_level.slice(1) : "—"}</span></div>
            <div><span style={metaLabel}>Current Salary</span><span style={metaValue}>{app.current_salary || "—"}</span></div>
            <div><span style={metaLabel}>Expected Salary</span><span style={metaValue}>{app.expected_salary || "—"}</span></div>
            <div><span style={metaLabel}>Applied On</span><span style={metaValue}>{new Date(app.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span></div>
          </div>
          {app.message && <p style={{ margin: "0 0 0.75rem", color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.6 }}><strong style={{ color: "var(--muted-strong)" }}>Note: </strong>{app.message}</p>}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {app.resume_url && <a href={app.resume_url} target="_blank" rel="noopener noreferrer" style={linkBtnStyle}>📄 Download Resume</a>}
            {app.portfolio && <a href={app.portfolio} target="_blank" rel="noopener noreferrer" style={{ ...linkBtnStyle, background: "transparent", border: "1px solid var(--line)", color: "var(--muted-strong)" }}>🔗 Portfolio</a>}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Blogs Tab ── */
function BlogsTab() {
  const [blogs, setBlogs] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [editing, setEditing] = useState(null); // blog object or null
  const [saving, setSaving] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    seo_title: "",
    seo_description: "",
    image_url: "",
    published: true
  });

  async function fetchBlogs() {
    setFetching(true);
    const { data } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });
    setBlogs(data || []);
    setFetching(false);
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  function handleClear() {
    setEditing(null);
    setForm({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      seo_title: "",
      seo_description: "",
      image_url: "",
      published: true
    });
  }

  function handleEdit(blog) {
    setEditing(blog);
    setForm({
      title: blog.title || "",
      slug: blog.slug || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      seo_title: blog.seo_title || blog.title || "",
      seo_description: blog.seo_description || blog.excerpt || "",
      image_url: blog.image_url || "",
      published: blog.published !== false
    });
    // Scroll to top of form smoothly on mobile
    window.scrollTo({ top: 120, behavior: "smooth" });
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setForm(prev => {
      const updated = { ...prev, [name]: val };
      // Auto-generate slug and seo title if creating a new post
      if (name === "title" && !editing) {
        updated.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        if (!prev.seo_title || prev.seo_title === prev.title) {
          updated.seo_title = value;
        }
      }
      if (name === "excerpt" && !editing) {
        if (!prev.seo_description || prev.seo_description === prev.excerpt) {
          updated.seo_description = value;
        }
      }
      return updated;
    });
  }

  async function handleImageFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImg(true);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `blog-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

      let uploadRes = await supabase.storage.from("blog-images").upload(fileName, file, { contentType: file.type });
      let bucketName = "blog-images";

      if (uploadRes.error) {
        uploadRes = await supabase.storage.from("resumes").upload(fileName, file, { contentType: file.type });
        bucketName = "resumes";
      }

      if (uploadRes.error) {
        throw new Error(uploadRes.error.message);
      }

      const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(fileName);
      if (urlData?.publicUrl) {
        setForm(prev => ({ ...prev, image_url: urlData.publicUrl }));
      }
    } catch (err) {
      alert(`Image upload failed: ${err.message}. You can paste an Image URL manually.`);
    } finally {
      setUploadingImg(false);
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.slug.trim()) {
      alert("Please provide at least a Title and Slug.");
      return;
    }
    setSaving(true);

    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      excerpt: form.excerpt?.trim() || null,
      content: form.content?.trim() || null,
      image_url: form.image_url?.trim() || null,
      published: form.published
    };

    // Include seo fields if available in database
    if (form.seo_title) payload.seo_title = form.seo_title.trim();
    if (form.seo_description) payload.seo_description = form.seo_description.trim();

    try {
      let res;
      if (editing) {
        res = await supabase.from("blogs").update(payload).eq("id", editing.id);
      } else {
        res = await supabase.from("blogs").insert([payload]);
      }

      // If column seo_title doesn't exist yet, retry without seo fields
      if (res.error && res.error.message.includes("column")) {
        delete payload.seo_title;
        delete payload.seo_description;
        if (editing) {
          res = await supabase.from("blogs").update(payload).eq("id", editing.id);
        } else {
          res = await supabase.from("blogs").insert([payload]);
        }
      }

      if (res.error) {
        throw new Error(res.error.message);
      }

      handleClear();
      fetchBlogs();
    } catch (err) {
      alert(`Error saving blog post: ${err.message}`);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) {
      alert(`Delete error: ${error.message}`);
    } else {
      if (editing?.id === id) handleClear();
      fetchBlogs();
    }
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: "2rem", alignItems: "start" }}>

      {/* LEFT COLUMN: New / Edit Blog Form */}
      <div style={adminCardStyle}>
        <h2 style={{ margin: "0 0 1.5rem", fontSize: "1.5rem", fontWeight: 800, color: "#0f172a" }}>
          {editing ? "Edit Blog" : "New Blog"}
        </h2>

        <form onSubmit={handleSave} style={{ display: "grid", gap: "1.1rem" }}>
          <input
            style={lightInputStyle}
            name="title"
            required
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
          />

          <input
            style={lightInputStyle}
            name="slug"
            required
            value={form.slug}
            onChange={handleChange}
            placeholder="Slug"
          />

          <textarea
            style={{ ...lightInputStyle, resize: "vertical" }}
            name="excerpt"
            rows={3}
            value={form.excerpt}
            onChange={handleChange}
            placeholder="Short description"
          />

          <textarea
            style={{ ...lightInputStyle, resize: "vertical", fontFamily: "inherit" }}
            name="content"
            rows={10}
            value={form.content}
            onChange={handleChange}
            placeholder="Full blog content"
          />

          <input
            style={lightInputStyle}
            name="seo_title"
            value={form.seo_title}
            onChange={handleChange}
            placeholder="SEO title"
          />

          <textarea
            style={{ ...lightInputStyle, resize: "vertical" }}
            name="seo_description"
            rows={3}
            value={form.seo_description}
            onChange={handleChange}
            placeholder="SEO description"
          />

          <input
            style={lightInputStyle}
            name="image_url"
            value={form.image_url}
            onChange={handleChange}
            placeholder="Image URL"
          />

          {/* File Upload with Preview */}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageFileChange}
              disabled={uploadingImg}
              style={{ ...lightInputStyle, padding: "0.55rem 0.75rem", fontSize: "0.85rem", cursor: "pointer" }}
            />
            {uploadingImg && <p style={{ color: "#2563eb", fontSize: "0.8rem", margin: "0.4rem 0 0" }}>Uploading image...</p>}
            
            {/* Live image indicator */}
            <div style={{ marginTop: "0.6rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ width: "64px", height: "40px", borderRadius: "8px", overflow: "hidden", border: "1px solid #e2e8f0", background: "#f8fafc", flexShrink: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={form.image_url || "/images/yash-about.png"}
                  alt="Preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <span style={{ fontSize: "0.78rem", color: form.image_url ? "#16a34a" : "#64748b", fontWeight: 600 }}>
                {form.image_url ? "Custom image attached" : "Default photo: Yash Deliwala"}
              </span>
            </div>
          </div>

          <label style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.95rem", fontWeight: 700, color: "#0f172a", cursor: "pointer", margin: "0.25rem 0" }}>
            <input
              type="checkbox"
              name="published"
              checked={form.published}
              onChange={handleChange}
              style={{ width: "18px", height: "18px", accentColor: "#2563eb", cursor: "pointer" }}
            />
            Publish this blog
          </label>

          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
            <button
              type="submit"
              disabled={saving || uploadingImg}
              style={primaryBtnStyle}
            >
              {saving ? "Saving..." : editing ? "Update Blog" : "Create Blog"}
            </button>

            <button
              type="button"
              onClick={handleClear}
              style={clearBtnStyle}
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      {/* RIGHT COLUMN: All Blogs List */}
      <div style={adminCardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 800, color: "#0f172a" }}>All Blogs</h2>
          <span style={{ color: "#64748b", fontSize: "0.88rem", fontWeight: 600 }}>
            Total: <strong style={{ color: "#0f172a" }}>{blogs.length}</strong>
          </span>
        </div>

        {fetching ? (
          <p style={{ color: "#64748b" }}>Loading blog posts...</p>
        ) : blogs.length === 0 ? (
          <p style={{ color: "#64748b" }}>No blog posts found. Create your first blog on the left!</p>
        ) : (
          <div style={{ display: "grid", gap: "1rem" }}>
            {blogs.map(blog => (
              <div key={blog.id} style={blogCardItemStyle}>
                <div>
                  <span style={publishedBadgeStyle}>
                    {blog.published ? "PUBLISHED" : "DRAFT"}
                  </span>
                  <h3 style={{ margin: "0.45rem 0 0.25rem", fontSize: "1.05rem", fontWeight: 800, color: "#1e3a8a", lineHeight: 1.35 }}>
                    {blog.title}
                  </h3>
                  <span style={{ color: "#64748b", fontSize: "0.82rem", wordBreak: "break-all" }}>
                    /{blog.slug}
                  </span>
                </div>

                <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                  <button
                    onClick={() => handleEdit(blog)}
                    style={editBtnStyle}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    style={deleteBtnStyle}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

// Light & Clean Admin Styles matching Image 2
const pageStyle = { minHeight: "100vh", background: "#f8fafc", display: "grid", placeItems: "center", padding: "1rem" };
const cardStyle = { width: "100%", maxWidth: "400px", padding: "2rem", border: "1px solid #e2e8f0", borderRadius: "24px", background: "#ffffff", boxShadow: "0 10px 30px -5px rgba(15, 23, 42, 0.06)" };
const labelStyle = { display: "grid", gap: "0.45rem", color: "#334155", fontWeight: 700, fontSize: "0.88rem" };
const inputStyle = { width: "100%", border: "1px solid #cbd5e1", borderRadius: "12px", background: "#ffffff", color: "#0f172a", font: "inherit", padding: "0.85rem 1rem", outline: "none", boxSizing: "border-box" };
const btnStyle = { display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: "44px", padding: "0 1.4rem", borderRadius: "999px", border: "none", background: "#2563eb", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: "0.95rem", transition: "background 0.2s" };
const rowStyle = { padding: "1.25rem 1.5rem", border: "1px solid #e2e8f0", borderRadius: "20px", background: "#ffffff", boxShadow: "0 4px 12px rgba(15, 23, 42, 0.03)" };
const metaLabel = { display: "block", color: "#64748b", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.2rem" };
const metaValue = { display: "block", color: "#0f172a", fontSize: "0.95rem", fontWeight: 600 };
const linkBtnStyle = { display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 1rem", borderRadius: "999px", background: "rgba(37, 99, 235, 0.1)", color: "#2563eb", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none", border: "none", cursor: "pointer" };

// 2-Column Dashboard Styles
const adminCardStyle = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "24px",
  padding: "2rem",
  boxShadow: "0 10px 30px -5px rgba(15, 23, 42, 0.05)"
};

const lightInputStyle = {
  width: "100%",
  border: "1px solid #cbd5e1",
  borderRadius: "12px",
  background: "#ffffff",
  color: "#0f172a",
  font: "inherit",
  fontSize: "0.92rem",
  padding: "0.75rem 1rem",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s ease"
};

const primaryBtnStyle = {
  padding: "0.7rem 1.6rem",
  borderRadius: "10px",
  border: "none",
  background: "#2563eb",
  color: "#ffffff",
  fontWeight: 700,
  fontSize: "0.95rem",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(37, 99, 235, 0.25)"
};

const clearBtnStyle = {
  padding: "0.7rem 1.4rem",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  background: "#ffffff",
  color: "#475569",
  fontWeight: 700,
  fontSize: "0.95rem",
  cursor: "pointer"
};

const blogCardItemStyle = {
  padding: "1.2rem 1.4rem",
  border: "1px solid #e2e8f0",
  borderRadius: "16px",
  background: "#ffffff",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1rem"
};

const publishedBadgeStyle = {
  display: "inline-block",
  color: "#2563eb",
  fontSize: "0.72rem",
  fontWeight: 800,
  letterSpacing: "0.05em",
  textTransform: "uppercase"
};

const editBtnStyle = {
  padding: "0.45rem 1rem",
  borderRadius: "8px",
  border: "none",
  background: "#2563eb",
  color: "#ffffff",
  fontWeight: 700,
  fontSize: "0.85rem",
  cursor: "pointer"
};

const deleteBtnStyle = {
  padding: "0.45rem 1rem",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  background: "#ffffff",
  color: "#2563eb",
  fontWeight: 700,
  fontSize: "0.85rem",
  cursor: "pointer"
};
