/**
 * Utility per l'hashing sicuro del codice di accesso
 * Utilizza SHA-256 per creare un hash irreversibile
 */

export async function hashCode(code: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(code);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Hash SHA-256 pre-calcolato del codice di accesso valido
export const VALID_ACCESS_CODE_HASH = '8e0094a56fe502cc605d51c5e62816ef427406578347c26c778868e4846adfa7';

// Funzione per verificare il codice
export async function verifyAccessCode(inputCode: string): Promise<boolean> {
  const inputHash = await hashCode(inputCode);
  return inputHash === VALID_ACCESS_CODE_HASH;
}
