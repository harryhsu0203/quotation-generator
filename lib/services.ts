import {
  Braces,
  Boxes,
  Globe,
  Plug,
  Sparkles,
  Workflow,
  Wrench,
  Briefcase,
  Building2,
  ClipboardList,
  Coins,
  Cpu,
  Factory,
  GraduationCap,
  LibraryBig,
  Network,
  Scale,
  Server,
  ShieldCheck,
  Stethoscope,
  WifiOff,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  summary: string;
  details: string[];
  includes: string[];
}

export const SERVICES: Service[] = [
  {
    id: "assessment",
    icon: ClipboardList,
    title: "導入評估與規劃",
    summary: "盤點需求、資料與現有設備，規劃合適的模型與架構。",
    details: [
      "不是每個單位都需要同樣規模的 AI 系統。我們會先了解你想解決的問題、會用到哪些資料，以及現有的網路與設備，再提出符合預算與需求的建議。",
      "評估階段也會誠實說明本地 AI 適合與不適合的部分，讓你在投入之前先看清楚範圍。",
    ],
    includes: [
      "需求與使用情境盤點",
      "資料類型與敏感度盤點",
      "現有網路與設備檢視",
      "模型、硬體與架構建議",
      "導入範圍與優先順序建議",
    ],
  },
  {
    id: "hardware",
    icon: Server,
    title: "AI 主機建置",
    summary: "依預算與效能需求規劃、組裝與調校 GPU 主機。",
    details: [
      "本地 AI 的體驗，很大一部分取決於主機規格是否符合使用情境。我們依使用人數、模型大小與預算，規劃合適的 GPU 主機配置。",
      "從零組件選配、組裝、系統安裝到效能調校與測試，都由我們處理，並提供放置環境的建議。",
    ],
    includes: [
      "依用途與使用人數規劃規格",
      "零組件選配與組裝",
      "散熱、供電與放置環境建議",
      "系統安裝與效能調校",
      "測試與驗收",
    ],
  },
  {
    id: "models",
    icon: Cpu,
    title: "本地模型部署",
    summary: "開源大型語言模型安裝、調校與中文化設定。",
    details: [
      "我們協助在你的主機上安裝並設定開源大型語言模型，讓員工透過內部介面使用，過程不需要把資料送到外部服務。",
      "開源模型的能力會依模型與硬體而不同，我們會依你的任務挑選並測試，再調整中文使用體驗。",
    ],
    includes: [
      "依需求挑選合適的開源模型",
      "推論環境與服務安裝",
      "中文使用體驗調校",
      "提供內部使用介面或 API",
      "效果評估與調整",
    ],
  },
  {
    id: "knowledge",
    icon: LibraryBig,
    title: "企業知識庫",
    summary: "把內部文件、規章、產品資料建成可直接問答的 AI 知識庫。",
    details: [
      "把散落各處的文件整理成知識庫，員工可以用日常語言提問，系統從你的文件中找答案。文件與索引都放在你的環境裡。",
      "我們會協助規劃文件範圍與更新方式，也可依部門設定可查詢的資料範圍。",
    ],
    includes: [
      "文件盤點與整理",
      "文件匯入與索引建立",
      "問答介面與來源參照",
      "權限與資料範圍設定",
      "更新與維護流程",
    ],
  },
  {
    id: "security",
    icon: Network,
    title: "內網與資安整合",
    summary: "權限管理、網路隔離、防火牆與存取紀錄。",
    details: [
      "AI 放在內部，還需要搭配適當的網路與權限設計，才能真正降低資料外流的風險。我們協助規劃網段、存取權限與紀錄機制。",
      "整體安全取決於完整環境與使用規範，我們會一併提出建議，但無法取代貴單位的資安政策與管理。",
    ],
    includes: [
      "帳號與角色權限",
      "網段規劃與隔離",
      "防火牆規則",
      "存取與操作紀錄",
      "備份與復原規劃",
    ],
  },
  {
    id: "training",
    icon: GraduationCap,
    title: "教育訓練與維運",
    summary: "員工使用訓練、系統更新與後續維護。",
    details: [
      "系統上線後，能不能真的被使用才是關鍵。我們提供使用者與管理者的教育訓練，讓團隊知道怎麼問、怎麼維護。",
      "上線後也可以依需求安排系統與模型更新、問題排除與定期檢視。",
    ],
    includes: [
      "使用者教育訓練",
      "管理者操作與維護說明",
      "系統與模型更新",
      "問題排除與支援",
      "定期檢視與優化建議",
    ],
  },
];

