export async function callAI(prompt: string, system?: string): Promise<string> {
  const resp = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, system }),
  });
  const data = (await resp.json()) as { content?: string; error?: string };
  if (!resp.ok) throw new Error(data.error ?? "Request failed");
  return data.content ?? "";
}