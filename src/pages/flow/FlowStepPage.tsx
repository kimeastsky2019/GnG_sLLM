import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getFlowStepById, getPrevPath, FLOW_STEPS } from "@/lib/flow";
import { getFlowRequirements } from "@/lib/flowRequirements";
import { ROUTE_PATHS } from "@/lib";
import { ChevronLeft, ChevronRight, GitBranch, ListChecks, Brain, Sparkles, ShieldCheck, Zap, Bot, MessageSquare, BookOpen, Wand2, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function FlowStepPage() {
  const { stepId } = useParams<{ stepId: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // State for checkboxes, consultation, and user inputs
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [userInputs, setUserInputs] = useState<Record<string, { comment: string, regulation: string }>>({});
  const [isConsulting, setIsConsulting] = useState(false);
  const [consultResult, setConsultResult] = useState<any>(null);
  const [processingState, setProcessingState] = useState<Record<string, string>>({}); // 'generating' | 'searching'

  const requirements = stepId ? getFlowRequirements(stepId, i18n.language) : [];
  const step = stepId ? getFlowStepById(stepId) : undefined;

  // Reset state on step change
  useEffect(() => {
    setCheckedItems({});
    setUserInputs({});
    setConsultResult(null);
    setIsConsulting(false);
    setProcessingState({});
  }, [stepId]);

  // dashboard redirect
  useEffect(() => {
    if (stepId === "dashboard") {
      navigate(ROUTE_PATHS.DASHBOARD, { replace: true });
    }
  }, [stepId, navigate]);

  if (!stepId || !step) {
    navigate(ROUTE_PATHS.FLOW_REQUEST_FORM, { replace: true });
    return null;
  }

  if (stepId === "dashboard") return null;

  const prevPath = getPrevPath(step);
  const hasBranch = step.nextBranch && step.nextBranch.length > 0;
  const nextPath = !hasBranch ? step.nextPath : undefined;

  const handlePrev = () => {
    if (prevPath) navigate(prevPath);
    else navigate(ROUTE_PATHS.HOME);
  };

  const handleNext = (path: string) => {
    navigate(path);
  };

  const stepOrder = Object.keys(FLOW_STEPS).indexOf(stepId);
  const totalSteps = Object.keys(FLOW_STEPS).filter((id) => id !== "dashboard").length;
  const progress = totalSteps > 0 ? Math.round((stepOrder / totalSteps) * 100) : 0;

  const handleCheck = (id: string, checked: boolean) => {
    setCheckedItems(prev => ({ ...prev, [id]: checked }));
  };

  const handleInputChange = (id: string, field: 'comment' | 'regulation', value: string) => {
    setUserInputs(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  const handleAutoWrite = (id: string, featureName: string) => {
    setProcessingState(prev => ({ ...prev, [id]: 'generating' }));
    setTimeout(() => {
      const mockComment = i18n.language.startsWith('ko')
        ? `[AI 자동생성] '${featureName}'에 대한 초기 기획안은 안정성을 최우선으로 고려해야 합니다.`
        : `[AI Auto] Initial draft for '${featureName}' should prioritize stability.`;

      handleInputChange(id, 'comment', mockComment);
      setProcessingState(prev => ({ ...prev, [id]: '' }));
    }, 1500);
  };

  const handleSearchRegulation = (id: string, featureName: string) => {
    setProcessingState(prev => ({ ...prev, [id]: 'searching' }));
    setTimeout(() => {
      const mockReg = i18n.language.startsWith('ko')
        ? "ISO/IEC 42001 (AI Management System)"
        : "ISO/IEC 42001 (AI Management System)";
      handleInputChange(id, 'regulation', mockReg);
      setProcessingState(prev => ({ ...prev, [id]: '' }));
    }, 1500);
  };

  const handleConsult = () => {
    setIsConsulting(true);
    setConsultResult(null);

    // Collect first non-empty comment or use default
    const firstInputId = Object.keys(userInputs).find(k => userInputs[k]?.comment);
    const userInputComment = firstInputId ? userInputs[firstInputId].comment : (i18n.language.startsWith('ko') ? "기본 분석 모드" : "Default Analysis Mode");

    // Collect first non-empty regulation or use default
    const firstRegId = Object.keys(userInputs).find(k => userInputs[k]?.regulation);
    const userInputReg = firstRegId ? userInputs[firstRegId].regulation : (i18n.language.startsWith('ko') ? "EU AI Act" : "EU AI Act");

    // Simulate sLLM processing time
    setTimeout(() => {
      setIsConsulting(false);
      setConsultResult({
        planning: t("flow_consult.mock_planning").replace('{comment}', userInputComment.substring(0, 20) + (userInputComment.length > 20 ? "..." : "")),
        development: t("flow_consult.mock_dev").replace('{regulation}', userInputReg),
        operation: t("flow_consult.mock_op"),
        intro: t("flow_consult.mock_intro")
      });
    }, 2500);
  };

  return (
    <Layout>
      <div className="max-w-[1600px] mx-auto space-y-8 pb-20 px-4 md:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium text-primary">{t("flow.progress_label")}</span>
              <span>{stepOrder + 1} of {totalSteps}</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{t(step.titleKey)}</h1>
            <p className="text-muted-foreground max-w-2xl">{t(step.descriptionKey)}</p>
          </div>

          <Button
            size="lg"
            onClick={handleConsult}
            disabled={isConsulting}
            className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-xl shadow-purple-500/20 transition-all duration-300 transform hover:scale-[1.02] border-0"
          >
            {isConsulting ? (
              <>
                <Brain className="w-5 h-5 mr-2 animate-pulse" />
                {t("flow_consult.btn_consulting")}
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                {t("flow_consult.btn_consult")}
              </>
            )}
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-violet-500 to-indigo-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* Main Content: Requirements Checklist */}
          <motion.div
            className="xl:col-span-8 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Requirements List */}
            {requirements.length > 0 ? (
              <div className="space-y-6">
                {requirements.map((feat, idx) => {
                  const id = `req-${idx}`;
                  const isChecked = !!checkedItems[id];
                  const isGenerating = processingState[id] === 'generating';
                  const isSearching = processingState[id] === 'searching';

                  return (
                    <motion.div
                      key={idx}
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={cn(
                        "group relative rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300",
                        isChecked ? "border-purple-500/30 bg-purple-50/30 dark:bg-purple-900/10 shadow-lg shadow-purple-500/5 ring-1 ring-purple-500/20" : "hover:border-purple-500/20 hover:shadow-md"
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <Checkbox
                          id={id}
                          checked={isChecked}
                          onCheckedChange={(c) => handleCheck(id, c as boolean)}
                          className="mt-1.5 w-5 h-5 border-2 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                        />
                        <div className="space-y-4 flex-1 min-w-0">
                          <div className="space-y-1">
                            <label
                              htmlFor={id}
                              className="text-lg font-bold text-foreground cursor-pointer hover:text-purple-600 transition-colors block"
                            >
                              {feat.featureName}
                            </label>
                            <div className="text-base text-foreground/80 leading-relaxed cursor-pointer" onClick={() => handleCheck(id, !isChecked)}>
                              {feat.requirement}
                            </div>
                            <p className="text-sm text-muted-foreground flex items-center gap-1.5 pt-1">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-400" />
                              {feat.description}
                            </p>
                          </div>

                          {/* User Input Section - Enhanced Design */}
                          <div className="grid md:grid-cols-2 gap-5 pt-4 border-t border-border/40">
                            {/* Comment Section */}
                            <div className="space-y-2.5">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                  <MessageSquare className="w-3.5 h-3.5 text-purple-500" />
                                  <span>{t("flow.input.comment_label")}</span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 px-2 text-xs text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                                  onClick={() => handleAutoWrite(id, feat.featureName)}
                                  disabled={isGenerating}
                                >
                                  <Wand2 className={cn("w-3 h-3 mr-1.5", isGenerating && "animate-spin")} />
                                  {isGenerating ? t("flow_consult.generating") : t("flow_consult.btn_auto_write")}
                                </Button>
                              </div>
                              <Textarea
                                placeholder={t("flow.input.comment_placeholder")}
                                className="min-h-[100px] text-sm resize-none bg-background/50 focus:bg-background border-border/60 focus:border-purple-500/50 shadow-inner rounded-xl transition-all"
                                value={userInputs[id]?.comment || ""}
                                onChange={(e) => handleInputChange(id, 'comment', e.target.value)}
                              />
                            </div>

                            {/* Regulation Section */}
                            <div className="space-y-2.5">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                  <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                                  <span>{t("flow.input.regulation_label")}</span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 px-2 text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                                  onClick={() => handleSearchRegulation(id, feat.featureName)}
                                  disabled={isSearching}
                                >
                                  <Search className={cn("w-3 h-3 mr-1.5", isSearching && "animate-pulse")} />
                                  {isSearching ? t("flow_consult.searching") : t("flow_consult.btn_search_reg")}
                                </Button>
                              </div>
                              <div className="relative group/input">
                                <Input
                                  placeholder={t("flow.input.regulation_placeholder")}
                                  className="h-10 text-sm bg-background/50 focus:bg-background border-border/60 focus:border-indigo-500/50 shadow-inner rounded-xl pr-9 transition-all"
                                  value={userInputs[id]?.regulation || ""}
                                  onChange={(e) => handleInputChange(id, 'regulation', e.target.value)}
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground opacity-50 group-focus-within/input:opacity-100 transition-opacity">
                                  <ShieldCheck className="w-4 h-4" />
                                </div>
                              </div>
                              <div className="px-3 py-2 rounded-lg bg-yellow-500/5 border border-yellow-500/10 text-[11px] text-yellow-700 dark:text-yellow-400 leading-snug">
                                <span className="font-semibold block mb-0.5" >AI Tip:</span>
                                {i18n.language.startsWith('ko') ? "규제 검색을 사용하면 EU AI Act 등 최신 표준을 자동으로 매핑합니다." : "Use Regulation Search to map to EU AI Act standards."}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="min-h-[200px] rounded-2xl bg-muted/30 border-2 border-dashed border-border flex items-center justify-center p-8 text-center text-muted-foreground">
                <p>{t("flow.step_placeholder")}</p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-8 border-t">
              <Button
                variant="outline"
                size="lg"
                onClick={handlePrev}
                disabled={!prevPath}
                className="gap-2 rounded-full px-6 hover:bg-secondary/80"
              >
                <ChevronLeft className="w-4 h-4" />
                {t("flow.btn_prev")}
              </Button>

              {hasBranch ? (
                <div className="flex flex-wrap gap-3 justify-end">
                  {step.nextBranch!.map((branch) => (
                    <Button
                      key={branch.key}
                      size="lg"
                      onClick={() => handleNext(branch.path)}
                      className="gap-2 rounded-full px-6 bg-primary/90 hover:bg-primary"
                    >
                      <GitBranch className="w-4 h-4" />
                      {t(branch.labelKey)}
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  ))}
                </div>
              ) : nextPath ? (
                <Button
                  size="lg"
                  onClick={() => handleNext(nextPath)}
                  className="gap-2 rounded-full px-6 bg-primary/90 hover:bg-primary shadow-lg shadow-primary/20"
                >
                  {t("flow.btn_next")}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : null}
            </div>
          </motion.div>

          {/* Sidebar: sLLM Consultant Result */}
          <div className="xl:col-span-4 sticky top-6">
            <AnimatePresence mode="wait">
              {consultResult ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="border-0 shadow-2xl overflow-hidden bg-background/60 backdrop-blur-xl ring-1 ring-border/50">
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-indigo-500/5 pointer-events-none" />
                    <CardHeader className="bg-gradient-to-r from-purple-100/50 to-indigo-100/50 dark:from-purple-900/20 dark:to-indigo-900/20 pb-6 border-b border-purple-500/10 relative">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/30">
                          <Bot className="w-6 h-6" />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-700 dark:from-purple-300 dark:to-indigo-300">
                            {t("flow_consult.report_title")}
                          </CardTitle>
                          <p className="text-xs font-medium text-muted-foreground mt-0.5">GnG International AI Analysis</p>
                        </div>
                      </div>
                      <CardDescription className="text-foreground/70 mt-3 text-sm leading-relaxed">
                        {t("flow_consult.report_desc")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6 relative">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2.5 text-sm font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">
                          <div className="p-1 rounded bg-green-100 dark:bg-green-900/30">
                            <Brain className="w-3.5 h-3.5" />
                          </div>
                          {t("flow_consult.sec_planning")}
                        </div>
                        <p className="text-sm text-foreground/80 bg-card/50 p-4 rounded-xl border border-border/50 text-justify leading-relaxed shadow-sm">
                          {consultResult.planning}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2.5 text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                          <div className="p-1 rounded bg-blue-100 dark:bg-blue-900/30">
                            <Zap className="w-3.5 h-3.5" />
                          </div>
                          {t("flow_consult.sec_dev")}
                        </div>
                        <p className="text-sm text-foreground/80 bg-card/50 p-4 rounded-xl border border-border/50 text-justify leading-relaxed shadow-sm">
                          {consultResult.development}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2.5 text-sm font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                          <div className="p-1 rounded bg-amber-100 dark:bg-amber-900/30">
                            <ShieldCheck className="w-3.5 h-3.5" />
                          </div>
                          {t("flow_consult.sec_op")}
                        </div>
                        <p className="text-sm text-foreground/80 bg-card/50 p-4 rounded-xl border border-border/50 text-justify leading-relaxed shadow-sm">
                          {consultResult.operation}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-border/50 mt-2">
                        <div className="flex items-center gap-2 mb-3">
                          <Sparkles className="w-4 h-4 text-purple-600" />
                          <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase">{t("flow_consult.sec_intro")}</span>
                        </div>
                        <p className="text-sm text-muted-foreground italic pl-6 border-l-2 border-purple-200 dark:border-purple-800">
                          "{consultResult.intro}"
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Card className="border-2 border-dashed h-full min-h-[500px] flex items-center justify-center bg-muted/10 backdrop-blur-sm">
                    <div className="text-center p-8 space-y-6 max-w-[280px]">
                      <div className="relative mx-auto w-24 h-24">
                        <div className="absolute inset-0 bg-purple-500/20 rounded-full animate-ping" />
                        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-purple-100 to-white dark:from-purple-900 dark:to-gray-900 flex items-center justify-center shadow-lg border border-purple-200 dark:border-purple-700">
                          <Bot className="w-10 h-10 text-purple-600 dark:text-purple-300" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">{t("flow_consult.placeholder_title")}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {t("flow_consult.placeholder_desc")}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground/80">
                        <div className="bg-background/80 p-2 rounded-lg border flex flex-col items-center gap-1">
                          <Wand2 className="w-4 h-4 text-purple-500" />
                          <span>Auto Write</span>
                        </div>
                        <div className="bg-background/80 p-2 rounded-lg border flex flex-col items-center gap-1">
                          <Search className="w-4 h-4 text-indigo-500" />
                          <span>Reg Search</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Layout>
  );
}
