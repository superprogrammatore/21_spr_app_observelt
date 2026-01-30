import { MetricsSummary } from '@/types/observability';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Activity, Clock, Zap, AlertTriangle } from 'lucide-react';

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
 * - SLO/SLA: Misurare il rispetto degli accordi di servizio
 * 
 * Tipi comuni di metriche:
 * - Counter: Valori che solo aumentano (es. richieste totali)
 * - Gauge: Valori che possono salire o scendere (es. memoria usata)
 * - Histogram: Distribuzione di valori (es. latenze)
 */

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  color?: 'primary' | 'success' | 'warning' | 'destructive';
  subtitle?: string;
}

function MetricCard({ label, value, icon, trend, color = 'primary', subtitle }: MetricCardProps) {
  const colorClasses = {
    primary: 'text-primary',
    success: 'text-success',
    warning: 'text-warning',
    destructive: 'text-destructive',
  };

  return (
    <div className="glass-panel p-4 hover:border-border transition-colors">
      <div className="flex items-start justify-between">
        <div className={cn("p-2 rounded-lg bg-secondary/50", colorClasses[color])}>
          {icon}
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-xs",
            trend === 'up' ? 'text-success' : trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
          )}>
            {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : 
             trend === 'down' ? <TrendingDown className="w-3 h-3" /> : null}
          </div>
        )}
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold text-foreground animate-counter">
          {value}
        </p>
        <p className="text-xs text-muted-foreground mt-1">{label}</p>
        {subtitle && (
          <p className="text-[10px] text-muted-foreground/60 mt-0.5">{subtitle}</p>
        )}
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
      <h2 className="font-semibold text-foreground flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
        Metriche in Tempo Reale
      </h2>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <MetricCard
          label="Richieste Totali"
          value={metrics.totalRequests}
          icon={<Activity className="w-4 h-4" />}
          color="primary"
          subtitle="Counter - solo incrementa"
        />
        
        <MetricCard
          label="Successo"
          value={`${successRate}%`}
          icon={<TrendingUp className="w-4 h-4" />}
          trend={successRate > 90 ? 'up' : successRate < 80 ? 'down' : 'neutral'}
          color={successRate > 90 ? 'success' : successRate < 80 ? 'destructive' : 'warning'}
          subtitle="Gauge - varia nel tempo"
        />
        
        <MetricCard
          label="Latenza Media"
          value={`${metrics.averageLatency}ms`}
          icon={<Clock className="w-4 h-4" />}
          color={metrics.averageLatency < 200 ? 'success' : metrics.averageLatency < 500 ? 'warning' : 'destructive'}
          subtitle="Histogram - distribuzione"
        />
        
        <MetricCard
          label="Req/secondo"
          value={metrics.requestsPerSecond}
          icon={<Zap className="w-4 h-4" />}
          color="primary"
          subtitle="Rate - frequenza"
        />
        
        <MetricCard
          label="Errori"
          value={metrics.failedRequests}
          icon={<AlertTriangle className="w-4 h-4" />}
          color={metrics.failedRequests === 0 ? 'success' : 'destructive'}
          subtitle="Counter di errori"
        />
        
        <MetricCard
          label="Error Rate"
          value={`${metrics.errorRate}%`}
          icon={<TrendingDown className="w-4 h-4" />}
          color={metrics.errorRate < 5 ? 'success' : metrics.errorRate < 15 ? 'warning' : 'destructive'}
          subtitle="Percentuale errori"
        />
      </div>
    </div>
  );
}
