import { useState } from 'react';
import { Eye, EyeOff, Lock, Fingerprint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { hashCode } from '@/lib/hash';
import { useAuth } from '@/contexts/AuthContext';
import superProgrammatoreLogo from '@/assets/super-programmatore-logo.png';

// Hash SHA-256 pre-calcolato del codice di accesso valido
const VALID_ACCESS_CODE_HASH = '8e0094a56fe502cc605d51c5e62816ef427406578347c26c778868e4846adfa7';

export function LoginPage() {
  const [accessCode, setAccessCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsVerifying(true);

    try {
      // Calcola l'hash del codice inserito
      const inputHash = await hashCode(accessCode.trim());
      
      // Confronta con l'hash valido
      if (inputHash === VALID_ACCESS_CODE_HASH) {
        login();
      } else {
        setError('Codice di accesso non valido. Riprova.');
        setAccessCode('');
      }
    } catch (err) {
      setError('Errore durante la verifica. Riprova.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <img 
            src={superProgrammatoreLogo} 
            alt="Super Programmatore Logo" 
            className="w-48 h-auto drop-shadow-lg"
          />
        </div>

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Observe<span className="text-primary">It</span>
          </h1>
          <p className="text-muted-foreground">
            Dashboard Educativa sull'Osservabilità
          </p>
        </div>

        {/* Login Card */}
        <Card className="glass-panel border-primary/20">
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center gap-2 text-xl">
              <Fingerprint className="w-5 h-5 text-primary" />
              Accesso Protetto
            </CardTitle>
            <CardDescription>
              Inserisci il codice di accesso per continuare
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    type={showCode ? 'text' : 'password'}
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    placeholder="Inserisci il codice di accesso..."
                    className="pr-10 bg-background/50 border-primary/30 focus:border-primary font-mono"
                    disabled={isVerifying}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCode(!showCode)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                  >
                    {showCode ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                
                {error && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-destructive" />
                    {error}
                  </p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={!accessCode.trim() || isVerifying}
              >
                {isVerifying ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Verifica in corso...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Accedi alla Dashboard
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground">
          🔐 Accesso riservato a scopi educativi
        </p>
      </div>
    </div>
  );
}
