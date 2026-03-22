import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail, Phone, Briefcase, Clock } from 'lucide-react'
import { cn, formatCurrency, daysAgo, productLabel, productColor, qualificationColor } from '@/lib/utils'
import type { DealWithRelations, Stage } from '@/lib/types'

const now = new Date().toISOString()

const mockStages: Stage[] = [
  { id: 's1', pipeline_id: 'pipe-business-1', name: 'MQL', display_order: 1, probability: 10, created_at: '' },
  { id: 's2', pipeline_id: 'pipe-business-1', name: 'Contato Iniciado', display_order: 2, probability: 20, created_at: '' },
  { id: 's3', pipeline_id: 'pipe-business-1', name: 'Conectado', display_order: 3, probability: 40, created_at: '' },
  { id: 's4', pipeline_id: 'pipe-business-1', name: 'Diagnóstico', display_order: 4, probability: 60, created_at: '' },
  { id: 's5', pipeline_id: 'pipe-business-1', name: 'Proposta Enviada', display_order: 5, probability: 75, created_at: '' },
  { id: 's6', pipeline_id: 'pipe-business-1', name: 'Negociação', display_order: 6, probability: 90, created_at: '' },
  { id: 's7', pipeline_id: 'pipe-business-1', name: 'Ganho', display_order: 7, probability: 100, created_at: '' },
  { id: 's8', pipeline_id: 'pipe-business-1', name: 'Perdido', display_order: 8, probability: 0, created_at: '' },
]

const mockDeals: Record<string, DealWithRelations> = {
  d1: {
    id: 'd1', hubspot_id: null, name: 'Consultoria IA - Empresa X', contact_id: 'c1', pipeline_id: 'pipe-business-1', stage_id: 's1', product: 'business', amount: 15000, qualification_status: 'mql', canal_origem: 'site', motivo_perda: null, ultimo_contato: now, stage_entered_at: '2026-03-18T00:00:00Z', owner_id: null, closed_at: null, is_won: null, created_at: '2026-03-10T00:00:00Z', updated_at: now,
    contact: { id: 'c1', hubspot_id: null, first_name: 'Maria', last_name: 'Silva', email: 'maria@empresax.com', phone: '(11) 99999-1234', company: 'Empresa X', cargo: 'CEO', numero_de_liderados: '50', faixa_de_faturamento: '1M-5M', renda_mensal: null, motivo_para_aprender_ia: null, objetivo_com_a_comunidade: null, produto_interesse: ['business'], manychat_id: null, whatsapp_opt_in: true, utm_source: null, utm_medium: null, utm_campaign: null, utm_term: null, owner_id: null, created_at: now, updated_at: now },
    stage: mockStages[0],
  },
  d2: {
    id: 'd2', hubspot_id: null, name: 'Treinamento IA Equipe', contact_id: 'c2', pipeline_id: 'pipe-business-1', stage_id: 's2', product: 'business', amount: 28000, qualification_status: 'sql', canal_origem: 'indicação', motivo_perda: null, ultimo_contato: now, stage_entered_at: '2026-03-15T00:00:00Z', owner_id: null, closed_at: null, is_won: null, created_at: '2026-03-05T00:00:00Z', updated_at: now,
    contact: { id: 'c2', hubspot_id: null, first_name: 'João', last_name: 'Oliveira', email: 'joao@techinova.com', phone: '(21) 98888-5678', company: 'TechInova', cargo: 'CTO', numero_de_liderados: '20', faixa_de_faturamento: '500K-1M', renda_mensal: null, motivo_para_aprender_ia: null, objetivo_com_a_comunidade: null, produto_interesse: ['business', 'skills'], manychat_id: null, whatsapp_opt_in: true, utm_source: null, utm_medium: null, utm_campaign: null, utm_term: null, owner_id: null, created_at: now, updated_at: now },
    stage: mockStages[1],
  },
  d3: {
    id: 'd3', hubspot_id: null, name: 'Automação Processos', contact_id: 'c3', pipeline_id: 'pipe-business-1', stage_id: 's3', product: 'business', amount: 42000, qualification_status: 'sql', canal_origem: 'webinar', motivo_perda: null, ultimo_contato: now, stage_entered_at: '2026-03-10T00:00:00Z', owner_id: null, closed_at: null, is_won: null, created_at: '2026-02-28T00:00:00Z', updated_at: now,
    contact: { id: 'c3', hubspot_id: null, first_name: 'Ana', last_name: 'Costa', email: 'ana@globalcorp.com', phone: '(11) 97777-9012', company: 'GlobalCorp', cargo: 'Diretora de Operações', numero_de_liderados: '100', faixa_de_faturamento: '5M-10M', renda_mensal: null, motivo_para_aprender_ia: null, objetivo_com_a_comunidade: null, produto_interesse: ['business'], manychat_id: null, whatsapp_opt_in: false, utm_source: null, utm_medium: null, utm_campaign: null, utm_term: null, owner_id: null, created_at: now, updated_at: now },
    stage: mockStages[2],
  },
  d4: {
    id: 'd4', hubspot_id: null, name: 'Workshop IA Generativa', contact_id: 'c4', pipeline_id: 'pipe-business-1', stage_id: 's5', product: 'business', amount: 8500, qualification_status: 'lead', canal_origem: 'instagram', motivo_perda: null, ultimo_contato: now, stage_entered_at: '2026-03-05T00:00:00Z', owner_id: null, closed_at: null, is_won: null, created_at: '2026-02-20T00:00:00Z', updated_at: now,
    contact: { id: 'c4', hubspot_id: null, first_name: 'Carlos', last_name: 'Mendes', email: 'carlos@startup.io', phone: '(31) 96666-3456', company: 'Startup.io', cargo: 'Founder', numero_de_liderados: '10', faixa_de_faturamento: '100K-500K', renda_mensal: null, motivo_para_aprender_ia: null, objetivo_com_a_comunidade: null, produto_interesse: ['skills'], manychat_id: null, whatsapp_opt_in: true, utm_source: null, utm_medium: null, utm_campaign: null, utm_term: null, owner_id: null, created_at: now, updated_at: now },
    stage: mockStages[4],
  },
}

