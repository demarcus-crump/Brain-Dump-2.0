
import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { AppState, BrainDumpResult, AgentId, ConversationMessage } from './types';
import { 
  runListieAgent, 
  runLinkyAgent, 
  runWordyAgent, 
  runSparkyAgent, 
  runBlendyAgent,
  checkAmbiguity,
  refineResult
} from './services/geminiService';
import CustomCursor from './components/CustomCursor';
import AgentDisplay from './components/AgentDisplay';
import InputSection from './components/InputSection';
import ProcessingTheater from './components/ProcessingTheater';
import ResultReveal from './components/ResultReveal';
import KineticLogo from './components/KineticLogo';
import AmbiguityModal from './components/AmbiguityModal';
import { ArrowDown } from 'lucide-react';
import { AGENTS, AGENT_ORDER } from './constants';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [result, setResult] = useState<BrainDumpResult | null>(null);
  const [currentProcessingAgent, setCurrentProcessingAgent] = useState<AgentId>('listie');
  
  // State for HITL & Conversation
  const [ambiguityQuestion, setAmbiguityQuestion] = useState<string | null>(null);
  const [originalInput, setOriginalInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ConversationMessage[]>([]);
  const [isRefining, setIsRefining] = useState(false);
  
  // State for Footer Interactions
  const [hoveredAgentFooter, setHoveredAgentFooter] = useState<AgentId | null>(null);

  // Scroll hooks for Parallax
  const { scrollY } = useScroll();
  
  // Parallax Values - TUNED FOR BETTER SEPARATION
  const yLogo = useTransform(scrollY, [0, 500], [0, 200]); 
  
  // Tagline: Moves slower (parallax) and fades out faster
  const yTagline = useTransform(scrollY, [0, 400], [0, 200]); 
  const opacityTagline = useTransform(scrollY, [0, 200], [1, 0]);

  // Scroll CTA: Moves significantly faster to drop off screen and fades immediately
  const yScrollCTA = useTransform(scrollY, [0, 200], [0, 150]);
  const opacityScrollCTA = useTransform(scrollY, [0, 100], [1, 0]);
  
  // Floating Symbols Parallax (Drifting at different speeds)
  const ySym1 = useTransform(scrollY, [0, 500], [0, -150]); 
  const ySym2 = useTransform(scrollY, [0, 500], [0, -50]); 
  const ySym3 = useTransform(scrollY, [0, 500], [0, -200]);
  const ySym4 = useTransform(scrollY, [0, 500], [0, -100]);
  const ySym5 = useTransform(scrollY, [0, 500], [0, -250]);

  // 1. Initial Start
  const startProcess = async (text: string) => {
    if (!text.trim()) return;
    setOriginalInput(text);
    
    // HITL: Check Ambiguity First
    setAppState(AppState.AMBIGUITY_CHECK);
    try {
        const ambiguityCheck = await checkAmbiguity(text);
        if (ambiguityCheck.isAmbiguous && ambiguityCheck.question) {
            setAmbiguityQuestion(ambiguityCheck.question);
            // Stay in AMBIGUITY_CHECK state to show modal
        } else {
            // It's clear, proceed to full run
            runFullPipeline(text);
        }
    } catch (e) {
        // Fallback if check fails
        runFullPipeline(text);
    }
  };

  // 2. Handle Ambiguity Answer
  const handleClarification = (clarification: string) => {
      // Merge original input with clarification
      const combinedInput = `${originalInput}\n\n(User Clarification: ${clarification})`;
      setOriginalInput(combinedInput);
      setAmbiguityQuestion(null);
      runFullPipeline(combinedInput);
  };

  // 3. The 5-Agent Pipeline
  const runFullPipeline = async (text: string) => {
    setAppState(AppState.PROCESSING);
    setCurrentProcessingAgent('listie');
    
    try {
      // 1. LISTIE (Decoder)
      const listieOut = await runListieAgent(text);
      setCurrentProcessingAgent('linky');

      // 2. LINKY (Signal Detector)
      const linkyOut = await runLinkyAgent(text, listieOut);
      setCurrentProcessingAgent('wordy');

      // 3. WORDY (Observer)
      const wordyOut = await runWordyAgent(text);
      setCurrentProcessingAgent('sparky');

      // 4. SPARKY (Game Theorist)
      const sparkyOut = await runSparkyAgent(listieOut, wordyOut);
      setCurrentProcessingAgent('blendy');

      // 5. BLENDY (Architect)
      const finalResult = await runBlendyAgent(text, listieOut, linkyOut, wordyOut, sparkyOut);
      
      setTimeout(() => {
        setResult(finalResult);
        setAppState(AppState.RESULT);
      }, 2000);

    } catch (error) {
      console.error("Orchestration failed", error);
      setAppState(AppState.ERROR);
    }
  };

  // 4. Conversational Refinement (HITL Post-Result)
  const handleRefinement = async (userMessage: string) => {
      if (!result) return;
      
      const newUserMsg: ConversationMessage = {
          role: 'user',
          type: 'message',
          text: userMessage,
          timestamp: Date.now()
      };
      
      setChatHistory(prev => [...prev, newUserMsg]);
      setIsRefining(true);

      try {
          const { result: newResult, reply } = await refineResult(result, [...chatHistory, newUserMsg], originalInput);
          
          const newMessages: ConversationMessage[] = [];

          // 1. Did the agent update the result?
          if (newResult) {
            setResult(newResult);
            newMessages.push({
              role: 'system',
              type: 'update',
              text: 'Plan Updated',
              timestamp: Date.now()
            });
          }

          // 2. Agent Reply
          newMessages.push({
              role: 'agent',
              agentId: 'blendy',
              type: 'message',
              text: reply,
              timestamp: Date.now() + 50
          });

          setChatHistory(prev => [...prev, ...newMessages]);
      } catch (e) {
          console.error("Refinement failed", e);
      } finally {
          setIsRefining(false);
      }
  };

  const resetApp = () => {
    setResult(null);
    setAppState(AppState.IDLE);
    setAmbiguityQuestion(null);
    setChatHistory([]);
    setOriginalInput('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-bg-deep font-body selection:bg-agent-blendy selection:text-white overflow-x-hidden leading-relaxed">
      <div className="noise-overlay" /> {/* Cinematic Grain */}
      <CustomCursor />
      
      {/* HEADER / HERO */}
      <header className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden p-6 text-center perspective-1000">
        {/* Background Blobs (Atmosphere) */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-agent-listie rounded-full blur-[100px] animate-blob-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-agent-blendy rounded-full blur-[100px] animate-blob-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Kinetic Logo with Parallax */}
        <motion.div style={{ y: yLogo }} className="relative z-10">
          <KineticLogo />
        </motion.div>

        <motion.p 
          style={{ y: yTagline, opacity: opacityTagline }}
          className="relative z-10 mt-6 text-xl md:text-2xl text-text-secondary font-bold tracking-wide max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          You spill it. We distill it.
        </motion.p>

        {/* Floating "Messy Thought" Symbols with Parallax */}
        <div className="absolute inset-0 pointer-events-none z-0">
          
          {/* Top Left: Question Mark */}
          <motion.div 
            style={{ y: ySym1 }} 
            className="absolute top-[15%] left-[10%] text-6xl md:text-8xl font-display text-agent-sparky opacity-40 rotate-[-15deg]"
            animate={{ rotate: [-15, -25, -15], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            ?
          </motion.div>
          
          {/* Top Right: Interrobang */}
          <motion.div 
            style={{ y: ySym2 }} 
            className="absolute top-[20%] right-[15%] text-5xl md:text-7xl font-display text-agent-listie opacity-30 rotate-[10deg]"
            animate={{ rotate: [10, 20, 10], y: [0, -20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            ?!
          </motion.div>
          
          {/* Bottom Left: Logic Not Equal */}
          <motion.div 
            style={{ y: ySym3 }} 
            className="absolute bottom-[30%] left-[5%] text-7xl md:text-9xl font-display text-agent-wordy opacity-20 rotate-[5deg]"
            animate={{ rotate: [5, -5, 5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            ≠
          </motion.div>

          {/* Bottom Right: Ellipsis/Blob */}
          <motion.div 
            style={{ y: ySym4 }} 
            className="absolute bottom-[25%] right-[5%] text-6xl md:text-8xl font-display text-agent-linky opacity-30 rotate-[-10deg]"
            animate={{ scale: [1, 0.9, 1], rotate: [-10, 0, -10] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            ...
          </motion.div>

           {/* Center/Random: Asterisk */}
           <motion.div 
            style={{ y: ySym5 }} 
            className="absolute top-[35%] left-[70%] text-4xl md:text-6xl font-display text-agent-blendy opacity-25"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            *
          </motion.div>
        </div>

        {/* Scroll CTA - Centered via left-0 right-0 + Parallax Fade Out */}
        <motion.div 
          style={{ y: yScrollCTA, opacity: opacityScrollCTA }}
          className="absolute bottom-10 left-0 right-0 mx-auto w-fit z-10"
        >
          <motion.div 
            className="text-text-muted flex flex-col items-center gap-2 cursor-pointer interactive"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1.5, repeat: Infinity, duration: 2 }}
            onClick={() => document.getElementById('input-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="text-sm font-bold uppercase tracking-widest hover:text-white transition-colors">Scroll to dump</span>
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </header>

      {/* INPUT SECTION */}
      {/* Contains Listie (Left) and Blendy (Right) */}
      <InputSection 
        onDump={startProcess} 
        isProcessing={appState === AppState.PROCESSING || appState === AppState.AMBIGUITY_CHECK} 
      />

      {/* AMBIGUITY MODAL (HITL) */}
      <AnimatePresence>
        {appState === AppState.AMBIGUITY_CHECK && ambiguityQuestion && (
            <AmbiguityModal 
                question={ambiguityQuestion}
                onAnswer={handleClarification}
            />
        )}
      </AnimatePresence>

      {/* PROCESSING THEATER OVERLAY */}
      <AnimatePresence>
        {appState === AppState.PROCESSING && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
          >
            {/* The theater now just reflects the current agent state from App.tsx */}
            <ProcessingTheater currentAgentId={currentProcessingAgent} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* RESULT SECTION + CONVERSATION */}
      <AnimatePresence>
        {appState === AppState.RESULT && result && (
          <div className="fixed inset-0 z-40 bg-bg-deep overflow-y-auto">
            <ResultReveal 
                result={result} 
                onReset={resetApp} 
                onRefine={handleRefinement}
                chatHistory={chatHistory}
                isRefining={isRefining}
            />
          </div>
        )}
      </AnimatePresence>

      {/* ERROR STATE */}
      {appState === AppState.ERROR && (
        <div className="fixed inset-0 z-50 bg-bg-deep flex items-center justify-center p-8 text-center">
          <div className="max-w-md">
             <h2 className="font-display text-4xl text-agent-sparky mb-4">OOPS!</h2>
             <p className="text-xl text-text-secondary mb-8">Our agents got a bit tangled up. It happens to the best of us.</p>
             <button onClick={() => setAppState(AppState.IDLE)} className="interactive px-8 py-3 border border-white rounded-full hover:bg-white hover:text-bg-deep transition-colors">
               Try Again
             </button>
          </div>
        </div>
      )}

      {/* FOOTER: MEET THE TEAM */}
      <footer className="py-20 bg-bg-surface border-t border-bg-elevated text-center relative z-10">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-3xl mb-12">Meet the Crew</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-12 md:gap-8 mb-16 relative">
            {AGENT_ORDER.map((id) => (
              <motion.div 
                key={id}
                className="flex flex-col items-center group cursor-pointer relative"
                onHoverStart={() => setHoveredAgentFooter(id)}
                onHoverEnd={() => setHoveredAgentFooter(null)}
                onClick={() => setHoveredAgentFooter(hoveredAgentFooter === id ? null : id)}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Speech Bubble on Hover */}
                <AnimatePresence>
                  {hoveredAgentFooter === id && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.5, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.5, y: 10 }}
                      className="absolute -top-24 left-1/2 -translate-x-1/2 bg-white text-bg-deep px-4 py-2 rounded-xl text-sm font-bold w-48 shadow-xl z-20 pointer-events-none"
                    >
                      "{AGENTS[id].introduction}"
                      {/* Triangle Tail */}
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative mb-6">
                  <AgentDisplay id={id} state="idle" scale={1} showLabel={false} />
                  {/* Hover State: Show "Working" face on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <AgentDisplay id={id} state="working" scale={1} showLabel={false} />
                  </div>
                </div>
                <h3 className="font-display text-xl mb-1" style={{ color: AGENTS[id].color }}>
                  {AGENTS[id].name}
                </h3>
                <p className="text-sm font-bold text-white mb-2">{AGENTS[id].role}</p>
                <p className="text-xs text-text-muted max-w-[200px] md:max-w-[150px] mx-auto leading-relaxed">
                  {AGENTS[id].description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-text-muted text-sm border-t border-bg-elevated pt-8">
            <p className="mb-2">Built with <span className="text-white font-bold">Gemini 3.0</span></p>
            <p className="opacity-50">Brain Dump 2.0 © {new Date().getFullYear()}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
