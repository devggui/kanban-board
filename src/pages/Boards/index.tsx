import { useState } from "react"
import type { Task } from "@/types"
import { BoardForm } from "./form"
import { deleteTask } from "@/reducers/boardReducer"
import { DeleteDialog } from "@/components/delete-dialog"
import { useDispatch } from "react-redux"
import { DragDrop } from "./drag-drop"

export function Boards() {    
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false)
  const [selectedColumn, setSelectedColumn] = useState<string>('')        
  const [selectedTask, setSelectedTask] = useState<Task>()

  const dispatch = useDispatch()

  const handleDeleteDialogOpenChange = (value: boolean): void => {
    setIsDeleteDialogOpen(value)
  }

  const handleFormOpenChange = (value: boolean): void => {
    setIsFormOpen(value)
  } 

  const handleCreateTask = (columnId: string) => { 
    setSelectedTask(undefined)
    setSelectedColumn(columnId)
    setIsFormOpen(true)
  }

  const handleEditTask = (columnId: string, task: Task) => {             
    setSelectedColumn(columnId)
    setSelectedTask(task)
    setIsFormOpen(true)
  }
  
  const handleDeleteTask = (columnId: string, task: Task) => {
    setSelectedColumn(columnId)
    setSelectedTask(task)
    setIsDeleteDialogOpen(true)
  }

  const handleConfirmDeleteTask = () => {
    dispatch(deleteTask({ columnId: selectedColumn, deletedTask: selectedTask }))
    updateList()
  }

  const updateList = () => window.location.reload()
  
  return (
    <>
      <DragDrop 
        onCreate={handleCreateTask}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />

      <BoardForm 
        isOpen={isFormOpen}         
        onOpenChange={handleFormOpenChange}              
        initialData={selectedTask}
        selectedColumn={selectedColumn}        
        updateList={updateList}
      />

      <DeleteDialog 
        isOpen={isDeleteDialogOpen}
        onOpenChange={handleDeleteDialogOpenChange}
        onSubmit={handleConfirmDeleteTask}
        title="Tem certeza que deseja excluir essa tarefa?"
        description="Essa ação é irreversível."        
      />
    </>
  )
}