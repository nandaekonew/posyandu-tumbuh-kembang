import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format tanggal ke standar Indonesia (contoh: 27 Jan 2024)
 */
export function formatDateIndo(dateStr: string | Date): string {
  try {
    const d = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(d);
  } catch {
    return String(dateStr);
  }
}

/**
 * Format Berat Badan (kg)
 */
export function formatWeight(kg: number | string | undefined | null): string {
  if (kg === undefined || kg === null) return '-';
  const val = typeof kg === 'string' ? parseFloat(kg) : kg;
  return `${val.toFixed(2)} kg`;
}

/**
 * Format Tinggi Badan (cm)
 */
export function formatHeight(cm: number | string | undefined | null): string {
  if (cm === undefined || cm === null) return '-';
  const val = typeof cm === 'string' ? parseFloat(cm) : cm;
  return `${val.toFixed(1)} cm`;
}