/** 軟體開發服務（/services#software） */
export const SOFTWARE_SERVICES: Service[] = [
  {
    id: "web",
    icon: Globe,
    title: "網站與 Web App",
    summary: "企業官網、產品網站、線上工具與管理後台。",
    details: [
      "從企業官網、產品介紹網站，到線上工具與管理後台，我們依你的需求設計與開發，並兼顧手機與桌機的使用體驗。",
      "也可以把既有的手動流程做成網頁工具，讓團隊透過瀏覽器就能使用。",
    ],
    includes: ["需求與功能規劃", "介面設計與響應式切版", "前後端開發", "管理後台", "上線部署與基本 SEO 設定"],
  },
  {
    id: "internal",
    icon: Boxes,
    title: "企業內部系統",
    summary: "報價、訂單、庫存、工單、客戶管理等客製化系統。",
    details: [
      "現成軟體不一定貼合你的作業方式。我們依你的流程，客製化報價、訂單、庫存、工單、客戶管理等內部系統。",
      "可依需求規劃使用者角色與權限，並考慮與既有系統的資料銜接。",
    ],
    includes: ["流程盤點與系統規劃", "資料與功能設計", "角色與權限", "報表與匯出", "測試與上線"],
  },
  {
    id: "automation",
    icon: Workflow,
    title: "流程自動化",
    summary: "把重複的人工作業交給程式，例如報表產生、資料整理、通知提醒。",
    details: [
      "把重複、容易出錯的人工作業交給程式，例如報表產生、資料整理、通知提醒，讓同仁把時間用在更需要判斷的工作上。",
      "我們會先盤點現有作業流程，找出適合自動化的部分，再逐步實作。",
    ],
    includes: ["作業流程盤點", "報表自動產生", "資料整理與轉換", "通知與提醒", "排程與執行紀錄"],
  },
  {
    id: "ai-integration",
    icon: Sparkles,
    title: "AI 應用整合",
    summary: "把本地 AI 接進既有系統，例如智慧客服、文件自動摘要、資料查詢。",
    details: [
      "結合我們的 AI 本地化能力，把本地 AI 接進你的系統或工作流程，AI 運算在你的環境內進行，資料不需要送到外部服務。",
      "實際效果取決於任務與所選模型，我們會先以代表性任務測試，再決定整合方式。",
    ],
    includes: ["應用情境評估", "與既有系統串接", "智慧客服、文件摘要、資料查詢等功能規劃", "權限與資料範圍設定", "效果測試與調整"],
  },
  {
    id: "integration",
    icon: Plug,
    title: "系統串接",
    summary: "API 串接、資料轉換、舊系統整合。",
    details: [
      "不同系統之間的資料常常需要人工搬運。我們協助 API 串接、資料格式轉換與舊系統整合，讓資料自動流動。",
      "舊系統的整合方式取決於它提供的介面與文件，評估階段會先確認可行的做法。",
    ],
    includes: ["系統與介面盤點", "API 串接", "資料轉換與清理", "舊系統整合", "錯誤處理與紀錄"],
  },
  {
    id: "maintenance",
    icon: Wrench,
    title: "維護與擴充",
    summary: "上線後的更新、修正與功能擴充。",
    details: [
      "系統上線後，需求常會隨著使用而改變。我們可依需求安排問題修正、系統更新與功能擴充。",
      "也會提供使用說明與交接資料，讓你清楚系統如何運作。",
    ],
    includes: ["問題修正", "系統與套件更新", "功能擴充", "備份與監控建議", "使用說明與交接"],
  },
];

