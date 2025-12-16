import React, { useState } from 'react';
import { Database, Lock, Server, Shield, EyeOff, Users, Cpu, ArrowRight, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ArchitectureCard = ({ title, icon: Icon, status, description, scenario, cyborgBenefit, active, onClick, color = "primary" }: any) => {
  const borderColor = active ? `border-cyber-${color}` : 'border-white/5';
  const glow = active ? `shadow-[0_0_20px_rgba(0,212,255,0.2)]` : '';
  
  return (
    <div 
      onClick={onClick}
      className={`glass-panel p-6 rounded-xl cursor-pointer transition-all duration-300 border-l-4 ${borderColor} ${glow} hover:bg-white/5 relative overflow-hidden`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg bg-cyber-${color}/10 text-cyber-${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        {status === 'protected' ? (
          <span className="flex items-center gap-1 text-xs font-bold text-cyber-accent bg-cyber-accent/10 px-2 py-1 rounded-full">
            <Check className="w-3 h-3" /> PROTECTED
          </span>
        ) : (
          <span className="flex items-center gap-1 text-xs font-bold text-cyber-warning bg-cyber-warning/10 px-2 py-1 rounded-full">
            <X className="w-3 h-3" /> NEEDS LAYER
          </span>
        )}
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 mb-4">{description}</p>
      
      {active && (
        <div className="mt-4 pt-4 border-t border-white/10 animate-fade-in-up">
           <div className="mb-4">
             <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-1">Threat Scenario</h4>
             <p className="text-sm text-white italic">"{scenario}"</p>
           </div>
           <div>
             <h4 className="text-xs uppercase tracking-wider text-cyber-primary mb-1">CyborgDB Defense</h4>
             <p className="text-sm text-gray-300">{cyborgBenefit}</p>
           </div>
        </div>
      )}
    </div>
  );
};

export const Architecture = () => {
  const [activeCard, setActiveCard] = useState<string | null>('db');

  return (
    <div className="space-y-12 pb-20">
      {/* Hero */}
      <div className="text-center max-w-4xl mx-auto py-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Security-First <span className="text-cyber-primary text-glow">Vector Architecture</span>
        </h1>
        <p className="text-xl text-gray-400 leading-relaxed">
          CyborgDB implements a zero-trust architecture where vectors remain encrypted at rest and in memory, 
          preventing data leaks even during active breaches.
        </p>
      </div>

      {/* Visual Flow Diagram */}
      <div className="relative h-[200px] hidden md:flex items-center justify-center gap-8 max-w-5xl mx-auto mb-16">
         {/* Connector Line */}
         <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyber-primary/30 to-transparent -z-10"></div>
         
         {[
           { icon: Users, label: 'User Request', sub: 'Auth Required' },
           { icon: Shield, label: 'API Gateway', sub: 'RBAC Check' },
           { icon: Cpu, label: 'Query Process', sub: 'Encrypted RAM' },
           { icon: Database, label: 'CyborgDB', sub: 'AES-256 Storage' },
           { icon: Lock, label: 'Decryption', sub: 'Secure Enclave' }
         ].map((step, i) => (
           <div key={i} className="flex flex-col items-center bg-cyber-black p-4 z-10 border border-cyber-primary/20 rounded-xl shadow-lg">
              <step.icon className="w-8 h-8 text-cyber-primary mb-2" />
              <span className="text-sm font-bold text-white">{step.label}</span>
              <span className="text-xs text-gray-500">{step.sub}</span>
           </div>
         ))}
      </div>

      {/* Protection Layers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Column 1: Core Protections (Green) */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-cyber-accent flex items-center gap-2 mb-6">
            <Shield className="w-6 h-6" /> Built-in Protection
          </h2>
          
          <ArchitectureCard 
            title="Data Encrypted at Rest"
            icon={Database}
            status="protected"
            description="All vectors are stored with military-grade AES-256 encryption on disk."
            scenario="Attacker steals the physical database files."
            cyborgBenefit="Files are completely unreadable static noise without the keys."
            active={activeCard === 'db'}
            onClick={() => setActiveCard('db')}
            color="accent"
          />

          <ArchitectureCard 
            title="In-Memory Encryption"
            icon={Cpu}
            status="protected"
            description="Vectors remain encrypted in RAM during similarity search operations."
            scenario="Memory dump attack on the production server."
            cyborgBenefit="RAM contents reveal only encrypted ciphertext, no raw vectors."
            active={activeCard === 'mem'}
            onClick={() => setActiveCard('mem')}
            color="accent"
          />
        </div>

        {/* Column 2: Access Control (Blue) */}
        <div className="space-y-6">
           <h2 className="text-xl font-bold text-cyber-primary flex items-center gap-2 mb-6">
            <Lock className="w-6 h-6" /> Access Control
          </h2>
          
          <ArchitectureCard 
            title="Strict Authentication"
            icon={Lock}
            status="protected"
            description="Granular API key system with Role-Based Access Control (RBAC)."
            scenario="Unauthorized user attempts to query the vector store."
            cyborgBenefit="Request is rejected at the gateway before processing."
            active={activeCard === 'auth'}
            onClick={() => setActiveCard('auth')}
          />
        </div>

        {/* Column 3: Advanced/Future (Orange) */}
        <div className="space-y-6">
           <h2 className="text-xl font-bold text-cyber-warning flex items-center gap-2 mb-6">
            <EyeOff className="w-6 h-6" /> Application Layers
          </h2>
          
          <ArchitectureCard 
            title="Result Masking"
            icon={EyeOff}
            status="needed"
            description="Hiding sensitive result fields from the querying user."
            scenario="Doctor searches records but shouldn't see patient PII."
            cyborgBenefit="Our demo implements client-side redaction middleware."
            active={activeCard === 'mask'}
            onClick={() => setActiveCard('mask')}
            color="warning"
          />

           <ArchitectureCard 
            title="Multi-Party Computation"
            icon={Server}
            status="needed"
            description="Computing on data without ever decrypting it anywhere."
            scenario="Two banks comparing fraud lists without sharing customer data."
            cyborgBenefit="Future roadmap: Federated learning integration."
            active={activeCard === 'mpc'}
            onClick={() => setActiveCard('mpc')}
            color="warning"
          />
        </div>
      </div>
      
      {/* Interactive Demo Area */}
      <div className="mt-16 glass-panel p-8 rounded-xl border border-white/10">
        <h3 className="text-2xl font-bold text-white mb-6">Live Encryption Simulator</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-black/50 p-6 rounded-lg font-mono text-xs border border-white/5 overflow-hidden">
             <div className="flex justify-between text-gray-500 mb-2"><span>RAW VECTOR (Plaintext)</span> <span>[UNSECURE]</span></div>
             <div className="text-cyber-danger break-all">
               [0.024, -0.115, 0.882, 0.004, -0.552, 0.123, 0.991, -0.002, 0.115, ...]
             </div>
           </div>
           
           <div className="flex flex-col justify-center items-center">
             <ArrowRight className="w-8 h-8 text-cyber-primary animate-pulse" />
             <span className="text-xs text-cyber-primary mt-1">AES-256</span>
           </div>
           
           <div className="bg-black/50 p-6 rounded-lg font-mono text-xs border border-cyber-accent/30 relative overflow-hidden">
             <div className="absolute inset-0 bg-cyber-accent/5 animate-pulse"></div>
             <div className="flex justify-between text-gray-500 mb-2"><span>STORED DATA (CyborgDB)</span> <span className="text-cyber-accent">[SECURE]</span></div>
             <div className="text-cyber-accent break-all blur-[1px] hover:blur-0 transition-all">
               92f8a9bc7d8e9f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5...
             </div>
           </div>
        </div>
      </div>

    </div>
  );
};