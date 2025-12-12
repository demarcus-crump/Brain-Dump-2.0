
import { AgentConfig, AgentId } from './types';

export const AGENTS: Record<AgentId, AgentConfig> = {
  listie: {
    id: 'listie',
    name: 'Listie',
    role: 'The Decoder',
    color: '#FF3366',
    highlight: '#FF6B8A',
    catchphrase: "Separating Data from Instructions...",
    description: "Separates your raw context/backstory from the actions you actually need to take.",
    introduction: "Hi, I'm Listie! I separate your Data from Instructions."
  },
  linky: {
    id: 'linky',
    name: 'Linky',
    role: 'The Signal Detector',
    color: '#00E5B8',
    highlight: '#4DEBB8',
    catchphrase: "Finding the Signal in the Noise...",
    description: "Finds the recurring patterns and 'majority votes' hidden in your messy thoughts.",
    introduction: "Hey there, I'm Linky. I find the Signal in the Noise."
  },
  wordy: {
    id: 'wordy',
    name: 'Wordy',
    role: 'The Observer',
    color: '#FFD426',
    highlight: '#FFE566',
    catchphrase: "Collapsing possibilities...",
    description: "Collapses vague 'maybe-land' possibilities into concrete 'actual-land' realities.",
    introduction: "Greetings. I am Wordy. I collapse Possibilities into Reality."
  },
  sparky: {
    id: 'sparky',
    name: 'Sparky',
    role: 'The Game Theorist',
    color: '#FF6B2C',
    highlight: '#FF8F5A',
    catchphrase: "Revealing the concealed...",
    description: "Analyzes the strategy: What are you revealing versus what are you bluffing/concealing?",
    introduction: "Yo, I'm Sparky! I see exactly what you're Bluffing."
  },
  blendy: {
    id: 'blendy',
    name: 'Blendy',
    role: 'The Architect',
    color: '#7B5CFF',
    highlight: '#9F85FF',
    catchphrase: "System compiled.",
    description: "Synthesizes all the insights into a reliable, improved system for your life.",
    introduction: "System Online. I am Blendy, your Architect."
  }
};

export const AGENT_ORDER: AgentId[] = ['listie', 'linky', 'wordy', 'sparky', 'blendy'];
