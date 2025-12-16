import React, { useState } from 'react';
import { Search as SearchIcon, Sliders, Zap, Lock, Database, Unlock, ShieldAlert } from 'lucide-react';
import { cyborgService } from '../services/cyborgdb';
import { SearchResult } from '../types';

export const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'semantic' | 'hybrid'>('semantic');
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const data = await cyborgService.search(query, mode);
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-white mb-2">Threat Hunter</h1>
        <p className="text-gray-400">Perform semantic similarity searches across encrypted vector space.</p>
      </div>

      {/* Encryption Toggle */}
      <div className="flex justify-center mb-6">
        <div 
          onClick={() => setEncryptionEnabled(!encryptionEnabled)}
          className={`cursor-pointer flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-300 ${
            encryptionEnabled 
              ? 'bg-cyber-primary/10 border-cyber-primary text-cyber-primary shadow-[0_0_20px_rgba(0,212,255,0.3)]' 
              : 'bg-red-500/10 border-red-500 text-red-500'
          }`}
        >
           {encryptionEnabled ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
           <span className="font-mono font-bold">
             {encryptionEnabled ? 'ENCRYPTION LAYER: ACTIVE' : 'ENCRYPTION LAYER: DISABLED (UNSAFE)'}
           </span>
           <div className={`w-3 h-3 rounded-full ${encryptionEnabled ? 'bg-cyber-primary animate-pulse' : 'bg-red-500'}`}></div>
        </div>
      </div>

      {/* Search Bar */}
      <div className={`glass-panel p-2 rounded-2xl max-w-3xl mx-auto transition-all duration-500 ${
        encryptionEnabled ? 'border-cyber-primary/30 shadow-[0_0_30px_rgba(0,212,255,0.1)]' : 'border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.1)]'
      }`}>
        <form onSubmit={handleSearch} className="flex items-center gap-2">
           <div className={`pl-4 ${encryptionEnabled ? 'text-cyber-primary' : 'text-red-500'}`}>
             <SearchIcon />
           </div>
           <input
             type="text"
             value={query}
             onChange={(e) => setQuery(e.target.value)}
             placeholder={encryptionEnabled ? "Enter encrypted search query..." : "WARNING: Query sent in plaintext..."}
             className="flex-1 bg-transparent border-none text-white px-4 py-3 focus:outline-none placeholder-gray-600"
           />
           <button 
             type="submit"
             disabled={loading}
             className={`${
               encryptionEnabled ? 'bg-cyber-primary hover:bg-cyber-primary/80 text-black' : 'bg-red-600 hover:bg-red-700 text-white'
             } font-bold px-8 py-3 rounded-xl transition-all flex items-center gap-2`}
           >
             {loading ? 'Scanning...' : 'Scan'}
           </button>
        </form>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <button 
          onClick={() => setMode('semantic')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'semantic' ? 'bg-white/10 text-white border border-white/20' : 'text-gray-500 hover:text-white'}`}
        >
          Vector Search
        </button>
        <button 
          onClick={() => setMode('hybrid')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'hybrid' ? 'bg-white/10 text-white border border-white/20' : 'text-gray-500 hover:text-white'}`}
        >
          Hybrid (Vector + Metadata)
        </button>
      </div>

      {/* Security Banner */}
      {!encryptionEnabled && (
         <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center justify-center gap-2 text-red-400 text-sm animate-pulse">
           <ShieldAlert className="w-4 h-4" />
           <span>WARNING: Simulating insecure search. Vectors would be exposed in memory in a traditional DB.</span>
         </div>
      )}
      
      {encryptionEnabled && (
        <div className="bg-cyber-accent/5 border border-cyber-accent/20 rounded-lg p-3 flex items-center justify-center gap-2 text-cyber-accent text-sm">
          <Lock className="w-4 h-4" />
          <span>End-to-End Encryption Active: Query vector is encrypted before leaving the client.</span>
        </div>
      )}

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {results.map((result) => (
          <div key={result.id} className="glass-panel p-6 rounded-xl border border-white/5 hover:border-cyber-primary/50 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                 <div className={`p-2 rounded-lg ${result.threat.severity === 'Critical' ? 'bg-cyber-danger/20 text-cyber-danger' : 'bg-cyber-primary/20 text-cyber-primary'}`}>
                   <Database className="w-5 h-5" />
                 </div>
                 <div>
                   <h3 className="font-bold text-white">{result.threat.type}</h3>
                   <span className="text-xs text-gray-500">{result.threat.id}</span>
                 </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-cyber-primary">{(result.score * 100).toFixed(1)}%</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Similarity</div>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm mb-4 line-clamp-2">{result.threat.title}</p>
            
            <div className="bg-black/30 rounded p-3 mb-4">
              <div className="text-[10px] uppercase text-gray-500 mb-1">Vector Math Reason</div>
              <div className="text-xs font-mono text-cyber-secondary">{result.matchReason}</div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 border-t border-white/5 pt-4">
               <span>Source: {result.threat.sourceIp}</span>
               {encryptionEnabled ? (
                 <span className="flex items-center gap-1 text-cyber-accent"><Lock className="w-3 h-3" /> Encrypted</span>
               ) : (
                 <span className="flex items-center gap-1 text-red-500"><Unlock className="w-3 h-3" /> Exposed</span>
               )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty State */}
      {!loading && results.length === 0 && (
        <div className="text-center py-20 opacity-30">
          <Database className="w-24 h-24 mx-auto mb-4" />
          <p className="text-xl">Ready to secure search</p>
        </div>
      )}
    </div>
  );
};
