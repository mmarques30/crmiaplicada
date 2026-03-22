import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number | null): string {
  if (value === null) return '-'
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function formatDate(date: string | null): string {
  if (!date) return '-'
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatDateTime(date: string | null): string {
  if (!date) return '-'
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function daysAgo(date: string): number {
  const now = new Date()
  const then = new Date(date)
  const diff = now.getTime() - then.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

export function productLabel(product: string): string {
  const labels: Record<string, string> = {
    business: 'Business',
    skills: 'Skills',
    academy: 'Academy',
  }
  return labels[product] ?? product
}

export function productColor(product: string): string {
  const colors: Record<string, string> = {
    business: 'bg-blue-100 text-blue-800',
    skills: 'bg-purple-100 text-purple-800',
    academy: 'bg-green-100 text-green-800',
  }
  return colors[product] ?? 'bg-gray-100 text-gray-800'
}

export function qualificationColor(status: string): string {
  const colors: Record<string, string> = {
    lead: 'bg-gray-100 text-gray-600',
    mql: 'bg-yellow-100 text-yellow-800',
    sql: 'bg-emerald-100 text-emerald-800',
  }
  return colors[status] ?? 'bg-gray-100 text-gray-600'
}
