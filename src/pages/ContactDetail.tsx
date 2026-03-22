import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail, Phone, Briefcase, Clock } from 'lucide-react'
import { cn, formatCurrency, productColor, productLabel, qualificationColor } from '@/lib/utils'
import type { ContactWithDeals, Deal } from '@/lib/types'

const now = new Date().toISOString()

const mockContacts: Record<string, ContactWithDeals> = {
  c1: {
    id: 'c1', hubspot_id: null, first_name: 'Maria', last_name: 'Silva', email: 'maria@empresax.com', phone: '(11) 99999-1234', company: 'Empresa X', cargo: 'CEO', numero_de_liderados: '50', faixa_de_faturamento: '1M-5M', renda_mensal: null, motivo_para_aprender_ia: 'Automatizar processos', objetivo_com_a_comunidade: 'Networking', produto_interesse: ['business'], manychat_id: null, whatsapp_opt_in: true, utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'ia-2026', utm_term: null, owner_id: null, created_at: '2026-01-15T00:00:00Z', updated_at: now,
    deals: [
      { id: 'd1', hubspot_id: null, name: 'Consultoria IA - Empresa X', contact_id: 'c1', pipeline_id: 'pipe-business-1', stage_id: 's1', product: 'business', amount: 15000, qualification_status: 'mql', canal_origem: 'site', motivo_perda: null, ultimo_contato: now, stage_entered_at: '2026-03-18T00:00:00Z', owner_id: null, closed_at: null, is_won: null, created_at: now, updated_at: now },
    ],
  },
  c2: {
    id: 'c2', hubspot_id: null, first_name: 'João', last_name: 'Oliveira', email: 'joao@techinova.com', phone: '(21) 98888-5678', company: 'TechInova', cargo: 'CTO', numero_de_liderados: '20', faixa_de_faturamento: '500K-1M', renda_mensal: null, motivo_para_aprender_ia: 'Melhorar produto', objetivo_com_a_comunidade: 'Aprendizado', produto_interesse: ['business', 'skills'], manychat_id: null, whatsapp_opt_in: true, utm_source: 'instagram', utm_medium: 'social', utm_campaign: null, utm_term: null, owner_id: null, created_at: '2026-02-10T00:00:00Z', updated_at: now,
    deals: [
      { id: 'd2', hubspot_id: null, name: 'Treinamento IA Equipe', contact_id: 'c2', pipeline_id: 'pipe-business-1', stage_id: 's2', product: 'business', amount: 28000, qualification_status: 'sql', canal_origem: 'indicação', motivo_perda: null, ultimo_contato: now, stage_entered_at: '2026-03-15T00:00:00Z', owner_id: null, closed_at: null, is_won: null, created_at: now, updated_at: now },
    ],
  },
  c3: {
    id: 'c3', hubspot_id: null, first_name: 'Ana', last_name: 'Costa', email: 'ana@globalcorp.com', phone: '(11) 97777-9012', company: 'GlobalCorp', cargo: 'Diretora de Operações', numero_de_liderados: '100', faixa_de_faturamento: '5M-10M', renda_mensal: null, motivo_para_aprender_ia: null, objetivo_com_a_comunidade: null, produto_interesse: ['business'], manychat_id: null, whatsapp_opt_in: false, utm_source: null, utm_medium: null, utm_campaign: null, utm_term: null, owner_id: null, created_at: '2026-01-20T00:00:00Z', updated_at: now,
    deals: [
      { id: 'd3', hubspot_id: null, name: 'Automação Processos', contact_id: 'c3', pipeline_id: 'pipe-business-1', stage_id: 's3', product: 'business', amount: 42000, qualification_status: 'sql', canal_origem: 'webinar', motivo_perda: null, ultimo_contato: now, stage_entered_at: '2026-03-10T00:00:00Z', owner_id: null, closed_at: null, is_won: null, created_at: now, updated_at: now },
    ],
  },
}

const mockActivities = [
  { id: 'a1', type: 'email' as const, subject: 'Apresentação de proposta', body: 'Envio da proposta comercial', created_at: '2026-03-20T14:30:00Z' },
  { id: 'a2', type: 'call' as const, subject: 'Ligação de follow-up', body: 'Discutido escopo do projeto', created_at: '2026-03-18T10:00:00Z' },
  { id: 'a3', type: 'whatsapp' as const, subject: 'Mensagem WhatsApp', body: 'Confirmação de reunião', created_at: '2026-03-16T09:15:00Z' },
  { id: 'a4', type: 'meeting' as const, subject: 'Reunião inicial', body: 'Primeiro contato com o lead', created_at: '2026-03-14T15:00:00Z' },
  { id: 'a5', type: 'note' as const, subject: 'Nota interna', body: 'Lead demonstrou interesse no produto Business', created_at: '2026-03-12T11:00:00Z' },
]

