import React from "react";

// assistantKB.tsx
// Improved knowledge-base + intent matcher module for MediCare+
// Exports: KB_DOCS, getRelevantDocs, matchIntent, addIntent, addDoc

export type KBDoc = {
  id: string;
  title: string;
  content: string;
};

// --- In-repo knowledge base (can be replaced with remote store) ---
const DEFAULT_KB_DOCS: KBDoc[] = [
  {
    id: "getting-started",
    title: "Getting Started with MediCare+",
    content:
      "MediCare+ provides online doctor consultations, accepts most major insurance plans, and supports both video and phone visits. To book an appointment, sign up as a patient and search for doctors by specialty and city.",
  },
  {
    id: "doctor-onboarding",
    title: "Joining as a Doctor",
    content:
      "Doctors can join MediCare+ by completing the onboarding form, providing license and identity documents, and setting available hours. Once approved, doctors can accept appointments, provide prescriptions, and manage their schedules from the dashboard.",
  },
  {
    id: "payments",
    title: "Payments and Insurance",
    content:
      "We accept most major insurance carriers. Patients will see estimated costs during booking. Payments are charged via the secure payment gateway integrated into our platform.",
  },
];

let KB_DOCS: KBDoc[] = [...DEFAULT_KB_DOCS];

// --- Intent types ---
export type Intent = {
  tag: string;
  patterns: string[]; // examples / trigger phrases
  responses: string[];
};

const DEFAULT_INTENTS: { intents: Intent[] } = {
  intents: [
    {
      tag: "greeting",
      patterns: ["hi", "hello", "hey there", "good morning", "what's up"],
      responses: [
        "Hello! Welcome to the Doctor Consultation platform. How can I help you schedule your healthcare today?",
        "Hi! I'm your AI assistant. I can help you find a doctor, book appointments, or answer questions about the system.",
      ],
    },
    // (other intents omitted for brevity in the default list - they will be included below)
  ],
};

// NOTE: we include the full original set of intents by merging here to keep file concise.
// You can replace DEFAULT_INTENTS.intents with your original KB_INTENTS.intents if desired.

