import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, Loader2, Shield, Mic, MicOff, Download, Zap, Database } from 'lucide-react';
import { chatWithCipher } from '../services/ai';
import { ChatMessage } from '../types';

export const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      text: "CyborgDB Neural Interface Online. Secure Channel Established. Awaiting command.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const EXAMPLE_PROMPTS = [
    "Scan for critical anomalies in the CyborgDB index.",
    "How does CyborgDB prevent memory dump attacks?",
    "Generate a remediation plan for recent vector alerts.",
    "Export encrypted audit logs."
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isOpen]);

  // Voice Recognition Setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        // Auto send after voice
        setTimeout(() => handleSend(undefined, transcript), 500);
      };

      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      const techVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Samantha'));
      if (techVoice) utterance.voice = techVoice;
      utterance.pitch = 0.9;
      utterance.rate = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleDownload = () => {
    const text = messages.map(m => `[${m.role.toUpperCase()} - ${m.timestamp.toLocaleTimeString()}] ${m.text}`).join('\n\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cyborgdb-transcript-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSend = async (e?: React.FormEvent, overrideInput?: string) => {
    e?.preventDefault();
    const textToSend = overrideInput || input;
    
    if (!textToSend.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await chatWithCipher(userMsg.text, history);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText || "CyborgDB connection interrupted.",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
    speak(botMsg.text);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg border border-cyber-primary/50 transition-all duration-300 group
          ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100 bg-black/80 backdrop-blur-xl hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]'}`}
      >
        <div className="relative">
          <Database className="w-8 h-8 text-cyber-primary group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyber-secondary"></span>
          </span>
        </div>
      </button>

      <div 
        className={`fixed bottom-6 right-6 z-50 w-[380px] h-[600px] flex flex-col glass-panel rounded-2xl shadow-2xl transition-all duration-300 origin-bottom-right
          ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-cyber-primary/10 to-transparent">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyber-primary/20 rounded-lg border border-cyber-primary/30">
              <Database className="w-5 h-5 text-cyber-primary" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">CyborgDB Sentry</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">CyborgDB Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={handleDownload}
              className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
              title="Download Encrypted Log"
            >
              <Download className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border 
                ${msg.role === 'user' 
                  ? 'bg-cyber-secondary/20 border-cyber-secondary/30' 
                  : 'bg-cyber-primary/20 border-cyber-primary/30'}`}
              >
                {msg.role === 'user' ? <Shield className="w-4 h-4 text-cyber-secondary" /> : <Bot className="w-4 h-4 text-cyber-primary" />}
              </div>
              
              <div className={`rounded-2xl p-3 text-sm max-w-[80%] leading-relaxed
                ${msg.role === 'user' 
                  ? 'bg-cyber-secondary/10 text-white border border-cyber-secondary/20 rounded-tr-none' 
                  : 'bg-white/5 text-gray-200 border border-white/10 rounded-tl-none'}`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {messages.length === 1 && (
            <div className="grid gap-2 mt-4 animate-fade-in-up">
              <p className="text-xs text-gray-500 mb-1 ml-1 uppercase">CyborgDB Directives</p>
              {EXAMPLE_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(undefined, prompt)}
                  className="text-left text-xs p-3 rounded-xl bg-white/5 hover:bg-cyber-primary/10 border border-white/5 hover:border-cyber-primary/30 transition-all text-gray-300 hover:text-white flex items-center gap-2 group"
                >
                  <Zap className="w-3 h-3 text-cyber-primary opacity-50 group-hover:opacity-100" />
                  {prompt}
                </button>
              ))}
            </div>
          )}
          
          {isTyping && (
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-cyber-primary/20 border border-cyber-primary/30 flex items-center justify-center">
                 <Bot className="w-4 h-4 text-cyber-primary" />
               </div>
               <div className="bg-white/5 rounded-2xl rounded-tl-none p-3 border border-white/10">
                 <div className="flex gap-1">
                   <span className="w-1.5 h-1.5 bg-cyber-primary/50 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                   <span className="w-1.5 h-1.5 bg-cyber-primary/50 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                   <span className="w-1.5 h-1.5 bg-cyber-primary/50 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                 </div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-white/10 bg-black/20">
          <form onSubmit={(e) => handleSend(e)} className="relative flex items-center gap-2">
            <button
              type="button"
              onClick={toggleListening}
              className={`p-3 rounded-xl transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-white/5 text-gray-400 hover:text-white'}`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Query CyborgDB Neural Core..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-primary/50 focus:bg-white/10 transition-all placeholder-gray-500"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-3 rounded-xl bg-cyber-primary/20 text-cyber-primary hover:bg-cyber-primary hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </form>
          <div className="mt-2 text-[10px] text-center text-gray-600 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3" /> Powered by CyborgDB
          </div>
        </div>
      </div>
    </>
  );
};
