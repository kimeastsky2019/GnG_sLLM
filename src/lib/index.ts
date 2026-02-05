export const ROUTE_PATHS = {
  HOME: "/",
  DEMO: "/demo",
  DASHBOARD: "/dashboard",
  ASSESSMENT: "/assessment",
  TECHNICAL_VALIDATION: "/technical-validation",
  MONITORING: "/monitoring",
  COMPLIANCE: "/compliance",
  SLLM_AUTOMATION: "/sllm-automation",
  SERVICE_DETAIL: "/service/:id",
  ENERGY_INTRO: "/energy-intro",
  // AI 거버넌스 플로우 (flowchart 기준)
  FLOW: "/flow",
  FLOW_STEP: "/flow/:stepId",
  FLOW_REQUEST_FORM: "/flow/request-form",
  FLOW_PROJECT_CREATE: "/flow/project-create",
  FLOW_PLANNING_DOC: "/flow/planning-doc",
  FLOW_MODEL_DOC: "/flow/model-doc",
  FLOW_PRE_REVIEW_REQUEST: "/flow/pre-review-request",
  FLOW_RISK_ASSESSMENT: "/flow/risk-assessment",
  FLOW_PRE_REVIEW_RESULT: "/flow/pre-review-result",
  FLOW_DEV_PLAN: "/flow/dev-plan",
  FLOW_RISK_PLAN: "/flow/risk-plan",
  FLOW_RISK_LEVEL_JUDGE: "/flow/risk-level-judge",
  FLOW_RISK_PLAN_APPROVAL: "/flow/risk-plan-approval",
  FLOW_GOVERNANCE_APPROVAL: "/flow/governance-approval",
  FLOW_DEV_REQUEST: "/flow/dev-request",
  FLOW_DEV_PROGRESS: "/flow/dev-progress",
  FLOW_PRE_OP_VERIFICATION: "/flow/pre-op-verification",
  FLOW_VERIFICATION_BRANCH: "/flow/verification-branch",
  FLOW_VERIFICATION_ADEQUACY: "/flow/verification-adequacy",
  FLOW_THIRD_PARTY_VERIFICATION: "/flow/third-party-verification",
  FLOW_OP_APPROVAL_REQUEST: "/flow/op-approval-request",
  FLOW_DEPLOYMENT_APPROVAL: "/flow/deployment-approval",
  FLOW_DEPLOYMENT: "/flow/deployment",
  FLOW_IMPROVEMENT: "/flow/improvement",
} as const;

export {
  FLOW_STEPS,
  FLOW_STEP_IDS,
  getFlowStepByPath,
  getFlowStepById,
  getPrevPath,
} from "./flow";
export type { FlowStepId, FlowStepDef, FlowStepBranch } from "./flow";

export {
  LIFECYCLE_STATE_IDS,
  LIFECYCLE_STATE_LABEL_KEYS,
  LIFECYCLE_TRANSITIONS,
  LIFECYCLE_TRANSITION_LABEL_KEYS,
  getNextStates,
  getPrevStates,
  canTransition,
  serviceStatusToLifecycle,
} from "./lifecycle";
export type { LifecycleStateId } from "./lifecycle";

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type ServiceStatus = "PLANNING" | "DEVELOPING" | "OPERATING" | "EMERGENCY_STOP";

export const RISK_LEVELS = {
  LOW: {
    label: "risk.low",
    color: "oklch(0.72 0.15 150)",
    bg: "oklch(0.72 0.15 150 / 0.1)",
    status: "success",
  },
  MEDIUM: {
    label: "risk.medium",
    color: "oklch(0.82 0.14 75)",
    bg: "oklch(0.82 0.14 75 / 0.1)",
    status: "warning",
  },
  HIGH: {
    label: "risk.high",
    color: "oklch(0.68 0.18 35)",
    bg: "oklch(0.68 0.18 35 / 0.1)",
    status: "destructive",
  },
  CRITICAL: {
    label: "risk.critical",
    color: "oklch(0.55 0.18 25)",
    bg: "oklch(0.55 0.18 25 / 0.1)",
    status: "destructive",
  },
} as const;

export const AI_CATEGORIES = [
  { id: "energy_supply_solar", label: "에너지 공급 (태양광 예측)", isHighImpact: true },
  { id: "energy_supply_ess", label: "에너지 저장 (ESS 관리)", isHighImpact: true },
  { id: "energy_demand_equipment", label: "에너지 수요 (기기 제어)", isHighImpact: true },
  { id: "energy_demand_standby", label: "에너지 수요 (항시대기 최적화)", isHighImpact: false },
  { id: "energy_demand_hvac", label: "에너지 수요 (공조 시스템)", isHighImpact: false },
  { id: "energy_grid_balance", label: "그리드 밸런싱 (수급 균형)", isHighImpact: true },
] as const;

export interface AIService {
  id: string;
  name: string;
  category: string;
  description: string;
  riskLevel: RiskLevel;
  status: ServiceStatus;
  /** 라이프사이클 상태 전이 다이어그램 기준 (있으면 우선 표시) */
  lifecycleState?: import("./lifecycle").LifecycleStateId;
  complianceRate: number;
  lastUpdated: string;
  owner: string;
}

export interface RiskAssessment {
  id: string;
  serviceId: string;
  isHighImpact: boolean;
  assessmentDate: string;
  complianceScore: number;
  automaticNotice: string;
  checklist: {
    id: string;
    requirement: string;
    isMet: boolean;
    lawReference: string;
  }[];
}

export interface TechnicalValidation {
  id: string;
  serviceId: string;
  validationDate: string;
  biasMetrics: {
    group: string;
    biasScore: number;
  }[];
  xaiHeatmap: {
    feature: string;
    impact: number;
  }[];
  redTeamingLog: {
    scenario: string;
    status: "PASSED" | "FAILED";
    details: string;
  }[];
  securityScore: number;
  explainabilityScore: number;
}

export function getRiskLevelInfo(level: RiskLevel) {
  return RISK_LEVELS[level];
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString));
}

export function cn(...inputs: (string | undefined | null | boolean)[]) {
  return inputs.filter(Boolean).join(" ");
}
