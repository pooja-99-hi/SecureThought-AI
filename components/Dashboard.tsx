import React, { useEffect, useState } from 'react';
import { Shield, Database, Activity, Lock, Globe, AlertTriangle, CheckCircle, X, Terminal, Cpu } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { cyborgService } from '../services/cyborgdb';
import { Threat } from '../types';

const MetricCard = ({ title, value, subtext, icon: Icon, color }: any) => (
  <div className="glass-panel p-6 rounded-xl relative overflow-hidden group hover:border-opacity-50 transition-all duration-300 border-t-2 border-transparent hover:border-t-cyber-primary">
    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-${color}`}>
      <Icon className="w-24 h-24" />
    </div>
    <div className="relative z-10">
      <div className={`flex items-center gap-2 text-${color} mb-2`}>
        <Icon className="w-5 h-5" />
        <span className="text-sm font-medium tracking-wide text-gray-400 uppercase">{title}</span>
      </div>
      <div className="text-3xl font-bold text-white mb-1 font-mono tracking-tight">{value}</div>
      <div className="text-xs text-gray-500 font-mono">{subtext}</div>
    </div>
  </div>
);

const ThreatRow: React.FC<{ threat: Threat, onClick: () => void }> = ({ threat, onClick }) => (
  <div 
    onClick={onClick}
    className="flex items-center justify-between p-4 border-b border-white/5 hover:bg-white/5 transition-colors group cursor-pointer"
  >
    <div className="flex items-center gap-4">
      <div className={`w-2 h-2 rounded-full ${threat.severity === 'Critical' ? 'bg-cyber-danger animate-pulse' : threat.severity === 'High' ? 'bg-cyber-warning' : 'bg-cyber-primary'}`}></div>
      <div>
        <h4 className="text-sm font-medium text-white group-hover:text-cyber-primary transition-colors">{threat.title}</h4>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] uppercase tracking-wider text-gray-500">{threat.type}</span>
          <span className="text-[10px] text-gray-600">•</span>
          <span className="text-[10px] font-mono text-gray-500">{threat.sourceIp}</span>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-3">
       <span className="flex items-center gap-1 text-[10px] bg-cyber-primary/10 text-cyber-primary px-2 py-1 rounded border border-cyber-primary/20">
         <Lock className="w-3 h-3" /> ENCRYPTED
       </span>
       <span className={`text-xs font-bold px-2 py-1 rounded ${
         threat.severity === 'Critical' ? 'text-cyber-danger bg-cyber-danger/10' : 
         threat.severity === 'High' ? 'text-cyber-warning bg-cyber-warning/10' : 'text-cyber-primary bg-cyber-primary/10'
       }`}>
         {threat.severity}
       </span>
    </div>
  </div>
);

const ThreatDetailModal = ({ threat, onClose }: { threat: Threat | null, onClose: () => void }) => {
  if (!threat) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl bg-cyber-dark border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-start bg-gradient-to-r from-cyber-primary/5 to-transparent">
          <div className="flex items-center gap-4">
             <div className={`p-3 rounded-xl ${threat.severity === 'Critical' ? 'bg-cyber-danger/20 text-cyber-danger' : 'bg-cyber-primary/20 text-cyber-primary'}`}>
               <AlertTriangle className="w-8 h-8" />
             </div>
             <div>
               <h3 className="text-xl font-bold text-white mb-1">{threat.title}</h3>
               <div className="flex items-center gap-3 text-sm">
                 <span className="text-gray-400 font-mono">{threat.id}</span>
                 <span className={`px-2 py-0.5 rounded text-xs font-bold ${threat.severity === 'Critical' ? 'text-cyber-danger bg-cyber-danger/10' : 'text-cyber-primary bg-cyber-primary/10'}`}>
                   {threat.severity}
                 </span>
               </div>
             </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 rounded-lg bg-white/5 border border-white/5">
               <h4 className="text-xs uppercase text-gray-500 mb-2 flex items-center gap-2"><Globe className="w-3 h-3"/> Origin Source</h4>
               <p className="font-mono text-white text-lg">{threat.sourceIp}</p>
               <p className="text-xs text-gray-400 mt-1">Geo-location masked by proxy</p>
             </div>
             <div className="p-4 rounded-lg bg-white/5 border border-white/5">
               <h4 className="text-xs uppercase text-gray-500 mb-2 flex items-center gap-2"><Activity className="w-3 h-3"/> Confidence Score</h4>
               <p className="font-mono text-cyber-primary text-lg">{threat.confidence}%</p>
               <p className="text-xs text-gray-400 mt-1">AI Classification Certainty</p>
             </div>
          </div>

          <div>
             <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
               <Cpu className="w-4 h-4 text-cyber-secondary"/> AI Analysis
             </h4>
             <p className="text-gray-300 text-sm leading-relaxed bg-black/30 p-4 rounded-lg border border-white/5">
               This threat vector indicates a {threat.type.toLowerCase()} pattern consistent with recent APT group signatures. 
               The attack payload attempts to exploit CVE-2024-X via obfuscated SQL injection.
               <br/><br/>
               <span className="text-cyber-accent">Recommended Action:</span> Isolate affected node and rotate database credentials immediately.
             </p>
          </div>

          <div>
             <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
               <Database className="w-4 h-4 text-cyber-primary"/> Raw Vector Data (Encrypted)
             </h4>
             <div className="font-mono text-xs text-gray-500 bg-black p-4 rounded-lg break-all border border-cyber-primary/20 relative overflow-hidden">
                <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] text-cyber-primary bg-cyber-primary/10 px-2 py-1 rounded">
                  <Lock className="w-3 h-3" /> AES-256
                </div>
                {threat.vectorId}_enc_7f8a9d0e1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9...
             </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-black/40 border-t border-white/10 flex justify-end gap-3">
           <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
             Close
           </button>
           <button className="px-4 py-2 rounded-lg text-sm font-bold bg-cyber-primary text-black hover:bg-cyber-primary/80 transition-colors flex items-center gap-2">
             <Terminal className="w-4 h-4" /> Initiate Mitigation
           </button>
        </div>
      </div>
    </div>
  );
};

export const Dashboard = () => {
  const [stats, setStats] = useState<any>({ totalThreats: 0, encryptedVectors: 0, activeEncryptedQueries: 0 });
  const [recentThreats, setRecentThreats] = useState<Threat[]>([]);
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);
  
  // Mock chart data
  const chartData = [
    { name: '00:00', queries: 400, threats: 240 },
    { name: '04:00', queries: 300, threats: 139 },
    { name: '08:00', queries: 900, threats: 980 },
    { name: '12:00', queries: 1200, threats: 390 },
    { name: '16:00', queries: 1500, threats: 480 },
    { name: '20:00', queries: 1100, threats: 380 },
    { name: '23:59', queries: 800, threats: 430 },
  ];

  const severityData = [
    { name: 'Critical', value: 10, color: '#ef4444' },
    { name: 'High', value: 25, color: '#f59e0b' },
    { name: 'Medium', value: 40, color: '#00d4ff' },
    { name: 'Low', value: 25, color: '#10b981' },
  ];

  useEffect(() => {
    cyborgService.getStats().then(setStats);
    cyborgService.streamThreats((threat) => {
      setRecentThreats(prev => [threat, ...prev].slice(0, 8));
      setStats((prev: any) => ({ ...prev, totalThreats: prev.totalThreats + 1 }));
    });
  }, []);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <ThreatDetailModal threat={selectedThreat} onClose={() => setSelectedThreat(null)} />

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Total Threats Detected" 
          value={stats.totalThreats.toLocaleString()} 
          subtext="+12% from last hour" 
          icon={Shield} 
          color="cyber-danger" 
        />
        <MetricCard 
          title="Encrypted Vectors" 
          value={stats.encryptedVectors.toLocaleString()} 
          subtext="100% AES-256 Protected" 
          icon={Database} 
          color="cyber-primary" 
        />
        <MetricCard 
          title="Active Protected Queries" 
          value={stats.activeEncryptedQueries} 
          subtext="Zero plaintext exposure in RAM" 
          icon={Activity} 
          color="cyber-secondary" 
        />
        <MetricCard 
          title="Security Score" 
          value="A+" 
          subtext="Zero Trust Architecture Verified" 
          icon={CheckCircle} 
          color="cyber-accent" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-panel rounded-xl p-6 min-h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyber-primary" />
              Security Operations (24h)
            </h3>
            <div className="flex gap-2">
              <span className="flex items-center gap-1 text-xs text-gray-400"><div className="w-2 h-2 rounded-full bg-cyber-primary"></div> Queries</span>
              <span className="flex items-center gap-1 text-xs text-gray-400"><div className="w-2 h-2 rounded-full bg-cyber-secondary"></div> Threats</span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="name" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #333', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="queries" stroke="#00d4ff" fillOpacity={1} fill="url(#colorQueries)" />
                <Area type="monotone" dataKey="threats" stroke="#a855f7" fillOpacity={1} fill="url(#colorThreats)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Severity Distribution */}
        <div className="glass-panel rounded-xl p-6">
           <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-cyber-warning" />
              Threat Severity
           </h3>
           <div className="h-[250px] relative">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={severityData}
                   cx="50%"
                   cy="50%"
                   innerRadius={60}
                   outerRadius={80}
                   paddingAngle={5}
                   dataKey="value"
                 >
                   {severityData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                   ))}
                 </Pie>
                 <Tooltip contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '4px' }} />
               </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold text-white">200+</span>
                <span className="text-xs text-gray-500">Active</span>
             </div>
           </div>
           <div className="mt-4 grid grid-cols-2 gap-2">
             {severityData.map(item => (
               <div key={item.name} className="flex items-center justify-between text-xs p-2 rounded bg-white/5">
                 <span className="flex items-center gap-1">
                   <div className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}}></div>
                   {item.name}
                 </span>
                 <span className="font-mono text-gray-400">{item.value}%</span>
               </div>
             ))}
           </div>
        </div>
      </div>

      {/* Real-time Feed */}
      <div className="glass-panel rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyber-accent" />
            Live Threat Intelligence Feed
          </h3>
          <span className="text-xs font-mono text-cyber-primary animate-pulse">● LIVE STREAMING</span>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
           {recentThreats.length === 0 ? (
             <div className="p-8 text-center text-gray-500">Waiting for live data...</div>
           ) : (
             recentThreats.map((threat) => (
               <ThreatRow key={threat.id} threat={threat} onClick={() => setSelectedThreat(threat)} />
             ))
           )}
        </div>
      </div>
    </div>
  );
};
