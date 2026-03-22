import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import type { Stage, DealWithRelations, ProductType } from '@/lib/types'
import PipelineBoard from '@/components/pipeline/PipelineBoard'

const PIPELINE_ID = 'pipe-business-1'

const mockStages: Stage[] = [
  { id: 's1', pipeline_id: PIPELINE_ID, name: 'MQL', display_order: 1, probability: 10, created_at: '' },
  { id: 's2', pipeline_id: PIPELINE_ID, name: 'Contato Iniciado', display_order: 2, probability: 20, created_at: '' },
  { id: 's3', pipeline_id: PIPELINE_ID, name: 'Conectado', display_order: 3, probability: 40, created_at: '' },
  { id: 's4', pipeline_id: PIPELINE_ID, name: 'Diagnóstico', display_order: 4, probability: 60, created_at: '' },
  { id: 's5', pipeline_id: PIPELINE_ID, name: 'Proposta Enviada', display_order: 5, probability: 75, created_at: '' },
  { id: 's6', pipeline_id: PIPELINE_ID, name: 'Negociação', display_order: 6, probability: 90, created_at: '' },
  { id: 's7', pipeline_id: PIPELINE_ID, name: 'Ganho', display_order: 7, probability: 100, created_at: '' },
  { id: 's8', pipeline_id: PIPELINE_ID, name: 'Perdido', display_order: 8, probability: 0, created_at: '' },
]

const now = new Date().toISOString()

