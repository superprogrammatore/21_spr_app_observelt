import { Header } from '@/components/Header';
import { LogViewer } from '@/components/LogViewer';
import { MetricsPanel } from '@/components/MetricsPanel';
import { TraceTimeline } from '@/components/TraceTimeline';
import { RequestFlow } from '@/components/RequestFlow';
import { SimulationControls } from '@/components/SimulationControls';
import { ConceptCard } from '@/components/ConceptCard';
import { EducationalBanner } from '@/components/EducationalBanner';
import { useSimulation } from '@/hooks/useSimulation';
import { FileText, BarChart3, GitBranch } from 'lucide-react';

/**
 * ObserveIt - Dashboard Educativa sull'Osservabilità
 * 
 * Questa applicazione simula i tre pilastri dell'osservabilità:
 * 
 * 1. LOGGING (Logs)
 *    - Registrazione di eventi discreti
 *    - Contesto testuale di cosa succede
 *    - Utile per debug e audit
 * 
 * 2. METRICS (Metriche)
 *    - Misurazioni numeriche aggregate
 *    - Monitoraggio delle performance
 *    - Base per alerting e SLA
 * 
 * 3. TRACING (Tracce)
 *    - Percorso delle richieste nel sistema
 *    - Correlazione tra servizi
 *    - Identificazione di colli di bottiglia
 * 
 * NOTA: Tutti i dati sono simulati a scopo educativo.
 * Nessun dato reale viene raccolto o trasmesso.
 */
const Index = () => {
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

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Header />

        {/* Educational Banner */}
        <EducationalBanner />

        {/* Concept Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <ConceptCard
            title="📝 Logs (Registri)"
            icon={<FileText className="w-5 h-5" />}
            description="Eventi testuali che raccontano COSA succede nel sistema. Ogni log ha un timestamp, un livello di gravità e un messaggio."
            color="accent"
            examples={[
              "User login at 14:32:05",
              "Error: Connection refused",
              "Payment processed successfully"
            ]}
          />
          <ConceptCard
            title="📊 Metrics (Metriche)"
            icon={<BarChart3 className="w-5 h-5" />}
            description="Valori numerici che misurano QUANTO bene funziona il sistema. Permettono di impostare soglie e allarmi."
            color="success"
            examples={[
              "Latenza media: 145ms",
              "Richieste/secondo: 1.2K",
              "Error rate: 0.5%"
            ]}
          />
          <ConceptCard
            title="🔗 Traces (Tracce)"
            icon={<GitBranch className="w-5 h-5" />}
            description="Percorso completo di una richiesta attraverso tutti i servizi. Mostra DOVE viene speso il tempo."
            color="trace"
            examples={[
              "Frontend → Backend → DB",
              "Span duration: 50ms",
              "Parent-child relationships"
            ]}
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
        <footer className="glass-panel p-4 text-center text-sm text-muted-foreground">
          <p>
            ⚠️ <strong>Disclaimer:</strong> Questa è una simulazione educativa. 
            Tutti i dati sono generati localmente e non vengono raccolti o trasmessi.
          </p>
          <p className="mt-2 text-xs">
            ObserveIt - Impara l'osservabilità vedendola in azione 🚀
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
