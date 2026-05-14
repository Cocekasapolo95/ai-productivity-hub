import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Loader2, Sparkles } from "lucide-react";
import { AiToolShell } from "@/components/ai-tool-shell";
import { AiOutput } from "@/components/ai-output";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { callAI } from "@/lib/ai-client";
import { toast } from "sonner";

export const Route = createFileRoute("/research")({ component: ResearchPage });

function ResearchPage() {
  const [topic, setTopic] = useState("");
  const [depth, setDepth] = useState("Standard");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!topic.trim()) return toast.error("Enter a topic to research");
    setLoading(true);
    try {
      const result = await callAI(
        `Produce a structured research briefing.
Topic: ${topic}
Depth: ${depth}

Format strictly as:
## Overview
<2-4 sentences>

## Key Points
- <point>

## Considerations & Trade-offs
- <consideration>

## Recommended Next Steps
- <step>

## Suggested Further Reading
- <topic / source type>`,
        "You are a workplace research assistant. Provide balanced, structured, well-reasoned briefings. Be honest about uncertainty.",
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
      title="AI Research Assistant"
      description="Get a structured briefing on any workplace topic."
      icon={<Search className="h-5 w-5" />}
    >
      <div className="grid gap-4 rounded-xl border bg-card p-5">
        <div className="grid gap-3 md:grid-cols-[1fr_180px]">
          <div className="space-y-1.5">
            <Label>Topic</Label>
            <Input
              placeholder="e.g. Best practices for async standups"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Depth</Label>
            <Select value={depth} onValueChange={setDepth}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["Brief", "Standard", "Deep dive"].map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={generate} disabled={loading} className="w-fit">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          <span className="ml-1">Research</span>
        </Button>
      </div>
      <AiOutput value={output} onChange={setOutput} />
    </AiToolShell>
  );
}