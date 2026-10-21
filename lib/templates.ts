export interface TemplateItem {
  name: string;
  spec: string;
  quantity: number;
  unit: string;
  unitPrice: number;
}

export interface QuoteTemplate {
  slug: string;
  /** 行業名稱，例如「電腦組裝」 */
  name: string;
  summary: string;
  intro: string[];
  tips: string[];
  items: TemplateItem[];
  paymentTerms: string;
  notes: string;
}

/** 範本內的品項與金額僅為示意，使用者需依實際情況調整。 */
export const TEMPLATES: QuoteTemplate[] = [
  {
    slug: "pc-build",
    name: "電腦組裝",
    summary: "列出主要零組件與組裝工資，讓客戶清楚每一筆費用。",
    intro: [
      "電腦組裝報價的重點，是把零組件逐項列清楚：型號、規格、數量與單價。客戶比價時最在意的就是「每個零件各是多少」，條列透明能減少來回確認的時間。",
      "這份範本預先列出常見的零組件欄位與組裝測試工資，你只需要換成實際的型號與當下市價即可。",
    ],
    tips: [
      "規格欄寫明型號與容量，避免客戶誤會等級。",
      "零組件價格波動大，建議註明報價有效期限。",
      "別忘了寫清楚保固期間與保固範圍（例如主要零件的原廠保固）。",
    ],
    items: [
      { name: "處理器 CPU", spec: "（填寫型號）", quantity: 1, unit: "顆", unitPrice: 8500 },
      { name: "主機板", spec: "（填寫型號）", quantity: 1, unit: "片", unitPrice: 4500 },
      { name: "記憶體", spec: "DDR5 32GB（16GB×2）", quantity: 1, unit: "組", unitPrice: 3200 },
      { name: "固態硬碟 SSD", spec: "NVMe 1TB", quantity: 1, unit: "顆", unitPrice: 2400 },
      { name: "顯示卡", spec: "（填寫型號）", quantity: 1, unit: "張", unitPrice: 15000 },
      { name: "電源供應器", spec: "750W 80+ 金牌", quantity: 1, unit: "顆", unitPrice: 2500 },
      { name: "機殼", spec: "（填寫型號）", quantity: 1, unit: "台", unitPrice: 2000 },
      { name: "組裝與測試工資", spec: "含系統安裝與燒機測試", quantity: 1, unit: "式", unitPrice: 1000 },
    ],
    paymentTerms: "確認訂購後付訂金，取貨時結清尾款。",
    notes: "零組件價格依市況變動，報價有效期限內若缺貨將另行通知。",
  },
  {
    slug: "pc-repair",
    name: "電腦維修",
    summary: "檢測、重灌、更換零件與到府服務，費用項目一目了然。",
    intro: [
      "電腦維修的報價常見的爭議，是「檢測後才知道要修什麼」。先把檢測費、可能的處理項目與零件費分開列，客戶比較能接受，也能避免事後追加費用的糾紛。",
      "這份範本涵蓋常見的維修服務項目，你可以刪除用不到的、補上自己的服務。",
    ],
    tips: [
      "註明「檢測後若需更換零件，將先經客戶同意再施作」。",
      "資料救援屬於高風險服務，建議在備註寫清楚「不保證完全復原」。",
      "到府服務可另列交通費或出勤費。",
    ],
    items: [
      { name: "檢測診斷費", spec: "硬體與系統檢測", quantity: 1, unit: "次", unitPrice: 300 },
      { name: "系統重灌", spec: "含驅動程式與常用軟體", quantity: 1, unit: "次", unitPrice: 800 },
      { name: "固態硬碟更換", spec: "SATA／NVMe 500GB", quantity: 1, unit: "顆", unitPrice: 1800 },
      { name: "資料備份與轉移", spec: "依實際容量評估", quantity: 1, unit: "式", unitPrice: 1500 },
      { name: "到府服務費", spec: "（填寫服務區域）", quantity: 1, unit: "次", unitPrice: 500 },
    ],
    paymentTerms: "維修完成並確認可正常使用後，當場結清。",
    notes: "檢測後若需追加項目，將先告知並經同意後再施作。資料救援不保證完全復原。",
  },
  {
    slug: "graphic-design",
    name: "平面設計",
    summary: "Logo、名片、DM 與社群圖文，註明修改次數與授權範圍。",
    intro: [
      "平面設計報價最容易卡在「修改次數」與「檔案授權」。把這兩件事寫進報價單，能讓合作期待一致，也保護你的工作時間。",
      "這份範本列出常見的設計項目，每項都預留規格欄位，方便寫清楚交付內容。",
    ],
    tips: [
      "規格欄註明「含幾次修改」，超過次數另計費。",
      "寫明交付的檔案格式（例如 AI、PDF、PNG）。",
      "說明著作權與使用範圍，避免日後爭議。",
    ],
    items: [
      { name: "Logo 設計", spec: "提案 2 款，含 3 次修改", quantity: 1, unit: "式", unitPrice: 12000 },
      { name: "名片設計", spec: "雙面，含 2 次修改", quantity: 1, unit: "式", unitPrice: 2500 },
      { name: "DM 單張設計", spec: "A5 雙面，含 2 次修改", quantity: 1, unit: "式", unitPrice: 4000 },
      { name: "社群圖文設計", spec: "每組 5 張", quantity: 1, unit: "組", unitPrice: 3000 },
    ],
    paymentTerms: "簽約後付 50% 訂金，交付完稿檔案前結清尾款 50%。",
    notes: "超過約定修改次數，每次另計費。完稿檔案於結清款項後交付。",
  },
  {
    slug: "interior-renovation",
    name: "室內裝修",
    summary: "依工項分項報價，以坪數或式計價，並註明追加工程的處理。",
    intro: [
      "室內裝修的工程項目多、金額大，報價單通常以「工項」分列，再以坪數或一式計價。條列越清楚，業主越容易理解預算的分配。",
      "這份範本列出常見的工項架構，數量欄可填坪數，你可以依現場丈量結果調整。",
    ],
    tips: [
      "以現場丈量的坪數為準，並在備註說明計算方式。",
      "寫明材料等級或品牌，避免日後換料爭議。",
      "追加或變更工程的處理方式（需另行報價、經同意後施作）請寫在備註。",
    ],
    items: [
      { name: "拆除工程", spec: "含廢棄物清運", quantity: 1, unit: "式", unitPrice: 25000 },
      { name: "水電工程", spec: "含配管與迴路更新", quantity: 1, unit: "式", unitPrice: 60000 },
      { name: "泥作工程", spec: "（填寫施作範圍）", quantity: 12, unit: "坪", unitPrice: 3500 },
      { name: "木作天花板", spec: "平釘天花板", quantity: 12, unit: "坪", unitPrice: 4500 },
      { name: "油漆工程", spec: "批土＋面漆", quantity: 12, unit: "坪", unitPrice: 2000 },
      { name: "設計與監造費", spec: "含施工期間現場監督", quantity: 1, unit: "式", unitPrice: 30000 },
    ],
    paymentTerms: "簽約付 30%，工程進度過半付 40%，完工驗收後付尾款 30%。",
    notes: "報價以現場丈量為準；追加或變更工程另行報價，經雙方同意後施作。",
  },
  {
    slug: "website-design",
    name: "網站設計",
    summary: "從版型設計到上線設定，分項列出交付內容與頁數。",
    intro: [
      "網站設計案常見的風險是「需求越做越多」。報價單把頁數、功能與交付項目寫清楚，是控制範圍最有效的方式。",
      "這份範本列出網站專案常見的費用項目，包含網域與主機等年費性質的支出。",
    ],
    tips: [
      "規格欄寫明頁數與功能範圍，超出部分另行報價。",
      "網域、主機等年費項目，建議註明續約時的費用由誰負責。",
      "說明驗收方式與維護期間。",
    ],
    items: [
      { name: "網站規劃與版型設計", spec: "含首頁與內頁版型", quantity: 1, unit: "式", unitPrice: 20000 },
      { name: "前端切版（RWD）", spec: "共 5 頁，手機／平板／桌機", quantity: 5, unit: "頁", unitPrice: 4000 },
      { name: "後台管理系統建置", spec: "內容可自行編輯", quantity: 1, unit: "式", unitPrice: 15000 },
      { name: "網域與主機", spec: "1 年份", quantity: 1, unit: "年", unitPrice: 3000 },
      { name: "SEO 基礎設定", spec: "標題、描述、sitemap", quantity: 1, unit: "式", unitPrice: 5000 },
    ],
    paymentTerms: "簽約付 40%，設計定稿付 30%，上線驗收後付尾款 30%。",
    notes: "報價範圍以上述頁數與功能為準，超出範圍另行報價。上線後提供 30 天免費修正。",
  },
];

export function getTemplate(slug: string): QuoteTemplate | undefined {
  return TEMPLATES.find((t) => t.slug === slug);
}

export function templateTitle(t: QuoteTemplate): string {
  return `${t.name}報價單範本｜免費線上產生`;
}
