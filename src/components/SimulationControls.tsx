import { Play, Pause, RotateCcw, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SimulationControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onSingleRequest: () => void;
}

/**
 * Controlli per la simulazione
 * 
 * Permettono di:
 * - Avviare/fermare la generazione automatica di richieste
 * - Generare singole richieste manuali
 * - Resettare tutte le metriche e i log
 */
export function SimulationControls({
  isRunning,
  onStart,
  onStop,
  onReset,
  onSingleRequest,
}: SimulationControlsProps) {
  return (
    <div className="glass-panel p-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="font-semibold text-foreground">Controlli Simulazione</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Genera richieste simulate per vedere l'osservabilità in azione
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onSingleRequest}
            disabled={isRunning}
            className="border-border/50 hover:border-primary hover:text-primary"
          >
            <Zap className="w-4 h-4 mr-2" />
            Singola Richiesta
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="border-border/50 hover:border-destructive hover:text-destructive"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          
          {isRunning ? (
            <Button
              size="sm"
              onClick={onStop}
              className="bg-destructive hover:bg-destructive/80 text-destructive-foreground"
            >
              <Pause className="w-4 h-4 mr-2" />
              Stop
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={onStart}
              className="bg-primary hover:bg-primary/80 text-primary-foreground"
            >
              <Play className="w-4 h-4 mr-2" />
              Avvia
            </Button>
          )}
        </div>
      </div>
      
      {/* Status indicator */}
      <div className={cn(
        "mt-3 flex items-center gap-2 text-xs",
        isRunning ? "text-success" : "text-muted-foreground"
      )}>
        <div className={cn(
          "w-2 h-2 rounded-full",
          isRunning ? "bg-success animate-pulse" : "bg-muted-foreground"
        )} />
        {isRunning ? "Simulazione in corso..." : "Simulazione ferma"}
      </div>
    </div>
  );
}
