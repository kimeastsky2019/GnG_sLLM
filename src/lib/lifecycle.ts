/**
 * AI 서비스 프로젝트 라이프사이클 상태 전이 (State Machine)
 * stateDiagram-v2 기준: Draft → PlanningCompleted → PreReview → (RevisionRequired | PreReviewApproved) → ...
 */

export const LIFECYCLE_STATE_IDS = [
  "Draft",
  "PlanningCompleted",
  "PreReview",
  "RevisionRequired",
  "PreReviewApproved",
  "RiskAssessment",
  "RiskPlan",
  "HighRiskReview",
  "NormalApproval",
  "RiskPlanApproved",
  "DevelopmentRequested",
  "InDevelopment",
  "PreOperationTest",
  "ThirdPartyTest",
  "ValidationChecked",
  "OperationApprovalRequested",
  "DeploymentApproved",
  "Deployed",
  "Operating",
  "Monitoring",
  "ImprovementPlanned",
] as const;

export type LifecycleStateId = (typeof LIFECYCLE_STATE_IDS)[number];

/** 상태별 라벨 키 (i18n) */
export const LIFECYCLE_STATE_LABEL_KEYS: Record<LifecycleStateId, string> = {
  Draft: "lifecycle.Draft",
  PlanningCompleted: "lifecycle.PlanningCompleted",
  PreReview: "lifecycle.PreReview",
  RevisionRequired: "lifecycle.RevisionRequired",
  PreReviewApproved: "lifecycle.PreReviewApproved",
  RiskAssessment: "lifecycle.RiskAssessment",
  RiskPlan: "lifecycle.RiskPlan",
  HighRiskReview: "lifecycle.HighRiskReview",
  NormalApproval: "lifecycle.NormalApproval",
  RiskPlanApproved: "lifecycle.RiskPlanApproved",
  DevelopmentRequested: "lifecycle.DevelopmentRequested",
  InDevelopment: "lifecycle.InDevelopment",
  PreOperationTest: "lifecycle.PreOperationTest",
  ThirdPartyTest: "lifecycle.ThirdPartyTest",
  ValidationChecked: "lifecycle.ValidationChecked",
  OperationApprovalRequested: "lifecycle.OperationApprovalRequested",
  DeploymentApproved: "lifecycle.DeploymentApproved",
  Deployed: "lifecycle.Deployed",
  Operating: "lifecycle.Operating",
  Monitoring: "lifecycle.Monitoring",
  ImprovementPlanned: "lifecycle.ImprovementPlanned",
};

/** 전이 이벤트 라벨 키 */
export const LIFECYCLE_TRANSITION_LABEL_KEYS: Record<string, string> = {
  "Draft→PlanningCompleted": "lifecycle.transition.planning_completed",
  "PlanningCompleted→PreReview": "lifecycle.transition.pre_review_request",
  "PreReview→RevisionRequired": "lifecycle.transition.revision_required",
  "RevisionRequired→PlanningCompleted": "lifecycle.transition.revision_done",
  "PreReview→PreReviewApproved": "lifecycle.transition.pre_review_approved",
  "PreReviewApproved→RiskAssessment": "lifecycle.transition.risk_assessment",
  "RiskAssessment→RiskPlan": "lifecycle.transition.risk_plan",
  "RiskPlan→HighRiskReview": "lifecycle.transition.high_risk",
  "RiskPlan→NormalApproval": "lifecycle.transition.low_medium_risk",
  "HighRiskReview→RiskPlanApproved": "lifecycle.transition.governance_approved",
  "NormalApproval→RiskPlanApproved": "lifecycle.transition.internal_approved",
  "RiskPlanApproved→DevelopmentRequested": "lifecycle.transition.dev_requested",
  "DevelopmentRequested→InDevelopment": "lifecycle.transition.in_development",
  "InDevelopment→PreOperationTest": "lifecycle.transition.pre_op_test",
  "PreOperationTest→ThirdPartyTest": "lifecycle.transition.third_party",
  "PreOperationTest→ValidationChecked": "lifecycle.transition.validation_checked",
  "ThirdPartyTest→ValidationChecked": "lifecycle.transition.third_party_done",
  "ValidationChecked→OperationApprovalRequested": "lifecycle.transition.op_approval_requested",
  "OperationApprovalRequested→DeploymentApproved": "lifecycle.transition.deployment_approved",
  "DeploymentApproved→Deployed": "lifecycle.transition.deployed",
  "Deployed→Operating": "lifecycle.transition.operating",
  "Operating→Monitoring": "lifecycle.transition.monitoring",
  "Monitoring→ImprovementPlanned": "lifecycle.transition.improvement_planned",
  "ImprovementPlanned→Operating": "lifecycle.transition.improvement_done",
};

