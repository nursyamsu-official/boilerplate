import { prisma } from "@/lib/prisma";

import {
  evaluationCriteria,
  evaluationMethods,
  evaluationScoringMethods,
  evaluationTemplates,
} from "../data/evaluation";

export async function seedEvaluation() {
  const methodIdByCode = new Map<string, string>();
  const scoringMethodIdByCode = new Map<string, string>();
  const templateIdByCode = new Map<string, string>();

  for (const method of evaluationMethods) {
    const record = await prisma.evaluationMethod.upsert({
      where: { code: method.code },
      update: {
        name: method.name,
        description: method.description,
        isActive: true,
      },
      create: {
        code: method.code,
        name: method.name,
        description: method.description,
        isActive: true,
      },
      select: { id: true, code: true },
    });
    methodIdByCode.set(method.code, record.id);
  }

  for (const scoringMethod of evaluationScoringMethods) {
    const record = await prisma.evaluationScoringMethod.upsert({
      where: { code: scoringMethod.code },
      update: {
        name: scoringMethod.name,
        description: scoringMethod.description,
        isActive: true,
      },
      create: {
        code: scoringMethod.code,
        name: scoringMethod.name,
        description: scoringMethod.description,
        isActive: true,
      },
      select: { id: true, code: true },
    });
    scoringMethodIdByCode.set(scoringMethod.code, record.id);
  }

  for (const template of evaluationTemplates) {
    const evaluationMethodId = methodIdByCode.get(template.methodCode);
    const evaluationScoringMethodId = scoringMethodIdByCode.get(
      template.scoringMethodCode,
    );

    if (!evaluationMethodId) {
      throw new Error(
        `Missing evaluation method for template ${template.code}: ${template.methodCode}`,
      );
    }

    if (!evaluationScoringMethodId) {
      throw new Error(
        `Missing scoring method for template ${template.code}: ${template.scoringMethodCode}`,
      );
    }

    const record = await prisma.evaluationTemplate.upsert({
      where: { code: template.code },
      update: {
        name: template.name,
        description: template.description,
        evaluationMethodId,
        evaluationScoringMethodId,
        isActive: true,
      },
      create: {
        code: template.code,
        name: template.name,
        description: template.description,
        evaluationMethodId,
        evaluationScoringMethodId,
        isActive: true,
      },
      select: { id: true, code: true },
    });
    templateIdByCode.set(template.code, record.id);
  }

  for (const criterion of evaluationCriteria) {
    const templateId = templateIdByCode.get(criterion.templateCode);
    if (!templateId) {
      throw new Error(
        `Missing evaluation template for criterion ${criterion.code}: ${criterion.templateCode}`,
      );
    }

    await prisma.evaluationCriteria.upsert({
      where: {
        templateId_code: {
          templateId,
          code: criterion.code,
        },
      },
      update: {
        name: criterion.name,
        description: criterion.description,
        weight: criterion.weight,
        maxScore: criterion.maxScore,
        sortOrder: criterion.sortOrder,
        isActive: true,
      },
      create: {
        templateId,
        code: criterion.code,
        name: criterion.name,
        description: criterion.description,
        weight: criterion.weight,
        maxScore: criterion.maxScore,
        sortOrder: criterion.sortOrder,
        isActive: true,
      },
    });
  }

  console.log("Evaluation seed complete:");
  console.log(`  methods:          ${evaluationMethods.length}`);
  console.log(`  scoring methods:  ${evaluationScoringMethods.length}`);
  console.log(`  templates:        ${evaluationTemplates.length}`);
  console.log(`  criteria:         ${evaluationCriteria.length}`);
}
