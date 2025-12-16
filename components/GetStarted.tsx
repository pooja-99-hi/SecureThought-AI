import React from 'react';
import { Shield, Search, LayoutDashboard, Terminal, Bot, Network, Lock, Zap, MousePointer2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon: Icon, title, description, link, actionText }: any) => (
  <div className="glass-panel p-6 rounded-xl relative overflow-hidden group hover:border-cyber-primary/50 transition-all duration-300">
    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
      <Icon className="w-24 h-24 text-white" />
    </div>
    
    <div className="relative z-10 flex flex-col h-full">
      <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-cyber-primary/20 group-hover:border-cyber-primary/50 transition-colors">
        <Icon className="w-6 h-6 text-cyber-primary" />
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 mb-6 flex-grow leading-relaxed">
        {description}
      </p>
      
      <Link 
        to={link}
        className="inline-flex items-center gap-2 text-sm font-bold text-cyber-primary hover:text-white transition-colors"
      >
        {actionText} <MousePointer2 className="w-4 h-4" />
      </Link>
    </div>
  </div>
);

export const GetStarted = () => {
  return (
    <div className="max-w-6xl mx-auto pb-20 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          System <span className="text-cyber-primary text-glow">Capabilities</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Welcome to SecureThought. This platform demonstrates the power of CyborgDB's encryption-first vector database architecture. Here is how to navigate the system.
        </p>
      </div>

      {/* Quick Start Guide */}
      <div className="glass-panel p-8 rounded-2xl border-l-4 border-cyber-secondary">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Zap className="w-6 h-6 text-cyber-secondary" />
          Demo Walkthrough Checklist
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cyber-secondary/20 text-cyber-secondary font-bold flex items-center justify-center border border-cyber-secondary/30">1</span>
              <div>
                <h4 className="text-white font-bold">Check Mission Control</h4>
                <p className="text-sm text-gray-400">Observe real-time threat ingestion. Note the "Encrypted" status on all incoming data.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cyber-secondary/20 text-cyber-secondary font-bold flex items-center justify-center border border-cyber-secondary/30">2</span>
              <div>
                <h4 className="text-white font-bold">Run an Encrypted Search</h4>
                <p className="text-sm text-gray-400">Go to <strong>Threat Hunter</strong>. Use the toggle to compare "Safe" vs "Unsafe" search modes.</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cyber-secondary/20 text-cyber-secondary font-bold flex items-center justify-center border border-cyber-secondary/30">3</span>
              <div>
                <h4 className="text-white font-bold">Inspect Architecture</h4>
                <p className="text-sm text-gray-400">Visit <strong>Security Architecture</strong> to see the visual breakdown of CyborgDB's protection layers.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cyber-secondary/20 text-cyber-secondary font-bold flex items-center justify-center border border-cyber-secondary/30">4</span>
              <div>
                <h4 className="text-white font-bold">Consult Cipher AI</h4>
                <p className="text-sm text-gray-400">Open the chat widget (bottom right) and ask "How does CyborgDB protect memory?".</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-8 pl-2 border-l-4 border-cyber-primary">
          Core Modules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            title="Mission Control"
            description="The central command hub. View live threat feeds, global encryption status, and severity distribution charts."
            icon={LayoutDashboard}
            link="/"
            actionText="Go to Dashboard"
          />
          <FeatureCard 
            title="Threat Hunter"
            description="Perform semantic similarity searches. Features a unique 'Encryption Toggle' to demonstrate the difference between secure and insecure queries."
            icon={Search}
            link="/search"
            actionText="Start Hunting"
          />
          <FeatureCard 
            title="Security Architecture"
            description="Interactive educational diagrams explaining data-at-rest and in-memory encryption mechanisms."
            icon={Network}
            link="/architecture"
            actionText="View Diagrams"
          />
          <FeatureCard 
            title="Neural Analyst"
            description="AI-powered assistant available via the floating button. Capable of voice interaction and generating transcripts."
            icon={Bot}
            link="#"
            actionText="Open Chat (Bottom Right)"
          />
          <FeatureCard 
            title="Analytics & Audit"
            description="Performance benchmarks comparing encrypted vs plaintext database operations, plus 3D vector visualization."
            icon={Shield}
            link="/analytics"
            actionText="View Metrics"
          />
          <FeatureCard 
            title="API Playground"
            description="Developer documentation and interactive console to test raw API requests against the mock CyborgDB backend."
            icon={Terminal}
            link="/api"
            actionText="Test Endpoints"
          />
        </div>
      </div>

      {/* Security Note */}
      <div className="bg-black/40 border border-white/10 rounded-xl p-6 flex items-start gap-4">
        <div className="p-3 bg-cyber-accent/10 rounded-lg text-cyber-accent">
          <Lock className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white mb-1">CyborgDB Security Protocol</h3>
          <p className="text-sm text-gray-400">
            This platform uses mock data to simulate a production environment. In a real deployment, CyborgDB ensures that no vector data is ever exposed in plaintext during the search process, mitigating memory dump attacks.
          </p>
        </div>
      </div>
    </div>
  );
};
