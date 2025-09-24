import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function formatDateRange(start: string, end: string): string {
  const startDate = new Date(start);
  const endDate = new Date(end);
  
  const startFormatted = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(startDate);
  
  const endFormatted = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(endDate);
  
  return `${startFormatted} - ${endFormatted}`;
}

export function calculateDaysBetween(start: string, end: string): number {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function formatPrice(amount: number, currency: string = 'USD'): string {
  if (amount >= 1000) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatPriceCompact(amount: number): string {
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}k`;
  }
  return `$${amount}`;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function formatCO2(kg: number): string {
  if (kg >= 1000) {
    return `${(kg / 1000).toFixed(1)}t CO₂`;
  }
  return `${kg}kg CO₂`;
}

export function formatDuration(hours: number): string {
  if (hours < 1) {
    return `${Math.round(hours * 60)}min`;
  }
  if (hours === 1) {
    return '1hr';
  }
  if (hours < 24) {
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    if (minutes === 0) {
      return `${wholeHours}hr`;
    }
    return `${wholeHours}hr ${minutes}min`;
  }
  const days = Math.floor(hours / 24);
  const remainingHours = Math.round(hours % 24);
  if (remainingHours === 0) {
    return `${days}d`;
  }
  return `${days}d ${remainingHours}hr`;
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function generateMediaId(): string {
  return `media_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function generateBundleId(): string {
  return `bundle_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Demo helper for simulating async operations
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function simulateApiCall<T>(
  data: T, 
  delayMs: number = 1000
): Promise<T> {
  await sleep(delayMs);
  return data;
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function extractDomainFromUrl(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function capitalizeWords(str: string): string {
  return str.replace(/\b\w/g, char => char.toUpperCase());
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function roundToNearest(value: number, nearest: number): number {
  return Math.round(value / nearest) * nearest;
}

// Confidence score helpers
export function getConfidenceLabel(confidence: number): string {
  if (confidence >= 0.9) return 'Very High';
  if (confidence >= 0.8) return 'High';
  if (confidence >= 0.7) return 'Good';
  if (confidence >= 0.6) return 'Fair';
  return 'Low';
}

export function getConfidenceColor(confidence: number): string {
  if (confidence >= 0.9) return 'text-green-600';
  if (confidence >= 0.8) return 'text-blue-600';
  if (confidence >= 0.7) return 'text-yellow-600';
  if (confidence >= 0.6) return 'text-orange-600';
  return 'text-red-600';
}