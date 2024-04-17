import { useState } from "react"
import { useSelector } from "react-redux"
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd"
import type { Columns, Task } from "@/types"
import { selectBoard } from "@/reducers/boardReducer"
import { useOnDragEnd } from "@/hooks/on-drag-end"
import { TaskCard } from "@/pages/Boards/partials/task-card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

type DragDropProps = {
  onCreate: (columnId: string) => void
  onEdit: (columnId: string, task: Task) => void
  onDelete: (columnId: string, task: Task) => void
}

export function DragDrop({
  onCreate,
  onEdit,
  onDelete
}: DragDropProps) {
  const boards = useSelector(selectBoard)   
  
  const [columns, setColumns] = useState<Columns>(boards)    

  return (
    <DragDropContext onDragEnd={(result: DropResult) => useOnDragEnd(result, columns, setColumns)}>
      <div className="flex items-start p-6 gap-6 flex-1 max-h-[calc(100vh-65px)] overflow-auto">        
        {Object.entries(columns).map(([columnId, column]) => (
          <div className="flex flex-col items-center gap-6" key={columnId}>
            <Droppable
              droppableId={columnId}
              key={columnId}
            >
              {provided => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex flex-col w-72 gap-3 items-center"
                >
                  <div className="flex items-center justify-center h-10 rounded-md px-8 w-full shadow-md font-medium text-lg bg-background">
                    {column.name}
                  </div>

                  {column.items.map((task: Task, index: number) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <TaskCard 
                          provided={provided} 
                          task={task} 
                          onEdit={() => onEdit(columnId, task)} 
                          onDelete={() => onDelete(columnId, task)}                             
                        />
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <Button 
              variant="outline"          
              size="lg" 
              className="flex items-center gap-3 w-72 min-w-72 text-lg font-medium dark:hover:bg-background/60 shadow-md"          
              onClick={() => onCreate(columnId)}
            >
              <Plus className="size-6" />
              Nova tarefa
            </Button>
          </div>
        ))}               
      </div>
    </DragDropContext>
  )
}