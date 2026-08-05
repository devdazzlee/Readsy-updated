import nodemailer from "nodemailer";

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not configured`);
  }
  return value;
}

export function createMailer() {
  const port = Number(process.env.EMAIL_PORT) || 587;
  return nodemailer.createTransport({
    host: required("EMAIL_HOST"),
    port,
    secure: port === 465,
    auth: {
      user: required("EMAIL_USER"),
      pass: required("EMAIL_PASS"),
    },
  });
}

export async function sendQuoteEmail({
  name,
  email,
  phone,
  project,
  smsConsent,
  source,
}) {
  const to = process.env.EMAIL_TO || "contact@thereadsy.com";
  const fromUser = required("EMAIL_USER");
  const transporter = createMailer();

  const subject = `New quote request from ${name}`;
  const text = [
    "New Readsy quote request",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `SMS consent: ${smsConsent || "n/a"}`,
    `Source: ${source || "website"}`,
    "",
    "Project brief:",
    project || "(none provided)",
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#141d29">
      <h2 style="margin:0 0 12px">New Readsy quote request</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>SMS consent:</strong> ${escapeHtml(smsConsent || "n/a")}</p>
      <p><strong>Source:</strong> ${escapeHtml(source || "website")}</p>
      <p><strong>Project brief:</strong></p>
      <p style="white-space:pre-wrap;background:#f3f7fb;padding:12px;border-radius:8px">${escapeHtml(project || "(none provided)")}</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"The Readsy Website" <${fromUser}>`,
    to,
    replyTo: email,
    subject,
    text,
    html,
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
