import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ConceptCardProps {
  title: string;
  icon: ReactNode;
  description: string;
  color: 'accent' | 'success' | 'trace';
  examples: string[];
}

/**
 * Card educativa per spiegare i concetti di osservabilità
 * 
 * Ogni pilastro dell'osservabilità ha uno scopo specifico:
 * - LOGS: "Cosa è successo?" - Eventi discreti con contesto
 * - METRICS: "Quanto?" - Misurazioni aggregate nel tempo
 * - TRACES: "Dove?" - Percorso delle richieste nel sistema
 */
export function ConceptCard({ title, icon, description, color, examples }: ConceptCardProps) {
  const colorClasses = {
    accent: 'border-accent/30 hover:border-accent/60',
    success: 'border-success/30 hover:border-success/60',
    trace: 'border-trace/30 hover:border-trace/60',
  };

  const iconColorClasses = {
    accent: 'text-accent',
    success: 'text-success',
    trace: 'text-trace',
  };

  const glowClasses = {
    accent: 'glow-accent',
    success: 'glow-success',
    trace: 'glow-trace',
  };

  return (
    <div className={cn(
      "glass-panel p-5 transition-all duration-300 group",
      colorClasses[color]
    )}>
      <div className="flex items-start gap-4">
        <div className={cn(
          "p-3 rounded-lg bg-secondary/50 transition-all duration-300",
          iconColorClasses[color],
          "group-hover:" + glowClasses[color]
        )}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Esempi:</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              {examples.map((example, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className={cn("w-1.5 h-1.5 rounded-full", `bg-${color}`)} />
                  {example}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
