import { ImageResponse } from "@vercel/og";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Dynamic Query Parameters
    const title = searchParams.get("title") || "Deep Moitra";
    const desc = searchParams.get("desc") || "Senior Product Engineer & Solutions Architect";
    const category = searchParams.get("category") || "portfolio";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            backgroundColor: "#09090b",
            padding: "80px",
            borderLeft: "8px solid #adc6ff", // Primary glow line
          }}
        >
          {/* Category tag */}
          <div
            style={{
              fontSize: "14px",
              fontFamily: "monospace",
              color: "#adc6ff",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              marginBottom: "24px",
            }}
          >
            {category}
          </div>

          {/* Heading */}
          <div
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              color: "#fafafa",
              lineHeight: "1.1",
              letterSpacing: "-0.04em",
              marginBottom: "16px",
              fontFamily: "serif",
            }}
          >
            {title}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: "24px",
              color: "#c2c6d6",
              lineHeight: "1.4",
              maxWidth: "800px",
            }}
          >
            {desc}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (err) {
    console.error("OG card generation failure:", err);
    return new Response(`Failed to generate image`, { status: 500 });
  }
}
