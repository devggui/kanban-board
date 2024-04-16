import { useEffect, useState } from "react"
import type { Task } from "@/types"
import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns-tz"
import { ptBR } from "date-fns/locale/pt-BR"
import { cn } from "@/lib/utils"
import { CalendarIcon, Loader2 } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import {
  Drawer,  
  DrawerContent,    
} from "@/components/ui/drawer"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { addDays } from "date-fns"

const BoardFormSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'O título é obrigatório'),
  description: z.string().min(1, 'A descrição é obrigatório'),
  priority: z.string({ required_error: 'A prioridade é obrigatório' }),
  deadline: z.string().optional(),
})

type BoardFormData = z.infer<typeof BoardFormSchema>

type BoardFormProps = {  
  isOpen: boolean    
  initialData?: Task
  onOpenChange: (value: boolean) => void  
  onCreate: (taskData: Task) => void
}

export const BoardForm = ({  
  isOpen,
  initialData,
  onOpenChange, 
  onCreate 
}: BoardFormProps) => {
  const {
    register,
    handleSubmit,    
    setValue,
    control,
    reset,    
    formState: { errors, isSubmitting },
  } = useForm<BoardFormData>({ resolver: zodResolver(BoardFormSchema) })            
  const [date, setDate] = useState<Date>()  

  useEffect(() => {
    if (!date) return    
    setValue('deadline', date.toISOString())
  }, [date])

  useEffect(() => {    
    if (initialData) {
      setValue('id', initialData.id)
      setValue('title', initialData.title)
      setValue('description', initialData.description)
      setValue('priority', initialData.priority)
      setValue('deadline', initialData.deadline)
    } else {
      reset()
      setValue('id', uuidv4())
    }
  }, [isOpen])

  const sendForm = (data: BoardFormData) => {  
    onCreate(data)     
    onOpenChange(false)
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>      
      <DrawerContent>
        <div className="mx-auto w-full max-w-md">
          <form
            className="flex flex-col gap-6 p-4"
            onSubmit={handleSubmit(sendForm)}
            id="board-form"
          >
            <div className="flex flex-col gap-3">
              <Label htmlFor="title">Título</Label>
              <Input 
                type="text"
                id="title"
                placeholder="Título da tarefa"
                {...register('title')}
              />
              {errors.title && (
                <span className="text-sm text-red-500">
                  {errors.title.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="description">Descrição</Label>
              <Input 
                type="text"
                id="description"
                placeholder="Descrição da tarefa"
                {...register('description')}
              />
              {errors.description && (
                <span className="text-sm text-red-500">
                  {errors.description.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="priority">Prioridade</Label>
              <Controller 
                name="priority"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-1/2">
                      <SelectValue placeholder="Selecione a prioridade..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">Alto</SelectItem>                     
                      <SelectItem value="medium">Médio</SelectItem>                     
                      <SelectItem value="low">Baixo</SelectItem>                     
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.priority && (
                <span className="text-sm text-red-500">
                  {errors.priority.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="deadline">Prazo final</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-1/2 justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { timeZone: 'America/Sao_Paulo', locale: ptBR }) : <span>Selecione a data</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="flex w-auto flex-col space-y-2 p-2"
                >
                  <Select
                    onValueChange={(value) =>
                      setDate(addDays(new Date(), parseInt(value)))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="0">Hoje</SelectItem>
                      <SelectItem value="1">Amanhã</SelectItem>
                      <SelectItem value="3">Em 3 dias</SelectItem>
                      <SelectItem value="7">Em uma semana</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="rounded-md border">
                    <Calendar mode="single" selected={date} onSelect={setDate} locale={ptBR} />
                  </div>
                </PopoverContent>
              </Popover>             
            </div>

            <Button type="submit" form="board-form" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="size-4 mr-2 animate-spin" />
              )}
              Confirmar
            </Button>
          </form>
        </div>      
    </DrawerContent>
  </Drawer>
  )
}