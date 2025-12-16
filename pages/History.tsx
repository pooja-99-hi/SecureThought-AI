import React, { useEffect, useState } from 'react';
import { History, Search, ArrowRight, ShieldCheck, FileInput } from 'lucide-react';
import { cyborgService } from '../services/cyborgdb';
import { HistoryItem } from '../types';

export const UserHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await cyborgService.getUserHistory();
      setHistory(data);
      setLoading(false);
    };
    fetchHistory();
  }, []);

  const getIcon = (type: HistoryItem['type']) => {
    switch(type) {
      case 'SEARCH': return <Search className="w-5 h-5 text-cyber-primary" />;
      case 'LOGIN': return <ShieldCheck className="w-5 h-5 text-cyber-accent" />;
      case 'INSERT': return <FileInput className="w-5 h-5 text-cyber-secondary" />;
      default: return <History className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Audit Log & History</h1>
          <p className="text-gray-400">Immutable record of your interactions with the encrypted core.</p>
        </div>
        <div className="px-4 py-2 bg-cyber-primary/10 border border-cyber-primary/30 rounded-lg text-cyber-primary font-mono text-xs">
          ENCRYPTED AUDIT TRAIL
        </div>
      </div>

      <div className="relative border-l-2 border-white/10 ml-6 space-y-12">
        {history.map((item, index) => (
          <div key={item.id} className="relative pl-8 animate-fade-in-up" style={{animationDelay: `${index * 50}ms`}}>
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-cyber-black border-2 border-gray-600 group-hover:border-cyber-primary transition-colors"></div>
            
            <div className="glass-panel p-6 rounded-xl hover:border-cyber-primary/50 transition-all group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:bg-cyber-primary/20 group-hover:border-cyber-primary/30 transition-all">
                    {getIcon(item.type)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{item.type} OPERATION</h3>
                    <p className="text-xs text-gray-500 font-mono">{item.timestamp.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                   <span className={`px-2 py-1 rounded text-[10px] font-bold ${item.status === 'Success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                     {item.status.toUpperCase()}
                   </span>
                   {item.encrypted && (
                     <span className="px-2 py-1 rounded text-[10px] font-bold bg-cyber-primary/10 text-cyber-primary border border-cyber-primary/20">
                       AES-256
                     </span>
                   )}
                </div>
              </div>
              
              <div className="bg-black/40 p-4 rounded-lg border border-white/5 font-mono text-sm text-gray-300">
                <p className="mb-2 text-gray-500 text-xs uppercase">Action Details</p>
                {item.details}
                {item.query && (
                  <div className="mt-2 pt-2 border-t border-white/5 flex items-center gap-2 text-cyber-primary">
                    <ArrowRight className="w-3 h-3" />
                    <span>"{item.query}"</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {history.length === 0 && !loading && (
          <div className="pl-8 text-gray-500 italic">No activity recorded yet. Start exploring to generate logs.</div>
        )}
      </div>
    </div>
  );
};
