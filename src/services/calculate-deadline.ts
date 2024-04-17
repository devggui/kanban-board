import moment from "moment"
import "moment/dist/locale/pt-br"

export function calculateMinutesToDeadline(deadline: string) {         
  const currentMoment = moment()
  const deadlineMoment = moment(deadline)

  const duration = moment.duration(deadlineMoment.diff(currentMoment)).locale('pt-br')  
  
  const formattedDifference = duration.humanize()  

  return formattedDifference  
}
