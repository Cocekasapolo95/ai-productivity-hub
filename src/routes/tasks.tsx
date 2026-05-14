import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ListChecks, Loader2, Sparkles } from "lucide-react";
import { AiToolShell } from "@/components/ai-tool-shell";
import { AiOutput } from "@/components/ai-output";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { callAI } from "@/lib/ai-client";
import { toast } from "sonner";

export const Route = createFileRoute("/tasks")({ component: TasksPage });

function TasksPage() {
  const [goal, setGoal] = useState("");
  const [context, setContext] = useState("");
  const [timeframe, setTimeframe] = useState("1 week");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!goal.trim()) return toast.error("What is the goal?");
    setLoading(true);
    try {
      const result = await callAI(
        `Create a structured task plan.
Goal: ${goal}
Timeframe: ${timeframe}
Context: ${context || "(none)"}

Format strictly as:
## Plan Overview
<2-3 sentences>

## Milestones
1. <milestone> — <target date / day>

## Tasks
- [Priority] <task> — owner: <role>, est: <time>

## Risks & Mitigations
- <risk>: <mitigation>`,
        "You are an expert project planner. Produce realistic, prioritized, actionable plans.",
      );
      setOutput(result);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AiToolShell
      title="AI Task Planner"
      description="Break a goal into a structured, prioritized plan with milestones."
      icon={<ListChecks className="h-5 w-5" />}
    >
      <div className="grid gap-4 rounded-xl border bg-card p-5">
        <div className="space-y-1.5">
          <Label>Goal</Label>
          <Input
            placeholder="e.g. Launch internal onboarding portal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Timeframe</Label>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["1 day", "1 week", "2 weeks", "1 month", "1 quarter"].map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Context (optional)</Label>
            <Input
              placeholder="Team size, constraints, stakeholders..."
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={generate} disabled={loading} className="w-fit">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          <span className="ml-1">Generate plan</span>
        </Button>
      </div>
      <AiOutput value={output} onChange={setOutput} />
    </AiToolShell>
  );
}