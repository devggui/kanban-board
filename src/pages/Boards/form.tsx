import { useEffect } from "react"
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

const BoardFormSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'O título é obrigatório'),
  description: z.string().optional(),
  priority: z.string({ required_error: 'A prioridade é obrigatório' }),
  deadline: z.date({ required_error: 'O prazo final é obrigatório' }),
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
              <Controller 
                name="deadline"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-1/2 justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="size-4 mr-2" />
                        {field.value 
                          ? format(field.value, "PPP", { timeZone: 'America/Sao_Paulo', locale: ptBR }) 
                          : <span>Selecione a data</span>
                        }
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        locale={ptBR}                        
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.deadline && (
                <span className="text-sm text-red-500">
                  {errors.deadline.message}
                </span>
              )}
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