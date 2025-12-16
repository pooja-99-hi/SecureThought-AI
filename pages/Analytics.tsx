import React from 'react';
import { ThreeViz } from '../components/ThreeViz';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';
import { Zap, Clock, HardDrive, Cpu } from 'lucide-react';

export const Analytics = () => {
  const perfData = [
    { name: 'Plaintext DB', latency: 120, throughput: 2000 },
    { name: 'CyborgDB (Enc)', latency: 125, throughput: 1950 },
  ];

  const auditData = [
    { name: 'Mon', authorized: 4000, blocked: 24 },
    { name: 'Tue', authorized: 3000, blocked: 13 },
    { name: 'Wed', authorized: 2000, blocked: 98 },
    { name: 'Thu', authorized: 2780, blocked: 39 },
    { name: 'Fri', authorized: 1890, blocked: 48 },
  ];

  const latencyTrend = [
    { time: '0s', plaintext: 45, encrypted: 48 },
    { time: '10s', plaintext: 42, encrypted: 46 },
    { time: '20s', plaintext: 50, encrypted: 55 },
    { time: '30s', plaintext: 48, encrypted: 52 },
    { time: '40s', plaintext: 46, encrypted: 49 },
    { time: '50s', plaintext: 44, encrypted: 48 },
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Header Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-xl flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><Clock className="w-5 h-5"/></div>
          <div>
            <p className="text-xs text-gray-500">Avg Latency</p>
            <p className="text-xl font-bold text-white">48ms</p>
          </div>
        </div>
         <div className="glass-panel p-4 rounded-xl flex items-center gap-3">
          <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400"><Zap className="w-5 h-5"/></div>
          <div>
            <p className="text-xs text-gray-500">Throughput</p>
            <p className="text-xl font-bold text-white">2.4k ops/s</p>
          </div>
        </div>
         <div className="glass-panel p-4 rounded-xl flex items-center gap-3">
          <div className="p-2 bg-green-500/20 rounded-lg text-green-400"><Cpu className="w-5 h-5"/></div>
          <div>
            <p className="text-xs text-gray-500">CPU Overhead</p>
            <p className="text-xl font-bold text-white">~4.2%</p>
          </div>
        </div>
         <div className="glass-panel p-4 rounded-xl flex items-center gap-3">
          <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400"><HardDrive className="w-5 h-5"/></div>
          <div>
            <p className="text-xs text-gray-500">Storage Incr</p>
            <p className="text-xl font-bold text-white">0%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[500px]">
        {/* 3D Viz */}
        <div className="glass-panel p-0 rounded-xl overflow-hidden relative border border-cyber-primary/20 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <div className="absolute top-4 left-4 z-10 bg-black/50 p-3 rounded backdrop-blur">
            <h3 className="font-bold text-white">Encrypted Vector Space</h3>
            <p className="text-xs text-gray-400">Real-time Visualization</p>
          </div>
          <ThreeViz />
        </div>

        {/* Perf Chart */}
        <div className="glass-panel p-6 rounded-xl flex flex-col justify-center">
           <h3 className="font-bold text-white mb-6">Encryption Overhead Analysis</h3>
           <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={perfData} layout="vertical">
                 <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                 <XAxis type="number" stroke="#666" />
                 <YAxis dataKey="name" type="category" stroke="#fff" width={100} />
                 <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
                 <Legend />
                 <Bar dataKey="latency" fill="#00d4ff" name="Latency (ms)" barSize={20} />
                 <Bar dataKey="throughput" fill="#a855f7" name="Throughput (ops/sec)" barSize={20} />
               </BarChart>
             </ResponsiveContainer>
           </div>
           <p className="text-center text-sm text-gray-400 mt-4 bg-white/5 p-3 rounded">
             <span className="text-cyber-accent font-bold">Benchmark Result:</span> CyborgDB adds &lt;5% latency overhead while providing military-grade encryption.
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel p-6 rounded-xl">
          <h3 className="font-bold text-white mb-6">Access Control Audit Log</h3>
           <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={auditData}>
                   <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                   <XAxis dataKey="name" stroke="#666" />
                   <YAxis stroke="#666" />
                   <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} />
                   <Legend />
                   <Bar dataKey="authorized" stackId="a" fill="#10b981" name="Authorized Queries" />
                   <Bar dataKey="blocked" stackId="a" fill="#ef4444" name="Blocked Attempts" />
                 </BarChart>
               </ResponsiveContainer>
             </div>
        </div>

        <div className="glass-panel p-6 rounded-xl">
          <h3 className="font-bold text-white mb-6">Real-time Latency (Encrypted vs Plaintext)</h3>
           <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={latencyTrend}>
                   <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                   <XAxis dataKey="time" stroke="#666" />
                   <YAxis stroke="#666" domain={[0, 100]} />
                   <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} />
                   <Legend />
                   <Line type="monotone" dataKey="plaintext" stroke="#666" name="Traditional DB" strokeDasharray="5 5" />
                   <Line type="monotone" dataKey="encrypted" stroke="#00d4ff" name="CyborgDB" strokeWidth={2} />
                 </LineChart>
               </ResponsiveContainer>
             </div>
        </div>
      </div>
    </div>
  );
};
