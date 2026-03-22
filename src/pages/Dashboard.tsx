import { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { DollarSign, TrendingUp, Target, Users } from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'
import type { ProductType } from '@/lib/types'

const mockMetrics = {
  activeDeals: 35,
  pipelineValue: 450000,
  winRate: 28.5,
  avgTicket: 12500,
}

const mockFunnelData = [
  { stage: 'MQL', deals: 18, value: 135000 },
  { stage: 'Contato Iniciado', deals: 12, value: 96000 },
  { stage: 'Conectado', deals: 8, value: 72000 },
  { stage: 'Proposta', deals: 5, value: 55000 },
  { stage: 'Negociação', deals: 3, value: 42000 },
  { stage: 'Ganho', deals: 2, value: 30000 },
]

interface MetricCardProps {
  icon: React.ReactNode
  label: string
  value: string
  bg: string
}

function MetricCard({ icon, label, value, bg }: MetricCardProps) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', bg)}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  )
}

const tabs: { label: string; value: 'all' | ProductType }[] = [
  { label: 'Todos', value: 'all' },
  { label: 'Business', value: 'business' },
  { label: 'Skills', value: 'skills' },
  { label: 'Academy', value: 'academy' },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'all' | ProductType>('all')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">Visão geral do seu pipeline de vendas</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg bg-gray-100 p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              'rounded-md px-4 py-1.5 text-sm font-medium transition-colors',
              activeTab === tab.value
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          icon={<Target className="h-5 w-5 text-blue-600" />}
          label="Deals Ativos"
          value={String(mockMetrics.activeDeals)}
          bg="bg-blue-100"
        />
        <MetricCard
          icon={<DollarSign className="h-5 w-5 text-emerald-600" />}
          label="Valor do Pipeline"
          value={formatCurrency(mockMetrics.pipelineValue)}
          bg="bg-emerald-100"
        />
        <MetricCard
          icon={<TrendingUp className="h-5 w-5 text-purple-600" />}
          label="Taxa de Conversão"
          value={`${mockMetrics.winRate}%`}
          bg="bg-purple-100"
        />
        <MetricCard
          icon={<Users className="h-5 w-5 text-orange-600" />}
          label="Ticket Médio"
          value={formatCurrency(mockMetrics.avgTicket)}
          bg="bg-orange-100"
        />
      </div>

      {/* Funnel Chart */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Funil de Vendas</h2>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={mockFunnelData} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" />
            <YAxis type="category" dataKey="stage" width={120} tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value: number) => [formatCurrency(value), 'Valor']}
              labelStyle={{ fontWeight: 600 }}
            />
            <Bar dataKey="value" fill="#6366f1" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
