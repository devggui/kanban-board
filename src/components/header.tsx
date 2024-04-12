import { ModeToggle } from "./mode-toggle";

export function Header() {
  return (
    <div className="flex items-center justify-between w-full p-6 bg-secondary">
      <h1 className="text-2xl font-bold">react kanban board</h1>
      <ModeToggle />      
    </div>
  )
}