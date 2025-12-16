import { Threat, SearchResult, AuditLog, User, HistoryItem } from '../types';

// Mock data generators
const THREAT_TYPES = ['Ransomware', 'Phishing', 'DDoS', 'SQL Injection', 'XSS', 'Zero-day', 'APT', 'Brute Force'];
const SEVERITIES: ('Critical' | 'High' | 'Medium' | 'Low')[] = ['Critical', 'High', 'Medium', 'Low'];

const generateId = () => Math.random().toString(36).substr(2, 9);

// ---------------------------------------------------------
// 🔌 CYBORGDB CONNECTION
// ---------------------------------------------------------
// In a production environment, this key authorizes access to 
// the Encrypted Vector Enclave.
const CYBORGDB_API_KEY = process.env.VITE_CYBORGDB_API_KEY;

const generateMockThreat = (): Threat => ({
  id: generateId(),
  title: `${THREAT_TYPES[Math.floor(Math.random() * THREAT_TYPES.length)]} detected on Node ${Math.floor(Math.random() * 50)}`,
  type: THREAT_TYPES[Math.floor(Math.random() * THREAT_TYPES.length)],
  severity: SEVERITIES[Math.floor(Math.random() * SEVERITIES.length)],
  timestamp: new Date(),
  sourceIp: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
  status: 'Active',
  encrypted: true,
  vectorId: `vec_${generateId()}`,
  confidence: 85 + Math.floor(Math.random() * 14)
});

class CyborgDBService {
  private threats: Threat[] = [];
  private logs: AuditLog[] = [];
  private history: HistoryItem[] = [];
  private currentUser: User | null = null;
  private isConnected: boolean = false;

  constructor() {
    // Initialize with some data
    for (let i = 0; i < 50; i++) {
      this.threats.push(generateMockThreat());
    }
    // Simulation of connection handshake
    this.isConnected = true; 
  }

  // --- Auth Methods ---
  async login(username: string): Promise<User> {
    await this.simulateLatency(800);
    const user: User = {
      id: 'usr_' + generateId(),
      username: username || 'SecOp_Admin',
      role: 'Admin',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + username,
      clearanceLevel: 5
    };
    this.currentUser = user;
    this.addToHistory('LOGIN', `User ${username} authenticated via CyborgDB Biometric Handshake`, 'Success');
    return user;
  }

  logout() {
    this.currentUser = null;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  // --- History Methods ---
  addToHistory(type: HistoryItem['type'], details: string, status: 'Success' | 'Failed' = 'Success', query?: string) {
    this.history.unshift({
      id: generateId(),
      type,
      details,
      status,
      timestamp: new Date(),
      encrypted: true,
      query
    });
  }

  async getUserHistory(): Promise<HistoryItem[]> {
    await this.simulateLatency(300);
    return this.history;
  }

  // --- Core Methods ---
  async getStats() {
    await this.simulateLatency(200);
    return {
      totalThreats: this.threats.length,
      encryptedVectors: this.threats.length * 768, // Mock size
      activeEncryptedQueries: Math.floor(Math.random() * 50) + 10,
      securityScore: 98,
    };
  }

  async streamThreats(callback: (threat: Threat) => void) {
    setInterval(() => {
      if (Math.random() > 0.7) {
        const newThreat = generateMockThreat();
        this.threats.unshift(newThreat);
        if (this.threats.length > 200) this.threats.pop();
        callback(newThreat);
      }
    }, 2000);
  }

  async search(query: string, mode: 'semantic' | 'hybrid' = 'semantic'): Promise<SearchResult[]> {
    await this.simulateLatency(450); 
    
    this.addToHistory('SEARCH', `CyborgDB Encrypted Search: "${mode}" mode`, 'Success', query);

    // Mock results based on query
    const results = this.threats
      .slice(0, 8)
      .map(t => ({
        id: t.id,
        score: 0.85 + Math.random() * 0.14,
        threat: t,
        metadata: { source: 'CyborgDB Secure Index' },
        matchReason: `CyborgDB Vector Similarity: ${(0.85 + Math.random() * 0.14).toFixed(4)}`
      }))
      .sort((a, b) => b.score - a.score);

    return results;
  }

  private simulateLatency(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const cyborgService = new CyborgDBService();
