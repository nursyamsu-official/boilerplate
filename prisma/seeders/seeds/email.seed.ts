import { prisma } from "@/lib/prisma";

import { emailSettings, emailTemplates } from "../data/email";

export async function seedEmail() {
  let emailSettingCount = 0;

  for (const setting of emailSettings) {
    const existing = await prisma.emailSetting.findFirst({
      where: { name: setting.name },
      select: { id: true },
    });

    if (existing) continue;

    await prisma.emailSetting.create({
      data: {
        name: setting.name,
        provider: setting.provider,
        host: setting.host,
        port: setting.port,
        username: setting.username,
        password: setting.password,
        apiKey: setting.apiKey,
        fromEmail: setting.fromEmail,
        fromName: setting.fromName,
        replyTo: setting.replyTo,
        useTls: setting.useTls,
        isActive: setting.isActive,
        isDefault: setting.isDefault,
      },
    });
    emailSettingCount += 1;
  }

  for (const template of emailTemplates) {
    await prisma.emailTemplate.upsert({
      where: { code: template.code },
      update: {},
      create: {
        code: template.code,
        name: template.name,
        subject: template.subject,
        bodyHtml: template.bodyHtml,
        bodyText: template.bodyText,
        variables: template.variables,
        description: template.description,
        isActive: template.isActive,
        isSystem: template.isSystem,
      },
    });
  }

  console.log("Email seed complete:");
  console.log(`  settings:  ${emailSettingCount}`);
  console.log(`  templates: ${emailTemplates.length}`);
}
