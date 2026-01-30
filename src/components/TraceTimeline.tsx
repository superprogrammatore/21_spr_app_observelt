import { SimulatedRequest } from '@/types/observability';
import { cn } from '@/lib/utils';
import { CheckCircle2, XCircle, Clock, ArrowRight } from 'lucide-react';

interface TraceTimelineProps {
  activeRequest: SimulatedRequest | null;
  completedRequests: SimulatedRequest[];
}

/**
 * Timeline delle Tracce (Traces)
 * 
 * Le TRACCE sono fondamentali per:
 * - Distributed Tracing: Seguire una richiesta attraverso microservizi
 * - Performance Analysis: Identificare colli di bottiglia
 * - Root Cause Analysis: Trovare dove è nato un problema
 * - Dependency Mapping: Capire le relazioni tra servizi
 * 
 * Ogni traccia contiene:
 * - TraceId: Identificatore unico della richiesta
 * - Spans: Singole operazioni all'interno della traccia
 * - Duration: Tempo totale di esecuzione
 * - Status: Successo o errore
 */
export function TraceTimeline({ activeRequest, completedRequests }: TraceTimelineProps) {
  const serviceColors = {
    frontend: 'bg-primary',
    backend: 'bg-accent',
    database: 'bg-trace',
  };

  const calculateTotalDuration = (request: SimulatedRequest) => {
    return request.spans.reduce((sum, span) => sum + span.duration, 0);
  };

  return (
    <div className="glass-panel h-[400px] flex flex-col">
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-trace animate-pulse" />
            Trace Timeline
          </h2>
          <span className="text-xs text-muted-foreground">
            Distributed Tracing
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4">
        {/* Active Request Animation */}
        {activeRequest && (
          <div className="relative p-4 rounded-lg border border-primary/50 bg-primary/5 animate-pulse-glow">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary animate-spin" />
                <span className="text-sm font-medium text-primary">
                  {activeRequest.type} {activeRequest.endpoint}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                trace:{activeRequest.traceId.slice(0, 8)}
              </span>
            </div>
            
            {/* Animated flow */}
            <div className="flex items-center gap-2 mt-4">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <span className="text-xs text-muted-foreground">Frontend</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground animate-flow" />
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                <span className="text-xs text-muted-foreground">Backend</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground animate-flow" />
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-trace animate-pulse" />
                <span className="text-xs text-muted-foreground">Database</span>
              </div>
            </div>
          </div>
        )}

        {/* Completed Requests */}
        {completedRequests.length === 0 && !activeRequest ? (
          <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
            Avvia la simulazione per vedere le tracce...
          </div>
        ) : (
          completedRequests.map((request, index) => {
            const totalDuration = calculateTotalDuration(request);
            const maxDuration = Math.max(...request.spans.map(s => s.duration));
            
            return (
              <div
                key={request.id}
                className={cn(
                  "p-3 rounded-lg border transition-all",
                  request.status === 'success' 
                    ? 'border-success/30 bg-success/5' 
                    : 'border-destructive/30 bg-destructive/5',
                  index === 0 && "animate-fade-up"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {request.status === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    ) : (
                      <XCircle className="w-4 h-4 text-destructive" />
                    )}
                    <span className="text-xs font-medium text-foreground">
                      {request.type} {request.endpoint}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {Math.round(totalDuration)}ms
                  </span>
                </div>

                {/* Span bars */}
                <div className="space-y-1 mt-3">
                  {request.spans.map((span) => (
                    <div key={span.id} className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground w-16 shrink-0">
                        {span.service}
                      </span>
                      <div className="flex-1 h-4 bg-secondary/30 rounded overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded transition-all duration-500",
                            serviceColors[span.service],
                            span.status === 'error' && 'opacity-50'
                          )}
                          style={{
                            width: `${(span.duration / maxDuration) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground w-12 text-right">
                        {Math.round(span.duration)}ms
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
