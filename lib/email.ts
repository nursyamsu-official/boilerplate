import { Resend } from "resend"

type SendEmailOptions = {
  to: string | string[]
  subject: string
  html: string
  text?: string
}

let resend: Resend | null = null

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set")
  }

  if (!resend) {
    resend = new Resend(apiKey)
  }

  return resend
}

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: SendEmailOptions) {
  const from = process.env.RESEND_FROM_EMAIL

  if (!from) {
    throw new Error("RESEND_FROM_EMAIL is not set")
  }

  return getResendClient().emails.send({
    from,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
    text,
  })
}
