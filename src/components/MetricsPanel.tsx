import { MetricsSummary } from '@/types/observability';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Activity, Clock, Zap, AlertTriangle, HelpCircle } from 'lucide-react';

interface MetricsPanelProps {
  metrics: MetricsSummary;
}

/**
 * Pannello delle Metriche
 * 
 * Le METRICHE sono fondamentali per:
 * - Monitoraggio: Stato di salute del sistema in tempo reale
 * - Alerting: Notifiche quando si superano soglie critiche
 * - Capacity Planning: Prevedere le risorse necessarie
 */

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  color?: 'primary' | 'success' | 'warning' | 'destructive';
  metricType: string;
  explanation: string;
}

function MetricCard({ label, value, icon, trend, color = 'primary', metricType, explanation }: MetricCardProps) {
  const colorClasses = {
    primary: 'text-primary',
    success: 'text-success',
    warning: 'text-warning',
    destructive: 'text-destructive',
  };

  const bgClasses = {
    primary: 'bg-primary/10',
    success: 'bg-success/10',
    warning: 'bg-warning/10',
    destructive: 'bg-destructive/10',
  };

  return (
    <div className="glass-panel p-4 hover:border-border transition-colors group relative">
      <div className="flex items-start justify-between">
        <div className={cn("p-2 rounded-lg bg-secondary/50", colorClasses[color])}>
          {icon}
        </div>
        <div className="flex items-center gap-1">
          <span className={cn(
            "text-[10px] px-1.5 py-0.5 rounded",
            bgClasses[color],
            colorClasses[color]
          )}>
            {metricType}
          </span>
          {trend && (
            <div className={cn(
              "flex items-center",
              trend === 'up' ? 'text-success' : trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
            )}>
              {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : 
               trend === 'down' ? <TrendingDown className="w-3 h-3" /> : null}
            </div>
          )}
        </div>
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold text-foreground animate-counter">
          {value}
        </p>
        <p className="text-xs text-muted-foreground mt-1">{label}</p>
      </div>
      
      {/* Tooltip on hover */}
      <div className="absolute inset-x-0 bottom-0 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none pt-2">
        <div className="mx-2 p-2 rounded-lg bg-popover border border-border shadow-lg text-[10px] text-muted-foreground">
          <HelpCircle className="w-3 h-3 inline mr-1" />
          {explanation}
        </div>
      </div>
    </div>
  );
}

export function MetricsPanel({ metrics }: MetricsPanelProps) {
  const successRate = metrics.totalRequests > 0 
    ? Math.round((metrics.successfulRequests / metrics.totalRequests) * 100) 
    : 0;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-semibold text-foreground flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          📊 Metriche in Tempo Reale
        </h2>
        <p className="text-xs text-muted-foreground mt-1">
          Le metriche sono numeri che misurano le performance del sistema. Passa il mouse su ogni card per capire cosa significa.
        </p>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <MetricCard
          label="Richieste Totali"
          value={metrics.totalRequests}
          icon={<Activity className="w-4 h-4" />}
          color="primary"
          metricType="Counter"
          explanation="Un COUNTER è un valore che può solo aumentare. Conta quante richieste sono state fatte dall'inizio della simulazione."
        />
        
        <MetricCard
          label="Tasso di Successo"
          value={`${successRate}%`}
          icon={<TrendingUp className="w-4 h-4" />}
          trend={successRate > 90 ? 'up' : successRate < 80 ? 'down' : 'neutral'}
          color={successRate > 90 ? 'success' : successRate < 80 ? 'destructive' : 'warning'}
          metricType="Gauge"
          explanation="Un GAUGE è un valore che può salire o scendere. Mostra la percentuale attuale di richieste andate a buon fine."
        />
        
        <MetricCard
          label="Latenza Media"
          value={`${metrics.averageLatency}ms`}
          icon={<Clock className="w-4 h-4" />}
          color={metrics.averageLatency < 200 ? 'success' : metrics.averageLatency < 500 ? 'warning' : 'destructive'}
          metricType="Histogram"
          explanation="Un HISTOGRAM mostra la distribuzione dei tempi di risposta. Qui vedi la media: quanto tempo impiega una richiesta tipica."
        />
        
        <MetricCard
          label="Richieste/secondo"
          value={metrics.requestsPerSecond}
          icon={<Zap className="w-4 h-4" />}
          color="primary"
          metricType="Rate"
          explanation="Un RATE mostra la frequenza di un evento. Indica quante richieste vengono processate ogni secondo (throughput)."
        />
        
        <MetricCard
          label="Errori Totali"
          value={metrics.failedRequests}
          icon={<AlertTriangle className="w-4 h-4" />}
          color={metrics.failedRequests === 0 ? 'success' : 'destructive'}
          metricType="Counter"
          explanation="Conta il numero totale di richieste fallite. Un valore alto indica problemi nel sistema!"
        />
        
        <MetricCard
          label="Tasso di Errore"
          value={`${metrics.errorRate}%`}
          icon={<TrendingDown className="w-4 h-4" />}
          color={metrics.errorRate < 5 ? 'success' : metrics.errorRate < 15 ? 'warning' : 'destructive'}
          metricType="Gauge"
          explanation="Percentuale di errori sul totale. Sotto il 5% è normale, sopra il 15% c'è un problema serio!"
        />
      </div>
    </div>
  );
}
