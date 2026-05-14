import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Loader2, Sparkles } from "lucide-react";
import { AiToolShell } from "@/components/ai-tool-shell";
import { AiOutput } from "@/components/ai-output";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { callAI } from "@/lib/ai-client";
import { toast } from "sonner";

export const Route = createFileRoute("/meeting")({ component: MeetingPage });

function MeetingPage() {
  const [notes, setNotes] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!notes.trim()) return toast.error("Paste your meeting notes first");
    setLoading(true);
    try {
      const result = await callAI(
        `Summarize the following meeting notes.

Notes:
"""
${notes}
"""

Format strictly as:
## Summary
<2-4 sentence overview>

## Key Decisions
- <decision>

## Action Items
- <owner>: <task> (due: <date or TBD>)

## Open Questions
- <question>`,
        "You are an expert meeting analyst. Extract clear, structured outcomes from raw meeting notes.",
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
      title="Meeting Notes Summarizer"
      description="Turn raw notes or transcripts into clean summaries, decisions, and action items."
      icon={<FileText className="h-5 w-5" />}
    >
      <div className="grid gap-4 rounded-xl border bg-card p-5">
        <div className="space-y-1.5">
          <Label>Meeting notes or transcript</Label>
          <Textarea
            rows={10}
            placeholder="Paste raw notes, bullet points, or a meeting transcript here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <Button onClick={generate} disabled={loading} className="w-fit">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          <span className="ml-1">Summarize</span>
        </Button>
      </div>
      <AiOutput value={output} onChange={setOutput} />
    </AiToolShell>
  );
}