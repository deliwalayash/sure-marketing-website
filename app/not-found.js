import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
      <h1 style={{ fontSize: "3rem", fontWeight: "800", color: "#0f172a", marginBottom: "1rem" }}>404</h1>
      <p style={{ fontSize: "1.2rem", color: "#64748b", marginBottom: "2rem" }}>Page not found.</p>
      <Link href="/" style={{ background: "#2563eb", color: "#fff", padding: "0.75rem 1.5rem", borderRadius: "999px", textDecoration: "none", fontWeight: "600" }}>
        Go Back Home
      </Link>
    </div>
  );
}
