import { cn } from '@/lib/utils'
import { Settings as SettingsIcon, Bell, Plug, CheckCircle, XCircle } from 'lucide-react'
import Badge from '@/components/ui/Badge'

interface IntegrationCardProps {
  name: string
  description: string
  connected: boolean
}

function IntegrationCard({ name, description, connected }: IntegrationCardProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm">
      <div>
        <p className="text-sm font-semibold text-gray-900">{name}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <div className="flex items-center gap-2">
        {connected ? (
          <>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
            <Badge variant="success">Conectado</Badge>
          </>
        ) : (
          <>
            <XCircle className="h-4 w-4 text-gray-400" />
            <Badge variant="outline">Desconectado</Badge>
          </>
        )}
      </div>
    </div>
  )
}

const pipelineConfigs = [
  { pipeline: 'Business', stages: 'MQL → Contato Iniciado → Conectado → Diagnóstico → Proposta Enviada → Negociação → Ganho / Perdido' },
  { pipeline: 'Skills', stages: 'MQL → Contato Iniciado → Conectado → Demo → Proposta → Negociação → Ganho / Perdido' },
  { pipeline: 'Academy', stages: 'Lead → Inscrição → Matrícula → Ativo → Concluído / Cancelado' },
]

const integrations: IntegrationCardProps[] = [
  { name: 'HubSpot', description: 'Sincronização de contatos e deals', connected: true },
  { name: 'ManyChat', description: 'Automação de WhatsApp e Instagram', connected: true },
  { name: 'Gmail', description: 'Envio de emails e sequências', connected: false },
  { name: 'Google Calendar', description: 'Agendamento de reuniões', connected: false },
  { name: 'Granola', description: 'Transcrição de reuniões com IA', connected: false },
]

export default function Settings() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
        <p className="text-sm text-gray-500">Gerencie as configurações do CRM</p>
      </div>

      {/* Pipeline Settings */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <SettingsIcon className="h-5 w-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Pipeline Settings</h2>
        </div>
        <div className="space-y-3">
          {pipelineConfigs.map((config) => (
            <div key={config.pipeline} className="rounded-lg border bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-gray-900">{config.pipeline}</p>
              <p className="mt-1 text-xs text-gray-500">{config.stages}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Notification Settings */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Notification Settings</h2>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm space-y-3">
          {[
            { label: 'Deals parados há mais de 3 dias', enabled: true },
            { label: 'Novo lead adicionado ao pipeline', enabled: true },
            { label: 'Deal movido para Ganho/Perdido', enabled: true },
            { label: 'Resumo semanal por email', enabled: false },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between py-1">
              <span className="text-sm text-gray-700">{item.label}</span>
              <div
                className={cn(
                  'relative h-5 w-9 rounded-full transition-colors',
                  item.enabled ? 'bg-indigo-500' : 'bg-gray-300'
                )}
              >
                <div
                  className={cn(
                    'absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform',
                    item.enabled ? 'translate-x-4' : 'translate-x-0.5'
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Integrations */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Plug className="h-5 w-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Integrações</h2>
        </div>
        <div className="space-y-3">
          {integrations.map((integration) => (
            <IntegrationCard key={integration.name} {...integration} />
          ))}
        </div>
      </section>
    </div>
  )
}
