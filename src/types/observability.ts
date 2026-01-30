/**
 * Tipi per il sistema di osservabilità simulato
 * 
 * L'osservabilità si basa su tre pilastri fondamentali:
 * 1. LOGS - Eventi testuali che descrivono cosa sta succedendo
 * 2. METRICS - Valori numerici che misurano le performance
 * 3. TRACES - Percorsi delle richieste attraverso il sistema
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  id: string;
  timestamp: Date;
  level: LogLevel;
  message: string;
  service: 'frontend' | 'backend' | 'database';
  traceId?: string;
  metadata?: Record<string, unknown>;
}

export interface Metric {
  id: string;
  name: string;
  value: number;
  unit: string;
  timestamp: Date;
  labels?: Record<string, string>;
}

export interface TraceSpan {
  id: string;
  traceId: string;
  name: string;
  service: 'frontend' | 'backend' | 'database';
  startTime: Date;
  duration: number; // in ms
  status: 'success' | 'error';
  parentSpanId?: string;
}

export interface SimulatedRequest {
  id: string;
  traceId: string;
  type: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  status: 'pending' | 'success' | 'error';
  startTime: Date;
  spans: TraceSpan[];
}

export interface MetricsSummary {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageLatency: number;
  requestsPerSecond: number;
  errorRate: number;
}
