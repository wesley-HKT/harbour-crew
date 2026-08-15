import { xai } from "@ai-sdk/xai";
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  streamText,
  type UIMessage,
} from "ai";

export const maxDuration = 60;

type AgentPayload = {
  name?: string;
  nameEn?: string;
  title?: string;
  brief?: string;
  briefEn?: string;
  skills?: string[];
  knowledge?: string[];
  language?: "zh" | "en";
};

function systemPrompt(agent: AgentPayload) {
  const lang = agent.language === "en" ? "en" : "zh";
  const brief = lang === "en" ? agent.briefEn || agent.brief : agent.brief || agent.briefEn;
  const skills = (agent.skills ?? []).join("、");
  const knowledge = (agent.knowledge ?? []).map((k) => `- ${k}`).join("\n");
  return [
    brief || `You are ${agent.name ?? "Harbour Crew staff"} (${agent.title ?? "AI employee"}).`,
    `Skills: ${skills || "general operations"}`,
    knowledge ? `Company knowledge:\n${knowledge}` : "No extra files yet.",
    lang === "zh"
      ? "用香港書面中文或自然粵語回覆，短句、可執行。不要假裝已對外發送或已改動真實系統，改為列出草稿或建議步驟。"
      : "Reply in clear English unless the user writes Chinese. Be short and operational. Never pretend a message was sent or a live system was changed — draft it.",
  ].join("\n\n");
}

function demoReply(agent: AgentPayload, lastUser: string) {
  const name = agent.language === "en" ? agent.nameEn || agent.name : agent.name;
  if (agent.language === "en") {
    return `${name} here. I read your brief: “${lastUser.slice(0, 180)}”.\n\nI would: 1) check the files on my desk, 2) draft the output, 3) flag anything that needs a manager.\n\nThis preview is running without an XAI_API_KEY, so I am in rehearsal mode. Add the key on Vercel to let me think with Grok.`;
  }
  return `${name ?? "員工"}收到：「${lastUser.slice(0, 180)}」\n\n我會：1）先對齊自己檔案櫃裡的規則，2）寫出可交經理確認的草稿，3）標出要升級的例外。\n\n而家係預覽站，未設定 XAI_API_KEY，所以係排練模式。喺 Vercel 加上金鑰之後，我就會用 Grok 真正作答。`;
}

function lastUserText(messages: UIMessage[]) {
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    if (msg.role !== "user") continue;
    return msg.parts
      .filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join("\n");
  }
  return "";
}

export async function POST(req: Request) {
  const body = (await req.json()) as { messages: UIMessage[]; agent?: AgentPayload };
  const messages = body.messages ?? [];
  const agent = body.agent ?? {};

  if (!process.env.XAI_API_KEY) {
    const text = demoReply(agent, lastUserText(messages) || "（空白）");
    const stream = createUIMessageStream({
      execute: async ({ writer }) => {
        writer.write({ type: "text-start", id: "demo" });
        for (const chunk of text.split(/(?<=。|！|？|\n)/)) {
          if (!chunk) continue;
          writer.write({ type: "text-delta", id: "demo", delta: chunk });
          await new Promise((r) => setTimeout(r, 18));
        }
        writer.write({ type: "text-end", id: "demo" });
      },
    });
    return createUIMessageStreamResponse({ stream });
  }

  const result = streamText({
    model: xai.responses("grok-4.6"),
    system: systemPrompt(agent),
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
