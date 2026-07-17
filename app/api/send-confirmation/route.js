import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, role } = await req.json();

    await resend.emails.send({
      from: "Sure Marketing <onboarding@resend.dev>",
      to: email,
      subject: `Application Received – ${role} | Sure Marketing`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 36px; background: #030307; color: #f7f7fb; border-radius: 16px;">
          <div style="margin-bottom: 28px;">
            <span style="background: linear-gradient(135deg, #a855f7, #d946ef); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 1.4rem; font-weight: 900;">Sure Marketing</span>
          </div>

          <h2 style="margin: 0 0 8px; font-size: 1.6rem; color: #f7f7fb;">Hi ${name}, thanks for applying! 🎉</h2>
          <p style="color: #aaa2ba; margin: 8px 0 28px; line-height: 1.7;">
            We have received your application for the <strong style="color: #f7f7fb;">${role}</strong> position at Sure Marketing. We are reviewing it and will get back to you within <strong style="color: #f7f7fb;">2–3 business days</strong>.
          </p>

          <div style="background: rgba(168,85,247,0.1); border: 1px solid rgba(168,85,247,0.25); border-radius: 12px; padding: 20px 24px; margin-bottom: 28px;">
            <p style="margin: 0 0 6px; color: #d8d0e8; font-weight: 700; font-size: 0.9rem;">What happens next?</p>
            <ul style="margin: 0; padding-left: 18px; color: #aaa2ba; line-height: 1.9; font-size: 0.92rem;">
              <li>Our team reviews your resume and portfolio</li>
              <li>If shortlisted, we will reach out for a brief call</li>
              <li>You will receive a decision within 3 business days</li>
            </ul>
          </div>

          <p style="color: #aaa2ba; margin: 0 0 20px; line-height: 1.7; font-size: 0.92rem;">
            In the meantime, feel free to check out our work at 
            <a href="https://www.suremarketing.in/portfolio" style="color: #a855f7; text-decoration: none;">suremarketing.in/portfolio</a> 
            or read our latest insights on the 
            <a href="https://www.suremarketing.in/blog" style="color: #a855f7; text-decoration: none;">blog</a>.
          </p>

          <p style="color: #d8d0e8; margin: 0 0 4px; font-weight: 700;">Yash Deliwala</p>
          <p style="color: #aaa2ba; margin: 0; font-size: 0.88rem;">Founder, Sure Marketing</p>
          <p style="margin: 4px 0 0;">
            <a href="mailto:yashdeliwala10@gmail.com" style="color: #a855f7; font-size: 0.88rem; text-decoration: none;">yashdeliwala10@gmail.com</a>
          </p>
        </div>
      `
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("send-confirmation error:", err);
    return Response.json({ error: "Failed to send confirmation email." }, { status: 500 });
  }
}