/** 허용 전이: 현재 상태 → 다음 상태[] (분기 시 여러 개) */
export const LIFECYCLE_TRANSITIONS: Record<LifecycleStateId, LifecycleStateId[]> = {
  Draft: ["PlanningCompleted"],
  PlanningCompleted: ["PreReview"],
  PreReview: ["RevisionRequired", "PreReviewApproved"],
  RevisionRequired: ["PlanningCompleted"],
  PreReviewApproved: ["RiskAssessment"],
  RiskAssessment: ["RiskPlan"],
  RiskPlan: ["HighRiskReview", "NormalApproval"],
  HighRiskReview: ["RiskPlanApproved"],
  NormalApproval: ["RiskPlanApproved"],
  RiskPlanApproved: ["DevelopmentRequested"],
  DevelopmentRequested: ["InDevelopment"],
  InDevelopment: ["PreOperationTest"],
  PreOperationTest: ["ThirdPartyTest", "ValidationChecked"],
  ThirdPartyTest: ["ValidationChecked"],
  ValidationChecked: ["OperationApprovalRequested"],
  OperationApprovalRequested: ["DeploymentApproved"],
  DeploymentApproved: ["Deployed"],
  Deployed: ["Operating"],
  Operating: ["Monitoring"],
  Monitoring: ["ImprovementPlanned"],
  ImprovementPlanned: ["Operating"],
};

/** 이전 상태 후보 (복수일 수 있음) */
export const LIFECYCLE_PREV: Partial<Record<LifecycleStateId, LifecycleStateId[]>> = {
  PlanningCompleted: ["Draft", "RevisionRequired"],
  PreReview: ["PlanningCompleted"],
  RevisionRequired: ["PreReview"],
  PreReviewApproved: ["PreReview"],
  RiskAssessment: ["PreReviewApproved"],
  RiskPlan: ["RiskAssessment"],
  HighRiskReview: ["RiskPlan"],
  NormalApproval: ["RiskPlan"],
  RiskPlanApproved: ["HighRiskReview", "NormalApproval"],
  DevelopmentRequested: ["RiskPlanApproved"],
  InDevelopment: ["DevelopmentRequested"],
  PreOperationTest: ["InDevelopment"],
  ThirdPartyTest: ["PreOperationTest"],
  ValidationChecked: ["PreOperationTest", "ThirdPartyTest"],
  OperationApprovalRequested: ["ValidationChecked"],
  DeploymentApproved: ["OperationApprovalRequested"],
  Deployed: ["DeploymentApproved"],
  Operating: ["Deployed", "ImprovementPlanned"],
  Monitoring: ["Operating"],
  ImprovementPlanned: ["Monitoring"],
};

export function getNextStates(state: LifecycleStateId): LifecycleStateId[] {
  return LIFECYCLE_TRANSITIONS[state] ?? [];
}

export function getPrevStates(state: LifecycleStateId): LifecycleStateId[] {
  return LIFECYCLE_PREV[state] ?? [];
}

export function canTransition(from: LifecycleStateId, to: LifecycleStateId): boolean {
  return (LIFECYCLE_TRANSITIONS[from] as LifecycleStateId[] | undefined)?.includes(to) ?? false;
}

/** 기존 ServiceStatus → LifecycleStateId 매핑 (표시/마이그레이션용) */
export function serviceStatusToLifecycle(status: string): LifecycleStateId {
  switch (status) {
    case "PLANNING":
      return "Draft";
    case "DEVELOPING":
      return "InDevelopment";
    case "OPERATING":
      return "Operating";
    case "EMERGENCY_STOP":
      return "Operating"; // 별도 플래그로 구분 가능
    default:
      return "Draft";
  }
}
