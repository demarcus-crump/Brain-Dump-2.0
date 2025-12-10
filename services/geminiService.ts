import { GoogleGenAI, Type } from "@google/genai";
import { BrainDumpResult, ConversationMessage } from "../types";

const getAI = () => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

// --- AGENT 0: LISTIE (The Gatekeeper) ---
// Model: Flash
// Goal: Check for ambiguity
export const checkAmbiguity = async (input: string): Promise<{ isAmbiguous: boolean; question?: string }> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `User Input: "${input}"
    
    You are Listie. Your job is to check if this input is too vague to be useful (e.g., "ideas", "work stuff", "help me").
    
    1. If it IS vague, formulate a single, friendly clarifying question to help the user expand.
    2. If it is substantial enough to process, output "CLEAR".
    
    Output JSON: { "isAmbiguous": boolean, "question": string | null }`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          isAmbiguous: { type: Type.BOOLEAN },
          question: { type: Type.STRING, nullable: true },
        },
        required: ["isAmbiguous"],
      },
    }
  });

  const text = response.text;
  if (!text) return { isAmbiguous: false };
  return JSON.parse(text);
};

// --- AGENT 1: LISTIE (The Listener) ---
// Model: Flash (Fast)
// Goal: Extract raw facts
export const runListieAgent = async (input: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `User Input: "${input}"
    
    You are Listie (The Listener). 
    Extract the raw key points, facts, and intended actions from this messy thought. 
    Be direct and concise. Output as a bulleted list.`,
  });
  return response.text || "No actionable points found.";
};

// --- AGENT 2: LINKY (The Connector) ---
// Model: Flash (Fast)
// Goal: Find patterns
export const runLinkyAgent = async (input: string, listieOutput: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Original Input: "${input}"
    Listie's Extraction: "${listieOutput}"
    
    You are Linky (The Connector).
    Look at the extracted points. Find 2-3 interesting relationships, contradictions, or hidden patterns between them.
    Briefly explain these connections.`,
  });
  return response.text || "No connections found.";
};

// --- AGENT 3: WORDY (The Translator) ---
// Model: Flash (Fast)
// Goal: Simplify language
export const runWordyAgent = async (input: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Original Input: "${input}"
    
    You are Wordy (The Translator).
    Rewrite the core idea of this input in the simplest, most human terms possible. 
    Avoid jargon. Make it sound like a clear, casual explanation to a friend. 
    Keep it to 2-3 sentences.`,
  });
  return response.text || "Could not simplify text.";
};

// --- AGENT 4: SPARKY (The Challenger) ---
// Model: Flash (Fast)
// Goal: Creative friction
export const runSparkyAgent = async (listieOutput: string, wordyOutput: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Key Points: "${listieOutput}"
    Simplified Summary: "${wordyOutput}"
    
    You are Sparky (The Challenger).
    Ask 2 provocative "What if" questions that challenge the assumptions in this thought process.
    Focus on gaps or potential pitfalls.`,
  });
  return response.text || "No challenges identified.";
};

// --- AGENT 5: BLENDY (The Synthesizer) ---
// Model: PRO (Smartest)
// Goal: Final structured JSON
export const runBlendyAgent = async (
  input: string,
  listie: string,
  linky: string,
  wordy: string,
  sparky: string
): Promise<BrainDumpResult> => {
  const ai = getAI();
  
  const systemInstruction = `
    You are Blendy (The Synthesizer), the smartest AI agent (Gemini 3.0 Pro).
    
    Your team has processed a user's brain dump:
    - User Input: "${input}"
    - Listie (Key Points): "${listie}"
    - Linky (Connections): "${linky}"
    - Wordy (Simplification): "${wordy}"
    - Sparky (Challenges): "${sparky}"

    Your Job: Synthesize ALL of this into a final, brilliant insight.
    
    1. 'interpretation': Combine Wordy's simplicity with Linky's depth. It should be a definitive statement of what the user is *really* thinking.
    2. 'keyPoints': Create 4 distinct, actionable bullet points that integrate Listie's facts with Sparky's cautions.
    
    Output strictly valid JSON.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview", // USING THE REAL PRO MODEL
    contents: "Synthesize the final result.",
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          interpretation: {
            type: Type.STRING,
            description: "A clear, insightful summary of the synthesized thought.",
          },
          keyPoints: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "4 distinct, actionable insights derived from the collective agent analysis.",
          },
        },
        required: ["interpretation", "keyPoints"],
      },
    },
  });

  const text = response.text;
  if (!text) throw new Error("Blendy failed to synthesize.");
  
  return JSON.parse(text) as BrainDumpResult;
};

// --- CONVERSATIONAL REFINEMENT ---
export const refineResult = async (
  currentResult: BrainDumpResult,
  chatHistory: ConversationMessage[],
  originalInput: string
): Promise<{ result: BrainDumpResult | null; reply: string }> => {
  const ai = getAI();

  const historyText = chatHistory.map(m => `${m.role === 'user' ? 'User' : 'Agent'}: ${m.text}`).join('\n');

  const systemInstruction = `
    You are Blendy, the leader of the Brain Dump agent team. 
    You are in a live session with the user, refining their "Brain Dump".
    
    Original Input: "${originalInput}"
    Current Result: ${JSON.stringify(currentResult)}
    Conversation History:
    ${historyText}

    The user just sent a new message. You must decide if they are:
    A) Asking a question or discussing (Reply ONLY)
    B) Requesting a change to the plan (Reply + Return New Result)

    1. If they ask a question ("Why did you say X?"), return 'result': null.
    2. If they want changes ("Add more details", "Change point 3"), return a fully updated 'result' object AND a 'reply'.

    Output JSON: { "result": BrainDumpResult | null, "reply": string }
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: "Process the user's latest feedback.",
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          result: {
            type: Type.OBJECT,
            nullable: true,
            properties: {
              interpretation: { type: Type.STRING },
              keyPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["interpretation", "keyPoints"]
          },
          reply: { type: Type.STRING }
        },
        required: ["reply"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("Refinement failed.");
  return JSON.parse(text);
};