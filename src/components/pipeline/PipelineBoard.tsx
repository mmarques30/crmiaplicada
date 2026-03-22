import { DragDropContext, type DropResult } from '@hello-pangea/dnd'
import type { Stage, DealWithRelations } from '@/lib/types'
import StageColumn from './StageColumn'

interface PipelineBoardProps {
  stages: Stage[]
  deals: DealWithRelations[]
  onMoveDeal: (dealId: string, newStageId: string) => void
}

export default function PipelineBoard({ stages, deals, onMoveDeal }: PipelineBoardProps) {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const dealId = result.draggableId
    const newStageId = result.destination.droppableId
    if (newStageId !== result.source.droppableId) {
      onMoveDeal(dealId, newStageId)
    }
  }

  // Separate won/lost stages (last two by convention) from active stages
  const sortedStages = [...stages].sort((a, b) => a.display_order - b.display_order)
  const activeStages = sortedStages.filter(
    (s) => !s.name.toLowerCase().includes('ganho') && !s.name.toLowerCase().includes('perdido')
  )
  const endStages = sortedStages.filter(
    (s) => s.name.toLowerCase().includes('ganho') || s.name.toLowerCase().includes('perdido')
  )

  const dealsByStage = (stageId: string) => deals.filter((d) => d.stage_id === stageId)

  return (
    <div className="flex flex-col gap-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-3 overflow-x-auto pb-4" style={{ minHeight: 400 }}>
          {activeStages.map((stage) => (
            <StageColumn key={stage.id} stage={stage} deals={dealsByStage(stage.id)} />
          ))}
        </div>

        {endStages.length > 0 && (
          <div className="flex gap-3 border-t border-gray-200 pt-4">
            {endStages.map((stage) => (
              <StageColumn key={stage.id} stage={stage} deals={dealsByStage(stage.id)} />
            ))}
          </div>
        )}
      </DragDropContext>
    </div>
  )
}
