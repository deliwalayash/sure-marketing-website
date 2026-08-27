"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
      <h2 style={{ fontSize: "2rem", fontWeight: "700", color: "#0f172a", marginBottom: "1rem" }}>Something went wrong!</h2>
      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          onClick={() => reset()}
          style={{ background: "#2563eb", color: "#fff", border: "none", padding: "0.75rem 1.5rem", borderRadius: "999px", fontWeight: "600", cursor: "pointer" }}
        >
          Try again
        </button>
        <Link href="/" style={{ background: "#f1f5f9", color: "#334155", padding: "0.75rem 1.5rem", borderRadius: "999px", textDecoration: "none", fontWeight: "600" }}>
          Go Home
        </Link>
      </div>
    </div>
  );
}
