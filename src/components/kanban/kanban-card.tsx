import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function KanbanCard() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="rounded-md p-4 bg-background hover:bg-background/60 hover:cursor-pointer">
          <p className="font-semibold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam ratione, alias molestias voluptas modi, dolorem, similique cum minima atque quaerat quibusdam culpa. Fugiat reiciendis quidem id a laborum consectetur laudantium?</p>          
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        {/*  */}
        <DialogFooter>
          <Button type="submit">Criar cartão</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
