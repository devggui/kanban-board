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

const saveStateToLocalStorage = (state: Columns) => {
  localStorage.setItem("boardState", JSON.stringify(state))
}

const loadStateFromLocalStorage = (): Columns | null => {
  const serializedState = localStorage.getItem("boardState")
  if (serializedState === null) {
    return null
  }
  return JSON.parse(serializedState)
}

const initialStateFromLocalStorage = loadStateFromLocalStorage() || initialState

const boardSlice = createSlice({
  name: "board",
  initialState: initialStateFromLocalStorage,
  reducers: {
    addTask: (state, action: PayloadAction<AddTaskPayload>) => {
      const { columnId, task } = action.payload      
      state[columnId].items.push(task)            
      saveStateToLocalStorage(state)
    }, 
    editTask: (state, action: PayloadAction<EditTaskPayload>) => {      
      const { columnId, updatedTask } = action.payload      
      const taskIndex = state[columnId].items.findIndex(task => task.id === updatedTask.id)            
      state[columnId].items[taskIndex] = updatedTask      
      saveStateToLocalStorage(state)            
    },
    deleteTask: (state, action: PayloadAction<DeleteTaskPayload>) => {
      const { columnId, deletedTask } = action.payload
      const taskIndex = state[columnId].items.findIndex(task => task.id === deletedTask?.id)            
      state[columnId].items.splice(taskIndex, 1)
      saveStateToLocalStorage(state)
    }   
  }
})

export const { addTask, editTask, deleteTask } = boardSlice.actions
export const selectBoard = (state: RootState) => state.board

export default boardSlice.reducer
