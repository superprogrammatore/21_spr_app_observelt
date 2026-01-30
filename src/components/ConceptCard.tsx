import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';

interface ConceptCardProps {
  title: string;
  icon: ReactNode;
  description: string;
  color: 'accent' | 'success' | 'trace';
  examples: string[];
  whatItAnswers: string;
  realWorldTool: string;
}

/**
 * Card educativa per spiegare i concetti di osservabilità
 * 
 * Ogni pilastro dell'osservabilità ha uno scopo specifico:
 * - LOGS: "Cosa è successo?" - Eventi discreti con contesto
 * - METRICS: "Quanto?" - Misurazioni aggregate nel tempo
 * - TRACES: "Dove?" - Percorso delle richieste nel sistema
 */
export function ConceptCard({ 
  title, 
  icon, 
  description, 
  color, 
  examples, 
  whatItAnswers,
  realWorldTool 
}: ConceptCardProps) {
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

  const bgClasses = {
    accent: 'bg-accent/10',
    success: 'bg-success/10',
    trace: 'bg-trace/10',
  };

  return (
    <div className={cn(
      "glass-panel p-5 transition-all duration-300 group",
      colorClasses[color]
    )}>
      <div className="flex items-start gap-4">
        <div className={cn(
          "p-3 rounded-lg bg-secondary/50 transition-all duration-300",
          iconColorClasses[color]
        )}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground mb-1">{title}</h3>
          
          {/* What question does it answer */}
          <div className={cn(
            "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium mb-3",
            bgClasses[color],
            iconColorClasses[color]
          )}>
            <Info className="w-3 h-3" />
            Risponde a: "{whatItAnswers}"
          </div>
          
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
          
          {/* Examples */}
          <div className="space-y-1.5 mb-3">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
              Esempi pratici:
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              {examples.map((example, i) => (
                <li key={i} className="flex items-start gap-2">
                  <code className={cn(
                    "px-1.5 py-0.5 rounded text-[10px] shrink-0",
                    bgClasses[color],
                    iconColorClasses[color]
                  )}>
                    {i + 1}
                  </code>
                  <span>{example}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Real world tool */}
          <div className="pt-2 border-t border-border/50">
            <p className="text-[10px] text-muted-foreground">
              🔧 <strong>Strumenti reali:</strong> {realWorldTool}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
