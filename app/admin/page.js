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
    <div style={{ minHeight: "100vh", background: "var(--bg)", padding: "2rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <p style={{ color: "var(--accent)", fontWeight: 900, fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", margin: 0 }}>Admin Panel</p>
            <h1 style={{ margin: "0.25rem 0 0", fontSize: "1.75rem" }}>Sure Marketing</h1>
          </div>
          <button onClick={() => supabase.auth.signOut()} style={{ ...btnStyle, background: "rgba(255,255,255,0.07)", padding: "0.6rem 1.2rem", fontSize: "0.9rem" }}>Logout</button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
          {["applications", "blogs"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ ...btnStyle, minHeight: "40px", padding: "0 1.2rem", fontSize: "0.9rem", background: tab === t ? "linear-gradient(135deg, #a855f7, #d946ef)" : "rgba(255,255,255,0.07)" }}>
              {t === "applications" ? "Career Applications" : "Blog Posts"}
            </button>
          ))}
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
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null); // blog object or null
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", slug: "", category: "", excerpt: "", content: "", published: false });
  const [publishType, setPublishType] = useState("publish_now"); // publish_now | schedule | draft
  const [scheduleDate, setScheduleDate] = useState("");

  async function fetchBlogs() {
    setFetching(true);
    const { data } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });
    setBlogs(data || []);
    setFetching(false);
  }

  useEffect(() => { fetchBlogs(); }, []);

  function openNew() {
    setEditing(null);
    setForm({ title: "", slug: "", category: "", excerpt: "", content: "", published: false });
    setPublishType("publish_now");
    setScheduleDate("");
    setShowForm(true);
  }

  function openEdit(blog) {
    setEditing(blog);
    setForm({ title: blog.title, slug: blog.slug, category: blog.category || "", excerpt: blog.excerpt || "", content: blog.content || "", published: blog.published });
    if (!blog.published) {
      setPublishType("draft");
      setScheduleDate("");
    } else {
      const isFuture = new Date(blog.created_at) > new Date();
      if (isFuture) {
        setPublishType("schedule");
        const localDate = new Date(new Date(blog.created_at).getTime() - new Date().getTimezoneOffset() * 60000);
        setScheduleDate(localDate.toISOString().slice(0, 16));
      } else {
        setPublishType("publish_now");
        setScheduleDate("");
      }
    }
    setShowForm(true);
  }

  function handleChange(e) {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm(prev => ({ ...prev, [e.target.name]: val }));
    // Auto generate slug from title
    if (e.target.name === "title" && !editing) {
      setForm(prev => ({ ...prev, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") }));
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    const isPublished = publishType !== "draft";
    const payload = {
      title: form.title,
      slug: form.slug,
      category: form.category || null,
      excerpt: form.excerpt || null,
      content: form.content || null,
      published: isPublished
    };
    if (publishType === "publish_now") {
      if (!editing || new Date(editing.created_at) > new Date()) {
        payload.created_at = new Date().toISOString();
      }
    } else if (publishType === "schedule") {
      if (!scheduleDate) {
        alert("Please select a date and time for scheduling.");
        setSaving(false);
        return;
      }
      payload.created_at = new Date(scheduleDate).toISOString();
    }
    if (editing) {
      await supabase.from("blogs").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("blogs").insert([payload]);
    }
    setSaving(false);
    setShowForm(false);
    fetchBlogs();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this blog post?")) return;
    await supabase.from("blogs").delete().eq("id", id);
    fetchBlogs();
  }

  async function togglePublish(blog) {
    await supabase.from("blogs").update({ published: !blog.published }).eq("id", blog.id);
    fetchBlogs();
  }

  if (showForm) {
    return (
      <div style={{ maxWidth: "720px" }}>
        <button onClick={() => setShowForm(false)} style={{ ...linkBtnStyle, marginBottom: "1.5rem" }}>← Back</button>
        <h2 style={{ margin: "0 0 1.5rem", fontSize: "1.5rem" }}>{editing ? "Edit Post" : "New Blog Post"}</h2>
        <form style={{ display: "grid", gap: "1rem" }} onSubmit={handleSave}>
          <label style={labelStyle}>Title *<input style={inputStyle} name="title" required value={form.title} onChange={handleChange} placeholder="How to run Google Ads in 2026" /></label>
          <label style={labelStyle}>Slug (URL) *<input style={inputStyle} name="slug" required value={form.slug} onChange={handleChange} placeholder="how-to-run-google-ads-2026" /></label>
          <label style={labelStyle}>Category<input style={inputStyle} name="category" value={form.category} onChange={handleChange} placeholder="Google Ads, SEO, Social Media…" /></label>
          <label style={labelStyle}>Excerpt (short description)<textarea style={{ ...inputStyle, resize: "vertical" }} name="excerpt" rows={2} value={form.excerpt} onChange={handleChange} placeholder="A short summary shown on the blog listing page" /></label>
          <label style={labelStyle}>
            Content (full blog post)
            <textarea style={{ ...inputStyle, resize: "vertical", fontFamily: "monospace", fontSize: "0.9rem" }} name="content" rows={14} value={form.content} onChange={handleChange} placeholder="Write your full blog post here..." />
          </label>
            <label style={labelStyle}>
              Publication Type *
              <select
                style={{ ...inputStyle, cursor: "pointer" }}
                value={publishType}
                onChange={e => setPublishType(e.target.value)}
              >
                <option value="publish_now">Publish Immediately</option>
                <option value="schedule">Schedule Post</option>
                <option value="draft">Save as Draft</option>
              </select>
            </label>

            {publishType === "schedule" && (
              <label style={labelStyle}>
                Schedule Date & Time *
                <input
                  style={inputStyle}
                  type="datetime-local"
                  required
                  value={scheduleDate}
                  onChange={e => setScheduleDate(e.target.value)}
                />
              </label>
            )}

            <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
              <button style={btnStyle} type="submit" disabled={saving}>
                {saving ? "Saving…" : editing ? "Update Post" : publishType === "draft" ? "Save Draft" : publishType === "schedule" ? "Schedule Post" : "Publish Post"}
              </button>
              <button type="button" onClick={() => setShowForm(false)} style={{ ...btnStyle, background: "rgba(255,255,255,0.07)" }}>Cancel</button>
            </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <span style={{ color: "var(--muted)", fontSize: "0.9rem" }}>Total: <strong style={{ color: "var(--text)" }}>{blogs.length}</strong></span>
        <button style={btnStyle} onClick={openNew}>+ New Post</button>
      </div>

      {fetching ? <p style={{ color: "var(--muted)" }}>Loading…</p> : blogs.length === 0 ? <p style={{ color: "var(--muted)" }}>No blog posts yet. Create your first one!</p> : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {blogs.map(blog => (
            <div key={blog.id} style={rowStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.35rem", flexWrap: "wrap" }}>
                    <span style={{ ...metaValue, fontSize: "1.1rem", fontWeight: 700 }}>{blog.title}</span>
                    {(() => {
                      const isDraft = !blog.published;
                      const isScheduled = blog.published && new Date(blog.created_at) > new Date();
                      if (isDraft) {
                        return (
                          <span style={{ padding: "0.2rem 0.65rem", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 800, background: "rgba(255,255,255,0.07)", color: "var(--muted)" }}>
                            Draft
                          </span>
                        );
                      }
                      if (isScheduled) {
                        return (
                          <span style={{ padding: "0.2rem 0.65rem", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 800, background: "rgba(59,130,246,0.15)", color: "#60a5fa" }}>
                            Scheduled ({new Date(blog.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })})
                          </span>
                        );
                      }
                      return (
                        <span style={{ padding: "0.2rem 0.65rem", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 800, background: "rgba(34,197,94,0.15)", color: "#4ade80" }}>
                          Published
                        </span>
                      );
                    })()}
                  </div>
                  {blog.category && <span style={{ ...metaLabel, display: "inline", textTransform: "none", letterSpacing: 0 }}>{blog.category} · </span>}
                  <span style={metaLabel}>{new Date(blog.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                  {blog.excerpt && <p style={{ margin: "0.5rem 0 0", color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.5 }}>{blog.excerpt}</p>}
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                  <button onClick={() => togglePublish(blog)} style={{ ...linkBtnStyle, background: blog.published ? "rgba(255,255,255,0.07)" : "rgba(34,197,94,0.15)", color: blog.published ? "var(--muted)" : "#4ade80" }}>
                    {blog.published ? "Unpublish" : "Publish"}
                  </button>
                  <button onClick={() => openEdit(blog)} style={linkBtnStyle}>✏️ Edit</button>
                  <button onClick={() => handleDelete(blog.id)} style={{ ...linkBtnStyle, background: "rgba(248,113,113,0.12)", color: "#f87171" }}>🗑 Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Shared styles
const pageStyle = { minHeight: "100vh", background: "var(--bg)", display: "grid", placeItems: "center", padding: "1rem" };
const cardStyle = { width: "100%", maxWidth: "400px", padding: "2rem", border: "1px solid var(--line)", borderRadius: "24px", background: "linear-gradient(180deg, var(--panel-strong), rgba(255,255,255,0.035))" };
const labelStyle = { display: "grid", gap: "0.45rem", color: "var(--muted-strong)", fontWeight: 800, fontSize: "0.9rem" };
const inputStyle = { width: "100%", border: "1px solid var(--line)", borderRadius: "12px", background: "rgba(3,3,7,0.74)", color: "var(--text)", font: "inherit", padding: "0.85rem 1rem", outline: "none", boxSizing: "border-box" };
const btnStyle = { display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: "48px", padding: "0 1.5rem", borderRadius: "999px", border: "none", background: "linear-gradient(135deg, #a855f7, #d946ef)", color: "#fff", fontWeight: 800, cursor: "pointer", fontSize: "1rem" };
const rowStyle = { padding: "1.25rem 1.5rem", border: "1px solid var(--line)", borderRadius: "20px", background: "linear-gradient(180deg, var(--panel-strong), rgba(255,255,255,0.025))" };
const metaLabel = { display: "block", color: "var(--muted)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.2rem" };
const metaValue = { display: "block", color: "var(--text)", fontSize: "0.95rem", fontWeight: 600 };
const linkBtnStyle = { display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 1rem", borderRadius: "999px", background: "var(--accent-soft)", color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none", border: "none", cursor: "pointer" };
