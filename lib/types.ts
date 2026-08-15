export type Lang = "zh" | "en";

export type Department = "support" | "people" | "finance" | "ops";

export type AgentStatus = "online" | "busy" | "idle";

export type Agent = {
  id: string;
  name: string;
  nameEn: string;
  title: string;
  titleEn: string;
  department: Department;
  status: AgentStatus;
  language: Lang;
  brief: string;
  briefEn: string;
  skills: string[];
  knowledge: string[];
  tasksToday: number;
  lastActive: string;
};

export type CronJob = {
  id: string;
  agentId: string;
  title: string;
  titleEn: string;
  cadence: string;
  cadenceEn: string;
  enabled: boolean;
  lastRun: string;
  nextRun: string;
};

export type KnowledgeFile = {
  id: string;
  agentId: string;
  name: string;
  kind: string;
  summary: string;
  updated: string;
};

export type Integration = {
  id: string;
  name: string;
  category: string;
  categoryEn: string;
  connected: boolean;
};

export type AuditEvent = {
  id: string;
  at: string;
  actor: string;
  action: string;
  actionEn: string;
};

export type Inquiry = {
  id: string;
  company: string;
  industry: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  createdAt: string;
};

export type MarketAgent = {
  id: string;
  name: string;
  nameEn: string;
  department: Department;
  summary: string;
  summaryEn: string;
};
