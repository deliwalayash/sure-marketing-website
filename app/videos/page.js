import { CtaBand } from "@/components/Sections";

export const metadata = {
  title: "UGC Videos",
  description: "User-generated content and video ads created by Sure Marketing."
};

const videos = [
  { id: "1210136310", title: "UGC Video 1" },
  { id: "1210138265", title: "UGC Video 2" },
  { id: "1210138757", title: "UGC Video 3" },
];

export default function VideosPage() {
  return (
    <>
      <section className="section-pad">
        <div className="section-heading">
          <p className="eyebrow">UGC Videos</p>
          <h1>Real content built for attention, trust, and conversion.</h1>
        </div>

        {videos.length === 0 ? (
          <p style={{ color: "var(--muted)", fontSize: "1.05rem" }}>Videos coming soon.</p>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
            gap: "2rem",
            maxWidth: "1100px"
          }}>
            {videos.map(({ id, title }) => (
              <article key={id} style={{
                border: "1px solid var(--line)",
                borderRadius: "24px",
                overflow: "hidden",
                background: "linear-gradient(180deg, var(--panel-strong), rgba(255,255,255,0.035))",
                boxShadow: "0 24px 70px rgba(0,0,0,0.22)"
              }}>
                {/* 9:16 aspect ratio wrapper */}
                <div style={{ position: "relative", paddingBottom: "177.78%", height: 0 }}>
                  <iframe
                    src={`https://player.vimeo.com/video/${id}?badge=0&autopause=0&player_id=0&app_id=58479`}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                    title={title}
                  />
                </div>
                <div style={{ padding: "1rem 1.25rem 1.25rem" }}>
                  <h2 style={{ margin: 0, fontSize: "1.1rem", lineHeight: 1.3 }}>{title}</h2>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
      <CtaBand />
    </>
  );
}
