import { ReactNode } from "react";

export function AiToolShell({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
      <p className="rounded-md border border-dashed bg-muted/40 p-3 text-xs text-muted-foreground">
        AI outputs may be inaccurate. Review and edit before use. Do not share confidential
        information.
      </p>
    </div>
  );
}