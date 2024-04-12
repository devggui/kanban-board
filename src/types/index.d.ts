export type Task = {
  id: string
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  deadline: number
}

export type Column = {
  id: string
  name: string
  items: Task[]
}

