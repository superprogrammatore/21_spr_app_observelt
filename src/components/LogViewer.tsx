import { LogEntry } from '@/types/observability';
import { cn } from '@/lib/utils';
import { AlertCircle, AlertTriangle, Info, Bug, HelpCircle } from 'lucide-react';

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
 */
export function LogViewer({ logs }: LogViewerProps) {
  const levelConfig = {
    debug: { 
      icon: Bug, 
      color: 'text-muted-foreground', 
      bg: 'bg-muted/30',
      label: 'DEBUG',
      description: 'Dettagli tecnici per sviluppatori'
    },
    info: { 
      icon: Info, 
      color: 'text-info', 
      bg: 'bg-info/10',
      label: 'INFO',
      description: 'Operazione completata normalmente'
    },
    warn: { 
      icon: AlertTriangle, 
      color: 'text-warning', 
      bg: 'bg-warning/10',
      label: 'WARN',
      description: 'Attenzione, potenziale problema'
    },
    error: { 
      icon: AlertCircle, 
      color: 'text-destructive', 
      bg: 'bg-destructive/10',
      label: 'ERROR',
      description: 'Qualcosa è andato storto!'
    },
  };

  const serviceColors = {
    frontend: 'text-primary',
    backend: 'text-accent',
    database: 'text-trace',
  };

  const serviceLabels = {
    frontend: '🖥️ Frontend',
    backend: '⚙️ Backend',
    database: '🗄️ Database',
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
    <div className="glass-panel h-[450px] flex flex-col">
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            📝 Log Stream
          </h2>
          <span className="text-xs text-muted-foreground">
            {logs.length} eventi
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          I log sono messaggi testuali che raccontano cosa succede nel sistema, momento per momento.
        </p>
      </div>

      {/* Legend */}
      <div className="px-4 py-2 border-b border-border/30 flex flex-wrap gap-3 text-[10px]">
        {Object.entries(levelConfig).map(([key, config]) => (
          <div key={key} className="flex items-center gap-1.5 group relative">
            <config.icon className={cn("w-3 h-3", config.color)} />
            <span className={config.color}>{config.label}</span>
            <HelpCircle className="w-2.5 h-2.5 text-muted-foreground/50" />
            {/* Tooltip */}
            <div className="absolute bottom-full left-0 mb-1 hidden group-hover:block z-10">
              <div className="bg-popover text-popover-foreground text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap border border-border">
                {config.description}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-thin p-2 font-mono text-xs">
        {logs.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground gap-3">
            <div className="text-4xl">📋</div>
            <p className="text-center">
              Premi <strong className="text-primary">"Avvia"</strong> per vedere i log apparire qui.<br />
              <span className="text-[10px]">Ogni log mostra: timestamp, servizio, livello e messaggio</span>
            </p>
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
                    index === 0 && "animate-slide-in ring-1 ring-primary/30"
                  )}
                >
                  <Icon className={cn("w-3.5 h-3.5 mt-0.5 shrink-0", color)} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-muted-foreground font-medium">
                        {formatTime(log.timestamp)}
                      </span>
                      <span className={cn(
                        "px-1.5 py-0.5 rounded text-[10px] font-medium",
                        serviceColors[log.service],
                        "bg-current/10"
                      )}>
                        {serviceLabels[log.service]}
                      </span>
                      {log.traceId && (
                        <span className="text-trace/60 text-[10px]" title="ID della traccia - collega questo log alla richiesta">
                          🔗 trace:{log.traceId.slice(0, 6)}
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
