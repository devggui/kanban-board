import { useEffect, useState } from "react"
import type { Task } from "@/types"
import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import { addTask, editTask } from "@/reducers/boardReducer"
import { useDispatch } from "react-redux"
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
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { DateTimePicker } from "./partials/date-time-picker"

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
  selectedColumn: string 
  onOpenChange: (value: boolean) => void    
  updateList: () => void 
}

export const BoardForm = ({  
  isOpen,
  initialData,
  onOpenChange,  
  selectedColumn,  
  updateList
}: BoardFormProps) => {
  const {
    register,
    handleSubmit,    
    setValue,
    control,
    reset,    
    formState: { errors, isSubmitting },
  } = useForm<BoardFormData>({ resolver: zodResolver(BoardFormSchema) })            
  const [selectedDate, setSelectedDate] = useState<string | undefined>('')        

  const dispatch = useDispatch()        

  useEffect(() => {    
    setValue('deadline', selectedDate)          
  }, [selectedDate])

  useEffect(() => {      
    if (initialData) {
      setValue('id', initialData.id)
      setValue('title', initialData.title)
      setValue('description', initialData.description)
      setValue('priority', initialData.priority)
      setValue('deadline', initialData.deadline)

      setSelectedDate(initialData.deadline)      
    } else {
      reset()
      setValue('id', uuidv4())
      setSelectedDate(undefined)
    }
  }, [isOpen])

  const sendForm = (data: BoardFormData) => {  
    if (initialData) update(data)
    else store(data)            
  }

  const store = (data: BoardFormData) => {    
    dispatch(addTask({ columnId: selectedColumn, task: data }))             
    onOpenChange(false)    
    updateList()
  }

  const update = (data: BoardFormData) => {              
    dispatch(editTask({ columnId: selectedColumn, updatedTask: data }))
    onOpenChange(false)        
    updateList()
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
              <DateTimePicker          
                selectedDate={selectedDate}                                      
                setSelectedDate={setSelectedDate}                
              />             
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