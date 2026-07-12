export type EvaluationMethodSeed = {
  code: string;
  name: string;
  description: string | null;
};

export type EvaluationScoringMethodSeed = {
  code: string;
  name: string;
  description: string | null;
};

export type EvaluationTemplateSeed = {
  code: string;
  name: string;
  description: string | null;
  methodCode: string;
  scoringMethodCode: string;
};

export type EvaluationCriteriaSeed = {
  code: string;
  name: string;
  description: string | null;
  templateCode: string;
  weight: number;
  maxScore: number | null;
  sortOrder: number;
};

export const evaluationMethods: EvaluationMethodSeed[] = [
  {
    code: "lowest_price",
    name: "Lowest Price",
    description: "Award to the lowest responsive bidder",
  },
  {
    code: "technical_commercial",
    name: "Technical and Commercial",
    description: "Combined technical and commercial evaluation",
  },
  {
    code: "two_envelope",
    name: "Two Envelope",
    description: "Separate technical and commercial envelopes",
  },
  {
    code: "quality_cost_based",
    name: "Quality and Cost Based",
    description: "QCBS evaluation combining quality and cost",
  },
  {
    code: "direct_award",
    name: "Direct Award",
    description: "Direct award without competitive bidding",
  },
  {
    code: "negotiation",
    name: "Negotiation",
    description: "Negotiated procurement evaluation",
  },
];

export const evaluationScoringMethods: EvaluationScoringMethodSeed[] = [
  {
    code: "weighted_sum",
    name: "Weighted Sum",
    description: "Weighted sum of criteria scores",
  },
  {
    code: "pass_fail",
    name: "Pass / Fail",
    description: "Binary pass or fail per criterion",
  },
  {
    code: "point_scale",
    name: "Point Scale",
    description: "Fixed point scale scoring",
  },
  {
    code: "percentage",
    name: "Percentage",
    description: "Percentage-based scoring",
  },
  {
    code: "ranking",
    name: "Ranking",
    description: "Rank-based comparative scoring",
  },
];

export const evaluationTemplates: EvaluationTemplateSeed[] = [
  {
    code: "goods_standard",
    name: "Goods Standard Evaluation",
    description: "Standard goods procurement template",
    methodCode: "technical_commercial",
    scoringMethodCode: "weighted_sum",
  },
  {
    code: "services_simple",
    name: "Services Simple Evaluation",
    description: "Simple services procurement template",
    methodCode: "lowest_price",
    scoringMethodCode: "ranking",
  },
  {
    code: "construction_qcbs",
    name: "Construction QCBS",
    description: "Construction QCBS evaluation template",
    methodCode: "quality_cost_based",
    scoringMethodCode: "weighted_sum",
  },
  {
    code: "consulting_pass_fail",
    name: "Consulting Pass/Fail",
    description: "Consulting two-envelope pass/fail template",
    methodCode: "two_envelope",
    scoringMethodCode: "pass_fail",
  },
];

export const evaluationCriteria: EvaluationCriteriaSeed[] = [
  {
    code: "technical_compliance",
    name: "Technical Compliance",
    description: "Compliance with technical specifications",
    templateCode: "goods_standard",
    weight: 40,
    maxScore: 100,
    sortOrder: 1,
  },
  {
    code: "commercial_price",
    name: "Commercial Price",
    description: "Evaluated commercial offer price",
    templateCode: "goods_standard",
    weight: 60,
    maxScore: 100,
    sortOrder: 2,
  },
  {
    code: "delivery_time",
    name: "Delivery Time",
    description: "Proposed delivery schedule",
    templateCode: "goods_standard",
    weight: 10,
    maxScore: 50,
    sortOrder: 3,
  },
  {
    code: "offer_price",
    name: "Offer Price",
    description: "Total offered price",
    templateCode: "services_simple",
    weight: 100,
    maxScore: null,
    sortOrder: 1,
  },
  {
    code: "technical_quality",
    name: "Technical Quality",
    description: "Quality of technical proposal",
    templateCode: "construction_qcbs",
    weight: 70,
    maxScore: 100,
    sortOrder: 1,
  },
  {
    code: "financial_offer",
    name: "Financial Offer",
    description: "Evaluated financial proposal",
    templateCode: "construction_qcbs",
    weight: 30,
    maxScore: 100,
    sortOrder: 2,
  },
  {
    code: "methodology",
    name: "Methodology",
    description: "Consulting methodology assessment",
    templateCode: "consulting_pass_fail",
    weight: 50,
    maxScore: null,
    sortOrder: 1,
  },
  {
    code: "team_experience",
    name: "Team Experience",
    description: "Relevant team experience",
    templateCode: "consulting_pass_fail",
    weight: 50,
    maxScore: null,
    sortOrder: 2,
  },
  {
    code: "local_content",
    name: "Local Content",
    description: "Local content commitment",
    templateCode: "construction_qcbs",
    weight: 10,
    maxScore: 20,
    sortOrder: 3,
  },
  {
    code: "warranty_terms",
    name: "Warranty Terms",
    description: "Warranty and after-sales terms",
    templateCode: "goods_standard",
    weight: 5,
    maxScore: 10,
    sortOrder: 4,
  },
  {
    code: "service_scope",
    name: "Service Scope",
    description: "Coverage of requested service scope",
    templateCode: "services_simple",
    weight: 0,
    maxScore: null,
    sortOrder: 2,
  },
  {
    code: "compliance_check",
    name: "Compliance Check",
    description: "Mandatory compliance verification",
    templateCode: "consulting_pass_fail",
    weight: 0,
    maxScore: null,
    sortOrder: 3,
  },
];
