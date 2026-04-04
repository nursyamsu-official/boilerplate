import { appConfig } from "@/config/app.config"
import { sendEmail } from "@/lib/email"

function buildEmailLayout({
  heading,
  body,
  ctaLabel,
  ctaUrl,
}: {
  heading: string
  body: string
  ctaLabel: string
  ctaUrl: string
}) {
  const appName = appConfig.appName

  return `
    <div style="font-family: Arial, Helvetica, sans-serif; background: #f8fafc; padding: 32px 16px;">
      <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 32px; border: 1px solid #e2e8f0;">
        <p style="margin: 0 0 16px; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #64748b;">
          ${appName}
        </p>
        <h1 style="margin: 0 0 16px; font-size: 24px; color: #0f172a;">
          ${heading}
        </h1>
        <p style="margin: 0 0 24px; line-height: 1.6; color: #334155;">
          ${body}
        </p>
        <a
          href="${ctaUrl}"
          style="display: inline-block; padding: 12px 18px; border-radius: 10px; background: #0f172a; color: #ffffff; text-decoration: none; font-weight: 600;"
        >
          ${ctaLabel}
        </a>
        <p style="margin: 24px 0 0; font-size: 12px; line-height: 1.6; color: #64748b;">
          If the button does not work, copy and paste this link into your browser:<br />
          <a href="${ctaUrl}" style="color: #0f172a;">${ctaUrl}</a>
        </p>
      </div>
    </div>
  `
}

export async function sendVerificationEmail({
  email,
  name,
  url,
}: {
  email: string
  name: string
  url: string
}) {
  const subject = `Verify your email for ${appConfig.appName}`
  const greetingName = name || "there"

  return sendEmail({
    to: email,
    subject,
    text: `Hi ${greetingName}, verify your email by opening this link: ${url}`,
    html: buildEmailLayout({
      heading: "Verify your email address",
      body: `Hi ${greetingName}, thanks for signing up. Please verify your email address to activate your account and continue to the dashboard.`,
      ctaLabel: "Verify email",
      ctaUrl: url,
    }),
  })
}

export async function sendPasswordResetEmail({
  email,
  name,
  url,
}: {
  email: string
  name: string
  url: string
}) {
  const subject = `Reset your password for ${appConfig.appName}`
  const greetingName = name || "there"

  return sendEmail({
    to: email,
    subject,
    text: `Hi ${greetingName}, reset your password by opening this link: ${url}`,
    html: buildEmailLayout({
      heading: "Reset your password",
      body: `Hi ${greetingName}, we received a request to reset your password. Use the link below to choose a new one.`,
      ctaLabel: "Reset password",
      ctaUrl: url,
    }),
  })
}
