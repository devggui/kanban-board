import type { Task } from "@/types"
import { Separator } from "@/components/ui/separator"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { DraggableProvided } from "react-beautiful-dnd"
import { format } from "date-fns-tz"
import { ptBR } from "date-fns/locale/pt-BR"

type TaskCardProps = {
  task: Task
  provided: DraggableProvided
}

export function TaskCard({
  task,
  provided
}: TaskCardProps) {
  const { ...data } = task
  
  return (
    <div 
      className="w-full cursor-grab bg-background flex flex-col justify-between gap-3 items-start shadow-sm rounded-md px-3 py-4"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div className="flex flex-col w-full items-start">
        <span className="text-lg font-medium">{data.title}</span>
        <span className="text-base font-medium text-muted-foreground">{data.description}</span>
      </div>

      <Separator />

      <div className="flex flex-col w-full items-start gap-3">
        <span className="flex items-center gap-2 text-base font-medium text-muted-foreground">
          <Clock className="size-4" />
          {format(data.deadline, "P", { timeZone: 'America/Sao_Paulo', locale: ptBR })}
        </span>

        <div 
          className={cn(
            'w-16 rounded-full h-3',
            data.priority === "high" && 'bg-red-500',
            data.priority === "medium" && 'bg-yellow-500',
            data.priority === "low" && 'bg-blue-500',
          )}
        />
      </div>
    </div>
  )
}