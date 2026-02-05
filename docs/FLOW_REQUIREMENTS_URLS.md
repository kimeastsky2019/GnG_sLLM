# 상세 구축요건이 표시되는 플로우 단계 URL

플로우 각 단계에서 **상세 구축요건**(기능명, 상세 구축요건, 설명)이 카드 형태로 표시됩니다.

**접속 방법**: 로컬 실행 시 `npm run dev` 후 브라우저에서 아래 경로로 이동합니다.  
(HashRouter 사용 시 예: `http://localhost:5173/aienergy/#/flow/단계경로`)

---

## 기획·설계

| 단계 | path (HashRouter) | 설명 |
|------|-------------------|------|
| 프로젝트 생성 | `#/flow/project-create` | AI 서비스 기획서/모델 설명서 조회 |
| 기획서 작성 | `#/flow/planning-doc` | AI 서비스 기획서 작성 |
| 모델 설명서 작성 | `#/flow/model-doc` | AI 서비스 모델 설명서 초안 작성 |
| 사전검토 요청 | `#/flow/pre-review-request` | AI 서비스 기획서 사전검토 요청 |
| 사전검토 결과 | `#/flow/pre-review-result` | 사전검토, 결과 통보 (보완/승인 분기) |
| 위험/영향/안전성 평가 | `#/flow/risk-assessment` | 위험 식별·평가, 영향도, 안전성, 위수탁, 결과 검토 |
| 개발계획 수립 | `#/flow/dev-plan` | AI 서비스 개발계획 수립 |
| 위험관리 계획 | `#/flow/risk-plan` | 위험관리 계획 수립, 협의 요청, 협의 |
| 위험등급 판단 | `#/flow/risk-level-judge` | 저·중위험 / 고위험 분기 |
| 위험관리 계획 승인 | `#/flow/risk-plan-approval` | AI 위험 관리 계획 승인 (저·중위험) |
| 거버넌스 협의체 승인 | `#/flow/governance-approval` | 고위험 AI 사전 승인 안건 상신, 사전 승인 |

---

## 개발

| 단계 | path (HashRouter) | 설명 |
|------|-------------------|------|
| AI 서비스 개발 의뢰 | `#/flow/dev-request` | 개발 의뢰, 안전성 확보 의무 최종 판단, 안전성 요건 추가 |
| 개발 진행 관리 | `#/flow/dev-progress` | 개발환경·학습데이터, AI 서비스 개발, 준수사항 점검, 요건 이행 점검 |

---

## 평가·검증

| 단계 | path (HashRouter) | 설명 |
|------|-------------------|------|
| 운영 전 검증 | `#/flow/pre-op-verification` | 운영 전 검증, 검증 지원, 모니터링 계획, 영향평가 [권고] |
| 검증 결과 적절성 확인 | `#/flow/verification-adequacy` | 중위험 검증 결과 적절성 확인 |
| 제3자 검증 | `#/flow/third-party-verification` | 제3자 요청·수행·결과 확인, 검증결과 확인 신청·확인 |
| 운영 승인 요청 | `#/flow/op-approval-request` | 운영 승인 요청 |

---

## 도입·운영·모니터링

| 단계 | path (HashRouter) | 설명 |
|------|-------------------|------|
| 위험관리 이행 확인 및 배포 승인 | `#/flow/deployment-approval` | 이행 확인, 이행 및 배포 승인 |
| AI 서비스 배포 | `#/flow/deployment` | AI 서비스 배포, 운영, 인수인계 |
| 개선 계획/관리 | `#/flow/improvement` | AI 위험 모니터링, 모니터링 결과 점검, 개선계획 수립, AI 서비스 개선 |

---

## URL 요약 (복사용)

```
#/flow/project-create
#/flow/planning-doc
#/flow/model-doc
#/flow/pre-review-request
#/flow/pre-review-result
#/flow/risk-assessment
#/flow/dev-plan
#/flow/risk-plan
#/flow/risk-level-judge
#/flow/risk-plan-approval
#/flow/governance-approval
#/flow/dev-request
#/flow/dev-progress
#/flow/pre-op-verification
#/flow/verification-adequacy
#/flow/third-party-verification
#/flow/op-approval-request
#/flow/deployment-approval
#/flow/deployment
#/flow/improvement
```

**참고**: `dashboard` 단계는 `/dashboard`로 리다이렉트되며, 상세 구축요건 카드는 플로우 페이지(`/flow/*`)에서만 표시됩니다.
