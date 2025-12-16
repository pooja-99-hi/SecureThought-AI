import React, { useState, useEffect } from 'react';
import { Shield, Lock, Scan, ChevronRight, Fingerprint } from 'lucide-react';
import { cyborgService } from '../services/cyborgdb';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [scanStep, setScanStep] = useState(0);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    
    // Simulate biometric scan sequence
    const sequence = [1, 2, 3, 4];
    for (const step of sequence) {
        setScanStep(step);
        await new Promise(r => setTimeout(r, 400));
    }

    try {
      const user = await cyborgService.login(username);
      onLogin(user);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cyber-black flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(0,212,255,0.1)_0%,_transparent_70%)] animate-pulse-slow"></div>
         <div className="absolute top-0 left-0 w-full h-1 bg-cyber-primary/20 animate-[scan_3s_ease-in-out_infinite]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-1">
        <div className="absolute inset-0 bg-gradient-to-r from-cyber-primary via-cyber-secondary to-cyber-primary rounded-2xl opacity-50 blur"></div>
        
        <div className="relative bg-cyber-dark/90 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-cyber-primary blur-lg opacity-50 animate-pulse"></div>
              <Shield className="w-16 h-16 text-cyber-primary relative z-10" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-widest">SECURE<span className="text-cyber-primary">THOUGHT</span></h1>
            <p className="text-xs text-cyber-primary/60 uppercase tracking-[0.3em] mt-2">Restricted Access // Level 5</p>
          </div>

          {!loading ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs uppercase text-gray-500 font-mono pl-1">Identify User</label>
                <div className="relative group">
                  <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyber-primary transition-colors" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter Agent ID..."
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-cyber-primary focus:shadow-[0_0_15px_rgba(0,212,255,0.2)] transition-all font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-cyber-primary text-black font-bold py-4 rounded-xl hover:bg-cyber-primary/90 transition-all flex items-center justify-center gap-2 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  INITIATE LINK <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>

              <div className="text-center">
                <p className="text-[10px] text-gray-600 font-mono">
                  By connecting, you agree to the <br/>CyborgDB Encryption Protocols (CEP-256)
                </p>
              </div>
            </form>
          ) : (
            <div className="py-8 flex flex-col items-center justify-center space-y-6">
               <div className="relative w-24 h-24 flex items-center justify-center">
                 <div className="absolute inset-0 border-4 border-cyber-primary/20 rounded-full"></div>
                 <div className="absolute inset-0 border-t-4 border-cyber-primary rounded-full animate-spin"></div>
                 <Scan className="w-10 h-10 text-white animate-pulse" />
               </div>
               
               <div className="space-y-2 w-full">
                 <div className="flex justify-between text-xs font-mono text-cyber-primary">
                   <span>BIOMETRIC_HANDSHAKE</span>
                   <span>{scanStep * 25}%</span>
                 </div>
                 <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                   <div 
                     className="h-full bg-cyber-primary transition-all duration-300" 
                     style={{width: `${scanStep * 25}%`}}
                   ></div>
                 </div>
                 <p className="text-center text-xs text-gray-500 font-mono mt-2 h-4">
                   {scanStep === 1 && "Verifying identity hash..."}
                   {scanStep === 2 && "Establishing secure tunnel..."}
                   {scanStep === 3 && "Exchanging AES-256 keys..."}
                   {scanStep === 4 && "Access Granted."}
                 </p>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
