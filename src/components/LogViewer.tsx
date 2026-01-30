import { LogEntry } from '@/types/observability';
import { cn } from '@/lib/utils';
import { AlertCircle, AlertTriangle, Info, Bug } from 'lucide-react';

interface LogViewerProps {
  logs: LogEntry[];
}

/**
 * Visualizzatore di Log in stile terminale
 * 
 * I LOG sono fondamentali per:
 * - Debug: Capire cosa è successo in un momento specifico
 * - Audit: Tracciare azioni degli utenti
 * - Troubleshooting: Identificare la causa di errori
 * 
 * Ogni log include:
 * - Timestamp: Quando è successo
 * - Level: Gravità (debug, info, warn, error)
 * - Service: Quale componente ha generato il log
 * - Message: Descrizione dell'evento
 * - TraceId: Collegamento con la traccia della richiesta
 */
export function LogViewer({ logs }: LogViewerProps) {
  const levelConfig = {
    debug: { icon: Bug, color: 'text-muted-foreground', bg: 'bg-muted/30' },
    info: { icon: Info, color: 'text-info', bg: 'bg-info/10' },
    warn: { icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/10' },
    error: { icon: AlertCircle, color: 'text-destructive', bg: 'bg-destructive/10' },
  };

  const serviceColors = {
    frontend: 'text-primary',
    backend: 'text-accent',
    database: 'text-trace',
  };

  const formatTime = (date: Date) => {
    const time = date.toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    const ms = date.getMilliseconds().toString().padStart(3, '0');
    return `${time}.${ms}`;
  };

  return (
    <div className="glass-panel h-[400px] flex flex-col">
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Log Stream
          </h2>
          <span className="text-xs text-muted-foreground">
            {logs.length} eventi
          </span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-thin p-2 font-mono text-xs">
        {logs.length === 0 ? (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            Avvia la simulazione per vedere i log...
          </div>
        ) : (
          <div className="space-y-1">
            {logs.map((log, index) => {
              const { icon: Icon, color, bg } = levelConfig[log.level];
              return (
                <div
                  key={log.id}
                  className={cn(
                    "flex items-start gap-2 p-2 rounded-md transition-all",
                    bg,
                    index === 0 && "animate-slide-in"
                  )}
                >
                  <Icon className={cn("w-3.5 h-3.5 mt-0.5 shrink-0", color)} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-muted-foreground">
                        {formatTime(log.timestamp)}
                      </span>
                      <span className={cn(
                        "px-1.5 py-0.5 rounded text-[10px] uppercase font-medium",
                        serviceColors[log.service],
                        "bg-current/10"
                      )}>
                        {log.service}
                      </span>
                      {log.traceId && (
                        <span className="text-trace/60 text-[10px]">
                          trace:{log.traceId.slice(0, 6)}
                        </span>
                      )}
                    </div>
                    <p className={cn("mt-1", color)}>{log.message}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
