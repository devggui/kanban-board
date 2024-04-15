import { v4 as uuidv4 } from "uuid"
import { Columns } from "../types"

export const Board: Columns = {
	backlog: {
		name: "Backlog",
		items: [
			{
				id: uuidv4(),
				title: "Admin Panel Front-end",
				description: "Lorem ipsum dolor sit amet ..",
				priority: "medium",
				deadline: 50,				
				alt: "task image",				
			},
			{
				id: uuidv4(),
				title: "Admin Panel Back-end",
				description: "Lorem ipsum dolor sit amet ..",
				priority: "low",
				deadline: 50,				
			},
		],
	},
	todo: {
		name: "A fazer",
		items: [
			{
				id: uuidv4(),
				title: "Admin Panel Front-end",
				description: "Lorem ipsum dolor sit amet ..",
				priority: "medium",
				deadline: 50,				
				alt: "task image",				
			},
		],
	},
	doing: {
		name: "Em progresso",
		items: [
			{
				id: uuidv4(),
				title: "Admin Panel Front-end",
				description: "Lorem ipsum dolor sit amet ..",
				priority: "low",
				deadline: 50,				
			},
			{
				id: uuidv4(),
				title: "Admin Panel Back-end",
				description: "Lorem ipsum dolor sit amet ..",
				priority: "medium",
				deadline: 50,				
			},
		],
	},
	done: {
		name: "Concluído",
		items: [],
	},
}