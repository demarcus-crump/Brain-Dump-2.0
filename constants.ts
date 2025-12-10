
import { AgentConfig, AgentId } from './types';

export const AGENTS: Record<AgentId, AgentConfig> = {
  listie: {
    id: 'listie',
    name: 'Listie',
    role: 'The Listener',
    color: '#FF3366',
    highlight: '#FF6B8A',
    catchphrase: "I hear something good!",
    description: "Extracts key points and action items.",
    introduction: "Hi! I'm Listie!"
  },
  linky: {
    id: 'linky',
    name: 'Linky',
    role: 'The Connector',
    color: '#00E5B8',
    highlight: '#4DEBB8',
    catchphrase: "Ooh, these connect!",
    description: "Finds relationships and contradictions.",
    introduction: "Heya! I'm Linky!"
  },
  wordy: {
    id: 'wordy',
    name: 'Wordy',
    role: 'The Translator',
    color: '#FFD426',
    highlight: '#FFE566',
    catchphrase: "Let me rephrase that...",
    description: "Clarifies language and simplifies concepts.",
    introduction: "Greetings. I am Wordy."
  },
  sparky: {
    id: 'sparky',
    name: 'Sparky',
    role: 'The Challenger',
    color: '#FF6B2C',
    highlight: '#FF8F5A',
    catchphrase: "But what if...?",
    description: "Identifies assumptions and gaps.",
    introduction: "Yo! Name's Sparky."
  },
  blendy: {
    id: 'blendy',
    name: 'Blendy',
    role: 'The Synthesizer',
    color: '#7B5CFF',
    highlight: '#9F85FF',
    catchphrase: "Aha! I see it now!",
    description: "Creates the final interpretation.",
    introduction: "Hello. I am Blendy."
  }
};

export const AGENT_ORDER: AgentId[] = ['listie', 'linky', 'wordy', 'sparky', 'blendy'];
