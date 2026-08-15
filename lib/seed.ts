import type {
  Agent,
  AuditEvent,
  CronJob,
  Integration,
  KnowledgeFile,
  MarketAgent,
} from "./types";

export const seedAgents: Agent[] = [
  {
    id: "mei",
    name: "阿美",
    nameEn: "Mei",
    title: "客服員工",
    titleEn: "Support staff",
    department: "support",
    status: "online",
    language: "zh",
    brief:
      "你是 Harbour Kitchen 的客服員工阿美。用簡潔粵語或書面中文回覆。先查 FAQ 與產品資料，常見問題直接答，涉及退款或投訴就升級經理。不要假裝已對外發送訊息，改為列出你會發送的草稿。",
    briefEn:
      "You are Mei, support staff for Harbour Kitchen. Answer in concise Cantonese or written Chinese. Use the FAQ first. Escalate refunds and complaints. Never pretend a message was sent — draft it instead.",
    skills: ["WhatsApp 回覆", "FAQ 對答", "升級機制", "營業時間查詢"],
    knowledge: [
      "營業時間：週日至四 11:30–22:00，週五六至 23:00",
      "外賣平台：Deliveroo、Foodpanda",
      "訂位取消費：4 人以上需提前 4 小時",
    ],
    tasksToday: 38,
    lastActive: "2 分鐘前",
  },
  {
    id: "yan",
    name: "阿欣",
    nameEn: "Yan",
    title: "人資員工",
    titleEn: "People staff",
    department: "people",
    status: "busy",
    language: "zh",
    brief: "你是人資員工阿欣，負責廚房與樓面編更。考慮法定休息、技能匹配與替補。輸出班表時用清楚表格，標出衝突。",
    briefEn: "You are Yan, people staff. You roster kitchen and floor teams. Honour rest rules, skill fit, and cover. Mark conflicts in a clear table.",
    skills: ["週更編排", "休假對沖", "替補建議", "出勤異常"],
    knowledge: [
      "廚師最少連續休息 24 小時 / 週",
      "樓面繁忙時段：19:00–21:30 需雙侍應",
      "兼職不可連續超過 6 晚",
    ],
    tasksToday: 12,
    lastActive: "正在跑週更",
  },
  {
    id: "ka",
    name: "阿嘉",
    nameEn: "Ka",
    title: "財務員工",
    titleEn: "Finance staff",
    department: "finance",
    status: "idle",
    language: "zh",
    brief: "你是財務員工阿嘉。讀費用與銀行摘要，標出異常，寫簡短週報。金額用港元。不要捏造未提供的數字。",
    briefEn: "You are Ka, finance staff. Read expenses and bank notes, flag outliers, write a short weekly memo. Use HKD. Do not invent numbers.",
    skills: ["費用分類", "異常偵測", "週報", "供應商對帳"],
    knowledge: [
      "單筆膳食採購超過 HK$8,000 需經理批核",
      "常用供應商：海港凍肉、新界菜欄",
      "出糧日：每月 5 日",
    ],
    tasksToday: 7,
    lastActive: "昨天 18:40",
  },
  {
    id: "bo",
    name: "阿寶",
    nameEn: "Bo",
    title: "營運員工",
    titleEn: "Operations staff",
    department: "ops",
    status: "online",
    language: "zh",
    brief: "你是營運員工阿寶。看守翻檔、等候時間、缺貨。越線就提出動作，不要空講「加強關注」。",
    briefEn: "You are Bo, operations staff. Watch turn time, wait time, and stock-outs. Propose an action when a line is crossed.",
    skills: ["KPI 看守", "缺貨警示", "派單", "週末預測"],
    knowledge: [
      "目標翻檔：平日 1.4，週末 1.8",
      "等候超過 25 分鐘要通知經理",
      "周末必備：左口魚、油雞、凍檨茶糖漿",
    ],
    tasksToday: 21,
    lastActive: "剛剛",
  },
];

