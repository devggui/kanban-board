import { Plus } from "lucide-react"
import { Button } from "../ui/button"
import { ListActions } from "./partials/list-actions"
import { KanbanCard } from "./kanban-card"

type KanbanColumnProps = {
  title: string  
}

export function KanbanColumn({
  title
}: KanbanColumnProps) {
  return (
    <div className="w-72 min-w-72 bg-green-400 h-full"> 
      <div className="flex flex-1 flex-col w-full h-max max-h-full gap-3 p-2 rounded-md bg-zinc-900">
        <div className="flex flex-row items-center justify-between px-2">
          <h1 className="text-xl font-semibold">{title}</h1>      
          <ListActions />
        </div>

        <KanbanCard />
        <KanbanCard />
        {/* <KanbanCard />
        <KanbanCard />
        <KanbanCard />
        <KanbanCard />
        <KanbanCard /> */}

        <Button variant="ghost" className="flex w-full self-start items-center justify-start">
          <Plus className="size-6 mr-2" />
          <p className="text-base font-semibold">Adicionar uma tarefa</p>
        </Button>    
      </div>   
    </div>
  )
}