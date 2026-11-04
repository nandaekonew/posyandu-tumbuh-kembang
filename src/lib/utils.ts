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

/**
 * Format Keterangan Urutan Anak (Anak Pertama, Anak Kedua, dst.)
 */
export function formatBirthOrder(order?: number | string | null): {
  short: string;
  label: string;
  badge: string;
  orderNumber: number;
} {
  const num = typeof order === 'string' ? parseInt(order, 10) : Number(order) || 1;
  const labels: Record<number, string> = {
    1: 'Anak Pertama',
    2: 'Anak Kedua',
    3: 'Anak Ketiga',
    4: 'Anak Keempat',
    5: 'Anak Kelima',
    6: 'Anak Keenam',
    7: 'Anak Ketujuh',
    8: 'Anak Kedelapan',
    9: 'Anak Kesembilan',
    10: 'Anak Kesepuluh',
  };

  const label = labels[num] || `Anak ke-${num}`;

  return {
    short: `Ke-${num}`,
    label,
    badge: num <= 3 ? `${label} (Ke-${num})` : `Anak ke-${num}`,
    orderNumber: num,
  };
}
