import { Columns, Task } from "@/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../store"

type AddTaskPayload = {
  columnId: string,
  task: Task
}

type EditTaskPayload = {
  columnId: string
  taskIndex: number
  updatedTask: Task
}

const initialState: Columns = {
  todo: {
    name: "A fazer",
    items: []
  },
  doing: {
    name: "Em progresso",
    items: []
  },
  done: {
    name: "Concluído",
    items: []
  }
}

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<AddTaskPayload>) => {
      const { columnId, task } = action.payload      
      state[columnId].items.push(task)            
    }, 
    editTask: (state, action: PayloadAction<EditTaskPayload>) => {
      const { columnId, taskIndex, updatedTask } = action.payload;
      state[columnId].items[taskIndex] = updatedTask;
    },
    removeTask: (state, action) => {
      const { columnId, taskIndex } = action.payload
      state[columnId].items.splice(taskIndex, 1)
    }   
  }
})

export const { addTask, editTask, removeTask } = boardSlice.actions
export const selectBoard = (state: RootState) => state.board

export default boardSlice.reducer