const mockDeals: DealWithRelations[] = [
  {
    id: 'd1', hubspot_id: null, name: 'Consultoria IA - Empresa X', contact_id: 'c1', pipeline_id: PIPELINE_ID, stage_id: 's1', product: 'business', amount: 15000, qualification_status: 'mql', canal_origem: 'site', motivo_perda: null, ultimo_contato: now, stage_entered_at: '2026-03-18T00:00:00Z', owner_id: null, closed_at: null, is_won: null, created_at: now, updated_at: now,
    contact: { id: 'c1', hubspot_id: null, first_name: 'Maria', last_name: 'Silva', email: 'maria@empresax.com', phone: null, company: 'Empresa X', cargo: 'CEO', numero_de_liderados: null, faixa_de_faturamento: null, renda_mensal: null, motivo_para_aprender_ia: null, objetivo_com_a_comunidade: null, produto_interesse: ['business'], manychat_id: null, whatsapp_opt_in: false, utm_source: null, utm_medium: null, utm_campaign: null, utm_term: null, owner_id: null, created_at: now, updated_at: now },
  },
  {
    id: 'd2', hubspot_id: null, name: 'Treinamento IA Equipe', contact_id: 'c2', pipeline_id: PIPELINE_ID, stage_id: 's2', product: 'business', amount: 28000, qualification_status: 'sql', canal_origem: 'indicação', motivo_perda: null, ultimo_contato: now, stage_entered_at: '2026-03-15T00:00:00Z', owner_id: null, closed_at: null, is_won: null, created_at: now, updated_at: now,
    contact: { id: 'c2', hubspot_id: null, first_name: 'João', last_name: 'Oliveira', email: 'joao@techinova.com', phone: null, company: 'TechInova', cargo: 'CTO', numero_de_liderados: null, faixa_de_faturamento: null, renda_mensal: null, motivo_para_aprender_ia: null, objetivo_com_a_comunidade: null, produto_interesse: ['business'], manychat_id: null, whatsapp_opt_in: true, utm_source: null, utm_medium: null, utm_campaign: null, utm_term: null, owner_id: null, created_at: now, updated_at: now },
  },
  {
    id: 'd3', hubspot_id: null, name: 'Automação Processos', contact_id: 'c3', pipeline_id: PIPELINE_ID, stage_id: 's3', product: 'business', amount: 42000, qualification_status: 'sql', canal_origem: 'webinar', motivo_perda: null, ultimo_contato: now, stage_entered_at: '2026-03-10T00:00:00Z', owner_id: null, closed_at: null, is_won: null, created_at: now, updated_at: now,
    contact: { id: 'c3', hubspot_id: null, first_name: 'Ana', last_name: 'Costa', email: 'ana@globalcorp.com', phone: null, company: 'GlobalCorp', cargo: 'Diretora de Operações', numero_de_liderados: null, faixa_de_faturamento: null, renda_mensal: null, motivo_para_aprender_ia: null, objetivo_com_a_comunidade: null, produto_interesse: ['business'], manychat_id: null, whatsapp_opt_in: false, utm_source: null, utm_medium: null, utm_campaign: null, utm_term: null, owner_id: null, created_at: now, updated_at: now },
  },
  {
    id: 'd4', hubspot_id: null, name: 'Workshop IA Generativa', contact_id: 'c4', pipeline_id: PIPELINE_ID, stage_id: 's5', product: 'business', amount: 8500, qualification_status: 'lead', canal_origem: 'instagram', motivo_perda: null, ultimo_contato: now, stage_entered_at: '2026-03-05T00:00:00Z', owner_id: null, closed_at: null, is_won: null, created_at: now, updated_at: now,
    contact: { id: 'c4', hubspot_id: null, first_name: 'Carlos', last_name: 'Mendes', email: 'carlos@startup.io', phone: null, company: 'Startup.io', cargo: 'Founder', numero_de_liderados: null, faixa_de_faturamento: null, renda_mensal: null, motivo_para_aprender_ia: null, objetivo_com_a_comunidade: null, produto_interesse: ['business'], manychat_id: null, whatsapp_opt_in: true, utm_source: null, utm_medium: null, utm_campaign: null, utm_term: null, owner_id: null, created_at: now, updated_at: now },
  },
  {
    id: 'd5', hubspot_id: null, name: 'Licença Plataforma IA', contact_id: 'c5', pipeline_id: PIPELINE_ID, stage_id: 's1', product: 'business', amount: 19000, qualification_status: 'mql', canal_origem: 'google', motivo_perda: null, ultimo_contato: now, stage_entered_at: '2026-03-20T00:00:00Z', owner_id: null, closed_at: null, is_won: null, created_at: now, updated_at: now,
    contact: { id: 'c5', hubspot_id: null, first_name: 'Fernanda', last_name: 'Lima', email: 'fernanda@dataco.com.br', phone: null, company: 'DataCo', cargo: 'Head de Dados', numero_de_liderados: null, faixa_de_faturamento: null, renda_mensal: null, motivo_para_aprender_ia: null, objetivo_com_a_comunidade: null, produto_interesse: ['business', 'skills'], manychat_id: null, whatsapp_opt_in: false, utm_source: null, utm_medium: null, utm_campaign: null, utm_term: null, owner_id: null, created_at: now, updated_at: now },
  },
]

const productTabs: { label: string; value: ProductType }[] = [
  { label: 'Business', value: 'business' },
  { label: 'Skills', value: 'skills' },
  { label: 'Academy', value: 'academy' },
]

export default function Pipeline() {
  const { product } = useParams<{ product: string }>()
  const navigate = useNavigate()
  const activeProduct = (product as ProductType) || 'business'

  const [deals, setDeals] = useState(mockDeals)

  const handleMoveDeal = (dealId: string, newStageId: string) => {
    setDeals((prev) =>
      prev.map((d) =>
        d.id === dealId ? { ...d, stage_id: newStageId, stage_entered_at: new Date().toISOString() } : d
      )
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pipeline</h1>
        <p className="text-sm text-gray-500">Gerencie seus deals por etapa</p>
      </div>

      {/* Product Tabs */}
      <div className="flex gap-1 rounded-lg bg-gray-100 p-1 w-fit">
        {productTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => navigate(`/pipeline/${tab.value}`)}
            className={cn(
              'rounded-md px-4 py-1.5 text-sm font-medium transition-colors',
              activeProduct === tab.value
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <PipelineBoard
        stages={mockStages}
        deals={deals}
        onMoveDeal={handleMoveDeal}
      />
    </div>
  )
}
