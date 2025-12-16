import React, { useState } from 'react';
import { Play, Copy, Check } from 'lucide-react';

const CodeBlock = ({ code, language = 'typescript' }: { code: string, language?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-black/80 rounded-lg border border-white/10 overflow-hidden font-mono text-sm relative group">
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={handleCopy} className="p-2 hover:bg-white/10 rounded-md text-gray-400 hover:text-white">
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-gray-300"><code>{code}</code></pre>
      </div>
    </div>
  );
};

export const ApiPlayground = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [result, setResult] = useState<string | null>(null);

  const runDemo = () => {
    setResult('Loading...');
    setTimeout(() => {
      setResult(JSON.stringify({
        status: 200,
        data: {
          hits: 12,
          encryption_verified: true,
          results: [
            { id: "vec_89234", score: 0.98, type: "Ransomware" }
          ]
        },
        meta: { latency_ms: 45, secure: true }
      }, null, 2));
    }, 800);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">API Documentation</h2>
        
        <div className="space-y-8">
          <div className="glass-panel p-6 rounded-xl">
             <h3 className="text-lg font-semibold text-cyber-primary mb-2">Endpoint: /search</h3>
             <p className="text-gray-400 mb-4">Performs a semantic search on encrypted vectors.</p>
             <div className="flex gap-2 mb-4">
               <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 text-xs font-mono">POST</span>
               <span className="text-gray-300 font-mono text-sm">https://api.cyborgdb.com/v1/vectors/search</span>
             </div>
             
             <CodeBlock code={`// Example Request
const results = await cyborgdb.search({
  query: "malware lateral movement",
  topK: 10,
  encrypted: true // REQUIRED for this cluster
});`} />
          </div>

           <div className="glass-panel p-6 rounded-xl">
             <h3 className="text-lg font-semibold text-cyber-secondary mb-2">Endpoint: /insert</h3>
             <p className="text-gray-400 mb-4">Ingests vectors with client-side encryption.</p>
             <div className="flex gap-2 mb-4">
               <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs font-mono">POST</span>
               <span className="text-gray-300 font-mono text-sm">https://api.cyborgdb.com/v1/vectors/insert</span>
             </div>
             
             <CodeBlock code={`// Example Request
await cyborgdb.insert({
  collection: "threats",
  vectors: embeddings,
  metadata: { severity: "critical" }
});`} />
          </div>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-xl h-fit sticky top-6">
        <h3 className="text-lg font-semibold text-white mb-4">Live Console</h3>
        <div className="space-y-4">
          <div className="bg-black rounded-lg p-4 border border-white/10 font-mono text-sm min-h-[200px] text-gray-300">
             {`// Interactive Console
// Click 'Run' to test the encrypted search endpoint

const query = {
  vector: [0.12, -0.44, ...],
  filters: { type: "ransomware" },
  secure: true
};`}
          </div>
          <button 
            onClick={runDemo}
            className="w-full py-3 bg-cyber-primary text-black font-bold rounded-lg hover:bg-cyber-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" /> Run Request
          </button>

          {result && (
            <div className="mt-6 animate-fade-in-up">
              <div className="text-xs text-gray-500 uppercase mb-2">Response Output</div>
              <CodeBlock code={result} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};