export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const userAgent = req.headers.get("user-agent") || "Unknown Agent";
    const referer = req.headers.get("referer") || "Direct Nav";
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";

    // Track in local log console (or persistent storage)
    console.log("Resume download tracked:", {
      timestamp: new Date().toISOString(),
      ip,
      userAgent,
      referer,
    });

    // Redirect to static resume PDF asset
    return Response.redirect(new URL("/resume.pdf", req.url));
  } catch (err) {
    console.error("Resume tracked download routing error:", err);
    return Response.redirect(new URL("/", req.url));
  }
}
