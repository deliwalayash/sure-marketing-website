"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { CtaBand } from "@/components/Sections";

const predefinedRoles = [
  "Performance Marketing Intern",
  "Content Creator",
  "Web Design Partner",
  "Other (specify below)"
];

export default function CareerPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "", customRole: "", portfolio: "", message: "", experience_level: "", current_salary: "", expected_salary: "" });
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | otp-sent | otp-verified | loading | success
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "email" && status === "otp-sent") {
      setStatus("idle");
      setOtp("");
      setOtpError("");
    }
  }

  function handleFile(e) {
    const selected = e.target.files[0];
    if (!selected) return;
    const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(selected.type)) {
      setErrors((prev) => ({ ...prev, file: "Only PDF or Word files are allowed." }));
      setFile(null);
      return;
    }
    if (selected.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, file: "File size must be less than 5MB." }));
      setFile(null);
      return;
    }
    setErrors((prev) => ({ ...prev, file: "" }));
    setFile(selected);
  }

  function validate() {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Please enter a valid email address.";
    if (form.phone && !/^\+?[\d\s\-()]{7,15}$/.test(form.phone.trim())) newErrors.phone = "Please enter a valid phone number (7–15 digits).";
    if (!form.role) newErrors.role = "Please select a role.";
    if (form.role === "Other (specify below)" && !form.customRole.trim()) newErrors.customRole = "Please specify your role.";
    if (!form.experience_level) newErrors.experience_level = "Please select your experience level.";
    if (form.portfolio && !/^https?:\/\/.+/.test(form.portfolio)) newErrors.portfolio = "Portfolio link must start with http:// or https://";
    if (!file) newErrors.file = "Please upload your resume.";
    return newErrors;
  }

  // Step 1 — Send OTP
  async function handleSendOtp(e) {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setOtpLoading(true);
    setOtpError("");
    const res = await fetch("/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email })
    });
    const data = await res.json();
    setOtpLoading(false);
    if (!res.ok) { setOtpError(data.error || "Failed to send OTP."); return; }
    setStatus("otp-sent");
  }

  // Step 2 — Verify OTP
  async function handleVerifyOtp() {
    if (otp.length !== 6) { setOtpError("Please enter the 6-digit OTP."); return; }
    setOtpLoading(true);
    setOtpError("");
    const res = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email, otp })
    });
    const data = await res.json();
    setOtpLoading(false);
    if (!res.ok) { setOtpError(data.error || "Invalid OTP."); return; }
    setStatus("otp-verified");
  }

  // Step 3 — Submit application
  async function handleSubmit(e) {
    e.preventDefault();
    if (status !== "otp-verified") return;
    setStatus("loading");
    setErrors({});

    try {
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}-${form.name.replace(/\s+/g, "-")}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(fileName, file, { contentType: file.type });

      if (uploadError) throw new Error(`Resume upload failed: ${uploadError.message}`);

      const { data: urlData } = supabase.storage.from("resumes").getPublicUrl(fileName);
      const resumeUrl = urlData?.publicUrl || "";
      const finalRole = form.role === "Other (specify below)" ? form.customRole : form.role;

      const { error: insertError } = await supabase
        .from("applications")
        .insert([{ name: form.name, email: form.email, phone: form.phone, role: finalRole, portfolio: form.portfolio, message: form.message, resume_url: resumeUrl, experience_level: form.experience_level, current_salary: form.experience_level === "fresher" ? null : form.current_salary, expected_salary: form.expected_salary }]);

      if (insertError) throw new Error(`Data save failed: ${insertError.message}`);

      // Send confirmation email
      await fetch("/api/send-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, role: finalRole })
      });

      setStatus("success");
      setForm({ name: "", email: "", phone: "", role: "", customRole: "", portfolio: "", message: "", experience_level: "", current_salary: "", expected_salary: "" });
      setFile(null);
    } catch (err) {
      console.error(err);
      setErrors({ submit: "Something went wrong. Please try again." });
      setStatus("otp-verified");
    }
  }

  return (
    <>
      <section className="section-pad">
        <div className="career-grid">
          {/* Left — Form */}
          <div>
            <div style={{ marginBottom: "1.75rem" }}>
              <p className="eyebrow">Career</p>
              <h1 style={{ margin: "0.55rem 0 0.75rem", fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.05 }}>Build premium digital work with a focused marketing team.</h1>
            </div>

          {status === "success" ? (
            <div style={{ padding: "1.5rem", border: "1px solid rgba(34,197,94,0.3)", borderRadius: "20px", background: "rgba(34,197,94,0.08)" }}>
              <p style={{ color: "#4ade80", fontWeight: 800, fontSize: "1.1rem", margin: "0 0 0.5rem" }}>Application submitted! 🎉</p>
              <p style={{ color: "var(--muted)", margin: 0, fontSize: "0.95rem" }}>We have received your application. We will contact you within 3–4 business days.</p>
            </div>

          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                Full Name *
                <input name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} style={{ borderColor: errors.name ? "#f87171" : "" }} />
                {errors.name && <span style={{ color: "#f87171", fontSize: "0.82rem" }}>{errors.name}</span>}
              </label>

              <label>
                Email *
                <input name="email" type="email" placeholder="you@email.com" value={form.email} onChange={handleChange} style={{ borderColor: errors.email ? "#f87171" : "" }} disabled={status === "otp-verified" || status === "loading"} />
                {errors.email && <span style={{ color: "#f87171", fontSize: "0.82rem" }}>{errors.email}</span>}
                
                {status === "otp-sent" && (
                  <div style={{ display: "grid", gap: "0.75rem", marginTop: "0.75rem", padding: "1.25rem", border: "1px solid var(--line)", borderRadius: "16px", background: "rgba(168,85,247,0.06)" }}>
                    <label style={{ display: "grid", gap: "0.45rem", color: "var(--muted-strong)", fontWeight: 800, fontSize: "0.9rem" }}>
                      Enter 6-digit OTP sent to {form.email}
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={otp}
                        onChange={e => { setOtp(e.target.value.replace(/\D/g, "")); setOtpError(""); }}
                        placeholder="000000"
                        style={{ border: `1px solid ${otpError ? "#f87171" : "var(--line)"}`, borderRadius: "12px", background: "rgba(3,3,7,0.85)", color: "var(--text)", font: "inherit", padding: "0.85rem 1rem", outline: "none", fontSize: "1.3rem", letterSpacing: "0.25em", textAlign: "center" }}
                      />
                    </label>
                    {otpError && <p style={{ color: "#f87171", margin: 0, fontSize: "0.85rem" }}>{otpError}</p>}
                    <div style={{ display: "flex", gap: "0.75rem" }}>
                      <button type="button" onClick={handleVerifyOtp} disabled={otpLoading} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: "40px", flex: 1, borderRadius: "999px", border: "none", background: "linear-gradient(135deg, #a855f7, #d946ef)", color: "#fff", fontWeight: 800, cursor: "pointer", fontSize: "0.92rem" }}>
                        {otpLoading ? "Verifying…" : "Verify OTP"}
                      </button>
                      <button type="button" onClick={handleSendOtp} disabled={otpLoading} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: "40px", padding: "0 1.25rem", borderRadius: "999px", border: "1px solid var(--line)", background: "transparent", color: "var(--muted-strong)", fontWeight: 700, cursor: "pointer", fontSize: "0.88rem" }}>
                        Resend OTP
                      </button>
                    </div>
                  </div>
                )}

                {status === "otp-verified" && (
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#4ade80", fontWeight: 700, fontSize: "0.9rem", marginTop: "0.4rem" }}>
                    <span>✓</span> Email verified successfully
                  </div>
                )}
              </label>

              <label>
                Phone
                <input name="phone" type="tel" placeholder="+91 00000 00000" value={form.phone} onChange={handleChange} style={{ borderColor: errors.phone ? "#f87171" : "" }} />
                {errors.phone && <span style={{ color: "#f87171", fontSize: "0.82rem" }}>{errors.phone}</span>}
              </label>

              <label>
                Role *
                <select name="role" value={form.role} onChange={handleChange} style={{ borderColor: errors.role ? "#f87171" : "" }}>
                  <option value="">Select a role</option>
                  {predefinedRoles.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                {errors.role && <span style={{ color: "#f87171", fontSize: "0.82rem" }}>{errors.role}</span>}
              </label>

              {form.role === "Other (specify below)" && (
                <label>
                  Specify Your Role *
                  <input name="customRole" type="text" placeholder="e.g. Video Editor, Graphic Designer…" value={form.customRole} onChange={handleChange} style={{ borderColor: errors.customRole ? "#f87171" : "" }} />
                  {errors.customRole && <span style={{ color: "#f87171", fontSize: "0.82rem" }}>{errors.customRole}</span>}
                </label>
              )}

              <label>
                Portfolio Link
                <input name="portfolio" type="text" placeholder="https://yourportfolio.com" value={form.portfolio} onChange={handleChange} style={{ borderColor: errors.portfolio ? "#f87171" : "" }} />
                {errors.portfolio && <span style={{ color: "#f87171", fontSize: "0.82rem" }}>{errors.portfolio}</span>}
              </label>

              <label>
                Experience Level *
                <select name="experience_level" value={form.experience_level} onChange={handleChange} style={{ borderColor: errors.experience_level ? "#f87171" : "" }}>
                  <option value="">Select experience level</option>
                  <option value="fresher">Fresher</option>
                  <option value="experienced">Experienced</option>
                </select>
                {errors.experience_level && <span style={{ color: "#f87171", fontSize: "0.82rem" }}>{errors.experience_level}</span>}
              </label>

              {form.experience_level === "experienced" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <label>
                    Current Salary
                    <input name="current_salary" type="text" placeholder="e.g. ₹25,000/month" value={form.current_salary} onChange={handleChange} />
                  </label>
                  <label>
                    Expected Salary
                    <input name="expected_salary" type="text" placeholder="e.g. ₹35,000/month" value={form.expected_salary} onChange={handleChange} />
                  </label>
                </div>
              )}

              {form.experience_level === "fresher" && (
                <label>
                  Expected Salary / Stipend
                  <input name="expected_salary" type="text" placeholder="e.g. ₹10,000/month" value={form.expected_salary} onChange={handleChange} />
                </label>
              )}

              <label>
                Resume * (PDF or Word, max 5MB)
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleFile} style={{ padding: "0.7rem 1rem", cursor: "pointer", borderColor: errors.file ? "#f87171" : "" }} />
                {file && <span style={{ color: "var(--accent)", fontSize: "0.85rem" }}>✓ {file.name}</span>}
                {errors.file && <span style={{ color: "#f87171", fontSize: "0.82rem" }}>{errors.file}</span>}
              </label>

              <label>
                Cover Note
                <textarea name="message" rows={4} placeholder="Why do you want to work with Sure Marketing?" value={form.message} onChange={handleChange} />
              </label>

              {errors.submit && <p style={{ color: "#f87171", margin: 0, fontSize: "0.9rem" }}>{errors.submit}</p>}

              {status === "idle" ? (
                <button className="button" type="button" onClick={handleSendOtp} disabled={otpLoading}
                  style={{ borderColor: "transparent", background: "linear-gradient(135deg, var(--accent), var(--accent-2))", color: "#fff", cursor: "pointer" }}>
                  {otpLoading ? "Sending OTP…" : "Verify Email & Continue"}
                </button>
              ) : status === "otp-sent" ? (
                <button className="button" type="button" disabled
                  style={{ borderColor: "transparent", background: "var(--line)", color: "var(--muted)", cursor: "not-allowed", opacity: 0.6 }}>
                  Please verify your OTP above
                </button>
              ) : (
                <button className="button" type="submit" disabled={status === "loading"}
                  style={{ borderColor: "transparent", background: "linear-gradient(135deg, var(--accent), var(--accent-2))", color: "#fff", cursor: "pointer" }}>
                  {status === "loading" ? "Submitting Application…" : "Submit Application"}
                </button>
              )}
            </form>
          )}
          </div>

          {/* Right — Info panel */}
          <div className="career-info-panel">

            {/* Why join */}
            <div style={{ padding: "1.5rem", border: "1px solid var(--line)", borderRadius: "24px", background: "linear-gradient(180deg, var(--panel-strong), rgba(255,255,255,0.03))" }}>
              <p style={{ color: "var(--accent)", fontWeight: 900, fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 1rem" }}>Why Sure Marketing</p>
              {[
                ["🚀", "Real client work", "Work on live campaigns with measurable outcomes from day one."],
                ["🧠", "Learn fast", "Hands-on exposure to Google Ads, SEO, content, and web strategy."],
                ["📍", "Remote friendly", "Work from anywhere — we care about output, not location."],
                ["💬", "Direct mentorship", "Work closely with the founder, no corporate layers."],
              ].map(([icon, title, desc]) => (
                <div key={title} style={{ display: "flex", gap: "0.85rem", marginBottom: "1.1rem" }}>
                  <span style={{ fontSize: "1.25rem", flexShrink: 0, marginTop: "0.1rem" }}>{icon}</span>
                  <div>
                    <strong style={{ display: "block", color: "var(--text)", fontSize: "0.95rem", marginBottom: "0.2rem" }}>{title}</strong>
                    <span style={{ color: "var(--muted)", fontSize: "0.88rem", lineHeight: 1.6 }}>{desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Open roles */}
            <div style={{ padding: "1.5rem", border: "1px solid var(--line)", borderRadius: "24px", background: "rgba(255,255,255,0.03)" }}>
              <p style={{ color: "var(--accent)", fontWeight: 900, fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 1rem" }}>Open Roles</p>
              {predefinedRoles.filter(r => r !== "Other (specify below)").map((title) => (
                <div key={title} style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.7rem" }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
                  <span style={{ color: "var(--muted-strong)", fontSize: "0.92rem" }}>{title}</span>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div style={{ padding: "1.25rem 1.5rem", border: "1px solid var(--line)", borderRadius: "24px", background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ fontSize: "1.25rem" }}>📩</span>
              <div>
                <strong style={{ display: "block", color: "var(--text)", fontSize: "0.9rem" }}>Questions?</strong>
                <a href="mailto:yashdeliwala10@gmail.com" style={{ color: "var(--accent)", fontSize: "0.88rem" }}>yashdeliwala10@gmail.com</a>
              </div>
            </div>

          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
