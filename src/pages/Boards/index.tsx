import { useState } from "react"
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd"
import type { Columns, Task } from "@/types"
import { Plus } from "lucide-react"
import { TaskCard } from "@/components/task-card"
import { Button } from "@/components/ui/button"
import { BoardForm } from "./form"
import { useOnDragEnd } from "@/hooks/on-drag-end"
import { useDispatch } from "react-redux"
import { addTask, selectBoard } from "@/reducers/boardReducer"
import { useSelector } from "react-redux"

export function Boards() {    
  const boards = useSelector(selectBoard) 
  const dispatch = useDispatch()    
  
  const [columns, setColumns] = useState<Columns>(boards)    
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const [selectedColumn, setSelectedColumn] = useState<string>('')        

  const handleFormOpenChange = (value: boolean): void => {
    setIsFormOpen(value)
  } 

  const openModal = (columnId: string) => { 
    setSelectedColumn(columnId)
    setIsFormOpen(true)
  }      

  const handleCreateTask = (taskData: Task) => {             
    dispatch(addTask({ columnId: selectedColumn, task: taskData }))         
    updateList(taskData)    
  }

  const handleEditTask = (taskData: Task) => {             
    const payload = {
      columnId: selectedColumn,
      task: taskData
    }

    dispatch(addTask(payload))     
  }

  const updateList = (taskData: Task) => {
    const updatedColumns = {
      ...columns,
      [selectedColumn]: {
        ...columns[selectedColumn],
        items: [...columns[selectedColumn].items, taskData]
      }
    }

    setColumns(updatedColumns)
  }
  
  return (
    <>
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
                    <div className="flex items-center justify-center h-10 rounded-md px-8 w-full shadow-sm font-medium text-lg bg-background">
                      {column.name}
                    </div>

                    {column.items.map((task: Task, index: number) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => <TaskCard provided={provided} task={task} />}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              <Button 
                variant="outline"          
                size="lg" 
                className="flex items-center gap-3 w-72 min-w-72 text-lg font-medium dark:hover:border-background/20 dark:hover:shadow-sm"          
                onClick={() => openModal(columnId)}
              >
                <Plus className="size-6" />
                Nova tarefa
              </Button>
            </div>
          ))} 

          <Button  
            variant="outline"         
            size="lg" 
            className="flex items-center gap-3 w-72 min-w-72 text-lg font-medium dark:hover:border-background/20 dark:hover:shadow-sm"
          >
            <Plus className="size-6" />
            Nova coluna
          </Button>               
        </div>
      </DragDropContext>

      <BoardForm 
        isOpen={isFormOpen}         
        onOpenChange={handleFormOpenChange}      
        onCreate={handleCreateTask}  
      />
    </>
  )
}