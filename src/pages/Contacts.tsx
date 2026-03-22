import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { cn, qualificationColor, productColor, productLabel } from '@/lib/utils'
import type { Contact } from '@/lib/types'

const mockContacts: Contact[] = [
  { id: 'c1', hubspot_id: null, first_name: 'Maria', last_name: 'Silva', email: 'maria@empresax.com', phone: '(11) 99999-1234', company: 'Empresa X', cargo: 'CEO', numero_de_liderados: '50', faixa_de_faturamento: '1M-5M', renda_mensal: null, motivo_para_aprender_ia: null, objetivo_com_a_comunidade: null, produto_interesse: ['business'], manychat_id: null, whatsapp_opt_in: true, utm_source: null, utm_medium: null, utm_campaign: null, utm_term: null, owner_id: null, created_at: '', updated_at: '' },
  { id: 'c2', hubspot_id: null, first_name: 'João', last_name: 'Oliveira', email: 'joao@techinova.com', phone: '(21) 98888-5678', company: 'TechInova', cargo: 'CTO', numero_de_liderados: '20', faixa_de_faturamento: '500K-1M', renda_mensal: null, motivo_para_aprender_ia: null, objetivo_com_a_comunidade: null, produto_interesse: ['business', 'skills'], manychat_id: null, whatsapp_opt_in: true, utm_source: null, utm_medium: null, utm_campaign: null, utm_term: null, owner_id: null, created_at: '', updated_at: '' },
  { id: 'c3', hubspot_id: null, first_name: 'Ana', last_name: 'Costa', email: 'ana@globalcorp.com', phone: '(11) 97777-9012', company: 'GlobalCorp', cargo: 'Diretora de Operações', numero_de_liderados: '100', faixa_de_faturamento: '5M-10M', renda_mensal: null, motivo_para_aprender_ia: null, objetivo_com_a_comunidade: null, produto_interesse: ['business'], manychat_id: null, whatsapp_opt_in: false, utm_source: null, utm_medium: null, utm_campaign: null, utm_term: null, owner_id: null, created_at: '', updated_at: '' },
  { id: 'c4', hubspot_id: null, first_name: 'Carlos', last_name: 'Mendes', email: 'carlos@startup.io', phone: '(31) 96666-3456', company: 'Startup.io', cargo: 'Founder', numero_de_liderados: '10', faixa_de_faturamento: '100K-500K', renda_mensal: null, motivo_para_aprender_ia: null, objetivo_com_a_comunidade: null, produto_interesse: ['skills'], manychat_id: null, whatsapp_opt_in: true, utm_source: null, utm_medium: null, utm_campaign: null, utm_term: null, owner_id: null, created_at: '', updated_at: '' },
  { id: 'c5', hubspot_id: null, first_name: 'Fernanda', last_name: 'Lima', email: 'fernanda@dataco.com.br', phone: '(11) 95555-7890', company: 'DataCo', cargo: 'Head de Dados', numero_de_liderados: '30', faixa_de_faturamento: '1M-5M', renda_mensal: null, motivo_para_aprender_ia: null, objetivo_com_a_comunidade: null, produto_interesse: ['business', 'skills'], manychat_id: null, whatsapp_opt_in: false, utm_source: null, utm_medium: null, utm_campaign: null, utm_term: null, owner_id: null, created_at: '', updated_at: '' },
  { id: 'c6', hubspot_id: null, first_name: 'Roberto', last_name: 'Santos', email: 'roberto@edutech.com', phone: '(41) 94444-1111', company: 'EduTech', cargo: 'Diretor Acadêmico', numero_de_liderados: '15', faixa_de_faturamento: '500K-1M', renda_mensal: null, motivo_para_aprender_ia: null, objetivo_com_a_comunidade: null, produto_interesse: ['academy'], manychat_id: null, whatsapp_opt_in: true, utm_source: null, utm_medium: null, utm_campaign: null, utm_term: null, owner_id: null, created_at: '', updated_at: '' },
  { id: 'c7', hubspot_id: null, first_name: 'Luciana', last_name: 'Pereira', email: 'luciana@consultagroup.com', phone: '(51) 93333-2222', company: 'Consulta Group', cargo: 'Sócia', numero_de_liderados: '40', faixa_de_faturamento: '1M-5M', renda_mensal: null, motivo_para_aprender_ia: null, objetivo_com_a_comunidade: null, produto_interesse: ['business'], manychat_id: null, whatsapp_opt_in: false, utm_source: null, utm_medium: null, utm_campaign: null, utm_term: null, owner_id: null, created_at: '', updated_at: '' },
]

export default function Contacts() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const filtered = mockContacts.filter((c) => {
    const term = search.toLowerCase()
    return (
      c.first_name.toLowerCase().includes(term) ||
      (c.last_name ?? '').toLowerCase().includes(term) ||
      (c.email ?? '').toLowerCase().includes(term) ||
      (c.company ?? '').toLowerCase().includes(term)
    )
  })

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Contatos</h1>
        <p className="text-sm text-gray-500">Gerencie sua base de contatos</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por nome, email ou empresa..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-xs font-medium uppercase text-gray-500">
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Telefone</th>
              <th className="px-4 py-3">Empresa</th>
              <th className="px-4 py-3">Cargo</th>
              <th className="px-4 py-3">Produto</th>
              <th className="px-4 py-3">Qualificação</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((contact) => (
              <tr
                key={contact.id}
                onClick={() => navigate(`/contacts/${contact.id}`)}
                className="cursor-pointer border-b transition-colors hover:bg-gray-50"
              >
                <td className="px-4 py-3 font-medium text-gray-900">
                  {contact.first_name} {contact.last_name}
                </td>
                <td className="px-4 py-3 text-gray-600">{contact.email ?? '-'}</td>
                <td className="px-4 py-3 text-gray-600">{contact.phone ?? '-'}</td>
                <td className="px-4 py-3 text-gray-600">{contact.company ?? '-'}</td>
                <td className="px-4 py-3 text-gray-600">{contact.cargo ?? '-'}</td>
                <td className="px-4 py-3">
                  {contact.produto_interesse?.map((p) => (
                    <span
                      key={p}
                      className={cn(
                        'mr-1 inline-flex rounded-full px-2 py-0.5 text-xs font-medium',
                        productColor(p)
                      )}
                    >
                      {productLabel(p)}
                    </span>
                  )) ?? '-'}
                </td>
                <td className="px-4 py-3">
                  <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium', qualificationColor('lead'))}>
                    Lead
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination placeholder */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Mostrando {filtered.length} de {mockContacts.length} contatos</span>
        <div className="flex gap-2">
          <button disabled className="rounded-md border px-3 py-1 text-gray-400">Anterior</button>
          <button disabled className="rounded-md border px-3 py-1 text-gray-400">Próximo</button>
        </div>
      </div>
    </div>
  )
}
