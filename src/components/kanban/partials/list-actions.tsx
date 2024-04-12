import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Ellipsis } from "lucide-react"

export function ListActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => console.log('Add item')}>
          Adicionar uma tarefa
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log('Edit item')}>
          Renomear lista
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log('Delete item')}>
          Deletar lista
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => console.log('Archive item')}>
          Arquivar essa lista
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}