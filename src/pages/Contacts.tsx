import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'
import { useContacts } from '@/hooks/useContacts'

const lifecycleLabels: Record<string, string> = {
  subscriber: 'Subscriber',
  lead: 'Lead',
  marketingqualifiedlead: 'MQL',
  salesqualifiedlead: 'SQL',
  opportunity: 'Oportunidade',
  customer: 'Cliente',
  evangelist: 'Evangelista',
  other: 'Outro',
}

const lifecycleColors: Record<string, string> = {
  subscriber: 'bg-gray-100 text-gray-700',
  lead: 'bg-blue-100 text-blue-700',
  marketingqualifiedlead: 'bg-indigo-100 text-indigo-700',
  salesqualifiedlead: 'bg-purple-100 text-purple-700',
  opportunity: 'bg-amber-100 text-amber-700',
  customer: 'bg-green-100 text-green-700',
  evangelist: 'bg-pink-100 text-pink-700',
}

const fonteLabels: Record<string, string> = {
  OFFLINE: 'Offline',
  DIRECT_TRAFFIC: 'Direto',
  SOCIAL_MEDIA: 'Social',
  OTHER_CAMPAIGNS: 'Campanhas',
  PAID_SOCIAL: 'Ads Social',
  ORGANIC_SEARCH: 'Busca Orgânica',
  PAID_SEARCH: 'Busca Paga',
  REFERRALS: 'Referência',
  EMAIL_MARKETING: 'Email',
}

const tabs = [
  { label: 'Todos os contatos', value: 'all' },
  { label: 'Leads', value: 'lead' },
  { label: 'Oportunidades', value: 'opportunity' },
  { label: 'Clientes', value: 'customer' },
]

export default function Contacts() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [activeTab, setActiveTab] = useState('all')

  const { data: contacts, total, loading, pageSize } = useContacts(search, page, activeTab)

  const totalPages = Math.ceil(total / pageSize)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contatos</h1>
          <p className="text-sm text-gray-500">{total.toLocaleString('pt-BR')} contatos</p>
        </div>
      </div>

      {/* Tabs - Views */}
      <div className="flex gap-1 rounded-lg bg-gray-100 p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => { setActiveTab(tab.value); setPage(0) }}
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

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por nome, email, empresa ou telefone..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(0) }}
          className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-left text-xs font-medium uppercase text-gray-500">
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Telefone</th>
                <th className="px-4 py-3">Ciclo de Vida</th>
                <th className="px-4 py-3">Origem</th>
                <th className="px-4 py-3">Renda Mensal</th>
                <th className="px-4 py-3">utm_source</th>
                <th className="px-4 py-3">Deals</th>
                <th className="px-4 py-3">Criado em</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr
                  key={contact.id}
                  onClick={() => navigate(`/contacts/${contact.id}`)}
                  className="cursor-pointer border-b transition-colors hover:bg-gray-50"
                >
                  <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                    {contact.full_name}
                  </td>
                  <td className="px-4 py-3 text-gray-600 max-w-[200px] truncate">{contact.email ?? '-'}</td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{contact.phone ?? '-'}</td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      'inline-flex rounded-full px-2 py-0.5 text-xs font-medium',
                      lifecycleColors[contact.lifecycle_stage ?? ''] ?? 'bg-gray-100 text-gray-600'
                    )}>
                      {lifecycleLabels[contact.lifecycle_stage ?? ''] ?? contact.lifecycle_stage ?? '-'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">
                    {fonteLabels[contact.fonte_registro ?? ''] ?? contact.fonte_registro ?? '-'}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">
                    {contact.renda_mensal ?? '-'}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">
                    {contact.utm_source ?? '-'}
                  </td>
                  <td className="px-4 py-3">
                    {contact.deals_count > 0 ? (
                      <span className="inline-flex items-center gap-1 text-xs">
                        <span className="font-medium text-gray-900">{contact.deals_count}</span>
                        {contact.won_deals_count > 0 && (
                          <span className="text-green-600">({contact.won_deals_count} ganho{contact.won_deals_count > 1 ? 's' : ''})</span>
                        )}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
                    {contact.created_at ? formatDate(contact.created_at) : '-'}
                  </td>
                </tr>
              ))}
              {contacts.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-gray-400">
                    Nenhum contato encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>
          Mostrando {page * pageSize + 1}-{Math.min((page + 1) * pageSize, total)} de {total.toLocaleString('pt-BR')} contatos
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            className="inline-flex items-center gap-1 rounded-md border px-3 py-1 text-sm disabled:opacity-40 hover:bg-gray-50 disabled:hover:bg-white"
          >
            <ChevronLeft className="h-4 w-4" /> Anterior
          </button>
          <span className="text-xs text-gray-400">
            Página {page + 1} de {totalPages || 1}
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
            disabled={page >= totalPages - 1}
            className="inline-flex items-center gap-1 rounded-md border px-3 py-1 text-sm disabled:opacity-40 hover:bg-gray-50 disabled:hover:bg-white"
          >
            Próximo <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
