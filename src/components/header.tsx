import { Kanban } from "lucide-react"
import { ModeToggle } from "./mode-toggle"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex px-6 h-16 items-center justify-between">
        <div className="flex items-center justify-center gap-3">
          <Kanban className="size-8 text-primary" />
          <h1 className="text-primary text-2xl font-bold">React Kanban Board</h1>
        </div>     
        <ModeToggle />      
      </div>
    </header>
  )
}