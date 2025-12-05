import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import match from "@/lib/assistantKB";

// Types
type ReqBody = { question: string; webFallback?: boolean };

/* -----------------------------------------------------
    GOOGLE SEARCH SCRAPER (IMPROVED & SAFER)
----------------------------------------------------- */
async function fetchGoogleSnippet(query: string): Promise<string | null> {
  try {
    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      cache: "no-store",
    });

    if (!response.ok) return null;

    const html = await response.text();

    // Try multiple snippet selectors to improve success rate:
    const selectors = [
      /<div class="BNeawe s3v9rd AP7Wnd">([^<]+)<\/div>/,               // Google main text
      /<div class="BNeawe s3v9rd">([^<]+)<\/div>/,                     // Another variation
      /<span class="hgKElc">([^<]+)<\/span>/,                          // Featured snippet short answer
      /<meta name="description" content="([^"]+)"/i,                  // Fallback description
    ];

    for (const pattern of selectors) {
      const match = html.match(pattern);
      if (match && match[1]) {
        let snippet = match[1].trim();
        snippet = snippet.replace(/\s+/g, " "); // normalize spacing
        return snippet;
      }
    }

    return null;
  } catch (err) {
    console.warn("Google fetch error:", err);
    return null;
  }
}

/* -----------------------------------------------------
    LOGGING (MORE SAFE + NON-BLOCKING)
----------------------------------------------------- */
function appendChatLog(entry: any) {
  try {
    const dataDir = path.join(process.cwd(), "frontend", "data");
    const logFile = path.join(dataDir, "assistant_chats.json");

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    let logs: any[] = [];

    if (fs.existsSync(logFile)) {
      const content = fs.readFileSync(logFile, "utf-8");
      if (content.trim()) {
        logs = JSON.parse(content);
      }
    }

    logs.push(entry);

    fs.writeFileSync(logFile, JSON.stringify(logs, null, 2), "utf-8");
  } catch (err) {
    console.warn("Chat log failed:", err);
  }
}

/* -----------------------------------------------------
    MAIN ROUTE HANDLER
----------------------------------------------------- */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ReqBody;
    const question = body?.question?.trim();
    const webFallback = body?.webFallback ?? true;

    if (!question) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    /* ------------------------------
       1) KNOWLEDGE BASE MATCH
    ------------------------------ */
    const matchResult = match.matchIntent(question);
    if (matchResult) {
      appendChatLog({
        ts: new Date().toISOString(),
        question,
        reply: matchResult.response,
        source: "kb",
        intent: matchResult.tag,
      });

      return NextResponse.json({
        answer: matchResult.response,
        source: "kb",
        intent: matchResult.tag,
      });
    }

    /* ------------------------------
       2) GOOGLE WEB FALLBACK
    ------------------------------ */
    let snippet: string | null = null;

    if (webFallback) {
      snippet = await fetchGoogleSnippet(question);
    }

    if (snippet) {
      appendChatLog({
        ts: new Date().toISOString(),
        question,
        answer: snippet,
        source: "web",
        snippet,
      });

      return NextResponse.json({
        answer: snippet,
        source: "web",
        snippet,
      });
    }

    /* ------------------------------
       3) FINAL SAFE FALLBACK
    ------------------------------ */
    const fallback =
      "I couldn't find an answer in the knowledge base or on the web. Try rephrasing or contact support.";

    appendChatLog({
      ts: new Date().toISOString(),
      question,
      answer: fallback,
      source: "none",
    });

    return NextResponse.json({
      answer: fallback,
      source: "none",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}
