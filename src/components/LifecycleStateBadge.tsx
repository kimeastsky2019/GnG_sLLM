import React from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import type { LifecycleStateId } from "@/lib/lifecycle";
import { LIFECYCLE_STATE_LABEL_KEYS, getNextStates } from "@/lib/lifecycle";
import { cn } from "@/lib/utils";

const LIFECYCLE_BADGE_VARIANTS: Record<LifecycleStateId, string> = {
  Draft: "bg-muted text-muted-foreground border-muted-foreground/30",
  PlanningCompleted: "bg-chart-4/15 text-chart-4 border-chart-4/40",
  PreReview: "bg-chart-2/15 text-chart-2 border-chart-2/40",
  RevisionRequired: "bg-destructive/10 text-destructive border-destructive/30",
  PreReviewApproved: "bg-chart-3/15 text-chart-3 border-chart-3/40",
  RiskAssessment: "bg-primary/10 text-primary border-primary/30",
  RiskPlan: "bg-primary/10 text-primary border-primary/30",
  HighRiskReview: "bg-destructive/10 text-destructive border-destructive/30",
  NormalApproval: "bg-chart-3/15 text-chart-3 border-chart-3/40",
  RiskPlanApproved: "bg-chart-3/15 text-chart-3 border-chart-3/40",
  DevelopmentRequested: "bg-chart-2/15 text-chart-2 border-chart-2/40",
  InDevelopment: "bg-chart-2/15 text-chart-2 border-chart-2/40",
  PreOperationTest: "bg-chart-4/15 text-chart-4 border-chart-4/40",
  ThirdPartyTest: "bg-destructive/10 text-destructive border-destructive/30",
  ValidationChecked: "bg-chart-3/15 text-chart-3 border-chart-3/40",
  OperationApprovalRequested: "bg-chart-4/15 text-chart-4 border-chart-4/40",
  DeploymentApproved: "bg-chart-3/15 text-chart-3 border-chart-3/40",
  Deployed: "bg-chart-3/15 text-chart-3 border-chart-3/40",
  Operating: "bg-chart-3/15 text-chart-3 border-chart-3/40",
  Monitoring: "bg-chart-3/15 text-chart-3 border-chart-3/40",
  ImprovementPlanned: "bg-destructive/10 text-destructive border-destructive/30",
};

interface LifecycleStateBadgeProps {
  state: LifecycleStateId;
  className?: string;
  showLabel?: boolean;
}

export function LifecycleStateBadge({ state, className, showLabel = true }: LifecycleStateBadgeProps) {
  const { t } = useTranslation();
  const labelKey = LIFECYCLE_STATE_LABEL_KEYS[state];
  const variant = LIFECYCLE_BADGE_VARIANTS[state] ?? "bg-muted text-muted-foreground border";
  return (
    <Badge variant="outline" className={cn("text-[10px] font-semibold border", variant, className)}>
      {showLabel && t(labelKey)}
    </Badge>
  );
}

interface LifecycleNextActionsProps {
  currentState: LifecycleStateId;
  onTransition?: (nextState: LifecycleStateId) => void;
  className?: string;
}

export function LifecycleNextActions({ currentState, onTransition, className }: LifecycleNextActionsProps) {
  const { t } = useTranslation();
  const nextStates = getNextStates(currentState);
  if (nextStates.length === 0) return null;
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <span className="text-xs text-muted-foreground self-center">{t("lifecycle.next_actions")}:</span>
      {nextStates.map((next) => (
        <button
          key={next}
          type="button"
          onClick={() => onTransition?.(next)}
          className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
        >
          {t(LIFECYCLE_STATE_LABEL_KEYS[next])}
        </button>
      ))}
    </div>
  );
}
