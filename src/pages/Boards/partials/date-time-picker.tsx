import { useEffect, useState } from "react"
import { addDays } from "date-fns"
import { format } from "date-fns-tz"
import { ptBR } from "date-fns/locale/pt-BR"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { Label } from "@/components/ui/label"

type TimePickerProps = {  
  selectedDate?: string
  setSelectedDate: (value: string) => void
}

export function DateTimePicker({  
  selectedDate,
  setSelectedDate,
}: TimePickerProps) {
  const [date, setDate] = useState<Date>()      
  const [time, setTime] = useState<string>()  

  useEffect(() => {
    if (selectedDate) {
      const initialDate = new Date(selectedDate)
      const initialTime = initialDate.getHours() + ':' + initialDate.getMinutes()            

      setDate(initialDate)
      setTime(initialTime)      
    }    
  }, [])

  useEffect(() => {
    if (date) setSelectedDate(date.toISOString())          
  }, [date])

  const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value

    if (!date) {
      setTime(time)
      return
    }

    const [hours, minutes] = time.split(':').map((str) => parseInt(str, 10))
    
    const newSelectedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes
    )

    setDate(newSelectedDate)    
    setTime(time)
  }

  return (
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
          {date ? format(date, "Pp", { timeZone: 'America/Sao_Paulo', locale: ptBR }) : <span>Selecione a data</span>}
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
            <SelectValue placeholder="Selecione um período..." />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Hoje</SelectItem>
            <SelectItem value="1">Amanhã</SelectItem>
            <SelectItem value="3">Em 3 dias</SelectItem>
            <SelectItem value="7">Em uma semana</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar 
            mode="single" 
            selected={date} 
            onSelect={setDate} 
            locale={ptBR}                       
            footer={
              <div className="w-full flex items-center justify-start pt-4">
                <Label className="text-sm mr-2">Selecione um horário:</Label>
                <Input 
                  type="time"
                  id="time"
                  className="w-max bg-secondary"
                  value={time}
                  onChange={handleTimeChange}                  
                />
              </div>
            }
          />
        </div>
      </PopoverContent>
    </Popover>    
  )
}