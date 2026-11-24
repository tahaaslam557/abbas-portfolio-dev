import { NextResponse } from "next/server";
import { validateContact } from "@/lib/contact";

/**
 * CONTACT FORM INTEGRATION POINT
 * ------------------------------------------------------------------
 * No delivery service is configured yet, so this route validates the
 * submission and then honestly reports that it cannot deliver it (503).
 *
 * To go live, set CONTACT_WEBHOOK_URL (e.g. a Formspree / Make / Zapier /
 * Slack webhook, or your own endpoint) in the deployment environment.
 * The validated payload is POSTed there as JSON.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const result = validateContact(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: "Please check the highlighted fields.", fields: result.errors }, { status: 422 });
  }

  // honeypot — silently accept bots
  if (result.data.company) return NextResponse.json({ ok: true });

  const endpoint = process.env.CONTACT_WEBHOOK_URL;
  if (!endpoint) {
    return NextResponse.json(
      { ok: false, error: "The contact form isn’t connected to a mailbox yet, so your message was not sent." },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: result.data.name,
        email: result.data.email,
        projectType: result.data.projectType,
        message: result.data.message,
      }),
    });
    if (!res.ok) throw new Error(`Upstream ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Something went wrong while sending. Please try again." }, { status: 502 });
  }
}
