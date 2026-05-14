import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  Mail,
  FileText,
  ListChecks,
  Search,
  MessageSquare,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const tools = [
  {
    title: "Smart Email Generator",
    description: "Draft polished emails in seconds with tone and intent control.",
    url: "/email",
    icon: Mail,
  },
  {
    title: "Meeting Notes Summarizer",
    description: "Turn raw notes into clean summaries, decisions and action items.",
    url: "/meeting",
    icon: FileText,
  },
  {
    title: "AI Task Planner",
    description: "Break a goal into a structured, prioritized plan.",
    url: "/tasks",
    icon: ListChecks,
  },
  {
    title: "AI Research Assistant",
    description: "Get a structured briefing on any topic with key points.",
    url: "/research",
    icon: Search,
  },
  {
    title: "AI Chatbot",
    description: "Conversational assistant for any workplace question.",
    url: "/chat",
    icon: MessageSquare,
  },
];

function Index() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 p-6">
      <section className="rounded-2xl border bg-gradient-to-br from-primary/10 via-accent/40 to-background p-8">
        <div className="flex items-center gap-2 text-xs font-medium text-primary">
          <Sparkles className="h-4 w-4" /> Workplace AI Suite
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          Automate workplace tasks with AI
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
          One workspace for drafting emails, summarizing meetings, planning tasks,
          researching topics, and chatting with an AI assistant.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <Link
            key={t.url}
            to={t.url}
            className="group rounded-xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <t.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-semibold">{t.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{t.description}</p>
            <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
              Open <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </section>

      <p className="rounded-md border border-dashed bg-muted/40 p-3 text-xs text-muted-foreground">
        Responsible AI: Outputs are AI-generated and may contain errors. Always review
        before sending or sharing. Avoid entering confidential or personal data.
      </p>
    </div>
  );
}
}
