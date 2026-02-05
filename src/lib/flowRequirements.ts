/**
 * 기획·설계 단계별 상세 구축요건 (Process / Activity / 기능명 / 상세 구축요건 / 설명)
 */

export interface FlowFeatureDetail {
  /** 기능명 */
  featureName: string;
  /** 상세 구축요건 */
  requirement: string;
  /** 설명 */
  description: string;
}

type StepRequirements = Record<string, FlowFeatureDetail[]>;

const KO: StepRequirements = {
  "project-create": [
    {
      featureName: "AI 서비스 기획서 / 모델 설명서 조회",
      requirement:
        "AI 서비스(프로젝트) 목록 화면에서 기획서 및 모델 설명서의 작성 여부와 진행 상태를 확인할 수 있도록 한다. 이름, 상태, 단계별 필터 및 정렬 기능을 제공하고, 상세 화면을 통해 문서 내용을 조회할 수 있도록 구성한다.",
      description: "서비스(프로젝트)별 기획 문서의 작성 현황과 진행 상태를 한눈에 파악하기 위함",
    },
  ],
  "planning-doc": [
    {
      featureName: "AI 서비스 기획서 작성",
      requirement:
        "AI 거버넌스 프로세스 적용 대상 AI 서비스(프로젝트)에 대해 신규 기획서를 생성할 수 있어야 하며, 서비스 개요·업무요건 등 필수 항목을 텍스트 입력 방식으로 작성하도록 구성한다. 첨부파일 업로드 기능을 제공하고, 임시저장과 작성완료 상태를 구분 관리한다. 필수 항목이 충족된 경우에만 작성완료 처리되도록 검증 로직을 적용한다.",
      description:
        "개발·도입하려는 AI 서비스의 목적, 범위, 업무 요건을 체계적으로 정리한 공식 기획 문서를 작성하기 위함",
    },
  ],
  "model-doc": [
    {
      featureName: "AI 서비스 모델 설명서 초안 작성",
      requirement:
        "AI 서비스에 적용되는 AI 모델에 대해 신규 모델 설명서를 생성할 수 있어야 하며, AI 서비스 개요, 학습데이터, 알고리즘, 서비스 프로세스 설명 항목을 입력하도록 구성한다. 기획서와 동일하게 임시저장/작성완료 상태 관리 및 첨부파일 업로드 기능을 제공한다.",
      description: "AI 서비스에 활용되는 AI 모델의 구조와 동작 원리를 명확히 문서화하기 위함",
    },
  ],
  "pre-review-request": [
    {
      featureName: "AI 서비스 기획서 사전검토 요청",
      requirement:
        "작성 완료된 AI 서비스 기획서 및 모델 설명서가 존재할 경우에만 사전검토 요청 기능이 활성화되도록 한다. 사전검토 요청 시 AI 개발 부서(담당자)를 지정할 수 있어야 하며, 요청 정보가 시스템에 기록되고 메일 및 알림이 자동 발송되도록 연계한다.",
      description: "시스템에 등록된 AI 서비스 기획 문서에 대해 개발 부서의 사전 검토를 요청하기 위함",
    },
  ],
  "risk-assessment": [
    {
      featureName: "AI 위험 식별 및 평가 수행",
      requirement:
        "AI 서비스에 대한 위험 식별 항목, 위험 완화 방안, 잔여 위험 평가 항목을 입력·평가할 수 있는 화면을 제공한다. 평가 결과를 기반으로 위험등급을 산출하고, 결과를 문서 형태로 저장·관리한다.",
      description: "AI 서비스 도입에 따른 잠재적 위험을 사전에 식별하고 체계적으로 평가하기 위함",
    },
    {
      featureName: "AI 영향도 평가 수행",
      requirement:
        "영향도 판단 기준에 따라 AI 서비스의 사회적·업무적 영향도를 평가할 수 있도록 항목을 구성한다. 평가 결과는 시스템에 저장되며, 고영향 AI 여부 판단에 활용되도록 연계한다.",
      description: "AI 서비스가 조직 및 이용자에게 미치는 영향을 사전에 평가하기 위함",
    },
    {
      featureName: "AI 안전성 평가 수행",
      requirement:
        "영향도 평가 결과 고영향 AI로 판단된 경우에만 안전성 평가 화면이 활성화되도록 제어한다. 모델 안전성 관련 평가 항목을 입력·검토하고 결과를 문서로 저장한다.",
      description: "고영향 AI 서비스의 안전성을 추가로 검증하기 위함",
    },
    {
      featureName: "AI 위수탁 평가 수행",
      requirement:
        "AI 서비스 수행 과정에서 외부 위탁 또는 재위탁이 존재하는 경우 위·수탁 관련 점검 항목을 입력·평가할 수 있도록 한다. 평가 결과는 체크리스트 형태로 관리한다.",
      description: "AI 서비스 위탁·재위탁에 따른 책임 및 위험 요소를 점검하기 위함",
    },
    {
      featureName: "AI 위험 식별 및 평가 결과 검토",
      requirement:
        "기획·개발 부서가 작성한 위험 평가 결과를 거버넌스 부서에서 검토·승인할 수 있도록 한다. 승인 결과는 평가서에 반영되어 이력으로 관리된다.",
      description: "위험 평가 결과에 대한 거버넌스 관점의 적정성을 검증하기 위함",
    },
    {
      featureName: "AI 영향 평가 결과 검토",
      requirement:
        "영향 평가서를 거버넌스 부서에서 검토·승인할 수 있도록 하며, 승인 이력 및 결과를 문서에 포함시킨다.",
      description: "AI 서비스 영향도 판단의 타당성을 검증하기 위함",
    },
    {
      featureName: "AI 안전성 평가 결과 검토",
      requirement:
        "안전성 평가 결과를 거버넌스 부서에서 검토·승인하고, 승인 결과를 평가서에 기록한다.",
      description: "고영향 AI 서비스의 안전성 확보 여부를 확인하기 위함",
    },
  ],
  "pre-review-result": [
    {
      featureName: "AI 서비스 기획 사전검토",
      requirement:
        "AI 서비스 기획서, 모델 설명서 및 평가서를 연동하여 검토 화면에서 확인할 수 있도록 한다. 검토자는 검토 의견을 기록하고 승인 또는 보완 요청 처리를 수행할 수 있어야 한다.",
      description: "AI 서비스 기획 단계에서 적정성 여부를 공식적으로 사전 검토하기 위함",
    },
    {
      featureName: "AI 서비스 기획 사전검토 결과 통보",
      requirement:
        "사전검토 완료 시 결과(승인/보완 요청)를 서비스 기획 부서에 자동 통보하도록 한다. 메일 및 메신저 알림을 통해 결과와 주요 코멘트를 전달한다.",
      description: "사전검토 결과를 신속하고 명확하게 공유하기 위함",
    },
  ],
  "dev-plan": [
    {
      featureName: "AI 서비스 개발계획 수립",
      requirement:
        "사전검토 결과를 반영하여 AI 모델 개발 개요, 업무 요건, 개발 일정 및 관리 방안을 입력할 수 있는 개발계획서 작성 기능을 제공한다.",
      description: "AI 서비스 구현을 위한 구체적인 개발 계획을 수립하기 위함",
    },
  ],
  "risk-plan": [
    {
      featureName: "AI 위험 관리 계획 수립",
      requirement:
        "서비스 기획 내용과 위험 평가 결과를 연동하여 위험별 완화 방안, 담당자, 관리 방안을 입력할 수 있는 위험 관리 계획서를 작성한다.",
      description: "식별된 위험을 체계적으로 관리하기 위한 실행 계획을 수립하기 위함",
    },
    {
      featureName: "AI 위험 관리 계획 협의 요청",
      requirement:
        "수립된 위험 관리 계획에 대해 관련 부서에 협의를 요청할 수 있도록 하며, 요청 내역과 이력을 시스템에 기록하고 알림을 발송한다.",
      description: "위험 관리 계획에 대한 부서 간 합의를 도출하기 위함",
    },
    {
      featureName: "AI 위험 관리 계획 협의",
      requirement:
        "협의 과정에서 제시된 의견과 조정 결과를 위험 관리 계획서에 반영하여 관리한다.",
      description: "위험 관리 방안의 실효성을 높이기 위함",
    },
  ],
  "risk-plan-approval": [
    {
      featureName: "AI 위험 관리 계획 승인",
      requirement:
        "협의가 완료된 위험 관리 계획에 대해 저·중위험 AI 서비스는 내부 승인 절차를 통해 확정 처리한다. 승인 결과는 문서에 반영된다.",
      description: "위험 관리 계획을 공식적으로 확정하기 위함",
    },
  ],
  "governance-approval": [
    {
      featureName: "고위험 AI 사전 승인 안건 상신",
      requirement:
        "위험 평가 결과 고위험으로 판별된 AI 서비스에 대해 거버넌스 협의체 승인 안건을 생성하고 관련 문서를 연동하여 상신한다.",
      description: "고위험 AI 서비스에 대한 최고 수준의 사전 통제를 수행하기 위함",
    },
    {
      featureName: "사전 승인",
      requirement:
        "거버넌스 협의체를 개최하여 고위험 AI 서비스의 위험 관리 계획을 검토·승인하고, 승인 결과 및 회의록을 기록·관리한다.",
      description: "고위험 AI 서비스 도입에 대한 조직 차원의 최종 의사결정을 수행하기 위함",
    },
  ],
  "dev-request": [
    {
      featureName: "AI 서비스 개발 의뢰",
      requirement:
        "위험관리계획이 사전 승인 완료된 AI 서비스에 대해 ITSM 내 기존 요청 건과 연계하여 AI 서비스 개발용 서브프로젝트를 생성한다. 기존 ITSM의 승인·결재 흐름(BA 접수~보안담당자 결재)은 그대로 유지되도록 하며, AI 거버넌스 산출물과 연동 정보만 추가 관리한다.",
      description: "승인된 AI 서비스에 대해 공식적인 개발 착수를 ITSM 체계 내에서 수행하기 위함",
    },
    {
      featureName: "안전성 확보 의무 적용 대상 최종 판단",
      requirement:
        "검토 및 승인 완료된 AI 안전성 평가서를 기반으로 해당 AI 서비스가 안전성 확보 의무 적용 대상인지 여부를 최종 판단할 수 있도록 한다. 판단 결과는 시스템에 기록되어 이후 개발 단계에 반영되도록 한다.",
      description: "개발 단계 진입 전 AI 서비스에 대한 안전성 확보 의무 적용 여부를 확정하기 위함",
    },
    {
      featureName: "의무 대상 확정 시 안전성 요건 추가",
      requirement:
        "안전성 확보 의무 대상으로 최종 판단된 경우, AI 모델 개발 계획서에 안전성 확보를 위한 추가 요건(검증, 통제, 모니터링 등)을 명시적으로 반영할 수 있도록 한다. 변경 이력은 기록·관리한다.",
      description: "안전성 확보 의무 대상 AI 서비스에 필요한 추가 개발 요건을 공식 문서에 반영하기 위함",
    },
  ],
  "dev-progress": [
    {
      featureName: "개발환경 구축 및 학습데이터 관리",
      requirement:
        "AI 서비스 개발을 위한 개발·시험 환경을 구축하고, 학습데이터를 체계적으로 관리할 수 있도록 한다. 학습데이터 구성, 알고리즘 또는 서비스 프로세스 변경 시 모델 설명서를 갱신할 수 있도록 연계한다.",
      description: "AI 서비스 개발에 필요한 환경과 학습데이터를 안정적으로 관리하기 위함",
    },
    {
      featureName: "AI 서비스 개발",
      requirement:
        "수립된 개발 계획에 따라 AI 서비스 개발을 수행하며, 개발 과정 중 AI 서비스 개요, 학습데이터, 알고리즘 또는 서비스 프로세스 변경 사항이 발생할 경우 모델 설명서를 갱신하도록 한다.",
      description: "계획된 범위 내에서 AI 서비스를 개발하고 변경 사항을 문서에 반영하기 위함",
    },
    {
      featureName: "AI 위험/영향 관리 계획 준수사항 점검",
      requirement:
        "개발 과정 전반에 걸쳐 위험등급 평가서에 연동된 식별 위험 유형 및 완화방안에 대한 준수 여부를 점검할 수 있도록 한다. 점검 결과는 기록되어 추후 검토 및 감사에 활용되도록 한다.",
      description: "개발 단계에서 수립된 위험·영향 관리 계획이 실제로 준수되는지 확인하기 위함",
    },
    {
      featureName: "AI 서비스 개발 요건 이행 점검",
      requirement:
        "AI 모델 개발 계획서에 정의된 기능 요건 및 위험관리 요건을 기준으로 개발 결과에 대한 이행 점검을 수행한다. 점검 결과는 시스템에 저장되어 이후 검증·운영 단계로 연계된다.",
      description: "개발 결과가 사전에 정의한 요건을 충실히 이행했는지 확인하기 위함",
    },
  ],
  "pre-op-verification": [
    {
      featureName: "AI 서비스 운영 전 검증",
      requirement:
        "AI 서비스 개발 완료 후 운영 전 검증을 수행할 수 있도록 검증 단계 및 상태를 관리한다. 데이터 및 AI 모델에 대한 테스트 시나리오를 기반으로 검증을 수행하고, 검증 결과를 시스템에 기록·관리한다.",
      description: "AI 서비스 운영 전 데이터 및 AI 모델의 적정성을 확인하기 위함",
    },
    {
      featureName: "AI 서비스 운영 전 검증 지원",
      requirement:
        "개발 부서가 수행하는 운영 전 검증 과정에서 기획 부서가 검증을 지원할 수 있도록 관련 정보 열람 및 협업 기능을 제공한다. 검증 수행 결과는 동일한 검증 결과서로 관리한다.",
      description: "운영 전 검증 과정에서 부서 간 협업을 통해 검증의 완성도를 높이기 위함",
    },
    {
      featureName: "AI 모니터링 계획 수립 및 작성",
      requirement:
        "AI 서비스 운영을 위한 성능 모니터링 지표, 위험 모니터링 계획, VoC 관리 및 서비스 중단 관리 방안을 포함한 모니터링 계획을 수립하고 시스템에 입력·저장한다.",
      description: "AI 서비스 운영 중 발생 가능한 위험과 성능 저하를 지속적으로 관리하기 위함",
    },
    {
      featureName: "영향평가 수행 [권고]",
      requirement:
        "고영향 AI 서비스의 경우 필요 시 기존 영향평가 결과를 재검토하거나 재수행할 수 있도록 하며, 수행 결과를 시스템에 등록·관리한다.",
      description: "서비스 변경 또는 검증 결과 반영에 따른 영향도를 재확인하기 위함",
    },
  ],
  "verification-adequacy": [
    {
      featureName: "검증 결과 적절성 확인",
      requirement:
        "중위험 AI 서비스에 대해 AI 거버넌스 부서가 개발자 검증 결과의 적절성을 확인할 수 있도록 한다. 검증 결과 요약 및 상세 결과서를 연동하여 검토 이력을 기록한다.",
      description: "중위험 AI 서비스의 검증 결과에 대한 거버넌스 차원의 적정성을 확인하기 위함",
    },
  ],
  "third-party-verification": [
    {
      featureName: "제3자 평가·검증 요청",
      requirement:
        "고위험 AI 서비스의 경우 독립된 제3자 평가·검증을 수행할 수 있도록 제3자 목록을 관리하고, 선택된 제3자에게 데이터 및 AI 모델 검증 요청을 발송하도록 한다.",
      description: "고위험 AI 서비스에 대해 독립적인 외부 검증을 수행하기 위함",
    },
    {
      featureName: "제3자 평가·검증 수행",
      requirement:
        "독립된 제3자가 데이터 및 AI 모델 테스트 시나리오에 따라 평가·검증을 수행할 수 있도록 하며, 수행 결과를 시스템에 기록할 수 있도록 한다.",
      description: "제3자의 객관적인 검증 결과를 확보하기 위함",
    },
    {
      featureName: "제3자 평가·검증 결과 확인",
      requirement:
        "제3자가 수행한 평가·검증 결과를 시스템에 등록하고, 결과 요약 및 검증 결과서를 첨부하여 관리할 수 있도록 한다.",
      description: "제3자 평가·검증 결과를 체계적으로 관리하고 이후 승인 절차에 활용하기 위함",
    },
    {
      featureName: "검증결과 확인 신청",
      requirement:
        "제3자 평가·검증이 완료된 고위험 AI 서비스에 대해 AI 거버넌스 협의체에 검증 결과 확인을 신청할 수 있도록 한다. 신청 이력 및 관련 문서를 연동 관리한다.",
      description: "고위험 AI 서비스의 검증 결과를 협의체 차원에서 공식적으로 검토하기 위함",
    },
    {
      featureName: "검증결과 확인",
      requirement:
        "AI 거버넌스 협의체를 개최하여 제3자 검증 결과를 최종 확인·승인하고, 승인 결과 및 회의 내용을 시스템에 기록·관리한다.",
      description: "고위험 AI 서비스 운영 전 검증 결과에 대한 최종 의사결정을 수행하기 위함",
    },
  ],
  "op-approval-request": [
    {
      featureName: "운영 승인 요청",
      requirement:
        "영향평가, 검증 결과 확인, 위험 완화 방안 점검 등 모든 선행 절차 완료 후 AI 거버넌스 부서에 운영 승인을 요청할 수 있도록 한다. 관련 문서와 결과를 연동하여 운영 승인 요청서를 생성하고 메일·알림을 발송한다.",
      description: "AI 서비스의 정식 운영을 위한 거버넌스 차원의 최종 승인 절차를 수행하기 위함",
    },
  ],
  "deployment-approval": [
    {
      featureName: "AI 위험 관리 계획 이행 확인",
      requirement:
        "AI 서비스 기획 부서가 제출한 운영 승인 요청 내역과 위험 완화 방안 이행 결과를 연동 문서 기반으로 최종 확인할 수 있도록 한다. AI 모델 설명서, 검증 결과서, 모니터링 계획서 등을 함께 검토하여 승인 또는 반려 처리를 수행한다.",
      description: "위험 관리 계획이 실제로 이행되었는지 운영 전 최종적으로 확인하기 위함",
    },
    {
      featureName: "AI 위험 관리 계획 이행 및 배포 승인",
      requirement:
        "위험 관리 계획 이행 내역 검토 결과 이상이 없는 경우 운영 부서에 서비스 배포를 요청하도록 한다. 운영 승인 결과는 서비스 기획 부서에 통보되며, 배포 요청 내역은 시스템에 기록·관리한다.",
      description: "위험 관리 계획 이행 완료 후 AI 서비스 배포를 공식 승인하기 위함",
    },
  ],
  "deployment": [
    {
      featureName: "AI 서비스 배포",
      requirement:
        "AI 운영 부서에서 승인된 AI 서비스를 운영 환경에 배포할 수 있도록 하며, 배포 일시·담당자·대상 프로그램 정보를 기록한다. 배포 결과에 따라 AI 서비스 모델 설명서를 최신 상태로 갱신한다.",
      description: "승인된 AI 서비스를 실제 운영 환경에 적용하기 위함",
    },
    {
      featureName: "AI 서비스 운영",
      requirement:
        "배포 완료된 AI 서비스에 대해 정상적인 운영을 수행할 수 있도록 하며, 운영 상태는 시스템 상에서 관리된다.",
      description: "AI 서비스를 실제 업무에 활용하기 위한 운영 단계",
    },
    {
      featureName: "AI 서비스 인수인계",
      requirement:
        "서비스 배포 완료 시점에서 운영 부서로의 인수인계를 수행할 수 있도록 하며, 인수인계 완료 여부를 기록·관리한다.",
      description: "개발·기획 단계에서 운영 단계로의 책임 전환을 명확히 하기 위함",
    },
  ],
  "improvement": [
    {
      featureName: "AI 위험 모니터링",
      requirement:
        "운영 중인 AI 서비스에 대해 성능, 위험 지표, VOC, 서비스 중단 사례, 운영 변경 사항 등을 지속적으로 수집·모니터링할 수 있도록 한다. 수집된 결과는 모니터링 보고서로 관리한다.",
      description: "운영 중 발생 가능한 위험 요소를 지속적으로 감시하기 위함",
    },
    {
      featureName: "AI 위험 모니터링 결과 점검",
      requirement:
        "정기적으로 AI 서비스 모니터링 보고서를 검토하고, 위험 징후 또는 문제 여부를 점검·승인한다. 점검 결과는 결재 이력과 함께 기록한다.",
      description: "모니터링 결과에 대한 거버넌스 차원의 관리·통제를 수행하기 위함",
    },
    {
      featureName: "AI 서비스 개선계획 수립",
      requirement:
        "모니터링 결과 및 점검 결과를 바탕으로 개선이 필요한 사항에 대해 개선 계획을 수립하고 문서화한다.",
      description: "운영 중 발견된 문제를 체계적으로 개선하기 위한 계획을 수립하기 위함",
    },
    {
      featureName: "AI 서비스 개선",
      requirement:
        "수립된 개선 계획에 따라 AI 서비스 개선을 수행하고, 개선 결과를 기록·관리한다. 필요 시 관련 문서를 갱신한다.",
      description: "AI 서비스의 안전성·성능·신뢰성을 지속적으로 향상시키기 위함",
    },
  ],
};

