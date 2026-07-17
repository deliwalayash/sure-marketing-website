import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  try {
    const { email, otp } = await req.json();
    if (!email || !otp) return Response.json({ error: "Email and OTP required" }, { status: 400 });

    const { data, error } = await supabase
      .from("otp_verifications")
      .select("*")
      .eq("email", email)
      .eq("otp", otp)
      .single();

    if (error || !data) return Response.json({ error: "Invalid OTP. Please check and try again." }, { status: 400 });

    if (new Date(data.expires_at) < new Date()) {
      return Response.json({ error: "OTP has expired. Please request a new one." }, { status: 400 });
    }

    // Mark as verified
    await supabase.from("otp_verifications").update({ verified: true }).eq("id", data.id);

    return Response.json({ success: true });
  } catch (err) {
    console.error("verify-otp error:", err);
    return Response.json({ error: "Verification failed. Please try again." }, { status: 500 });
  }
}
