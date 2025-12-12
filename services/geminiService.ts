
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

// --- AGENT 1: LISTIE (The Decoder) ---
// VON NEUMANN PUZZLE 2: INSTRUCTION VS. DATA
// "A pattern of 1s and 0s can be an INSTRUCTION (command to follow) or DATA (information to set upon)."
export const runListieAgent = async (input: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `User Input: "${input}"
    
    You are Listie (The Decoder). Apply Von Neumann's Puzzle 2: "Distinguish Instruction vs. Data".
    
    The user's input is a mix of "Context/History" (DATA) and "Implied Actions/Commands" (INSTRUCTIONS).
    
    1. Extract the DATA: What are the facts, the numbers, the 'sign' description?
    2. Extract the INSTRUCTIONS: What is the machine (the user) trying to BUILD or DO with this data?
    
    Output as a clear split list.`,
  });
  return response.text || "No actionable points found.";
};

// --- AGENT 2: LINKY (The Signal Detector) ---
// VON NEUMANN PUZZLE 5: RELIABLE SYSTEMS FROM UNRELIABLE PARTS
// "Key Distinction: SINGLE NOISY INPUT vs. REDUNDANT MAJORITY VOTE."
export const runLinkyAgent = async (input: string, listieOutput: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Original Input: "${input}"
    Listie's Extraction: "${listieOutput}"
    
    You are Linky (The Signal Detector). Apply Von Neumann's Puzzle 5: "Reliable Systems from Unreliable Parts".
    
    The input is "Noisy". You need to find the "Redundant Majority Vote".
    - What themes or desires appear multiple times in different forms? (The Signal)
    - What is just "Noise" (single, random inputs that don't fit the pattern)?
    
    Identify the Strong Signal.`,
  });
  return response.text || "No connections found.";
};

// --- AGENT 3: WORDY (The Observer) ---
// VON NEUMANN PUZZLE 4: QUANTUM MEASUREMENT
// "Key Distinction: POSSIBILITY ('maybe-land') vs. ACTUALITY ('actual-land')."
export const runWordyAgent = async (input: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Original Input: "${input}"
    
    You are Wordy (The Observer). Apply Von Neumann's Puzzle 4: "Possibility vs. Actuality".
    
    The user's thought exists in a state of "Possibility" (vague wishes, 'could be', 'might').
    Collapse the wave function!
    Rewrite the core idea as a concrete "Actuality".
    - Convert "I want to maybe do X" to "The objective is X".
    - Make it definite, grounded, and simple.`,
  });
  return response.text || "Could not simplify text.";
};

// --- AGENT 4: SPARKY (The Game Theorist) ---
// VON NEUMANN PUZZLE 3: GAME THEORY & BLUFFING
// "Key Distinction: REVEAL vs. CONCEAL."
export const runSparkyAgent = async (listieOutput: string, wordyOutput: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Data/Instructions: "${listieOutput}"
    Actualized Reality: "${wordyOutput}"
    
    You are Sparky (The Game Theorist). Apply Von Neumann's Puzzle 3: "Reveal vs. Conceal".
    
    Analyze the user's strategy:
    1. What are they REVEALING? (What are they confident about?)
    2. What are they CONCEALING? (What are they bluffing about? What fears or gaps are hidden in the bet?)
    
    Challenge the "Bluff". Ask 2 questions that force them to show their hand.`,
  });
  return response.text || "No challenges identified.";
};

// --- AGENT 5: BLENDY (The Architect) ---
// THE MASTER KEY: SEPARATING USES
// Goal: Gamified Output (Score + Badges + Insight)
export const runBlendyAgent = async (
  input: string,
  listie: string,
  linky: string,
  wordy: string,
  sparky: string
): Promise<BrainDumpResult> => {
  const ai = getAI();
  
  const systemInstruction = `
    You are Blendy (The Architect), the smartest AI agent (Gemini 3.0 Pro).
    You are building a "Reliable System" from the user's "Unreliable Parts".
    
    Analysis inputs:
    - Listie (Data vs Instruction): "${listie}"
    - Linky (Signal vs Noise): "${linky}"
    - Wordy (Actuality): "${wordy}"
    - Sparky (Game Theory): "${sparky}"

    Your Job:
    1. 'interpretation': Combine Wordy's "Actuality" with Linky's "Signal". A definitive statement of the system's purpose.
    2. 'keyPoints': Create 4 actionable steps to build this system.
    3. 'clarityScore': Rate the clarity of the *final synthesized result* compared to the chaos of the input (0-100). High score means you successfully found order.
    4. 'badges': Award 3 short, punchy, gamified badges based on the content (e.g. "Signal Hunter", "Bluff Caller", "System Builder", "Logic Master", "Chaos Tamer").
    
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
            description: "A clear, insightful summary.",
          },
          keyPoints: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          clarityScore: {
            type: Type.INTEGER,
            description: "Score from 0 to 100",
          },
          badges: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "3 gamified achievement names",
          }
        },
        required: ["interpretation", "keyPoints", "clarityScore", "badges"],
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
    You are Blendy.
    Original Input: "${originalInput}"
    Current Result: ${JSON.stringify(currentResult)}
    Conversation History:
    ${historyText}

    Decide if user wants to change the plan.
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
              clarityScore: { type: Type.INTEGER },
              badges: { type: Type.ARRAY, items: { type: Type.STRING } }
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