export interface Business {
  id: "ai" | "software";
  icon: LucideIcon;
  title: string;
  summary: string;
  points: string[];
  href: string;
  cta: string;
}

/** 序隆科技的兩大業務 */
export const BUSINESSES: Business[] = [
  {
    id: "ai",
    icon: Server,
    title: "AI 本地化",
    summary: "在自有主機與內網部署 AI，資料不外流。",
    points: ["AI 主機建置", "本地模型部署", "企業知識庫", "內網資安整合"],
    href: "/services#ai",
    cta: "了解 AI 本地化",
  },
  {
    id: "software",
    icon: Braces,
    title: "軟體開發",
    summary: "依需求打造專屬系統，讓流程自動化。",
    points: ["網站與 Web App", "企業內部系統", "流程自動化", "AI 應用整合"],
    href: "/services#software",
    cta: "了解軟體開發",
  },
];

export interface Solution {
  id: string;
  icon: LucideIcon;
  industry: string;
  pain: string;
  solution: string;
  uses: string[];
  note?: string;
}

/** 情境說明：用於說明本地 AI 可以怎麼幫忙，並非已完成的導入案例。 */
export const SOLUTIONS: Solution[] = [
  {
    id: "accounting-legal",
    icon: Briefcase,
    industry: "會計與法律事務所",
    pain: "合約、法規與客戶文件量大，找條文與比對版本很耗時；但這些文件高度機密，不適合上傳到外部服務。",
    solution:
      "在事務所內部建置本地 AI 與文件知識庫，同仁可以用自然語言查詢條款、整理文件摘要，文件始終留在所內環境。",
    uses: ["合約條款查詢與摘要", "法規與內部作業準則問答", "文件初稿整理（需由專業人員審閱）"],
  },
  {
    id: "medical",
    icon: Stethoscope,
    industry: "醫療與診所",
    pain: "衛教資料與內部 SOP 散落各處，新進人員常需要反覆詢問；涉及病患的資料又特別敏感。",
    solution:
      "將衛教文件與內部 SOP 建成知識庫，部署在診所內網，讓同仁快速查詢。初期可先以不含病患個資的文件為範圍。",
    uses: ["衛教資料整理與問答", "內部 SOP 與流程查詢", "新人訓練資料查詢"],
    note: "涉及病患個資的應用，需另行評估相關法規與院內規範。",
  },
  {
    id: "manufacturing",
    icon: Factory,
    industry: "製造業",
    pain: "設備手冊、維修紀錄與品質文件量大且格式不一，現場人員找資料費時；廠區網路也常受限或需要隔離。",
    solution:
      "在內網部署知識庫，讓現場人員用自然語言查詢手冊與維修紀錄，不依賴外部網路，也能在隔離環境中運作。",
    uses: ["設備手冊與操作說明查詢", "維修紀錄檢索", "品質文件與規範問答"],
  },
  {
    id: "enterprise",
    icon: Building2,
    industry: "企業內部",
    pain: "人資規章、IT 常見問題與內部流程資訊分散，同樣的問題一再被詢問，管理單位疲於回覆。",
    solution:
      "建置內部問答助理，員工用日常語言查規章與流程，並依部門設定可查詢的範圍，減少重複詢問。",
    uses: ["人資規章與福利查詢", "IT 常見問題支援", "內部知識整理與傳承"],
  },
];

