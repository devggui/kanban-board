import type { Task } from "@/types"
import { Separator } from "@/components/ui/separator"
import { Clock, Edit2, Trash } from "lucide-react"
import { cn } from "@/lib/utils"
import { DraggableProvided } from "react-beautiful-dnd"
import { calculateMinutesToDeadline } from "@/services/calculate-deadline"
import { Button } from "@/components/ui/button"

type TaskCardProps = {
  task: Task
  provided: DraggableProvided
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

export function TaskCard({
  task,
  provided,
  onEdit,
  onDelete
}: TaskCardProps) {
  const { ...data } = task
  
  return (
    <div 
      className="w-full cursor-grab bg-background flex flex-col justify-between gap-3 items-start shadow-md rounded-md px-3 py-4"      
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}     
    >            
      <div className="flex flex-col w-full items-start">
        <span className="text-lg font-medium">{data.title}</span>
        <span className="text-base font-medium text-muted-foreground">{data.description}</span>
      </div>

      <Separator />      

      <span className="flex items-center gap-2 text-base font-medium text-muted-foreground">
        {data.deadline && (
          <div className="flex items-center gap-1">
            <Clock className="size-4" />
            {calculateMinutesToDeadline(data.deadline)}
          </div>
        )}
      </span>

      <div className="flex w-full items-center justify-between gap-3">
        <div 
          className={cn(
            'w-20 rounded-full h-2',
            data.priority === "high" && 'bg-red-500',
            data.priority === "medium" && 'bg-yellow-500',
            data.priority === "low" && 'bg-blue-500',
          )}
        />

        <div>
          <Button variant="ghost" className="p-2" onClick={() => onEdit(task)}>
            <Edit2 className="size-4 fill-muted-foreground text-muted-foreground" />
          </Button>

          <Button variant="ghost" className="p-2" onClick={() => onDelete(task)}>
            <Trash className="size-4 fill-muted-foreground text-muted-foreground" />
          </Button>
        </div>
      </div>
    </div>
  )
}