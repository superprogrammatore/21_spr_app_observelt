import { Lightbulb, BookOpen, AlertTriangle, HelpCircle } from 'lucide-react';

/**
 * Banner educativo che spiega l'importanza dell'osservabilità
 * con un esempio pratico e comprensibile
 */
export function EducationalBanner() {
  return (
    <div className="glass-panel p-6 border-l-4 border-l-primary">
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-lg bg-primary/10 shrink-0">
          <Lightbulb className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            Perché l'Osservabilità è Cruciale?
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-normal">
              Scenario Reale
            </span>
          </h2>
          
          <div className="space-y-4 text-sm text-muted-foreground">
            {/* Scenario */}
            <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-info shrink-0 mt-0.5" />
                <div>
                  <p className="text-foreground font-medium mb-2">🎬 Immagina questo scenario:</p>
                  <p>
                    È venerdì sera, il tuo e-commerce riceve un picco di traffico, 
                    e improvvisamente gli utenti iniziano a lamentarsi: 
                    <span className="text-destructive font-medium"> "I pagamenti non funzionano!"</span>
                  </p>
                  <p className="mt-2 text-foreground">
                    Come trovi il problema? Dove guardi? Da dove inizi?
                  </p>
                </div>
              </div>
            </div>

            {/* Solutions */}
            <div className="grid md:grid-cols-3 gap-3">
              <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-accent" />
                  <span className="font-medium text-accent">Con i LOGS</span>
                </div>
                <p className="text-xs mb-2">
                  Vedi questo messaggio:
                </p>
                <code className="text-[10px] block p-2 rounded bg-background/50 text-destructive">
                  ERROR: Connection timeout to payment-service
                </code>
                <p className="text-xs mt-2 text-foreground">
                  ✅ Ora sai <strong>COSA</strong> è successo!
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-success/10 border border-success/30">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-success" />
                  <span className="font-medium text-success">Con le METRICHE</span>
                </div>
                <p className="text-xs mb-2">
                  Vedi questi numeri:
                </p>
                <div className="text-[10px] p-2 rounded bg-background/50 space-y-1">
                  <p>Latenza DB: <span className="text-destructive">5000ms</span> (era 50ms)</p>
                  <p>Error rate: <span className="text-destructive">45%</span> (era 0.5%)</p>
                </div>
                <p className="text-xs mt-2 text-foreground">
                  ✅ Ora sai <strong>QUANTO</strong> è grave!
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-trace/10 border border-trace/30">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-trace" />
                  <span className="font-medium text-trace">Con le TRACCE</span>
                </div>
                <p className="text-xs mb-2">
                  Vedi il percorso:
                </p>
                <div className="text-[10px] p-2 rounded bg-background/50 space-y-1">
                  <p>Frontend: <span className="text-success">50ms ✓</span></p>
                  <p>Backend: <span className="text-success">100ms ✓</span></p>
                  <p>Database: <span className="text-destructive">4850ms ✗</span></p>
                </div>
                <p className="text-xs mt-2 text-foreground">
                  ✅ Ora sai <strong>DOVE</strong> intervenire!
                </p>
              </div>
            </div>

            {/* Conclusion */}
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 flex items-center gap-3">
              <span className="text-2xl">⚡</span>
              <p className="text-foreground">
                <strong>Risultato:</strong> Problema risolto in <span className="text-success">5 minuti</span> invece che <span className="text-destructive">5 ore</span>. 
                Questa dashboard ti mostra esattamente come funziona!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