const mockActivities = [
  { id: 'a1', type: 'email' as const, subject: 'Proposta enviada', body: 'Proposta comercial enviada por email', created_at: '2026-03-20T14:30:00Z' },
  { id: 'a2', type: 'call' as const, subject: 'Ligação de qualificação', body: 'Qualificação do lead como SQL', created_at: '2026-03-18T10:00:00Z' },
  { id: 'a3', type: 'stage_change' as const, subject: 'Mudança de etapa', body: 'MQL → Contato Iniciado', created_at: '2026-03-16T09:15:00Z' },
  { id: 'a4', type: 'meeting' as const, subject: 'Reunião de descoberta', body: 'Reunião para entender necessidades', created_at: '2026-03-14T15:00:00Z' },
]

const activityIcon: Record<string, string> = {
  email: 'bg-blue-100 text-blue-600',
  call: 'bg-green-100 text-green-600',
  whatsapp: 'bg-emerald-100 text-emerald-600',
  meeting: 'bg-purple-100 text-purple-600',
  note: 'bg-gray-100 text-gray-600',
  stage_change: 'bg-orange-100 text-orange-600',
}

export default function DealDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const deal = mockDeals[id ?? ''] ?? mockDeals.d1

  if (!deal) return <div className="p-8 text-gray-500">Deal não encontrado.</div>

  const currentStageIndex = mockStages.findIndex((s) => s.id === deal.stage_id)
  const activeStages = mockStages.filter(
    (s) => !s.name.toLowerCase().includes('ganho') && !s.name.toLowerCase().includes('perdido')
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="rounded-lg border p-2 text-gray-500 hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{deal.name}</h1>
          <div className="mt-1 flex items-center gap-2">
            <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium', productColor(deal.product))}>
              {productLabel(deal.product)}
            </span>
            <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium uppercase', qualificationColor(deal.qualification_status))}>
              {deal.qualification_status}
            </span>
          </div>
        </div>
      </div>

      {/* Stage Progress Bar */}
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold uppercase text-gray-500">Progresso no Pipeline</h2>
        <div className="flex items-center gap-1">
          {activeStages.map((stage, _i) => {
            const stageIdx = mockStages.findIndex((s) => s.id === stage.id)
            const isCurrent = stage.id === deal.stage_id
            const isPast = stageIdx < currentStageIndex

            return (
              <div key={stage.id} className="flex-1">
                <div
                  className={cn(
                    'h-2 rounded-full',
                    isCurrent ? 'bg-indigo-500' : isPast ? 'bg-indigo-300' : 'bg-gray-200'
                  )}
                />
                <p
                  className={cn(
                    'mt-1 text-center text-[10px]',
                    isCurrent ? 'font-semibold text-indigo-600' : 'text-gray-400'
                  )}
                >
                  {stage.name}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Deal Info */}
        <div className="space-y-4">
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-sm font-semibold uppercase text-gray-500">Detalhes do Deal</h2>
            <div className="space-y-1">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Valor</span>
                <span className="text-sm font-semibold text-gray-900">{formatCurrency(deal.amount)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Etapa</span>
                <span className="text-sm font-medium text-gray-900">{deal.stage?.name ?? '-'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Dias na etapa</span>
                <span className="text-sm font-medium text-gray-900">{daysAgo(deal.stage_entered_at)}d</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Canal de Origem</span>
                <span className="text-sm font-medium text-gray-900">{deal.canal_origem ?? '-'}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-500">Criado em</span>
                <span className="text-sm font-medium text-gray-900">
                  {new Date(deal.created_at).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Card */}
          {deal.contact && (
            <div
              onClick={() => navigate(`/contacts/${deal.contact!.id}`)}
              className="cursor-pointer rounded-xl border bg-white p-5 shadow-sm transition-colors hover:bg-gray-50"
            >
              <h2 className="mb-3 text-sm font-semibold uppercase text-gray-500">Contato</h2>
              <p className="text-sm font-semibold text-gray-900">
                {deal.contact.first_name} {deal.contact.last_name}
              </p>
              <p className="text-xs text-gray-500">{deal.contact.cargo} &middot; {deal.contact.company}</p>
              <div className="mt-2 space-y-1">
                {deal.contact.email && (
                  <p className="flex items-center gap-2 text-xs text-gray-600">
                    <Mail className="h-3 w-3" /> {deal.contact.email}
                  </p>
                )}
                {deal.contact.phone && (
                  <p className="flex items-center gap-2 text-xs text-gray-600">
                    <Phone className="h-3 w-3" /> {deal.contact.phone}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Activity Timeline */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold uppercase text-gray-500">Atividades</h2>
            <div className="space-y-4">
              {mockActivities.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <div className={cn('flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full', activityIcon[activity.type])}>
                    {activity.type === 'email' && <Mail className="h-4 w-4" />}
                    {activity.type === 'call' && <Phone className="h-4 w-4" />}
                    {activity.type === 'meeting' && <Briefcase className="h-4 w-4" />}
                    {activity.type === 'stage_change' && <Clock className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.subject}</p>
                    <p className="text-xs text-gray-500">{activity.body}</p>
                    <p className="mt-1 text-[11px] text-gray-400">
                      {new Date(activity.created_at).toLocaleDateString('pt-BR', {
                        day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
