import { useNavigate } from 'react-router-dom'
import { cn, formatCurrency, daysAgo, qualificationColor } from '@/lib/utils'
import type { DealWithRelations } from '@/lib/types'

interface DealCardProps {
  deal: DealWithRelations
}

const qualificationBorderColor: Record<string, string> = {
  lead: 'border-l-gray-400',
  mql: 'border-l-yellow-500',
  sql: 'border-l-emerald-500',
}

export default function DealCard({ deal }: DealCardProps) {
  const navigate = useNavigate()
  const days = daysAgo(deal.stage_entered_at)

  return (
    <div
      onClick={() => navigate(`/deals/${deal.id}`)}
      className={cn(
        'cursor-pointer rounded-lg border border-l-4 bg-white p-3 shadow-sm transition-shadow hover:shadow-md',
        qualificationBorderColor[deal.qualification_status] ?? 'border-l-gray-300'
      )}
    >
      <p className="text-sm font-medium text-gray-900 truncate">{deal.name}</p>

      {deal.contact?.company && (
        <p className="mt-0.5 text-xs text-gray-500 truncate">{deal.contact.company}</p>
      )}

      <div className="mt-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-800">
          {formatCurrency(deal.amount)}
        </span>
        <span
          className={cn(
            'inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium uppercase',
            qualificationColor(deal.qualification_status)
          )}
        >
          {deal.qualification_status}
        </span>
      </div>

      <p className="mt-1 text-[11px] text-gray-400">
        {days === 0 ? 'Hoje' : `${days}d nesta etapa`}
      </p>
    </div>
  )
}
