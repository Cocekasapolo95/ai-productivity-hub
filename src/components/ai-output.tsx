import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export function AiOutput({
  value,
  onChange,
  placeholder = "AI output will appear here. You can edit it freely.",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="rounded-xl border bg-card">
      <div className="flex items-center justify-between border-b px-3 py-2">
        <span className="text-xs font-medium text-muted-foreground">
          Editable output
        </span>
        <Button
          variant="ghost"
          size="sm"
          disabled={!value}
          onClick={async () => {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            toast.success("Copied to clipboard");
            setTimeout(() => setCopied(false), 1500);
          }}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span className="ml-1">Copy</span>
        </Button>
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[260px] resize-y rounded-none border-0 focus-visible:ring-0"
      />
    </div>
  );
}