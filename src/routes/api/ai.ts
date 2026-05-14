import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/ai")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { system, prompt } = (await request.json()) as {
            system?: string;
            prompt: string;
          };
          const apiKey = process.env.LOVABLE_API_KEY;
          if (!apiKey) {
            return new Response(JSON.stringify({ error: "AI not configured" }), {
              status: 500,
              headers: { "Content-Type": "application/json" },
            });
          }
          const resp = await fetch(
            "https://ai.gateway.lovable.dev/v1/chat/completions",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                model: "google/gemini-3-flash-preview",
                messages: [
                  {
                    role: "system",
                    content:
                      system ??
                      "You are a helpful workplace productivity assistant. Be concise, structured, and professional.",
                  },
                  { role: "user", content: prompt },
                ],
              }),
            },
          );
          if (!resp.ok) {
            if (resp.status === 429)
              return new Response(
                JSON.stringify({ error: "Rate limit exceeded. Please retry shortly." }),
                { status: 429, headers: { "Content-Type": "application/json" } },
              );
            if (resp.status === 402)
              return new Response(
                JSON.stringify({ error: "AI credits exhausted. Add credits in Settings." }),
                { status: 402, headers: { "Content-Type": "application/json" } },
              );
            const txt = await resp.text();
            console.error("AI error", resp.status, txt);
            return new Response(JSON.stringify({ error: "AI gateway error" }), {
              status: 500,
              headers: { "Content-Type": "application/json" },
            });
          }
          const data = (await resp.json()) as {
            choices?: { message?: { content?: string } }[];
          };
          const content = data.choices?.[0]?.message?.content ?? "";
          return new Response(JSON.stringify({ content }), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (e) {
          console.error(e);
          return new Response(
            JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
            { status: 500, headers: { "Content-Type": "application/json" } },
          );
        }
      },
    },
  },
});