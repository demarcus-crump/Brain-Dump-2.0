# Architecture Documentation

## System Overview

Brain Dump 2.0 is a React-based single-page application that orchestrates multiple AI agents to process and interpret user input. The system follows a sequential pipeline architecture where each agent builds upon the work of previous agents, culminating in a synthesized interpretation.

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        User Interface                       │
│  (React 19 + Framer Motion + Custom Components)            │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    Application State                        │
│  (React State + AppState Enum + Result Management)         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  Gemini Service Layer                       │
│  (API Abstraction + Agent Orchestration)                    │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Google Gemini 2.5 Flash API                    │
│  (AI Processing Engine)                                     │
└─────────────────────────────────────────────────────────────┘
```

## Application State Machine

The application follows a strict state machine pattern defined by the `AppState` enum:

```typescript
enum AppState {
  IDLE = 'IDLE',                    // Initial state, showing hero/intro
  INPUT = 'INPUT',                  // User is entering their brain dump
  AMBIGUITY_CHECK = 'AMBIGUITY_CHECK', // Checking if input is too vague
  PROCESSING = 'PROCESSING',        // Running through the 5-agent pipeline
  RESULT = 'RESULT',                // Displaying results + conversation
  ERROR = 'ERROR'                   // Error state
}
```

### State Transitions

```
IDLE
  ↓ (User scrolls/clicks "Start")
INPUT
  ↓ (User submits input)
AMBIGUITY_CHECK
  ├─ (Input is vague) → Shows clarification modal → INPUT
  └─ (Input is clear) → PROCESSING
      ↓
      ↓ (All agents complete)
      ↓
RESULT
  ↓ (User asks follow-up)
  └─→ Brief processing → Updated RESULT
```

## The 5-Agent Pipeline

### Overview

The pipeline is a sequential process where each agent has a specific role and builds on the previous agent's output. All agents use the Google Gemini 2.5 Flash model for processing.

### Pipeline Flow

```
User Input
    ↓
┌───────────────────────────┐
│ Step 0: Ambiguity Check   │
│ Agent: Listie (Pre-check) │
│ Model: gemini-2.5-flash   │
│ Output: JSON              │
└────────────┬──────────────┘
             │
     [Is Vague?] ──Yes──→ Ask clarifying question → User provides more context
             │
            No
             ↓
┌───────────────────────────┐
│ Step 1: The Listener      │
│ Agent: Listie             │
│ Model: gemini-2.5-flash   │
│ Task: Extract key points  │
│ Output: Bulleted list     │
└────────────┬──────────────┘
             ↓
┌───────────────────────────┐
│ Step 2: The Connector     │
│ Agent: Linky              │
│ Model: gemini-2.5-flash   │
│ Task: Find relationships  │
│ Input: Listie's output    │
│ Output: Connections list  │
└────────────┬──────────────┘
             ↓
┌───────────────────────────┐
│ Step 3: The Translator    │
│ Agent: Wordy              │
│ Model: gemini-2.5-flash   │
│ Task: Clarify language    │
│ Input: Linky's output     │
│ Output: Simplified text   │
└────────────┬──────────────┘
             ↓
┌───────────────────────────┐
│ Step 4: The Challenger    │
│ Agent: Sparky             │
│ Model: gemini-2.5-flash   │
│ Task: Question assumptions│
│ Input: Wordy's output     │
│ Output: Critical analysis │
└────────────┬──────────────┘
             ↓
┌───────────────────────────┐
│ Step 5: The Synthesizer   │
│ Agent: Blendy             │
│ Model: gemini-2.5-flash   │
│ Task: Create final interp.│
│ Input: All previous agents│
│ Output: JSON result       │
└────────────┬──────────────┘
             ↓
        Final Result
        (interpretation + key points)