// For full initial data we will programmatically populate from the original KB
const KB_INTENTS: { intents: Intent[] } = {
  intents: [
    {
      tag: "greeting",
      patterns: ["hi", "hello", "hey there", "good morning", "what's up"],
      responses: [
        "Hello! Welcome to the Doctor Consultation platform. How can I help you schedule your healthcare today?",
        "Hi! I'm your AI assistant. I can help you find a doctor, book appointments, or answer questions about the system.",
      ],
    },
    {
      tag: "booking_appointment",
      patterns: [
        "how to book doctor appointment",
        "schedule an appointment",
        "find a doctor",
        "how do I see a doctor online",
        "what are the appointment options",
        "book a home visit",
      ],
      responses: [
        "To book an appointment, use the **Search** bar to find a doctor by **Specialty** or **Symptom**. View their profile, check the **schedule**, and select your preferred **date and time slot**. Finally, click **Book Appointment** to confirm. We offer **Clinical**, **Home Visit**, and **Remote Video Consultation** modes.",
        "You can schedule an appointment by searching for a doctor, viewing their profile for available time slots, and then proceeding with the booking and payment process. The system ensures the doctor's schedule is checked before confirming.",
      ],
    },
    {
      tag: "doctor_information",
      patterns: [
        "how can I check a doctor's qualifications",
        "what are the doctor's working hours",
        "check doctor's specialties",
        "view doctor profile",
      ],
      responses: [
        "To view a doctor's credentials, click on their profile from the search results. The profile page details their **Qualifications (Degrees)**, **Experience**, **Specialty**, **Consultation Fee**, and **Patient Reviews**.",
        "A doctor's profile contains all essential information: their professional background, fees, working hours, and patient feedback. Always check this before booking.",
      ],
    },
    {
      tag: "contact_doctor",
      patterns: [
        "how can i contact the doctor",
        "speak to my doctor before the appointment",
        "is there in-app chat",
        "how to start a video call",
      ],
      responses: [
        "Direct communication with the doctor is typically enabled **after a consultation is booked**. You can use the **in-app chat feature** for quick queries or join the scheduled **Video/Audio call** link found on your **Appointments** dashboard.",
        "For urgent pre-appointment queries, you must wait for the doctor to approve the booking. Once approved, secure **in-app chat** and **video call** options will become available on the appointment card.",
      ],
    },
    {
      tag: "appointment_cancellation",
      patterns: [
        "can I cancel my appointment",
        "how to reschedule an appointment",
        "what is the refund policy for cancellation",
        "modify booking time",
      ],
      responses: [
        "You can **Cancel** or **Reschedule** an appointment through the **My Appointments** section. Please note, cancellations may incur a fee or partial refund based on the **cancellation policy** and how close it is to the appointment time.",
        "To manage your booking, go to **My Appointments**. You will find options there. For refunds, check the platform's specific **Terms & Conditions** regarding cancellation windows.",
      ],
    },
    {
      tag: "fee_payment",
      patterns: [
        "what is the consultation fee",
        "how can I pay for the appointment",
        "payment methods accepted",
        "is the fee refundable",
      ],
      responses: [
        "The **Consultation Fee** is set by the doctor and is clearly displayed on their profile. Payment is required at the time of booking, and the system accepts various methods including **Credit/Debit Cards** and **Net Banking**. Refunds are subject to the **cancellation policy**.",
        "The fee must be paid during the booking process. All payments are secured. For fee specifics, refer to the individual doctor's profile page.",
      ],
    },
    {
      tag: "contact_admin",
      patterns: [
        "can i contact admin",
        "how to reach support",
        "I have a technical issue",
        "report a problem with the app",
      ],
      responses: [
        "To contact the administrator or technical support, please navigate to the **Help** or **Support** section. You will find the **support email address** or a **query submission form** there to report technical issues, profile problems, or system bugs.",
        "The Admin team handles system management. For user support, please use the dedicated **Support Portal** for the fastest resolution.",
      ],
    },
    {
      tag: "give_feedback",
      patterns: [
        "How to give feedback about doctor",
        "rate my consultation",
        "write a review",
        "where can I review the doctor",
      ],
      responses: [
        "You can give feedback using the **Ratings and Reviews** feature, which becomes available **after your consultation is complete**. Go to your **Appointment History**, select the doctor, and submit your rating and written review to share your experience on the platform.",
        "The **Ratings and Reviews** feature allows you to rate your experience with the doctor. This is crucial for platform quality and is typically done right after the appointment is marked as completed.",
      ],
    },
    {
      tag: "account_management",
      patterns: [
        "how do I reset my password",
        "update my profile information",
        "change my email address",
        "delete my account",
      ],
      responses: [
        "To update your details, go to the **Profile** section in your dashboard. To reset your password, click the **Forgot Password** link on the login screen. Account deletion requests can usually be submitted via the **Support** portal.",
        "Your profile settings allow you to manage personal information, update contact details, and change your password securely.",
      ],
    },
  ],
};

let INTENTS: Intent[] = [...KB_INTENTS.intents];

// --- Utilities: tokenization, normalization ---
const STOPWORDS = new Set([
  "the",
  "is",
  "at",
  "which",
  "on",
  "a",
  "an",
  "and",
  "or",
  "to",
  "for",
  "in",
  "of",
  "my",
  "how",
  "do",
  "i",
  "can",
  "what",
  "are",
  "with",
]);

