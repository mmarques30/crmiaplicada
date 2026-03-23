import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail, Phone, Briefcase, Clock, MessageSquare, FileText, Loader2, ExternalLink, User } from 'lucide-react'
import { cn, formatCurrency, formatDate, formatDateTime } from '@/lib/utils'
import { useContact } from '@/hooks/useContacts'
import type { DealWithStage } from '@/lib/types'

const lifecycleLabels: Record<string, string> = {
  subscriber: 'Subscriber',
  lead: 'Lead',
  marketingqualifiedlead: 'MQL',
  salesqualifiedlead: 'SQL',
  opportunity: 'Oportunidade',
  customer: 'Cliente',
  evangelist: 'Evangelista',
}

const lifecycleColors: Record<string, string> = {
  subscriber: 'bg-gray-100 text-gray-700',
  lead: 'bg-blue-100 text-blue-700',
  marketingqualifiedlead: 'bg-indigo-100 text-indigo-700',
  salesqualifiedlead: 'bg-purple-100 text-purple-700',
  opportunity: 'bg-amber-100 text-amber-700',
  customer: 'bg-green-100 text-green-700',
}

const activityIcon: Record<string, { bg: string; Icon: typeof Mail }> = {
  email: { bg: 'bg-blue-100 text-blue-600', Icon: Mail },
  call: { bg: 'bg-green-100 text-green-600', Icon: Phone },
  whatsapp: { bg: 'bg-emerald-100 text-emerald-600', Icon: MessageSquare },
  meeting: { bg: 'bg-purple-100 text-purple-600', Icon: Briefcase },
  note: { bg: 'bg-gray-100 text-gray-600', Icon: FileText },
  stage_change: { bg: 'bg-orange-100 text-orange-600', Icon: Clock },
}

