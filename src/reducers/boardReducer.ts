import { Columns, Task } from "@/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../store"

type AddTaskPayload = {
  columnId: string,
  task: Task
}

type EditTaskPayload = {
  columnId: string  
  updatedTask: Task
}

type DeleteTaskPayload = {
  columnId: string
  deletedTask?: Task
}

const initialState: Columns = {
  backlog: {
    name: "Backlog",
    items: []
  },
  todo: {
    name: "A fazer",
    items: []
  },
  doing: {
    name: "Em progresso",
    items: []
  },
  review: {
    name: "Revisão",
    items: []
  },
  done: {
    name: "Concluído",
    items: []
  }
}

const loadInitialState = () => {
  const data = window.localStorage.getItem("boardState")

  if (data === null) return initialState
  else return JSON.parse(data)
}

const boardSlice = createSlice({
  name: "board",
  initialState: loadInitialState,
  reducers: {
    addTask: (state, action: PayloadAction<AddTaskPayload>) => {
      const { columnId, task } = action.payload      
      state[columnId].items.push(task)            
      
      window.localStorage.setItem("boardState", JSON.stringify(state))
    }, 
    editTask: (state, action: PayloadAction<EditTaskPayload>) => {      
      const { columnId, updatedTask } = action.payload      
      const taskIndex = state[columnId].items.findIndex((task: { id: string }) => task.id === updatedTask.id)            
      state[columnId].items[taskIndex] = updatedTask      

      window.localStorage.setItem("boardState", JSON.stringify(state))
    },
    deleteTask: (state, action: PayloadAction<DeleteTaskPayload>) => {
      const { columnId, deletedTask } = action.payload
      const taskIndex = state[columnId].items.findIndex((task: { id: string | undefined }) => task.id === deletedTask?.id)            
      state[columnId].items.splice(taskIndex, 1)

      window.localStorage.setItem("boardState", JSON.stringify(state))
    },
    updateColumns: (_, action) => {                  
      const updatedState = action.payload
      window.localStorage.setItem("boardState", JSON.stringify(updatedState))      
      return updatedState
    }    
  }
})

export const { addTask, editTask, deleteTask, updateColumns } = boardSlice.actions
export const selectBoard = (state: RootState) => state.board

export default boardSlice.reducer
