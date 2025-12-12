
import { AgentConfig, AgentId } from './types';

export const AGENTS: Record<AgentId, AgentConfig> = {
  listie: {
    id: 'listie',
    name: 'Listie',
    role: 'The Decoder',
    color: '#FF3366',
    highlight: '#FF6B8A',
    catchphrase: "Separating Data from Instructions...",
    description: "Separates raw data from actionable instructions (Von Neumann Puzzle 2).",
    introduction: "Hi, I'm Listie! I separate your Data from Instructions."
  },
  linky: {
    id: 'linky',
    name: 'Linky',
    role: 'The Signal Detector',
    color: '#00E5B8',
    highlight: '#4DEBB8',
    catchphrase: "Finding the Signal in the Noise...",
    description: "Identifies the 'Redundant Majority Vote' to find truth (Von Neumann Puzzle 5).",
    introduction: "Hey there, I'm Linky. I find the Signal in the Noise."
  },
  wordy: {
    id: 'wordy',
    name: 'Wordy',
    role: 'The Observer',
    color: '#FFD426',
    highlight: '#FFE566',
    catchphrase: "Collapsing possibilities...",
    description: "Turns 'Maybe-land' possibilities into 'Actual-land' facts (Von Neumann Puzzle 4).",
    introduction: "Greetings. I am Wordy. I collapse Possibilities into Reality."
  },
  sparky: {
    id: 'sparky',
    name: 'Sparky',
    role: 'The Game Theorist',
    color: '#FF6B2C',
    highlight: '#FF8F5A',
    catchphrase: "Revealing the concealed...",
    description: "Analyzes the bet: What are you revealing vs. concealing? (Von Neumann Puzzle 3).",
    introduction: "Yo, I'm Sparky! I see exactly what you're Bluffing."
  },
  blendy: {
    id: 'blendy',
    name: 'Blendy',
    role: 'The Architect',
    color: '#7B5CFF',
    highlight: '#9F85FF',
    catchphrase: "System compiled.",
    description: "Synthesizes the distinct uses into a reliable system.",
    introduction: "System Online. I am Blendy, your Architect."
  }
};

export const AGENT_ORDER: AgentId[] = ['listie', 'linky', 'wordy', 'sparky', 'blendy'];
