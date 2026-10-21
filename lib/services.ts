import {
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
