import { SimulatedRequest } from '@/types/observability';
import { cn } from '@/lib/utils';
import { Monitor, Server, Database, ArrowRight, Loader2 } from 'lucide-react';

interface RequestFlowProps {
  activeRequest: SimulatedRequest | null;
}

/**
 * Visualizzazione del flusso della richiesta
 * 
 * Questo componente mostra visivamente come una richiesta
 * viaggia attraverso i diversi layer di un'applicazione:
 * 
 * 1. FRONTEND: L'interfaccia utente che invia la richiesta
 * 2. BACKEND: Il server che processa la logica
 * 3. DATABASE: Lo storage persistente
 * 
 * In produzione, ogni passaggio genera:
 * - Logs per tracciare gli eventi
 * - Metriche per misurare le performance
 * - Spans per collegare le operazioni
 */
export function RequestFlow({ activeRequest }: RequestFlowProps) {
  const isActive = !!activeRequest;

  return (
    <div className="glass-panel p-6">
      <h2 className="font-semibold text-foreground mb-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        Flusso della Richiesta
      </h2>

      <div className="flex items-center justify-between gap-4">
        {/* Frontend */}
        <div className={cn(
          "flex-1 p-4 rounded-xl border-2 transition-all duration-300 text-center",
          isActive 
            ? "border-primary bg-primary/10 glow-primary" 
            : "border-border/50 bg-secondary/30"
        )}>
          <Monitor className={cn(
            "w-8 h-8 mx-auto mb-2 transition-colors",
            isActive ? "text-primary" : "text-muted-foreground"
          )} />
          <p className="text-sm font-medium text-foreground">Frontend</p>
          <p className="text-xs text-muted-foreground mt-1">React App</p>
          {isActive && (
            <div className="mt-2 flex items-center justify-center gap-1">
              <Loader2 className="w-3 h-3 text-primary animate-spin" />
              <span className="text-xs text-primary">Invio richiesta...</span>
            </div>
          )}
        </div>

        {/* Arrow 1 */}
        <div className="flex items-center">
          <ArrowRight className={cn(
            "w-6 h-6 transition-all",
            isActive ? "text-primary animate-flow" : "text-muted-foreground/30"
          )} />
        </div>

        {/* Backend */}
        <div className={cn(
          "flex-1 p-4 rounded-xl border-2 transition-all duration-300 text-center",
          isActive 
            ? "border-accent bg-accent/10 glow-accent" 
            : "border-border/50 bg-secondary/30"
        )}>
          <Server className={cn(
            "w-8 h-8 mx-auto mb-2 transition-colors",
            isActive ? "text-accent" : "text-muted-foreground"
          )} />
          <p className="text-sm font-medium text-foreground">Backend</p>
          <p className="text-xs text-muted-foreground mt-1">API Server</p>
          {isActive && (
            <div className="mt-2 flex items-center justify-center gap-1">
              <Loader2 className="w-3 h-3 text-accent animate-spin" />
              <span className="text-xs text-accent">Elaborazione...</span>
            </div>
          )}
        </div>

        {/* Arrow 2 */}
        <div className="flex items-center">
          <ArrowRight className={cn(
            "w-6 h-6 transition-all",
            isActive ? "text-accent animate-flow" : "text-muted-foreground/30"
          )} />
        </div>

        {/* Database */}
        <div className={cn(
          "flex-1 p-4 rounded-xl border-2 transition-all duration-300 text-center",
          isActive 
            ? "border-trace bg-trace/10 glow-trace" 
            : "border-border/50 bg-secondary/30"
        )}>
          <Database className={cn(
            "w-8 h-8 mx-auto mb-2 transition-colors",
            isActive ? "text-trace" : "text-muted-foreground"
          )} />
          <p className="text-sm font-medium text-foreground">Database</p>
          <p className="text-xs text-muted-foreground mt-1">PostgreSQL</p>
          {isActive && (
            <div className="mt-2 flex items-center justify-center gap-1">
              <Loader2 className="w-3 h-3 text-trace animate-spin" />
              <span className="text-xs text-trace">Query...</span>
            </div>
          )}
        </div>
      </div>

      {/* Request Info */}
      {activeRequest && (
        <div className="mt-4 p-3 rounded-lg bg-secondary/30 border border-border/50">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              <span className="text-primary font-medium">{activeRequest.type}</span>
              {' '}{activeRequest.endpoint}
            </span>
            <span className="text-trace">
              TraceID: {activeRequest.traceId.slice(0, 12)}...
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
