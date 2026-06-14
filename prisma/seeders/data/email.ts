export const emailSettings = [
  {
    name: "Local SMTP (inactive)",
    provider: "SMTP" as const,
    host: "localhost",
    port: 1025,
    username: null,
    password: null,
    apiKey: null,
    fromEmail: "noreply@example.com",
    fromName: "Albayyinah",
    replyTo: null,
    useTls: false,
    isActive: false,
    isDefault: false,
  },
] as const;

export const emailTemplates = [
  {
    code: "email_verification",
    name: "Email Verification",
    subject: "Verify your email address",
    bodyHtml:
      "<p>Hello {{name}},</p><p>Please verify your email by clicking the link below:</p><p><a href=\"{{link}}\">Verify email</a></p>",
    bodyText:
      "Hello {{name}},\n\nPlease verify your email using this link: {{link}}",
    variables: '["name","link"]',
    description: "Sent when a user needs to verify their email address.",
    isActive: true,
    isSystem: true,
  },
  {
    code: "password_reset",
    name: "Password Reset",
    subject: "Reset your password",
    bodyHtml:
      "<p>Hello {{name}},</p><p>Reset your password using the link below:</p><p><a href=\"{{link}}\">Reset password</a></p>",
    bodyText:
      "Hello {{name}},\n\nReset your password using this link: {{link}}",
    variables: '["name","link"]',
    description: "Sent when a user requests a password reset.",
    isActive: true,
    isSystem: true,
  },
  {
    code: "email_change",
    name: "Email Change",
    subject: "Confirm your new email address",
    bodyHtml:
      "<p>Hello {{name}},</p><p>Confirm your new email address using the link below:</p><p><a href=\"{{link}}\">Confirm email change</a></p>",
    bodyText:
      "Hello {{name}},\n\nConfirm your new email using this link: {{link}}",
    variables: '["name","link"]',
    description: "Sent when a user requests to change their email address.",
    isActive: true,
    isSystem: true,
  },
] as const;