const activityIcon: Record<string, string> = {
  email: 'bg-blue-100 text-blue-600',
  call: 'bg-green-100 text-green-600',
  whatsapp: 'bg-emerald-100 text-emerald-600',
  meeting: 'bg-purple-100 text-purple-600',
  note: 'bg-gray-100 text-gray-600',
  stage_change: 'bg-orange-100 text-orange-600',
}

function InfoRow({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="flex justify-between py-2 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value ?? '-'}</span>
    </div>
  )
}

export default function ContactDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const contact = mockContacts[id ?? ''] ?? mockContacts.c1

  if (!contact) return <div className="p-8 text-gray-500">Contato não encontrado.</div>

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/contacts')}
          className="rounded-lg border p-2 text-gray-500 hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {contact.first_name} {contact.last_name}
          </h1>
          <p className="text-sm text-gray-500">{contact.company} &middot; {contact.cargo}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left panel: Contact Info */}
        <div className="lg:col-span-1 space-y-4">
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-sm font-semibold uppercase text-gray-500">Informações de Contato</h2>
            <div className="space-y-1">
              <InfoRow label="Email" value={contact.email} />
              <InfoRow label="Telefone" value={contact.phone} />
              <InfoRow label="Empresa" value={contact.company} />
              <InfoRow label="Cargo" value={contact.cargo} />
              <InfoRow label="Liderados" value={contact.numero_de_liderados} />
              <InfoRow label="Faturamento" value={contact.faixa_de_faturamento} />
              <InfoRow label="WhatsApp Opt-in" value={contact.whatsapp_opt_in ? 'Sim' : 'Não'} />
            </div>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-sm font-semibold uppercase text-gray-500">Interesses</h2>
            <div className="space-y-1">
              <InfoRow label="Motivo IA" value={contact.motivo_para_aprender_ia} />
              <InfoRow label="Objetivo" value={contact.objetivo_com_a_comunidade} />
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              {contact.produto_interesse?.map((p) => (
                <span
                  key={p}
                  className={cn('rounded-full px-2 py-0.5 text-xs font-medium', productColor(p))}
                >
                  {productLabel(p)}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-sm font-semibold uppercase text-gray-500">UTM / Origem</h2>
            <div className="space-y-1">
              <InfoRow label="Source" value={contact.utm_source} />
              <InfoRow label="Medium" value={contact.utm_medium} />
              <InfoRow label="Campaign" value={contact.utm_campaign} />
              <InfoRow label="Term" value={contact.utm_term} />
            </div>
          </div>
        </div>

        {/* Right panel: Activity Timeline */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold uppercase text-gray-500">Atividades Recentes</h2>
            <div className="space-y-4">
              {mockActivities.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <div className={cn('flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full', activityIcon[activity.type])}>
                    {activity.type === 'email' && <Mail className="h-4 w-4" />}
                    {activity.type === 'call' && <Phone className="h-4 w-4" />}
                    {activity.type === 'whatsapp' && <Phone className="h-4 w-4" />}
                    {activity.type === 'meeting' && <Briefcase className="h-4 w-4" />}
                    {activity.type === 'note' && <Clock className="h-4 w-4" />}
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

          {/* Associated Deals */}
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold uppercase text-gray-500">Deals Associados</h2>
            {contact.deals && contact.deals.length > 0 ? (
              <div className="space-y-2">
                {contact.deals.map((deal: Deal) => (
                  <div
                    key={deal.id}
                    onClick={() => navigate(`/deals/${deal.id}`)}
                    className="flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors hover:bg-gray-50"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">{deal.name}</p>
                      <span className={cn('mt-1 inline-flex rounded-full px-2 py-0.5 text-xs font-medium', qualificationColor(deal.qualification_status))}>
                        {deal.qualification_status.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-800">{formatCurrency(deal.amount)}</p>
                      <p className="text-xs text-gray-400">{productLabel(deal.product)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">Nenhum deal associado</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
