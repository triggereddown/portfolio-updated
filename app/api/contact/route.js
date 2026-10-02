import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.enum(["Job Opportunity", "Freelance Project", "Collaboration", "General", "Other"]),
  company: z.string().optional(),
  message: z.string().min(30),
});

export async function POST(req) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // Web3Forms direct email transmission
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (accessKey) {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          from_name: parsed.data.name,
          subject: `Portfolio Contact: ${parsed.data.subject}`,
          name: parsed.data.name,
          email: parsed.data.email,
          company: parsed.data.company || "N/A",
          message: parsed.data.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to transmit email via Web3Forms API");
      }
      console.log("Contact email transmitted successfully via Web3Forms.");
    } else {
      console.warn("WEB3FORMS_ACCESS_KEY environment key not found. Email dispatch skipped.");
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact API routing error:", err);
    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
