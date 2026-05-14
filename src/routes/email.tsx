import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Loader2, Sparkles } from "lucide-react";
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

export const Route = createFileRoute("/email")({ component: EmailPage });

function EmailPage() {
  const [recipient, setRecipient] = useState("");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Professional");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!topic.trim()) return toast.error("Describe the email topic");
    setLoading(true);
    try {
      const prompt = `Write an email with the following details.
Recipient: ${recipient || "(unspecified)"}
Tone: ${tone}
Goal / topic: ${topic}

Format strictly as:
Subject: <subject line>

<email body with greeting, 2-4 short paragraphs, and a sign-off>`;
      const result = await callAI(
        prompt,
        "You are an expert workplace communication assistant. Write clear, concise, well-structured emails.",
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
      title="Smart Email Generator"
      description="Draft professional emails with the right tone in seconds."
      icon={<Mail className="h-5 w-5" />}
    >
      <div className="grid gap-4 rounded-xl border bg-card p-5">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Recipient</Label>
            <Input
              placeholder="e.g. Hiring manager, Sarah from Marketing"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["Professional", "Friendly", "Formal", "Persuasive", "Apologetic"].map(
                  (t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>What is the email about?</Label>
          <Textarea
            rows={4}
            placeholder="e.g. Follow up on yesterday's product demo and propose a meeting next week"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <Button onClick={generate} disabled={loading} className="w-fit">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          <span className="ml-1">Generate email</span>
        </Button>
      </div>
      <AiOutput value={output} onChange={setOutput} />
    </AiToolShell>
  );
}