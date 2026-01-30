import { SimulatedRequest } from '@/types/observability';
import { cn } from '@/lib/utils';
import { CheckCircle2, XCircle, Clock, ArrowRight, HelpCircle } from 'lucide-react';

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
 */
export function TraceTimeline({ activeRequest, completedRequests }: TraceTimelineProps) {
  const serviceColors = {
    frontend: 'bg-primary',
    backend: 'bg-accent',
    database: 'bg-trace',
  };

  const serviceLabels = {
    frontend: '🖥️ Frontend',
    backend: '⚙️ Backend',
    database: '🗄️ Database',
  };

  const calculateTotalDuration = (request: SimulatedRequest) => {
    return request.spans.reduce((sum, span) => sum + span.duration, 0);
  };

  return (
    <div className="glass-panel h-[450px] flex flex-col">
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-trace animate-pulse" />
            🔗 Trace Timeline
          </h2>
          <span className="text-xs text-muted-foreground">
            Distributed Tracing
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Le tracce mostrano il percorso completo di una richiesta: dove va, quanto tempo impiega in ogni passaggio.
        </p>
      </div>

      {/* Legend */}
      <div className="px-4 py-2 border-b border-border/30 flex items-center gap-4 text-[10px]">
        <span className="text-muted-foreground flex items-center gap-1">
          <HelpCircle className="w-3 h-3" />
          Le barre mostrano il tempo speso in ogni servizio:
        </span>
        <div className="flex items-center gap-1">
          <div className="w-3 h-2 rounded bg-primary" />
          <span>Frontend</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-2 rounded bg-accent" />
          <span>Backend</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-2 rounded bg-trace" />
          <span>Database</span>
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
                🔗 trace:{activeRequest.traceId.slice(0, 8)}
              </span>
            </div>
            
            {/* Animated flow with explanation */}
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
            <p className="text-[10px] text-primary/70 mt-2 text-center">
              ⏳ La richiesta sta viaggiando attraverso il sistema...
            </p>
          </div>
        )}

        {/* Completed Requests */}
        {completedRequests.length === 0 && !activeRequest ? (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground gap-3">
            <div className="text-4xl">🔍</div>
            <p className="text-center">
              Premi <strong className="text-primary">"Avvia"</strong> per vedere le tracce.<br />
              <span className="text-[10px]">Ogni traccia mostra il percorso e il tempo di una richiesta</span>
            </p>
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
                  index === 0 && "animate-fade-up ring-1 ring-primary/20"
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
                    {request.status === 'error' && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-destructive/20 text-destructive">
                        Fallita!
                      </span>
                    )}
                  </div>
                  <span className={cn(
                    "text-xs font-medium",
                    totalDuration < 300 ? "text-success" : totalDuration < 500 ? "text-warning" : "text-destructive"
                  )}>
                    ⏱️ {Math.round(totalDuration)}ms totali
                  </span>
                </div>

                {/* Span bars with labels */}
                <div className="space-y-1.5 mt-3">
                  {request.spans.map((span) => (
                    <div key={span.id} className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground w-20 shrink-0">
                        {serviceLabels[span.service]}
                      </span>
                      <div className="flex-1 h-5 bg-secondary/30 rounded overflow-hidden relative">
                        <div
                          className={cn(
                            "h-full rounded transition-all duration-500 flex items-center justify-end pr-1",
                            serviceColors[span.service],
                            span.status === 'error' && 'opacity-50'
                          )}
                          style={{
                            width: `${Math.max((span.duration / maxDuration) * 100, 20)}%`,
                          }}
                        >
                          <span className="text-[9px] text-white font-medium">
                            {Math.round(span.duration)}ms
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Bottleneck indicator */}
                {request.spans.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-border/30">
                    <p className="text-[10px] text-muted-foreground">
                      💡 <strong>Collo di bottiglia:</strong>{' '}
                      {request.spans.reduce((max, span) => span.duration > max.duration ? span : max, request.spans[0]).service}
                      {' '}({Math.round(Math.max(...request.spans.map(s => s.duration)))}ms)
                    </p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
