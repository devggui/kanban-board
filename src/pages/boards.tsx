import { Task } from "@/components/task"
import { Button } from "@/components/ui/button"
import { Board } from "@/constants/board"
import { Column } from "@/types"
import { Plus } from "lucide-react"
import { useState } from "react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"

export function Boards() {
  const [columns, setColumns] = useState<Column[]>(Board)    

  return (
    <DragDropContext onDragEnd={(result) => console.log(result)}>
      <div className="flex items-start p-6 gap-6 flex-1 max-h-[calc(100vh-65px)] overflow-auto">        
        {columns.map(column => (
          <div className="flex flex-col items-center gap-6" key={column.id}>
            <Droppable
              droppableId={column.id}
              key={column.id}
            >
              {provided => (
                <div
                  className="flex flex-col w-72 gap-3 items-center"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className="flex items-center justify-center h-10 rounded-md px-8 w-full shadow-sm font-medium text-lg bg-background">
                    {column.name}
                  </div>

                  {column.items.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {provided => <Task provided={provided} task={task} />}
                    </Draggable>
                  ))}                  
                </div>
              )}
            </Droppable>

            <Button 
              variant="outline"          
              size="lg" 
              className="flex items-center gap-3 w-72 min-w-72 text-lg font-medium"
            >
              <Plus className="size-6" />
              Nova tarefa
            </Button>
          </div>
        ))} 

        <Button  
          variant="outline"         
          size="lg" 
          className="flex items-center gap-3 w-72 min-w-72 text-lg font-medium"
        >
          <Plus className="size-6" />
          Nova coluna
        </Button>               
      </div>
    </DragDropContext>
  )
}