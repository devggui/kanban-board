export type Task = {
  id: string
  title: string
  description?: string
  priority: 'high' | 'medium' | 'low' | string
  deadline: Date
}

export type Column = {  
  name: string
  items: Task[]
}

export type Columns = {
  [key: string]: Column
}
