export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';

export interface User {
  id: string;
  username: string;
  role: 'Admin' | 'Analyst' | 'Viewer';
  avatar: string;
  clearanceLevel: number;
}

export interface HistoryItem {
  id: string;
  type: 'SEARCH' | 'INSERT' | 'LOGIN' | 'EXPORT';
  query?: string;
  timestamp: Date;
  details: string;
  status: 'Success' | 'Failed';
  encrypted: boolean;
}

export interface Threat {
  id: string;
  title: string;
  type: string;
  severity: Severity;
  timestamp: Date;
  sourceIp: string;
  status: 'Active' | 'Mitigated' | 'Investigating';
  encrypted: boolean;
  vectorId: string;
  confidence: number;
  description?: string; // AI generated description
  affectedSystems?: string[];
  remediation?: string;
}

export interface SecurityMetric {
  label: string;
  value: string | number;
  change?: number;
  unit?: string;
  status: 'good' | 'warning' | 'critical';
}

export interface SearchResult {
  id: string;
  score: number;
  threat: Threat;
  metadata: Record<string, any>;
  matchReason: string;
}

export interface AuditLog {
  id: string;
  timestamp: Date;
  action: string;
  user: string;
  status: 'Success' | 'Denied';
  details: string;
  encrypted: boolean;
}

export interface VectorNode {
  id: string;
  x: number;
  y: number;
  z: number;
  severity: Severity;
  cluster: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
