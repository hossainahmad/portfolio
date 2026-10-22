import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO = process.env.CONTACT_TO ?? "hossain.ahmad38@gmail.com";
const FROM =
  process.env.CONTACT_FROM ?? "Portfolio Contact <onboarding@resend.dev>";

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Bad request" },
      { status: 400 },
    );
  }

  // Honeypot — bots fill every field. Pretend success, send nothing.
  if (
    typeof data.company_website === "string" &&
    data.company_website.trim() !== ""
  ) {
    return NextResponse.json({ ok: true });
  }

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const company = String(data.company ?? "").trim();
  const message = String(data.message ?? "").trim();
  const need = String(data.need ?? "").trim() || "Not sure yet";
  const timeline = String(data.timeline ?? "").trim() || "Flexible";

  const validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  if (name.length < 2 || !validEmail || message.length < 10) {
    return NextResponse.json(
      { ok: false, error: "Validation failed" },
      { status: 400 },
    );
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY); // constructed here so a missing key never crashes the build
    await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: `${name} <${email}>`, // hit Reply and you're answering the sender directly
      subject: `Project inquiry — ${name}${company ? ` · ${company}` : ""}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        company ? `Company: ${company}` : null,
        `Need: ${need}`,
        `Timeline: ${timeline}`,
        "",
        message,
        "",
        "— Sent from the portfolio contact form",
      ]
        .filter((line) => line !== null)
        .join("\n"),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact send failed", err);
    return NextResponse.json(
      { ok: false, error: "Send failed" },
      { status: 500 },
    );
  }
}
