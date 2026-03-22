import { Droppable, Draggable } from '@hello-pangea/dnd'
import { formatCurrency } from '@/lib/utils'
import type { Stage, DealWithRelations } from '@/lib/types'
import DealCard from './DealCard'

interface StageColumnProps {
  stage: Stage
  deals: DealWithRelations[]
}

export default function StageColumn({ stage, deals }: StageColumnProps) {
  const totalAmount = deals.reduce((sum, d) => sum + (d.amount ?? 0), 0)

  return (
    <div className="flex w-72 flex-shrink-0 flex-col rounded-lg bg-gray-50">
      <div className="px-3 py-2 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-700">{stage.name}</h3>
          <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600">
            {deals.length}
          </span>
        </div>
        <p className="mt-0.5 text-xs text-gray-400">{formatCurrency(totalAmount)}</p>
      </div>

      <Droppable droppableId={stage.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 space-y-2 overflow-y-auto p-2 transition-colors ${
              snapshot.isDraggingOver ? 'bg-blue-50' : ''
            }`}
            style={{ minHeight: 80 }}
          >
            {deals.map((deal, index) => (
              <Draggable key={deal.id} draggableId={deal.id} index={index}>
                {(dragProvided) => (
                  <div
                    ref={dragProvided.innerRef}
                    {...dragProvided.draggableProps}
                    {...dragProvided.dragHandleProps}
                  >
                    <DealCard deal={deal} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