```

### Agent Details

#### Agent 0: Listie (Gatekeeper)
**Purpose:** Human-in-the-Loop (HITL) pre-processing  
**Model:** `gemini-2.5-flash`  
**Input:** Raw user input  
**Output:** JSON: `{ isAmbiguous: boolean, question?: string }`  
**Behavior:** Evaluates if the input is too vague (e.g., "ideas", "work stuff") and asks clarifying questions if needed.

#### Agent 1: Listie (The Listener)
**Purpose:** Extract raw facts and action items  
**Model:** `gemini-2.5-flash`  
**Input:** User's brain dump (potentially clarified)  
**Output:** Bulleted list of key points  
**Focus:** Direct, concise extraction without interpretation

#### Agent 2: Linky (The Connector)
**Purpose:** Identify relationships and patterns  
**Model:** `gemini-2.5-flash`  
**Input:** Listie's extracted points  
**Output:** Connections, contradictions, themes  
**Focus:** Finding how ideas relate to each other

#### Agent 3: Wordy (The Translator)
**Purpose:** Clarify and simplify  
**Model:** `gemini-2.5-flash`  
**Input:** Linky's relationship analysis  
**Output:** Clear, simplified explanations  
**Focus:** Making complex ideas accessible

#### Agent 4: Sparky (The Challenger)
**Purpose:** Critical thinking and gap analysis  
**Model:** `gemini-2.5-flash`  
**Input:** Wordy's clarified output  
**Output:** Questions, assumptions, missing information  
**Focus:** Identifying what's not said or assumed

#### Agent 5: Blendy (The Synthesizer)
**Purpose:** Create final interpretation  
**Model:** `gemini-2.5-flash`  
**Input:** All previous agents' outputs  
**Output:** JSON: `{ interpretation: string, keyPoints: string[] }`  
**Focus:** Weaving everything into a coherent, actionable result

## Component Architecture

### Core Components

```
App.tsx (Root)
├── CustomCursor
├── KineticLogo (Hero Section)
├── InputSection
├── AmbiguityModal
├── ProcessingTheater
│   ├── ProcessingBackground
│   ├── AgentDisplay (x5 agents)
│   └── TypewriterText
└── ResultReveal
    ├── Confetti
    ├── MagneticButton
    └── Conversation Interface
```

### Component Responsibilities

#### **App.tsx**
- Central state management
- Orchestrates the entire flow
- Manages agent processing pipeline
- Handles scrolling and parallax effects
- Coordinates component visibility based on AppState

#### **InputSection**
- Accepts user's brain dump
- Validates input (minimum length)
- Triggers ambiguity check
- Manages textarea state

#### **AmbiguityModal**
- Displays HITL clarification questions
- Collects additional user context
- Combines original + clarified input
- Animated entrance/exit

#### **ProcessingTheater**
- Shows all 5 agents in sequence
- Animates agent "thinking" states
- Displays typewriter text for each agent
- Progress indication with colors

#### **ResultReveal**
- Displays final interpretation
- Shows key points as a list
- Enables conversational refinement
- Manages chat history
- Confetti celebration on reveal

#### **CustomCursor**
- Global cursor replacement
- Magnetic attraction to interactive elements
- Smooth animations
- Hover state feedback

#### **KineticLogo**
- Animated brand logo
- Parallax scrolling effects
- Bouncing/pulsing animations
- Hero section focal point

### Service Layer

#### **geminiService.ts**

The service layer abstracts all Gemini API interactions:

```typescript
// Functions exported:
- checkAmbiguity(input: string): Promise<{isAmbiguous, question}>
- runListieAgent(input: string): Promise<string>
- runLinkyAgent(input: string): Promise<string>
- runWordyAgent(input: string): Promise<string>
- runSparkyAgent(input: string): Promise<string>
- runBlendyAgent(...allAgentOutputs): Promise<BrainDumpResult>
- refineResult(chatHistory, userQuestion): Promise<BrainDumpResult>
```

**Key Features:**
- Centralized API key management
- Error handling with fallback responses
- JSON schema validation for structured outputs
- Sequential agent orchestration
- Context management for refinement

## State Management

### Local Component State

Most state is managed in the root `App.tsx` using React hooks:

```typescript
// Core App State
const [appState, setAppState] = useState<AppState>(AppState.IDLE);
const [result, setResult] = useState<BrainDumpResult | null>(null);
const [currentProcessingAgent, setCurrentProcessingAgent] = useState<AgentId>('listie');

// HITL & Conversation
const [ambiguityQuestion, setAmbiguityQuestion] = useState<string | null>(null);
const [originalInput, setOriginalInput] = useState<string>('');
const [chatHistory, setChatHistory] = useState<ConversationMessage[]>([]);
const [isRefining, setIsRefining] = useState(false);