function InfoRow({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null
  return (
    <div className="flex justify-between py-2 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900 text-right max-w-[60%]">{value}</span>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold uppercase text-gray-500">{title}</h2>
      {children}
    </div>
  )
}

export default function ContactDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: contact, activities, loading, error } = useContact(id ?? '')

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    )
  }

  if (error || !contact) {
    return (
      <div className="space-y-4">
        <button onClick={() => navigate('/contacts')} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </button>
        <p className="text-gray-500">Contato não encontrado.</p>
      </div>
    )
  }

  const fullName = `${contact.first_name}${contact.last_name ? ' ' + contact.last_name : ''}`

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/contacts')}
          className="rounded-lg border p-2 text-gray-500 hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-bold text-lg">
            {contact.first_name?.[0]?.toUpperCase() ?? '?'}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{fullName}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              {contact.company && <span>{contact.company}</span>}
              {contact.cargo && <span>&middot; {contact.cargo}</span>}
              {contact.lifecycle_stage && (
                <span className={cn('ml-2 rounded-full px-2 py-0.5 text-xs font-medium', lifecycleColors[contact.lifecycle_stage] ?? 'bg-gray-100 text-gray-600')}>
                  {lifecycleLabels[contact.lifecycle_stage] ?? contact.lifecycle_stage}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex gap-2">
        {contact.email && (
          <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
            <Mail className="h-4 w-4" /> Email
          </a>
        )}
        {contact.phone && (
          <a href={`tel:${contact.phone}`} className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
            <Phone className="h-4 w-4" /> Ligar
          </a>
        )}
        {contact.whatsapp && (
          <a href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm text-green-700 hover:bg-green-50">
            <MessageSquare className="h-4 w-4" /> WhatsApp
          </a>
        )}
        {contact.hubspot_id && (
          <a href={`https://app.hubspot.com/contacts/48aborei/contact/${contact.hubspot_id}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm text-orange-700 hover:bg-orange-50">
            <ExternalLink className="h-4 w-4" /> HubSpot
          </a>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* LEFT COLUMN — Properties */}
        <div className="lg:col-span-1 space-y-4">
          <Section title="Informações Básicas">
            <div className="space-y-0">
              <InfoRow label="Email" value={contact.email} />
              <InfoRow label="WhatsApp" value={contact.whatsapp} />
              <InfoRow label="Telefone" value={contact.phone} />
              <InfoRow label="Ciclo de Vida" value={lifecycleLabels[contact.lifecycle_stage ?? ''] ?? contact.lifecycle_stage} />
              <InfoRow label="Status do Lead" value={contact.lead_status} />
              <InfoRow label="Fonte" value={contact.fonte_registro} />
            </div>
          </Section>

          <Section title="Informações - Academy">
            <div className="space-y-0">
              <InfoRow label="Renda Mensal" value={contact.renda_mensal} />
              <InfoRow label="Motivo para IA" value={contact.motivo_para_aprender_ia} />
              <InfoRow label="Objetivo" value={contact.objetivo_com_a_comunidade} />
            </div>
          </Section>

          <Section title="Informações - Skills">
            <div className="space-y-0">
              <InfoRow label="Empresa" value={contact.company} />
              <InfoRow label="Cargo" value={contact.cargo} />
              <InfoRow label="Nº Liderados" value={contact.numero_de_liderados} />
              <InfoRow label="Faturamento" value={contact.faixa_de_faturamento} />
              <InfoRow label="Área de Atuação" value={contact.area_atuacao} />
            </div>
          </Section>

          <Section title="Localização">
            <div className="space-y-0">
              <InfoRow label="Cidade" value={contact.city} />
              <InfoRow label="Estado" value={contact.state} />
              <InfoRow label="Endereço" value={contact.address} />
              <InfoRow label="CEP" value={contact.zip_code} />
              <InfoRow label="País" value={contact.country} />
            </div>
          </Section>

          <Section title="UTM / Marketing">
            <div className="space-y-0">
              <InfoRow label="utm_source" value={contact.utm_source} />
              <InfoRow label="utm_medium" value={contact.utm_medium} />
              <InfoRow label="utm_campaign" value={contact.utm_campaign} />
              <InfoRow label="utm_term" value={contact.utm_term} />
              <InfoRow label="1ª Conversão" value={contact.first_conversion} />
              <InfoRow label="Data 1ª Conv." value={contact.first_conversion_date ? formatDate(contact.first_conversion_date) : null} />
              <InfoRow label="LinkedIn" value={contact.linkedin_url} />
              <InfoRow label="Website" value={contact.website_url} />
            </div>
          </Section>
        </div>

        {/* CENTER + RIGHT COLUMNS */}
        <div className="lg:col-span-2 space-y-4">
          {/* Deals Associados */}
          <Section title={`Negócios (${contact.deals?.length ?? 0})`}>
            {contact.deals && contact.deals.length > 0 ? (
              <div className="space-y-2">
                {contact.deals.map((deal: DealWithStage) => (
                  <div
                    key={deal.id}
                    onClick={() => navigate(`/deals/${deal.id}`)}
                    className="flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors hover:bg-gray-50"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">{deal.name}</p>
                      <div className="mt-1 flex items-center gap-2">
                        {deal.stages && (
                          <span className={cn(
                            'rounded-full px-2 py-0.5 text-xs font-medium',
                            deal.is_won === true ? 'bg-green-100 text-green-700' :
                            deal.is_won === false ? 'bg-red-100 text-red-700' :
                            'bg-blue-100 text-blue-700'
                          )}>
                            {deal.stages.name}
                          </span>
                        )}
                        <span className="text-xs text-gray-400 capitalize">{deal.product}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-800">{formatCurrency(deal.amount)}</p>
                      {deal.closed_at && (
                        <p className="text-xs text-gray-400">{formatDate(deal.closed_at)}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">Nenhum negócio associado</p>
            )}
          </Section>

          {/* Atividades */}
          <Section title="Atividades">
            {activities.length > 0 ? (
              <div className="space-y-4">
                {activities.map((activity) => {
                  const config = activityIcon[activity.type] ?? activityIcon.note
                  const IconComponent = config.Icon
                  return (
                    <div key={activity.id} className="flex gap-3">
                      <div className={cn('flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full', config.bg)}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.subject ?? activity.type}</p>
                        {activity.body && <p className="text-xs text-gray-500 truncate">{activity.body}</p>}
                        <p className="mt-1 text-[11px] text-gray-400">
                          {formatDateTime(activity.created_at)}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-sm text-gray-400">Nenhuma atividade registrada</p>
            )}
          </Section>

          {/* Metadados */}
          <Section title="Metadados">
            <div className="space-y-0">
              <InfoRow label="ID" value={contact.id} />
              <InfoRow label="HubSpot ID" value={contact.hubspot_id?.toString()} />
              <InfoRow label="Criado em" value={formatDateTime(contact.created_at)} />
              <InfoRow label="Última atividade" value={contact.last_activity_at ? formatDateTime(contact.last_activity_at) : null} />
              <InfoRow label="HubSpot Owner" value={contact.hubspot_owner} />
            </div>
          </Section>
        </div>
      </div>
    </div>
  )
}
