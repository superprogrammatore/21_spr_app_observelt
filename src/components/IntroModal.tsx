import { useState } from 'react';
import { ChevronRight, Eye, Server, Bug, Lightbulb, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface IntroModalProps {
  onClose: () => void;
}

/**
 * Modal introduttivo per spiegare l'osservabilità ai principianti
 */
export function IntroModal({ onClose }: IntroModalProps) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      icon: <Eye className="w-12 h-12 text-primary" />,
      title: "Cos'è l'Osservabilità?",
      content: (
        <div className="space-y-4 text-muted-foreground">
          <p>
            <strong className="text-foreground">L'osservabilità</strong> è la capacità di capire 
            cosa sta succedendo all'interno di un'applicazione guardandola "dall'esterno".
          </p>
          <p>
            Immagina un'auto: il cruscotto ti mostra velocità, benzina, temperatura del motore. 
            Senza questi indicatori, non sapresti se qualcosa non va finché non è troppo tardi!
          </p>
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
            <p className="text-sm text-foreground">
              🚗 <strong>Cruscotto auto</strong> = Osservabilità per automobili<br />
              💻 <strong>Dashboard come questa</strong> = Osservabilità per applicazioni
            </p>
          </div>
        </div>
      ),
    },
    {
      icon: <Bug className="w-12 h-12 text-destructive" />,
      title: "Perché è Importante?",
      content: (
        <div className="space-y-4 text-muted-foreground">
          <p>
            Quando un'applicazione ha un problema, senza osservabilità sei completamente al buio:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-destructive">❌</span>
              <span>"Il sito è lento" - Ma perché? Dove?</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive">❌</span>
              <span>"I pagamenti non funzionano" - Da quando? Per chi?</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive">❌</span>
              <span>"L'app crasha" - In quale punto del codice?</span>
            </li>
          </ul>
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
            <p className="text-sm">
              <strong className="text-destructive">Senza osservabilità:</strong> ore o giorni per trovare un bug<br />
              <strong className="text-success">Con osservabilità:</strong> minuti per identificare e risolvere
            </p>
          </div>
        </div>
      ),
    },
    {
      icon: <Server className="w-12 h-12 text-accent" />,
      title: "I Tre Pilastri",
      content: (
        <div className="space-y-4 text-muted-foreground">
          <p>L'osservabilità si basa su <strong className="text-foreground">tre tipi di dati</strong>:</p>
          
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-accent/10 border border-accent/30">
              <p className="font-medium text-accent mb-1">📝 1. LOGS (Registri)</p>
              <p className="text-sm">Messaggi testuali che dicono "cosa è successo"</p>
              <p className="text-xs text-muted-foreground mt-1">
                Es: "Utente Mario ha fatto login alle 14:32"
              </p>
            </div>
            
            <div className="p-3 rounded-lg bg-success/10 border border-success/30">
              <p className="font-medium text-success mb-1">📊 2. METRICHE (Numeri)</p>
              <p className="text-sm">Valori numerici che misurano "quanto"</p>
              <p className="text-xs text-muted-foreground mt-1">
                Es: "145 richieste al secondo, 2% di errori"
              </p>
            </div>
            
            <div className="p-3 rounded-lg bg-trace/10 border border-trace/30">
              <p className="font-medium text-trace mb-1">🔗 3. TRACCE (Percorsi)</p>
              <p className="text-sm">Il viaggio di una richiesta nel sistema</p>
              <p className="text-xs text-muted-foreground mt-1">
                Es: "Frontend → Backend → Database (totale: 250ms)"
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: <Lightbulb className="w-12 h-12 text-warning" />,
      title: "Come Usare Questa Dashboard",
      content: (
        <div className="space-y-4 text-muted-foreground">
          <p>Questa dashboard <strong className="text-foreground">simula</strong> un'applicazione reale:</p>
          
          <ol className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">1</span>
              <span>Clicca <strong className="text-primary">"Avvia"</strong> per iniziare a generare richieste simulate</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">2</span>
              <span>Osserva i <strong className="text-accent">LOG</strong> apparire in tempo reale (a sinistra in basso)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">3</span>
              <span>Guarda le <strong className="text-success">METRICHE</strong> aggiornarsi (contatori, percentuali)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">4</span>
              <span>Segui le <strong className="text-trace">TRACCE</strong> per vedere il percorso delle richieste</span>
            </li>
          </ol>
          
          <div className="p-4 rounded-lg bg-warning/10 border border-warning/30">
            <p className="text-sm">
              💡 <strong>Suggerimento:</strong> Noterai che alcune richieste falliscono (15% circa). 
              Guarda come i log mostrano l'errore, le metriche contano i fallimenti, 
              e le tracce evidenziano dove si è verificato il problema!
            </p>
          </div>
        </div>
      ),
    },
  ];

  const currentStep = steps[step];
  const isLastStep = step === steps.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-lg glass-panel p-6 relative animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-6">
          {steps.map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                i === step ? "bg-primary" : "bg-border"
              )}
            />
          ))}
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">{currentStep.icon}</div>
          <h2 className="text-xl font-bold text-foreground mb-4">{currentStep.title}</h2>
          <div className="text-left">{currentStep.content}</div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => setStep(s => s - 1)}
            disabled={step === 0}
            className="text-muted-foreground"
          >
            Indietro
          </Button>
          
          {isLastStep ? (
            <Button onClick={onClose} className="bg-primary hover:bg-primary/80">
              Inizia ad Esplorare!
            </Button>
          ) : (
            <Button onClick={() => setStep(s => s + 1)} className="bg-primary hover:bg-primary/80">
              Avanti
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
