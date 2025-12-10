# The 5 AI Agents

## Overview

Brain Dump 2.0's magic comes from five distinct AI agents, each with their own personality, role, and visual identity. They work sequentially in a pipeline, with each agent building on the work of the previous ones. Think of them as a creative team where everyone has a specific job.

---

## 🎧 Agent 1: Listie (The Listener)

<div style="color: #FF3366;">

### Identity

**Full Name:** Listie  
**Role:** The Listener  
**Primary Color:** ![#FF3366](https://via.placeholder.com/15/FF3366/000000?text=+) `#FF3366` (Vibrant Red-Pink)  
**Highlight Color:** ![#FF6B8A](https://via.placeholder.com/15/FF6B8A/000000?text=+) `#FF6B8A`  
**Catchphrase:** *"I hear something good!"*  
**Introduction:** *"Hi! I'm Listie!"*  

### Personality

Listie is enthusiastic, attentive, and eager to help. She's the first point of contact and takes your messy thoughts seriously. She's like that friend who actually listens when you ramble and takes mental notes.

### Role in the Pipeline

**Position:** Agent 1 (+ Gatekeeper in Step 0)  
**Input:** User's raw brain dump  
**Output:** Bulleted list of key points and action items  

**Two-Phase Operation:**

1. **Phase 0 - Ambiguity Check (HITL):**
   - Evaluates if input is too vague (e.g., "ideas", "help me")
   - If vague, formulates a clarifying question
   - If clear, gives the green light to proceed
   - **Model:** `gemini-2.5-flash`
   - **Output:** JSON: `{ isAmbiguous: boolean, question?: string }`

2. **Phase 1 - Extraction:**
   - Reads the (potentially clarified) input
   - Extracts raw facts, key points, and intended actions
   - No interpretation, just extraction
   - **Model:** `gemini-2.5-flash`
   - **Output:** Bulleted text list

### Example Behavior

**Input:** "I need to plan a project, maybe some marketing stuff and deadlines"

**Phase 0 Output:**
```json
{
  "isAmbiguous": true,
  "question": "What type of project are you planning? What are the main goals?"
}
```

**After clarification, Phase 1 Output:**
```
• Project planning required
• Marketing activities needed
• Deadlines must be established
• Timeline unclear
• Stakeholders not mentioned
```

### Technical Details

```typescript
// Ambiguity Check
export const checkAmbiguity = async (input: string): Promise<{
  isAmbiguous: boolean;
  question?: string;
}> => {
  // Uses JSON mode with schema validation
  // Returns structured decision
}

// Extraction
export const runListieAgent = async (input: string): Promise<string> => {
  // Extracts key points
  // Returns plain text bulleted list
}
```

</div>

---

## 🔗 Agent 2: Linky (The Connector)

<div style="color: #00E5B8;">

### Identity

**Full Name:** Linky  
**Role:** The Connector  
**Primary Color:** ![#00E5B8](https://via.placeholder.com/15/00E5B8/000000?text=+) `#00E5B8` (Bright Teal)  
**Highlight Color:** ![#4DEBB8](https://via.placeholder.com/15/4DEBB8/000000?text=+) `#4DEBB8`  
**Catchphrase:** *"Ooh, these connect!"*  
**Introduction:** *"Heya! I'm Linky!"*  

### Personality

Linky is curious, pattern-seeking, and excitable. He loves finding connections others miss. He's like a detective who sees the web of relationships between ideas—sometimes pointing out contradictions you didn't realize existed.

### Role in the Pipeline

**Position:** Agent 2  
**Input:** Listie's extracted key points  
**Output:** Identified relationships, patterns, themes, and contradictions  

**What Linky Does:**
- Finds how ideas relate to each other
- Identifies themes and patterns
- Spots contradictions or tensions
- Groups related concepts
- Highlights dependencies

### Example Behavior

**Input (from Listie):**
```
• Project planning required
• Marketing activities needed
• Deadlines must be established
• Budget constraints exist
• Team is understaffed
```

**Linky's Output:**
```
Connections & Patterns:
• Project planning DEPENDS ON knowing deadlines and budget
• Marketing activities are CONSTRAINED BY budget limitations
• Understaffing CONFLICTS WITH aggressive deadlines
• Theme: Resource constraints vs. ambitious goals
• Contradiction: Need for comprehensive marketing vs. limited team/budget
```

### Technical Details

```typescript
export const runLinkyAgent = async (input: string): Promise<string> => {
  // Prompt: Find relationships, contradictions, patterns
  // Input: Listie's output
  // Returns: Structured connection analysis
}
```

</div>

---

## 📖 Agent 3: Wordy (The Translator)

<div style="color: #FFD426;">

### Identity

**Full Name:** Wordy  
**Role:** The Translator  
**Primary Color:** ![#FFD426](https://via.placeholder.com/15/FFD426/000000?text=+) `#FFD426` (Golden Yellow)  
**Highlight Color:** ![#FFE566](https://via.placeholder.com/15/FFE566/000000?text=+) `#FFE566`  
**Catchphrase:** *"Let me rephrase that..."*  
**Introduction:** *"Greetings. I am Wordy."*  

### Personality

Wordy is articulate, patient, and pedantic in the best way. He takes complex or jargon-filled ideas and makes them clear. Think of him as a translator who speaks both "expert" and "human."

### Role in the Pipeline

**Position:** Agent 3  
**Input:** Linky's connection analysis  
**Output:** Clarified, simplified explanations of ideas and relationships  

**What Wordy Does:**
- Clarifies technical jargon
- Simplifies complex concepts
- Rephrases for clarity
- Makes implicit ideas explicit
- Ensures everyone can understand

### Example Behavior

**Input (from Linky):**
```
• Project planning DEPENDS ON knowing deadlines and budget
• Understaffing CONFLICTS WITH aggressive deadlines
• Theme: Resource constraints vs. ambitious goals
```

**Wordy's Output:**
```
Simplified Explanation:

Before you can plan this project effectively, you need two things locked down first: when it needs to be done, and how much money you have to spend.

There's a fundamental problem here: you want to move fast, but you don't have enough people to do the work. This creates a bottleneck.

The big picture: You have big ambitions, but not enough resources (time, money, people) to match those ambitions comfortably.
```

### Technical Details

```typescript
export const runWordyAgent = async (input: string): Promise<string> => {
  // Prompt: Clarify and simplify complex ideas
  // Input: Linky's output
  // Returns: Plain-language explanations
}
```

</div>

---

## 💥 Agent 4: Sparky (The Challenger)

<div style="color: #FF6B2C;">

### Identity

**Full Name:** Sparky  
**Role:** The Challenger  
**Primary Color:** ![#FF6B2C](https://via.placeholder.com/15/FF6B2C/000000?text=+) `#FF6B2C` (Fiery Orange)  
**Highlight Color:** ![#FF8F5A](https://via.placeholder.com/15/FF8F5A/000000?text=+) `#FF8F5A`  
**Catchphrase:** *"But what if...?"*  
**Introduction:** *"Yo! Name's Sparky."*  

### Personality

Sparky is skeptical, provocative, and sharp. He's the critical thinker who asks the tough questions. He challenges assumptions and identifies what's missing. He's not negative—he's thorough.

### Role in the Pipeline

**Position:** Agent 4  
**Input:** Wordy's clarified output  
**Output:** Critical analysis, assumptions identified, gaps highlighted, questions raised  

**What Sparky Does:**
- Identifies hidden assumptions
- Finds gaps in logic or information
- Asks challenging questions
- Points out risks
- Highlights what's NOT been said

### Example Behavior

**Input (from Wordy):**
```
Before you can plan this project effectively, you need deadlines and budget locked down first.
There's a fundamental problem: you want to move fast, but don't have enough people.
```

**Sparky's Output:**
```
Questions & Assumptions:

ASSUMPTION: The deadlines are negotiable. What if they're fixed?
ASSUMPTION: More people = faster project. What if it's a skill issue, not a numbers issue?

GAPS:
• Who decides the budget? Is it flexible?
• What happens if you miss the deadline?
• Have you considered outsourcing or contractors?
• Is scope reduction an option?

RISKS:
• Quality might suffer if you rush with limited staff
• Budget might balloon if you hire quickly
• Team burnout is likely with aggressive timelines

What if you adjusted expectations instead of stretching resources?
```

### Technical Details

```typescript
export const runSparkyAgent = async (input: string): Promise<string> => {
  // Prompt: Challenge assumptions, find gaps, ask questions
  // Input: Wordy's output
  // Returns: Critical analysis with questions
}
```

</div>

---

## 🎯 Agent 5: Blendy (The Synthesizer)

<div style="color: #7B5CFF;">

### Identity

**Full Name:** Blendy  
**Role:** The Synthesizer  
**Primary Color:** ![#7B5CFF](https://via.placeholder.com/15/7B5CFF/000000?text=+) `#7B5CFF` (Royal Purple)  
**Highlight Color:** ![#9F85FF](https://via.placeholder.com/15/9F85FF/000000?text=+) `#9F85FF`  
**Catchphrase:** *"Aha! I see it now!"*  
**Introduction:** *"Hello. I am Blendy."*  

### Personality

Blendy is wise, integrative, and holistic. They take everything the other agents discovered and weave it into a coherent, actionable narrative. Blendy is the conductor of this orchestra.

### Role in the Pipeline

**Position:** Agent 5 (Final)  
**Input:** All previous agents' outputs (Listie, Linky, Wordy, Sparky)  
**Output:** Final interpretation + key points (JSON)  

**What Blendy Does:**
- Synthesizes all perspectives
- Creates a coherent narrative
- Extracts actionable insights
- Balances optimism with realism
- Delivers the final interpretation

### Example Behavior

**Input:** All previous agents' analyses

**Blendy's Output:**
```json
{
  "interpretation": "You're facing a classic project management triangle problem: ambitious goals, tight timelines, and limited resources. Here's what's really happening: You need to launch a marketing initiative as part of a larger project, but you're understaffed and budget-constrained. Before moving forward, you must lock down concrete deadlines and budget figures—everything else depends on these. The elephant in the room is that your current resources don't match your timeline. You have three realistic paths: (1) Reduce scope/expectations, (2) Extend timeline, or (3) Increase budget for contractors. Sparky's right to question if this is a quantity or quality issue—maybe you need specialists, not just more bodies. The smartest next step? Sit down with stakeholders, present the resource-timeline-scope triangle, and negotiate which side gives. Without this conversation, you're setting yourself up for burnout and disappointment.",
  
  "keyPoints": [
    "Lock down deadlines and budget immediately—they're blockers",
    "Current resources don't match timeline ambitions",
    "Three paths: reduce scope, extend time, or increase budget",
    "Consider specialists over quantity in hiring",
    "Have a hard conversation with stakeholders about trade-offs"
  ]
}
```

### Technical Details

```typescript
export const runBlendyAgent = async (
  originalInput: string,
  listieOutput: string,
  linkyOutput: string,
  wordyOutput: string,
  sparkyOutput: string
): Promise<BrainDumpResult> => {
  // Prompt: Synthesize all perspectives into final interpretation
  // Input: All 4 previous agents
  // Returns: JSON with interpretation and key points
  // Uses JSON mode with strict schema
}
```

**Return Type:**
```typescript
interface BrainDumpResult {
  interpretation: string;  // The main synthesis
  keyPoints: string[];     // 3-7 actionable points
}
```

</div>

---

## Agent Pipeline Visualization

```
User Input: "I have a project with marketing and deadlines"
    ↓
┌─────────────────────────────────────────────────────┐
│ Listie (Ambiguity Check)                            │
│ "What type of project? What are the main goals?"    │
└─────────────────────────────────────────────────────┘
    ↓ (User clarifies)
┌─────────────────────────────────────────────────────┐
│ Listie (Extraction)                                  │
│ • Project planning                                   │
│ • Marketing needed                                   │
│ • Deadlines required                                 │
└─────────────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────────────┐
│ Linky (Connections)                                  │
│ • Planning depends on deadlines                      │
│ • Resource constraints conflict                      │
└─────────────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────────────┐
│ Wordy (Clarification)                                │
│ "You need deadlines and budget locked down first..." │
└─────────────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────────────┐
│ Sparky (Challenge)                                   │
│ "What if deadlines are fixed? Have you considered   │
│  outsourcing? Is scope reduction an option?"         │
└─────────────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────────────┐
│ Blendy (Synthesis)                                   │
│ "You're facing a project management triangle         │
│  problem. Here are your three realistic paths..."    │
└─────────────────────────────────────────────────────┘
```

---

## Agent Characteristics Comparison

| Agent    | Tone          | Focus                  | Thinking Style     |
|----------|---------------|------------------------|--------------------|
| Listie   | Enthusiastic  | Facts & Actions        | Extractive         |
| Linky    | Curious       | Patterns & Relations   | Connective         |
| Wordy    | Patient       | Clarity & Simplicity   | Explanatory        |
| Sparky   | Skeptical     | Gaps & Assumptions     | Critical           |
| Blendy   | Wise          | Synthesis & Action     | Integrative        |

---

## Color Palette Summary

```css
/* Agent Colors */
--listie-primary: #FF3366;
--listie-highlight: #FF6B8A;

--linky-primary: #00E5B8;
--linky-highlight: #4DEBB8;

--wordy-primary: #FFD426;
--wordy-highlight: #FFE566;

--sparky-primary: #FF6B2C;
--sparky-highlight: #FF8F5A;

--blendy-primary: #7B5CFF;
--blendy-highlight: #9F85FF;
```

---

## Technical Implementation

### Agent Configuration

All agents are defined in `constants.ts`:

```typescript
export const AGENTS: Record<AgentId, AgentConfig> = {
  listie: { /* config */ },
  linky: { /* config */ },
  wordy: { /* config */ },
  sparky: { /* config */ },
  blendy: { /* config */ }
};

export const AGENT_ORDER: AgentId[] = ['listie', 'linky', 'wordy', 'sparky', 'blendy'];
```

### Service Functions

Each agent has a dedicated function in `services/geminiService.ts`:

- `checkAmbiguity()` - Listie's HITL check
- `runListieAgent()` - Listie's extraction
- `runLinkyAgent()` - Linky's connections
- `runWordyAgent()` - Wordy's clarification
- `runSparkyAgent()` - Sparky's challenge
- `runBlendyAgent()` - Blendy's synthesis

### Processing Flow

```typescript
// In App.tsx
const processInput = async () => {
  // 1. Ambiguity check
  const ambiguityCheck = await checkAmbiguity(input);
  if (ambiguityCheck.isAmbiguous) {
    showModal(ambiguityCheck.question);
    return;
  }
  
  // 2. Run agents sequentially
  const listieOutput = await runListieAgent(input);
  const linkyOutput = await runLinkyAgent(listieOutput);
  const wordyOutput = await runWordyAgent(linkyOutput);
  const sparkyOutput = await runSparkyAgent(wordyOutput);
  const result = await runBlendyAgent(input, listieOutput, linkyOutput, wordyOutput, sparkyOutput);
  
  // 3. Display result
  setResult(result);
};
```

---

## Conversational Refinement

After the initial pipeline completes, users can ask follow-up questions. This uses a special refinement function:

```typescript
export const refineResult = async (
  chatHistory: ConversationMessage[],
  userQuestion: string
): Promise<BrainDumpResult> => {
  // Uses full conversation context
  // Returns updated interpretation and key points
}
```

This allows the system to iterate on results based on user feedback, making it truly conversational.

---

## Design Principles

1. **Sequential Processing:** Each agent builds on the previous (no parallel branching)
2. **Distinct Personalities:** Each agent has a clear voice and role
3. **Visual Identity:** Colors and catchphrases make agents memorable
4. **Transparency:** Users see each agent "thinking" in the UI
5. **Human-in-the-Loop:** Listie's ambiguity check ensures quality input

---

## Future Enhancements

Potential improvements to the agent system:

- **Agent Debates:** Allow Linky and Sparky to "discuss" conflicting points
- **User-Selected Agents:** Let users choose which agents to run
- **Agent Specializations:** Domain-specific variants (e.g., Technical Sparky, Creative Blendy)
- **Agent Memory:** Remember patterns from previous sessions
- **Parallel Processing:** Run non-dependent agents simultaneously for speed

---

For technical architecture details, see [ARCHITECTURE.md](./ARCHITECTURE.md).  
For design system details, see [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md).
