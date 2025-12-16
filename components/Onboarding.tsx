import React, { useState } from 'react';
import { Shield, Search, Bot, ArrowRight, LayoutDashboard, Cpu, Network } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Welcome to SecureThought",
      subtitle: "The world's first encryption-native threat intelligence platform.",
      icon: Shield,
      color: "cyber-primary",
      content: "You have successfully authenticated into the secure enclave. Our architecture ensures that your vector data remains encrypted at rest, in transit, and even during memory processing."
    },
    {
      title: "Mission Control & Analytics",
      subtitle: "Real-time visibility into your security posture.",
      icon: LayoutDashboard,
      color: "cyber-secondary",
      content: "Monitor active threats, analyze global attack vectors, and view real-time performance metrics comparing encrypted vs. plaintext operations."
    },
    {
      title: "Encrypted Threat Hunter",
      subtitle: "Semantic search without compromising privacy.",
      icon: Search,
      color: "cyber-accent",
      content: "Use natural language to find similar threat vectors. Toggle the 'Encryption Layer' to visualize the difference between secure and insecure search operations."
    },
    {
      title: "Neural Analyst 'Cipher'",
      subtitle: "AI-powered security assistant.",
      icon: Bot,
      color: "cyber-warning",
      content: "Interact with Cipher using voice or text. Ask for remediation strategies, threat breakdowns, or export full analysis transcripts for your reports."
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const CurrentIcon = steps[step].icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cyber-black">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-primary/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(5,5,5,0.9)_2px,transparent_2px),linear-gradient(90deg,rgba(5,5,5,0.9)_2px,transparent_2px)] bg-[size:40px_40px] opacity-50"></div>
      </div>

      <div className="relative z-10 max-w-4xl w-full p-8">
        <div className="glass-panel p-1 border-white/10 rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-cyber-dark/90 backdrop-blur-xl rounded-2xl p-8 md:p-12 relative overflow-hidden min-h-[500px] flex flex-col">
            
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-white/10">
              <div 
                className={`h-full bg-${steps[step].color} transition-all duration-500 ease-out`}
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              ></div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 animate-fade-in-up key={step}">
              <div className={`w-24 h-24 rounded-2xl bg-${steps[step].color}/10 border border-${steps[step].color}/30 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(0,0,0,0.5)]`}>
                <CurrentIcon className={`w-12 h-12 text-${steps[step].color}`} />
              </div>

              <div className="space-y-4 max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                  {steps[step].title}
                </h2>
                <p className={`text-xl text-${steps[step].color} font-mono`}>
                  {steps[step].subtitle}
                </p>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {steps[step].content}
                </p>
              </div>
            </div>

            <div className="mt-12 flex items-center justify-between">
              <div className="flex gap-2">
                {steps.map((_, i) => (
                  <div 
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${i === step ? `bg-${steps[step].color} w-8` : 'bg-gray-700'}`}
                  ></div>
                ))}
              </div>

              <button
                onClick={handleNext}
                className={`group flex items-center gap-3 px-8 py-4 rounded-xl bg-${steps[step].color} text-black font-bold text-lg hover:brightness-110 transition-all shadow-lg hover:shadow-${steps[step].color}/25`}
              >
                {step === steps.length - 1 ? 'Launch System' : 'Next'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};