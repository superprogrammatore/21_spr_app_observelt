import { useState, useCallback, useRef, useEffect } from 'react';
import { LogEntry, TraceSpan, SimulatedRequest, MetricsSummary, LogLevel } from '@/types/observability';

/**
 * Hook per gestire la simulazione dell'osservabilità
 * 
 * Questo hook simula:
 * - Generazione di log a vari livelli (debug, info, warn, error)
 * - Creazione di tracce che seguono il percorso delle richieste
 * - Calcolo di metriche aggregate in tempo reale
 * 
 * In un sistema reale, questi dati verrebbero raccolti da:
 * - Sistemi di logging (ELK Stack, Loki)
 * - Sistemi di tracing (Jaeger, Zipkin)
 * - Sistemi di metriche (Prometheus, Datadog)
 */

const generateId = () => Math.random().toString(36).substr(2, 9);

const ENDPOINTS = [
  '/api/users',
  '/api/products',
  '/api/orders',
  '/api/auth/login',
  '/api/payments',
];

const LOG_MESSAGES: Record<string, Record<LogLevel, string[]>> = {
  frontend: {
    debug: ['Rendering component...', 'State updated', 'Effect triggered'],
    info: ['User clicked button', 'Navigation to page', 'Form submitted'],
    warn: ['Slow network detected', 'Retrying request...', 'Cache miss'],
    error: ['Failed to fetch data', 'Network timeout', 'Invalid response'],
  },
  backend: {
    debug: ['Processing request...', 'Validating input', 'Building response'],
    info: ['Request received', 'Authentication successful', 'Response sent'],
    warn: ['High memory usage', 'Rate limit approaching', 'Slow query detected'],
    error: ['Database connection failed', 'Authentication error', 'Internal server error'],
  },
  database: {
    debug: ['Query parsed', 'Index used', 'Connection pooled'],
    info: ['Query executed', 'Transaction committed', 'Record inserted'],
    warn: ['Lock wait timeout', 'Large result set', 'Missing index'],
    error: ['Deadlock detected', 'Query timeout', 'Constraint violation'],
  },
};

export function useSimulation() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [activeRequest, setActiveRequest] = useState<SimulatedRequest | null>(null);
  const [completedRequests, setCompletedRequests] = useState<SimulatedRequest[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [metrics, setMetrics] = useState<MetricsSummary>({
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    averageLatency: 0,
    requestsPerSecond: 0,
    errorRate: 0,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<Date | null>(null);

  const addLog = useCallback((
    service: 'frontend' | 'backend' | 'database',
    level: LogLevel,
    traceId?: string
  ) => {
    const messages = LOG_MESSAGES[service][level];
    const message = messages[Math.floor(Math.random() * messages.length)];
    
    const log: LogEntry = {
      id: generateId(),
      timestamp: new Date(),
      level,
      message,
      service,
      traceId,
    };

    setLogs(prev => [log, ...prev].slice(0, 100)); // Keep last 100 logs
  }, []);

  const simulateRequest = useCallback(() => {
    const traceId = generateId();
    const endpoint = ENDPOINTS[Math.floor(Math.random() * ENDPOINTS.length)];
    const willFail = Math.random() < 0.15; // 15% error rate

    const request: SimulatedRequest = {
      id: generateId(),
      traceId,
      type: ['GET', 'POST', 'PUT', 'DELETE'][Math.floor(Math.random() * 4)] as SimulatedRequest['type'],
      endpoint,
      status: 'pending',
      startTime: new Date(),
      spans: [],
    };

    setActiveRequest(request);

    // Frontend span
    addLog('frontend', 'info', traceId);
    const frontendSpan: TraceSpan = {
      id: generateId(),
      traceId,
      name: 'HTTP Request',
      service: 'frontend',
      startTime: new Date(),
      duration: 50 + Math.random() * 100,
      status: 'success',
    };

    setTimeout(() => {
      addLog('frontend', 'debug', traceId);
      
      // Backend span
      setTimeout(() => {
        addLog('backend', 'info', traceId);
        const backendSpan: TraceSpan = {
          id: generateId(),
          traceId,
          name: 'Process Request',
          service: 'backend',
          startTime: new Date(),
          duration: 100 + Math.random() * 200,
          status: willFail ? 'error' : 'success',
          parentSpanId: frontendSpan.id,
        };

        setTimeout(() => {
          addLog('backend', 'debug', traceId);
          
          // Database span
          setTimeout(() => {
            addLog('database', 'info', traceId);
            const dbSpan: TraceSpan = {
              id: generateId(),
              traceId,
              name: 'Query Execution',
              service: 'database',
              startTime: new Date(),
              duration: 20 + Math.random() * 80,
              status: willFail ? 'error' : 'success',
              parentSpanId: backendSpan.id,
            };

            if (willFail) {
              addLog('database', 'error', traceId);
              addLog('backend', 'error', traceId);
              addLog('frontend', 'error', traceId);
            } else {
              addLog('database', 'debug', traceId);
              addLog('backend', 'info', traceId);
              addLog('frontend', 'info', traceId);
            }

            const totalDuration = frontendSpan.duration + backendSpan.duration + dbSpan.duration;
            
            const completedRequest: SimulatedRequest = {
              ...request,
              status: willFail ? 'error' : 'success',
              spans: [frontendSpan, backendSpan, dbSpan],
            };

            setActiveRequest(null);
            setCompletedRequests(prev => [completedRequest, ...prev].slice(0, 20));

            setMetrics(prev => {
              const newTotal = prev.totalRequests + 1;
              const newSuccess = prev.successfulRequests + (willFail ? 0 : 1);
              const newFailed = prev.failedRequests + (willFail ? 1 : 0);
              const elapsed = startTimeRef.current 
                ? (Date.now() - startTimeRef.current.getTime()) / 1000 
                : 1;

              return {
                totalRequests: newTotal,
                successfulRequests: newSuccess,
                failedRequests: newFailed,
                averageLatency: Math.round(
                  (prev.averageLatency * prev.totalRequests + totalDuration) / newTotal
                ),
                requestsPerSecond: Math.round((newTotal / elapsed) * 10) / 10,
                errorRate: Math.round((newFailed / newTotal) * 1000) / 10,
              };
            });
          }, 200);
        }, 150);
      }, 100);
    }, 100);
  }, [addLog]);

  const startSimulation = useCallback(() => {
    if (isRunning) return;
    
    setIsRunning(true);
    startTimeRef.current = new Date();
    
    // Initial request
    simulateRequest();
    
    // Continue with random intervals
    intervalRef.current = setInterval(() => {
      simulateRequest();
    }, 2000 + Math.random() * 2000);
  }, [isRunning, simulateRequest]);

  const stopSimulation = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resetSimulation = useCallback(() => {
    stopSimulation();
    setLogs([]);
    setActiveRequest(null);
    setCompletedRequests([]);
    setMetrics({
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      averageLatency: 0,
      requestsPerSecond: 0,
      errorRate: 0,
    });
    startTimeRef.current = null;
  }, [stopSimulation]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    logs,
    activeRequest,
    completedRequests,
    metrics,
    isRunning,
    startSimulation,
    stopSimulation,
    resetSimulation,
    simulateRequest,
  };
}
