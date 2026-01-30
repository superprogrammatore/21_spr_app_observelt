import { Activity, Eye } from 'lucide-react';

/**
 * Header del dashboard ObserveIt
 * 
 * Il nome "ObserveIt" richiama il concetto di Osservabilità,
 * fondamentale per capire il comportamento di sistemi complessi.
 */
export function Header() {
  return (
    <header className="glass-panel p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Eye className="w-10 h-10 text-primary" />
            <Activity className="w-5 h-5 text-accent absolute -bottom-1 -right-1 animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Observe<span className="text-primary">It</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Dashboard Educativa sull'Osservabilità
            </p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent animate-pulse-glow" />
            <span className="text-muted-foreground">Logs</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success animate-pulse-glow" />
            <span className="text-muted-foreground">Metriche</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-trace animate-pulse-glow" />
            <span className="text-muted-foreground">Tracce</span>
          </div>
        </div>
      </div>
    </header>
  );
}