const EN: StepRequirements = {
  "planning-doc": [
    {
      featureName: "AI service planning document",
      requirement:
        "Enable creation of new planning documents for in-scope AI services (projects), with required fields (service overview, business requirements, etc.) as text input. Provide file attachment upload, separate draft and completed states, and validation so that completion is only allowed when required fields are satisfied.",
      description:
        "To produce an official planning document that systematically describes the purpose, scope, and business requirements of the AI service to be developed or introduced",
    },
  ],
  "model-doc": [
    {
      featureName: "AI model description draft",
      requirement:
        "Enable creation of new model description documents for AI models used by the service, with fields for AI service overview, training data, algorithm, and service process. Provide draft/completed state and file attachments as for the planning document.",
      description:
        "To clearly document the structure and behavior of the AI model used by the service",
    },
  ],
  "pre-review-request": [
    {
      featureName: "Pre-review request for AI service planning",
      requirement:
        "Enable the pre-review request only when both the planning document and model description are completed. Allow designation of the AI development department (assignee); record the request in the system and trigger email and in-app notifications.",
      description:
        "To request the development department to pre-review the registered AI service planning documents",
    },
  ],
  "project-create": [
    {
      featureName: "AI service planning / model description list",
      requirement:
        "On the project list screen, show whether planning and model description documents exist and their status. Provide filters and sort by name, status, and stage, and allow viewing document content on the detail screen.",
      description:
        "To see at a glance the writing status and progress of planning documents per service (project)",
    },
  ],
  "risk-assessment": [
    {
      featureName: "AI risk identification and assessment",
      requirement:
        "Provide screens to enter and assess risk identification items, risk mitigation measures, and residual risk assessment items. Derive risk rating from results and store and manage results as documents.",
      description:
        "To identify and systematically assess potential risks of introducing the AI service",
    },
    {
      featureName: "AI impact assessment",
      requirement:
        "Compose items so that social and operational impact of the AI service can be assessed according to impact criteria. Store results in the system and link to high-impact AI determination.",
      description: "To assess the impact of the AI service on the organization and users in advance",
    },
    {
      featureName: "AI safety assessment",
      requirement:
        "Enable the safety assessment screen only when impact assessment results indicate high-impact AI. Allow entry and review of model safety items and store results as documents.",
      description: "To further verify the safety of high-impact AI services",
    },
    {
      featureName: "AI outsourcing assessment",
      requirement:
        "Allow entry and assessment of outsourcing/subcontracting check items when external outsourcing or subcontracting exists in the AI service. Manage results as a checklist.",
      description:
        "To check responsibilities and risks related to AI service outsourcing and subcontracting",
    },
    {
      featureName: "AI risk identification and assessment result review",
      requirement:
        "Allow the governance department to review and approve risk assessment results prepared by planning/development. Approval results are reflected in the assessment and managed as history.",
      description: "To verify the appropriateness of risk assessment results from a governance perspective",
    },
    {
      featureName: "AI impact assessment result review",
      requirement:
        "Allow the governance department to review and approve the impact assessment; include approval history and results in the document.",
      description: "To verify the validity of AI service impact determination",
    },
    {
      featureName: "AI safety assessment result review",
      requirement:
        "Allow the governance department to review and approve safety assessment results and record approval in the assessment.",
      description: "To confirm that safety is secured for high-impact AI services",
    },
  ],
  "pre-review-result": [
    {
      featureName: "AI service planning pre-review",
      requirement:
        "Link planning document, model description, and assessment reports so they can be viewed on the review screen. Reviewers must be able to record comments and perform approval or revision request.",
      description:
        "To formally pre-review the appropriateness of the AI service at the planning stage",
    },
    {
      featureName: "Pre-review result notification",
      requirement:
        "When pre-review is completed, automatically notify the planning department of the result (approval/revision request). Deliver the result and key comments via email and messenger.",
      description: "To share pre-review results quickly and clearly",
    },
  ],
  "dev-plan": [
    {
      featureName: "AI service development plan",
      requirement:
        "Provide development plan authoring that reflects pre-review results, including AI model development overview, business requirements, schedule, and management measures.",
      description: "To establish a concrete development plan for implementing the AI service",
    },
  ],
  "risk-plan": [
    {
      featureName: "AI risk management plan",
      requirement:
        "Link service planning and risk assessment results so that a risk management plan can be created with mitigation measures, responsible parties, and management measures per risk.",
      description: "To establish an execution plan for managing identified risks systematically",
    },
    {
      featureName: "Risk management plan consultation request",
      requirement:
        "Allow requesting consultation from relevant departments on the risk management plan; record requests and history in the system and send notifications.",
      description: "To reach agreement across departments on the risk management plan",
    },
    {
      featureName: "Risk management plan consultation",
      requirement:
        "Reflect opinions and adjustments from the consultation process in the risk management plan.",
      description: "To improve the effectiveness of risk management measures",
    },
  ],
  "risk-plan-approval": [
    {
      featureName: "AI risk management plan approval",
      requirement:
        "For low/medium-risk AI services, confirm the risk management plan through internal approval. Reflect approval results in the document.",
      description: "To formally confirm the risk management plan",
    },
  ],
  "governance-approval": [
    {
      featureName: "High-risk AI pre-approval submission",
      requirement:
        "Create a governance committee approval item for AI services classified as high risk and submit with linked documents.",
      description: "To perform the highest level of pre-control for high-risk AI services",
    },
    {
      featureName: "Pre-approval",
      requirement:
        "Hold the governance committee to review and approve the risk management plan for high-risk AI services, and record approval results and meeting minutes.",
      description:
        "To make the organization-level final decision on introducing high-risk AI services",
    },
  ],
  "dev-request": [
    {
      featureName: "AI service development request",
      requirement:
        "For AI services whose risk management plan has been pre-approved, create a development sub-project linked to existing ITSM request(s). Preserve existing ITSM approval flows (BA acceptance through security approver); only add management of AI governance deliverables and linkage information.",
      description:
        "To formally start development for approved AI services within the ITSM framework",
    },
    {
      featureName: "Final determination of safety obligation applicability",
      requirement:
        "Based on the reviewed and approved AI safety assessment, allow a final determination of whether the AI service is subject to safety assurance obligations. Record the result in the system so it is reflected in subsequent development stages.",
      description:
        "To confirm whether safety assurance obligations apply to the AI service before entering the development stage",
    },
    {
      featureName: "Adding safety requirements when obligation is confirmed",
      requirement:
        "When the service is finally determined to be subject to safety assurance obligations, allow explicit addition of safety requirements (verification, control, monitoring, etc.) to the AI model development plan. Record and manage change history.",
      description:
        "To reflect additional development requirements for safety-obligation AI services in official documentation",
    },
  ],
  "dev-progress": [
    {
      featureName: "Development environment and training data management",
      requirement:
        "Enable setup of development and test environments for AI service development and systematic management of training data. Link so that the model description can be updated when training data composition, algorithm, or service process changes.",
      description:
        "To manage the environment and training data required for AI service development in a stable manner",
    },
    {
      featureName: "AI service development",
      requirement:
        "Perform AI service development according to the established plan; when changes to service overview, training data, algorithm, or service process occur during development, require the model description to be updated.",
      description:
        "To develop the AI service within the planned scope and reflect changes in documentation",
    },
    {
      featureName: "AI risk/impact management plan compliance check",
      requirement:
        "Allow checking compliance with identified risk types and mitigation measures linked to the risk rating assessment throughout the development process. Record check results for later review and audit.",
      description:
        "To verify that the risk and impact management plan established at the development stage is actually complied with",
    },
    {
      featureName: "AI service development requirement compliance check",
      requirement:
        "Perform compliance checks on development outcomes against the functional and risk management requirements defined in the AI model development plan. Store check results in the system and link them to subsequent verification and operation stages.",
      description:
        "To confirm that development outcomes faithfully meet the requirements defined in advance",
    },
  ],
  "pre-op-verification": [
    {
      featureName: "AI service pre-operation verification",
      requirement:
        "Manage verification stages and status so that pre-operation verification can be performed after AI service development is complete. Perform verification based on test scenarios for data and the AI model, and record and manage verification results in the system.",
      description: "To confirm the appropriateness of data and the AI model before operating the AI service",
    },
    {
      featureName: "Pre-operation verification support",
      requirement:
        "Provide planning departments with access to relevant information and collaboration so they can support verification performed by the development department. Manage verification results in a single verification report.",
      description: "To improve the completeness of verification through cross-department collaboration during pre-operation verification",
    },
    {
      featureName: "AI monitoring plan establishment",
      requirement:
        "Establish and enter into the system a monitoring plan that includes performance monitoring indicators, risk monitoring plan, VoC management, and service suspension management for AI service operation.",
      description: "To continuously manage risks and performance degradation that may occur during AI service operation",
    },
    {
      featureName: "Impact assessment [recommended]",
      requirement:
        "For high-impact AI services, allow review or re-performance of existing impact assessment results when necessary, and register and manage results in the system.",
      description: "To reconfirm impact in light of service changes or verification results",
    },
  ],
  "verification-adequacy": [
    {
      featureName: "Verification result adequacy confirmation",
      requirement:
        "Allow the AI governance department to confirm the adequacy of developer verification results for medium-risk AI services. Link verification result summary and detailed report and record review history.",
      description: "To confirm the adequacy of verification results for medium-risk AI services from a governance perspective",
    },
  ],
  "third-party-verification": [
    {
      featureName: "Third-party evaluation/verification request",
      requirement:
        "For high-risk AI services, manage a list of independent third parties and allow sending data and AI model verification requests to the selected third party.",
      description: "To perform independent external verification for high-risk AI services",
    },
    {
      featureName: "Third-party evaluation/verification execution",
      requirement:
        "Allow independent third parties to perform evaluation and verification according to data and AI model test scenarios, and record results in the system.",
      description: "To obtain objective verification results from a third party",
    },
    {
      featureName: "Third-party verification result confirmation",
      requirement:
        "Allow registration of third-party evaluation/verification results in the system and management with result summary and verification report attached.",
      description: "To manage third-party verification results systematically and use them in subsequent approval procedures",
    },
    {
      featureName: "Verification result confirmation request",
      requirement:
        "Allow requesting the AI governance committee to confirm verification results for high-risk AI services that have completed third-party evaluation/verification. Manage request history and linked documents.",
      description: "To formally review verification results for high-risk AI services at the committee level",
    },
    {
      featureName: "Verification result confirmation",
      requirement:
        "Hold the AI governance committee to finally confirm and approve third-party verification results, and record and manage approval results and meeting content in the system.",
      description: "To make the final decision on pre-operation verification results for high-risk AI services",
    },
  ],
  "op-approval-request": [
    {
      featureName: "Operation approval request",
      requirement:
        "After all prior steps (impact assessment, verification result confirmation, risk mitigation check, etc.) are complete, allow requesting operation approval from the AI governance department. Generate an operation approval request by linking related documents and results, and send email and in-app notifications.",
      description: "To perform the final governance-level approval procedure for formal operation of the AI service",
    },
  ],
  "deployment-approval": [
    {
      featureName: "AI risk management plan compliance confirmation",
      requirement:
        "Allow final confirmation of the operation approval request submitted by the planning department and risk mitigation compliance results on a document-linked basis. Review AI model description, verification report, monitoring plan, etc., and perform approval or rejection.",
      description: "To finally confirm before operation that the risk management plan has been implemented",
    },
    {
      featureName: "Risk management compliance and deployment approval",
      requirement:
        "When review of risk management compliance shows no issues, request the operations department to deploy the service. Notify the planning department of the approval result and record and manage deployment requests in the system.",
      description: "To formally approve AI service deployment after risk management plan compliance is complete",
    },
  ],
  "deployment": [
    {
      featureName: "AI service deployment",
      requirement:
        "Allow the AI operations department to deploy approved AI services to the production environment; record deployment time, responsible party, and target program. Update the AI service model description to the latest state based on deployment results.",
      description: "To apply approved AI services to the actual operating environment",
    },
    {
      featureName: "AI service operation",
      requirement:
        "Allow normal operation of deployed AI services, with operational status managed in the system.",
      description: "Operation phase for using the AI service in actual business",
    },
    {
      featureName: "AI service handover",
      requirement:
        "Allow handover to the operations department upon deployment completion, and record and manage handover completion status.",
      description: "To clearly transfer responsibility from development/planning to operation",
    },
  ],
  "improvement": [
    {
      featureName: "AI risk monitoring",
      requirement:
        "Allow continuous collection and monitoring of performance, risk indicators, VoC, service suspension cases, and operational changes for operating AI services. Manage collected results as monitoring reports.",
      description: "To continuously monitor risk factors that may occur during operation",
    },
    {
      featureName: "AI risk monitoring result review",
      requirement:
        "Periodically review AI service monitoring reports and check and approve for risk indicators or issues. Record review results together with approval history.",
      description: "To perform governance-level management and control of monitoring results",
    },
    {
      featureName: "AI service improvement plan",
      requirement:
        "Establish and document improvement plans for items that need improvement based on monitoring and review results.",
      description: "To establish a plan for systematically improving issues found during operation",
    },
    {
      featureName: "AI service improvement",
      requirement:
        "Perform AI service improvement according to the established plan, and record and manage improvement results. Update related documents as needed.",
      description: "To continuously improve the safety, performance, and reliability of the AI service",
    },
  ],
};

export const FLOW_REQUIREMENTS_KO = KO;
export const FLOW_REQUIREMENTS_EN = EN;

export function getFlowRequirements(
  stepId: string,
  locale: string
): FlowFeatureDetail[] {
  const lang = locale.startsWith("ko") ? KO : EN;
  return lang[stepId] ?? [];
}
