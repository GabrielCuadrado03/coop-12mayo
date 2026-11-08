export function formatPhoneNumber(phone: string): string {
  if (!phone) return '';
  const clean = phone.replace(/\D/g, '');
  if (clean.startsWith('593') && clean.length === 12) {
    return `0${clean.substring(3, 5)} ${clean.substring(5, 8)} ${clean.substring(8)}`;
  }
  return phone;
}

export function formatElapsedSeconds(secondsTotal: number): string {
  const mins = Math.floor(secondsTotal / 60);
  const secs = Math.floor(secondsTotal % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function calculateElapsedSeconds(timestamp: string | Date): number {
  const start = new Date(timestamp).getTime();
  const now = Date.now();
  const diffMs = Math.max(0, now - start);
  return Math.floor(diffMs / 1000);
}
