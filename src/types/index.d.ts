export type Task = {
  id: string
  title: string
  description: string
  priority: 'high' | 'medium' | 'low' | string
  deadline?: string
}

export type Column = {  
  name: string
  items: Task[]
}

export type Columns = {
  [key: string]: Column
}
