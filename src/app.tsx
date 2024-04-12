import './global.css'
import { Plus } from "lucide-react"
import { KanbanColumn } from "./components/kanban/kanban-column"
import { Button } from "./components/ui/button"
import { Header } from "./components/header"

export function App() {
  return (
    <main className="flex min-h-screen flex-1 flex-col">
      <Header />

      <div className="flex flex-1 h-full bg-red-400 p-6 gap-6 overflow-x-auto">        
        <KanbanColumn
          title="Backlog"
        />                      

        <Button variant="secondary" className="min-w-72 w-72 h-14 flex justify-start">
          <Plus className="size-6 mr-2" />
          <p className="text-base font-semibold">Adicionar outra coluna</p>
        </Button>  
      </div>         
    </main>
  )
}
