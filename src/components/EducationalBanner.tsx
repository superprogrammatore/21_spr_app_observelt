import { Lightbulb, BookOpen, AlertTriangle } from 'lucide-react';

/**
 * Banner educativo che spiega l'importanza dell'osservabilità
 */
export function EducationalBanner() {
  return (
    <div className="glass-panel p-6 border-l-4 border-l-primary">
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Lightbulb className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-foreground mb-2">
            Perché l'Osservabilità è Cruciale?
          </h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Immagina questo scenario:</strong> È venerdì sera, 
              il tuo e-commerce riceve un picco di traffico, e improvvisamente gli utenti iniziano 
              a lamentarsi che i pagamenti non funzionano. <span className="text-destructive">Come trovi il problema?</span>
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div className="p-3 rounded-lg bg-accent/10 border border-accent/30">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-accent" />
                  <span className="font-medium text-accent">Con i LOGS</span>
                </div>
                <p className="text-xs">
                  Vedi che c'è un errore "Connection timeout" nel servizio pagamenti. 
                  Sai COSA è successo.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-success/10 border border-success/30">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-success" />
                  <span className="font-medium text-success">Con le METRICHE</span>
                </div>
                <p className="text-xs">
                  Noti che la latenza del database è passata da 50ms a 5000ms. 
                  Sai QUANTO è grave.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-trace/10 border border-trace/30">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-trace" />
                  <span className="font-medium text-trace">Con le TRACCE</span>
                </div>
                <p className="text-xs">
                  Segui il percorso della richiesta e trovi che il collo di bottiglia 
                  è una query non ottimizzata. Sai DOVE intervenire.
                </p>
              </div>
            </div>
            <p className="pt-2 text-foreground/80">
              <strong>Senza osservabilità</strong>, saresti al buio. Con essa, risolvi il problema 
              in minuti invece che ore. Questa dashboard simula esattamente questo processo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
