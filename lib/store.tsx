"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  seedAgents,
  seedAudit,
  seedFiles,
  seedIntegrations,
  seedJobs,
} from "./seed";
import type {
  Agent,
  AuditEvent,
  CronJob,
  Inquiry,
  Integration,
  KnowledgeFile,
} from "./types";

type Store = {
  ready: boolean;
  agents: Agent[];
  jobs: CronJob[];
  files: KnowledgeFile[];
  integrations: Integration[];
  audit: AuditEvent[];
  inquiries: Inquiry[];
  addAgent: (agent: Agent) => void;
  addSkill: (agentId: string, skill: string) => void;
  addFile: (file: KnowledgeFile) => void;
  addJob: (job: CronJob) => void;
  toggleJob: (id: string) => void;
  toggleIntegration: (id: string) => void;
  addInquiry: (inquiry: Inquiry) => void;
  log: (event: Omit<AuditEvent, "id">) => void;
};

const StoreContext = createContext<Store | null>(null);
const KEY = "hc-store-v1";

type Snapshot = {
  agents: Agent[];
  jobs: CronJob[];
  files: KnowledgeFile[];
  integrations: Integration[];
  audit: AuditEvent[];
  inquiries: Inquiry[];
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [agents, setAgents] = useState<Agent[]>(seedAgents);
  const [jobs, setJobs] = useState<CronJob[]>(seedJobs);
  const [files, setFiles] = useState<KnowledgeFile[]>(seedFiles);
  const [integrations, setIntegrations] = useState<Integration[]>(seedIntegrations);
  const [audit, setAudit] = useState<AuditEvent[]>(seedAudit);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) {
        const snap = JSON.parse(raw) as Snapshot;
        setAgents(snap.agents ?? seedAgents);
        setJobs(snap.jobs ?? seedJobs);
        setFiles(snap.files ?? seedFiles);
        setIntegrations(snap.integrations ?? seedIntegrations);
        setAudit(snap.audit ?? seedAudit);
        setInquiries(snap.inquiries ?? []);
      }
    } catch {
      /* keep seeds */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const snap: Snapshot = { agents, jobs, files, integrations, audit, inquiries };
    window.localStorage.setItem(KEY, JSON.stringify(snap));
  }, [ready, agents, jobs, files, integrations, audit, inquiries]);

  const value = useMemo<Store>(
    () => ({
      ready,
      agents,
      jobs,
      files,
      integrations,
      audit,
      inquiries,
      addAgent: (agent) => setAgents((cur) => [agent, ...cur]),
      addSkill: (agentId, skill) =>
        setAgents((cur) =>
          cur.map((a) =>
            a.id === agentId && !a.skills.includes(skill)
              ? { ...a, skills: [...a.skills, skill] }
              : a,
          ),
        ),
      addFile: (file) => setFiles((cur) => [file, ...cur]),
      addJob: (job) => setJobs((cur) => [job, ...cur]),
      toggleJob: (id) =>
        setJobs((cur) =>
          cur.map((j) => (j.id === id ? { ...j, enabled: !j.enabled } : j)),
        ),
      toggleIntegration: (id) =>
        setIntegrations((cur) =>
          cur.map((i) => (i.id === id ? { ...i, connected: !i.connected } : i)),
        ),
      addInquiry: (inquiry) => setInquiries((cur) => [inquiry, ...cur]),
      log: (event) =>
        setAudit((cur) => [{ ...event, id: crypto.randomUUID() }, ...cur].slice(0, 40)),
    }),
    [ready, agents, jobs, files, integrations, audit, inquiries],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