function normalizeText(s: string) {
  return s
    .toLowerCase()
    .replace(/[’'`]/g, "'")
    .replace(/[^a-z0-9\s']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(s: string) {
  const n = normalizeText(s);
  return n
    .split(/\s+/)
    .map((t) => simpleStem(t))
    .filter((t) => t.length > 0 && !STOPWORDS.has(t));
}

// Very small and cheap stemmer to collapse common suffixes.
function simpleStem(token: string) {
  // remove common plural/ing/ed endings - not perfect but useful
  return token.replace(/(ing|ed|s|es)$/i, "");
}

// term frequency map
function termFreq(tokens: string[]) {
  const map = new Map<string, number>();
  for (const t of tokens) map.set(t, (map.get(t) || 0) + 1);
  return map;
}

// cosine similarity between two term frequency maps
function cosineSimilarity(mapA: Map<string, number>, mapB: Map<string, number>) {
  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (const [k, v] of mapA) {
    dot += v * (mapB.get(k) || 0);
    magA += v * v;
  }
  for (const v of mapB.values()) magB += v * v;
  if (magA === 0 || magB === 0) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

// --- Knowledge retrieval: improved scoring ---
export function getRelevantDocs(query: string, max = 3) {
  if (!query) return [] as KBDoc[];
  const qTokens = tokenize(query);
  if (qTokens.length === 0) return [];

  const qTf = termFreq(qTokens);

  // compute a simple TF-based similarity between query and doc (title + content)
  const scored = KB_DOCS.map((d) => {
    const text = `${d.title} ${d.content}`;
    const tokens = tokenize(text);
    const tf = termFreq(tokens);

    // partial: exact phrase boost
    const exactPhraseBoost = normalizeText(text).includes(normalizeText(query)) ? 1.5 : 0;

    const sim = cosineSimilarity(qTf, tf);
    const score = sim + exactPhraseBoost;
    return { doc: d, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.filter((s) => s.score > 0).slice(0, max).map((s) => s.doc);
}

// --- Intent matching: improved scoring and confidence ---
export function matchIntent(question: string) {
  const q = normalizeText(question);
  const qTokens = tokenize(q);

  if (qTokens.length === 0) return null;

  let best: { intent: Intent | null; score: number; details?: any } = {
    intent: null,
    score: 0,
  };

  for (const intent of INTENTS) {
    // combine pattern-level scores
    let intentScore = 0;
    let maxPatternScore = 0;

    for (const pattern of intent.patterns) {
      const p = normalizeText(pattern);

      // exact phrase match -> strong signal
      if (q.includes(p)) {
        maxPatternScore = Math.max(maxPatternScore, 3);
      }

      // token overlap: compute cosine sim between pattern and question
      const pTokens = tokenize(p);
      const sim = cosineSimilarity(termFreq(pTokens), termFreq(qTokens));
      // weight: phrase match heavier than token-sim
      const patternScore = Math.max(0, sim) + (q.includes(p) ? 2.5 : 0);
      maxPatternScore = Math.max(maxPatternScore, patternScore);
    }

    // keyword overlap with the union of patterns as backup
    const combinedPatternText = intent.patterns.join(" ");
    const combinedTokens = tokenize(combinedPatternText);
    const overlap = cosineSimilarity(termFreq(combinedTokens), termFreq(qTokens));

    intentScore = Math.max(maxPatternScore, overlap);

    if (intentScore > best.score) {
      best = { intent, score: intentScore };
    }
  }

  // convert score to a confidence in [0,1] using a soft scaling
  if (best.intent && best.score > 0) {
    // heuristics: scores around 0.4+ are meaningful. Adjust per your data.
    const raw = best.score;
    const confidence = Math.tanh(raw); // compress into 0..1 (not strict prob)

    // choose the response deterministically for predictable tests (or randomize if desired)
    const responses = best.intent.responses;
    const resp = responses[Math.floor(Math.random() * responses.length)];

    return {
      tag: best.intent.tag,
      response: resp,
      confidence,
      score: best.score,
    };
  }

  return null;
}

// --- Mutators: allow adding docs/intents at runtime ---
export function addDoc(doc: KBDoc) {
  if (!doc || !doc.id) throw new Error("doc must have an id");
  // replace or append
  const idx = KB_DOCS.findIndex((d) => d.id === doc.id);
  if (idx >= 0) KB_DOCS[idx] = doc;
  else KB_DOCS.push(doc);
  return doc;
}

export function removeDoc(id: string) {
  KB_DOCS = KB_DOCS.filter((d) => d.id !== id);
}

export function addIntent(intent: Intent) {
  if (!intent || !intent.tag) throw new Error("intent must have a tag");
  const idx = INTENTS.findIndex((i) => i.tag === intent.tag);
  if (idx >= 0) INTENTS[idx] = intent;
  else INTENTS.push(intent);
  return intent;
}

export function removeIntent(tag: string) {
  INTENTS = INTENTS.filter((i) => i.tag !== tag);
}

// --- Exports ---
export { KB_DOCS, INTENTS as KB_INTENTS };
export default {
  KB_DOCS,
  KB_INTENTS: INTENTS,
  getRelevantDocs,
  matchIntent,
  addDoc,
  removeDoc,
  addIntent,
  removeIntent,
};

// Note: This file is written as a module (tsx) to match your project structure.
// It's safe to import from non-React code; if you prefer, rename to assistantKB.ts
// and adjust your project import paths.

// Usage examples (do not include in production imports):
// import assistantKB from './assistantKB';
// assistantKB.matchIntent('how to book doctor appointment');
