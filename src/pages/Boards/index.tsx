import { useEffect, useState } from "react"
import type { Columns, Task } from "@/types"
import { BoardForm } from "./form"
import { deleteTask, selectBoard, updateColumns } from "@/reducers/boardReducer"
import { DeleteDialog } from "@/components/delete-dialog"
import { useDispatch } from "react-redux"
import { DragDrop } from "./drag-drop"
import { useSelector } from "react-redux"

export function Boards() {   
  const boards = useSelector(selectBoard)
  const dispatch = useDispatch()    
  
  const [columns, setColumns] = useState<Columns>(boards)    
  const [version, setVersion] = useState<number>(0)  
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false)
  const [selectedColumn, setSelectedColumn] = useState<string>('')        
  const [selectedTask, setSelectedTask] = useState<Task>()      

  useEffect(() => {
    loadColumns()    
  }, [version]) 

  useEffect(() => {
    dispatch(updateColumns(columns))    
  }, [columns])

  const loadColumns = () => {    
    const data = window.localStorage.getItem("boardState")
    if (data === null) return    
    setColumns(JSON.parse(data))
  }

  const handleDeleteDialogOpenChange = (value: boolean): void => setIsDeleteDialogOpen(value)

  const handleFormOpenChange = (value: boolean): void => setIsFormOpen(value)

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
    setVersion(version + 1)
  }   

  return (
    <>
      <DragDrop                 
        onCreate={handleCreateTask}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}       
        columns={columns}
        setColumns={setColumns}              
      />

      <BoardForm 
        isOpen={isFormOpen}         
        onOpenChange={handleFormOpenChange}              
        initialData={selectedTask}
        selectedColumn={selectedColumn}            
        onSuccess={() => setVersion(version + 1)}
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