export interface ProcessStep {
  id: string;
  title: string;
  summary: string;
  we: string[];
  you: string[];
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "interview",
    title: "需求訪談",
    summary: "了解你的產業、使用情境、資料類型與目前的痛點。",
    we: ["訪談並釐清目標與限制", "了解現有流程與工具", "說明本地 AI 的適用範圍"],
    you: ["想改善的工作內容", "代表性的文件或流程範例", "預算與時程的初步想法"],
  },
  {
    id: "planning",
    title: "評估規劃",
    summary: "盤點資料與設備，提出模型、硬體與架構的建議與導入範圍。",
    we: ["資料與設備盤點", "模型、硬體與架構建議", "導入範圍、優先順序與預算建議"],
    you: ["現有網路與設備資訊", "資料的存放位置與敏感程度說明"],
  },
  {
    id: "hardware",
    title: "硬體建置",
    summary: "依規劃採購、組裝與調校 AI 主機，並完成網路與權限配置。",
    we: ["主機選配、組裝與測試", "網路與存取權限配置", "放置環境建議"],
    you: ["主機放置的場地與網路環境", "存取權限的負責窗口"],
  },
  {
    id: "deployment",
    title: "模型與知識庫部署",
    summary: "安裝本地模型，匯入文件建立知識庫，並調整到符合使用情境。",
    we: ["模型安裝與中文化設定", "文件匯入與知識庫建立", "測試問答品質並調整"],
    you: ["要納入知識庫的文件", "協助驗證回答是否符合需求"],
  },
  {
    id: "training",
    title: "教育訓練",
    summary: "讓使用者與管理者都知道怎麼使用與維護系統。",
    we: ["使用者操作教學", "管理者維護說明", "常見問題與使用建議"],
    you: ["安排參與訓練的同仁"],
  },
  {
    id: "maintenance",
    title: "持續維運",
    summary: "上線後的更新、問題排除與定期檢視。",
    we: ["系統與模型更新", "問題排除與支援", "定期檢視與優化建議"],
    you: ["回報使用上的問題與新需求"],
  },
];

/** 軟體開發流程 */
export const SOFTWARE_PROCESS_STEPS: ProcessStep[] = [
  {
    id: "sw-interview",
    title: "需求訪談",
    summary: "了解你想解決的問題、現有的作業流程與使用者。",
    we: ["訪談並釐清目標與限制", "了解現有流程與使用中的工具", "確認誰會使用、怎麼使用"],
    you: ["目前的作業方式或表單範例", "想解決的問題與期待的成果"],
  },
  {
    id: "sw-planning",
    title: "功能規劃與報價",
    summary: "整理功能清單與優先順序，提出方案與報價。",
    we: ["整理功能清單與優先順序", "提出建議方案與開發範圍", "依範圍提供報價與時程估計"],
    you: ["確認功能範圍與優先順序", "預算與期望上線時間"],
  },
  {
    id: "sw-design",
    title: "介面設計",
    summary: "先設計畫面與操作流程，確認後再開發。",
    we: ["畫面與操作流程設計", "提供預覽供你確認", "依回饋調整"],
    you: ["確認畫面與操作流程", "提供品牌素材（如 Logo、色彩）"],
  },
  {
    id: "sw-development",
    title: "開發與測試",
    summary: "依確認的規劃開發，並在過程中測試與回報進度。",
    we: ["功能開發", "測試與修正", "階段性回報進度"],
    you: ["協助測試並回報問題", "提供必要的資料或帳號"],
  },
  {
    id: "sw-deploy",
    title: "上線部署",
    summary: "將系統部署到正式環境，並完成交接與使用說明。",
    we: ["正式環境部署", "資料移轉與上線檢查", "使用說明與教學"],
    you: ["決定上線時間", "指定系統的管理窗口"],
  },
  {
    id: "sw-maintenance",
    title: "維護與擴充",
    summary: "上線後的更新、修正與功能擴充。",
    we: ["問題修正與系統更新", "功能擴充評估與開發", "定期檢視與優化建議"],
    you: ["回報使用上的問題與新需求"],
  },
];

export interface WhyPoint {
  icon: LucideIcon;
  title: string;
  text: string;
}

export const WHY_POINTS: WhyPoint[] = [
  { icon: ShieldCheck, title: "資料不外流", text: "合約、客戶資料、內部文件都留在公司內部。" },
  { icon: Scale, title: "符合法規與內控", text: "更容易配合個資法、產業規範與內部稽核。" },
  { icon: Coins, title: "成本可預期", text: "一次建置，不用隨使用量持續付費。" },
  { icon: WifiOff, title: "離線也能用", text: "不依賴外部網路與服務商。" },
];