// UI Interactions
const [hoveredAgentFooter, setHoveredAgentFooter] = useState<AgentId | null>(null);
```

### Data Flow

```
User Action
    ↓
State Update (setState)
    ↓
Component Re-render
    ↓
Conditional Rendering based on AppState
    ↓
API Call (if needed)
    ↓
State Update with Result
    ↓
UI Reflects New State
```

## API Integration

### Gemini API Configuration

```typescript
const getAI = () => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};
```

### Request Structure

All agents use a similar structure:

```typescript
const ai = getAI();
const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: `[Agent-specific prompt]`,
  config: {
    responseMimeType: "application/json", // For structured outputs
    responseSchema: { /* JSON schema */ }
  }
});
```

### Error Handling

- Missing API key throws immediately
- Failed API calls return fallback text
- User is notified via UI state
- Error state prevents further progression

## Performance Considerations

### Optimizations

1. **Sequential Processing:** Agents run one at a time to maintain context and reduce API load
2. **Lazy Rendering:** Components only render when their state is active
3. **Framer Motion:** Uses GPU-accelerated animations
4. **Minimal Re-renders:** State updates are localized to necessary components

### API Usage

- All agents use `gemini-2.5-flash` (fastest model)
- Structured outputs reduce parsing overhead
- Single API key shared across all requests
- No caching (each input is unique)

## Security Considerations

### API Key Management

- API key stored in environment variable
- Never exposed to client-side code (via Vite's `process.env`)
- Not committed to version control
- Must be set in `.env.local` before running

### Input Validation

- Minimum character length enforced (10 chars)
- No special sanitization (Gemini handles safely)
- User cannot inject malicious prompts into agent logic

### Error Messages

- Generic error messages to avoid leaking system details
- No raw API errors displayed to users

## Scalability Considerations

### Current Limitations

- Sequential processing (5+ API calls per request)
- No caching or session persistence
- No rate limiting on user side
- No conversation history persistence

### Future Enhancements

- Parallel agent processing (non-sequential agents)
- Result caching for similar inputs
- User accounts with history
- Real-time streaming responses
- Agent result comparison view

## Technologies Deep Dive

### React 19
- Latest features and performance improvements
- Functional components with hooks
- No class components

### TypeScript 5.8
- Strong typing throughout
- Custom types in `types.ts`
- Interface-driven development

### Framer Motion 12
- Declarative animations
- Scroll-linked animations (parallax)
- Page transitions
- Component animations

### Vite 6.2
- Fast HMR (Hot Module Replacement)
- Optimized builds
- Environment variable handling

### Google Gemini AI
- `@google/genai` SDK
- Gemini 2.5 Flash model
- JSON mode for structured outputs
- Streaming support (not used)

## Development Workflow

### Local Development

1. Changes to components hot-reload instantly
2. API calls require a valid Gemini API key
3. TypeScript compilation happens in real-time
4. Vite dev server runs on `localhost:5173`

### Build Process

```bash
npm run build
```

Outputs to `/dist`:
- Bundled JavaScript
- Optimized CSS
- Index HTML
- Assets

### Deployment

The app is deployed to Google AI Studio but can be deployed anywhere:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting

## Debugging Tips

### Common Issues

1. **Missing API Key:** Check `.env.local` exists and has correct key
2. **Slow Processing:** Network or API rate limits
3. **Agents Not Appearing:** Check agent order in `constants.ts`
4. **Styling Issues:** Verify Tailwind classes and inline styles

### Useful Debug Logs

The service layer includes console logs for each agent:
```typescript
console.log('Agent output:', response.text);
```

### State Inspection

Use React DevTools to inspect:
- Current `appState`
- `result` object
- `chatHistory` array
- Agent processing state

---

## Conclusion

Brain Dump 2.0 demonstrates a sophisticated yet maintainable architecture for multi-agent AI orchestration. The sequential pipeline, strong typing, and component-based structure make it easy to understand, extend, and showcase as a portfolio project.

For more details on individual agents, see [AGENTS.md](./AGENTS.md).  
For design system details, see [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md).