export const seedJobs: CronJob[] = [
  { id: "job-1", agentId: "mei", title: "每晚 22:30 整理未回覆 WhatsApp", titleEn: "22:30 unanswered WhatsApp digest", cadence: "每日 22:30", cadenceEn: "Daily 22:30", enabled: true, lastRun: "昨晚 22:30 · 11 則", nextRun: "今晚 22:30" },
  { id: "job-2", agentId: "yan", title: "每週三產出下週更表初稿", titleEn: "Wednesday draft of next week's roster", cadence: "每週三 09:00", cadenceEn: "Wed 09:00", enabled: true, lastRun: "本週三 · 已交經理", nextRun: "下週三 09:00" },
  { id: "job-3", agentId: "ka", title: "每個工作日掃描費用異常", titleEn: "Weekday expense scan", cadence: "平日 17:00", cadenceEn: "Weekdays 17:00", enabled: true, lastRun: "昨天 · 2 筆待查", nextRun: "今天 17:00" },
  { id: "job-4", agentId: "bo", title: "週末人流預測推給店長", titleEn: "Weekend covers to the shop lead", cadence: "每週五 16:00", cadenceEn: "Fri 16:00", enabled: false, lastRun: "上週五", nextRun: "已暫停" },
];

export const seedFiles: KnowledgeFile[] = [
  { id: "f1", agentId: "mei", name: "客服FAQ-2026.pdf", kind: "PDF", summary: "訂位、取消、過敏原、停車場", updated: "3 日前" },
  { id: "f2", agentId: "yan", name: "出勤規則.docx", kind: "DOC", summary: "休息時數、兼職上限、公眾假期", updated: "上週" },
  { id: "f3", agentId: "ka", name: "供應商價目-8月.xlsx", kind: "XLS", summary: "凍肉與菜欄月價", updated: "8 月 1 日" },
  { id: "f4", agentId: "bo", name: "週末備貨清單.csv", kind: "CSV", summary: "必備 SKU 與安全庫存", updated: "昨天" },
];

export const seedIntegrations: Integration[] = [
  { id: "whatsapp", name: "WhatsApp Business", category: "對外渠道", categoryEn: "Outbound", connected: true },
  { id: "gmail", name: "Google Workspace", category: "電郵", categoryEn: "Email", connected: true },
  { id: "xero", name: "Xero", category: "會計", categoryEn: "Accounting", connected: false },
  { id: "sun", name: "Sun Systems", category: "ERP", categoryEn: "ERP", connected: false },
  { id: "salesforce", name: "Salesforce", category: "CRM", categoryEn: "CRM", connected: false },
  { id: "slack", name: "Slack", category: "內部通訊", categoryEn: "Internal", connected: false },
];

export const seedAudit: AuditEvent[] = [
  { id: "a1", at: "今天 14:12", actor: "阿美", action: "草擬 6 則 WhatsApp 回覆，2 則升級經理", actionEn: "Drafted 6 WhatsApp replies, escalated 2" },
  { id: "a2", at: "今天 09:04", actor: "阿欣", action: "匯出下週更表初稿（18 人）", actionEn: "Exported next-week roster draft (18 people)" },
  { id: "a3", at: "昨天 17:02", actor: "阿嘉", action: "標出兩筆超額凍肉採購", actionEn: "Flagged two oversized meat purchases" },
  { id: "a4", at: "昨天 11:20", actor: "經理 · 陳", action: "連接 Google Workspace", actionEn: "Connected Google Workspace" },
];

export const marketAgents: MarketAgent[] = [
  { id: "m-front", name: "舖面接待", nameEn: "Front desk", department: "support", summary: "處理訂位、等位、過敏原查詢。", summaryEn: "Bookings, waits, allergen questions." },
  { id: "m-roster", name: "零售排班", nameEn: "Retail roster", department: "people", summary: "按人流與促銷排出班表。", summaryEn: "Rosters from footfall and promotions." },
  { id: "m-ap", name: "應付賬助理", nameEn: "AP clerk", department: "finance", summary: "讀發票、對單、標重複付款。", summaryEn: "Reads invoices, matches POs, flags doubles." },
  { id: "m-kpi", name: "店長哨兵", nameEn: "Shop sentinel", department: "ops", summary: "看守翻檔與缺貨，越線即派單。", summaryEn: "Watches turn time and stock-outs." },
];
