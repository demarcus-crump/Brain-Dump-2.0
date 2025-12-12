
export interface BrainDumpResult {
  interpretation: string;
  keyPoints: string[];
  clarityScore: number;
  badges: string[];
}

export type AgentId = 'listie' | 'linky' | 'wordy' | 'sparky' | 'blendy';

export interface AgentConfig {
  id: AgentId;
  name: string;
  role: string;
  color: string;
  highlight: string;
  catchphrase: string;
  description: string;
  introduction: string;
}

export enum AppState {
  IDLE = 'IDLE',
  INPUT = 'INPUT',
  AMBIGUITY_CHECK = 'AMBIGUITY_CHECK',
  PROCESSING = 'PROCESSING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}

export interface ProcessingStep {
  agentId: AgentId;
  status: 'waiting' | 'active' | 'complete';
  message?: string;
}

export interface ConversationMessage {
  role: 'user' | 'agent' | 'system';
  type?: 'message' | 'update'; 
  agentId?: AgentId; // If role is agent
  text: string;
  timestamp: number;
}
