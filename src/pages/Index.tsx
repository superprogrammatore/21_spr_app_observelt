import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { LogViewer } from '@/components/LogViewer';
import { MetricsPanel } from '@/components/MetricsPanel';
import { TraceTimeline } from '@/components/TraceTimeline';
import { RequestFlow } from '@/components/RequestFlow';
import { SimulationControls } from '@/components/SimulationControls';
import { ConceptCard } from '@/components/ConceptCard';
import { EducationalBanner } from '@/components/EducationalBanner';
import { IntroModal } from '@/components/IntroModal';
import { useSimulation } from '@/hooks/useSimulation';
import { FileText, BarChart3, GitBranch, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * ObserveIt - Dashboard Educativa sull'Osservabilità
 * 
 * Questa applicazione simula i tre pilastri dell'osservabilità:
 * 
 * 1. LOGGING (Logs) - Registrazione di eventi discreti
 * 2. METRICS (Metriche) - Misurazioni numeriche aggregate
 * 3. TRACING (Tracce) - Percorso delle richieste nel sistema
 * 
 * NOTA: Tutti i dati sono simulati a scopo educativo.
 */
const Index = () => {
  const [showIntro, setShowIntro] = useState(false);
  
  const {
    logs,
    activeRequest,
    completedRequests,
    metrics,
    isRunning,
    startSimulation,
    stopSimulation,
    resetSimulation,
    simulateRequest,
  } = useSimulation();

  // Show intro on first visit
  useEffect(() => {
    const hasSeenIntro = localStorage.getItem('observeit-intro-seen');
    if (!hasSeenIntro) {
      setShowIntro(true);
    }
  }, []);

  const handleCloseIntro = () => {
    setShowIntro(false);
    localStorage.setItem('observeit-intro-seen', 'true');
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Intro Modal */}
      {showIntro && <IntroModal onClose={handleCloseIntro} />}

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Header />

        {/* Quick Intro Button */}
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowIntro(true)}
            className="text-xs border-primary/30 text-primary hover:bg-primary/10"
          >
            <GraduationCap className="w-4 h-4 mr-2" />
            Rivedi l'introduzione
          </Button>
        </div>

        {/* Educational Banner */}
        <EducationalBanner />

        {/* Concept Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <ConceptCard
            title="📝 Logs (Registri)"
            icon={<FileText className="w-5 h-5" />}
            description="Messaggi testuali che raccontano cosa succede nel sistema. Ogni log include timestamp, livello di gravità e contesto."
            color="accent"
            whatItAnswers="Cosa è successo?"
            examples={[
              "User Mario ha fatto login alle 14:32",
              "Errore: Connessione al database rifiutata",
              "Pagamento di €50 processato con successo"
            ]}
            realWorldTool="ELK Stack (Elasticsearch), Loki, Splunk, CloudWatch"
          />
          <ConceptCard
            title="📊 Metrics (Metriche)"
            icon={<BarChart3 className="w-5 h-5" />}
            description="Valori numerici che misurano le performance. Permettono di creare dashboard, allarmi e prevedere problemi."
            color="success"
            whatItAnswers="Quanto bene funziona?"
            examples={[
              "Latenza media: 145ms (era 50ms ieri)",
              "1.2K richieste al secondo",
              "Error rate: 0.5% (soglia allarme: 5%)"
            ]}
            realWorldTool="Prometheus, Grafana, Datadog, New Relic"
          />
          <ConceptCard
            title="🔗 Traces (Tracce)"
            icon={<GitBranch className="w-5 h-5" />}
            description="Percorso completo di una richiesta attraverso tutti i servizi. Mostra dove viene speso il tempo e dove nascono i problemi."
            color="trace"
            whatItAnswers="Dove succede?"
            examples={[
              "Frontend (50ms) → Backend (100ms) → DB (200ms)",
              "Span: 'Validazione input' - 25ms",
              "TraceId: abc123 collega tutti gli eventi"
            ]}
            realWorldTool="Jaeger, Zipkin, Tempo, AWS X-Ray"
          />
        </div>

        {/* Simulation Controls */}
        <SimulationControls
          isRunning={isRunning}
          onStart={startSimulation}
          onStop={stopSimulation}
          onReset={resetSimulation}
          onSingleRequest={simulateRequest}
        />

        {/* Request Flow Visualization */}
        <RequestFlow activeRequest={activeRequest} />

        {/* Metrics Panel */}
        <MetricsPanel metrics={metrics} />

        {/* Logs and Traces */}
        <div className="grid lg:grid-cols-2 gap-6">
          <LogViewer logs={logs} />
          <TraceTimeline
            activeRequest={activeRequest}
            completedRequests={completedRequests}
          />
        </div>

        {/* Footer */}
        <footer className="glass-panel p-4 text-center text-sm text-muted-foreground space-y-2">
          <p>
            ⚠️ <strong>Disclaimer:</strong> Questa è una simulazione educativa. 
            Tutti i dati sono generati localmente e non vengono raccolti o trasmessi.
          </p>
          <p className="text-xs">
            💡 <strong>Prossimi passi:</strong> Per imparare di più, cerca "OpenTelemetry", "Prometheus", o "Grafana" online!
          </p>
          <p className="text-xs text-primary">
            ObserveIt - Impara l'osservabilità vedendola in azione 🚀
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
