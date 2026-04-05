import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const fromEmail = process.env.AUTH_FROM_EMAIL ?? "no-reply@example.com"

type SendAuthEmailInput = {
  to: string
  subject: string
  html: string
}

export async function sendAuthEmail({ to, subject, html }: SendAuthEmailInput) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured")
  }

  await resend.emails.send({
    from: fromEmail,
    to,
    subject,
    html,
  })
}
