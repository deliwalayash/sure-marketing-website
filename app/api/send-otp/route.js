import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email) return Response.json({ error: "Email required" }, { status: 400 });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    // Delete old OTPs for this email
    await supabase.from("otp_verifications").delete().eq("email", email);

    // Store new OTP
    const { error: dbError } = await supabase.from("otp_verifications").insert([{
      email,
      otp,
      expires_at: expiresAt.toISOString(),
      verified: false
    }]);

    if (dbError) throw dbError;

    // Send OTP email via Gmail SMTP
    await transporter.sendMail({
      from: `"Sure Marketing" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Your OTP for Sure Marketing Application",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #030307; color: #f7f7fb; border-radius: 16px;">
          <div style="margin-bottom: 24px;">
            <span style="background: linear-gradient(135deg, #a855f7, #d946ef); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 1.4rem; font-weight: 900;">Sure Marketing</span>
          </div>
          <h2 style="margin: 0 0 8px; font-size: 1.5rem; color: #f7f7fb;">Email Verification</h2>
          <p style="color: #aaa2ba; margin: 0 0 28px; line-height: 1.6;">Use the OTP below to verify your email address. It expires in <strong style="color: #f7f7fb;">10 minutes</strong>.</p>
          <div style="background: rgba(168,85,247,0.12); border: 1px solid rgba(168,85,247,0.3); border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 28px;">
            <span style="font-size: 2.5rem; font-weight: 900; letter-spacing: 0.2em; color: #f7f7fb;">${otp}</span>
          </div>
          <p style="color: #aaa2ba; font-size: 0.85rem; margin: 0;">If you did not request this, please ignore this email.</p>
        </div>
      `
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("send-otp error:", err);
    return Response.json({ error: "Failed to send OTP. Please try again.", details: err.message || String(err), stack: err.stack }, { status: 500 });
  }
}
