import { v4 as uuidv4 } from "uuid"
import { Column } from "@/types"

export const Board: Column[] = [
	{
		id: uuidv4(),		
		name: "Backlog",
		items: [
			{
				id: uuidv4(),
				title: "Admin Panel Front-end",
				description: "Lorem ipsum dolor sit amet ..",
				priority: "medium",
				deadline: 50,					
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
	{
		id: uuidv4(),
		name: "Pending",
		items: [
			{
				id: uuidv4(),
				title: "Admin Panel Back-end",
				description: "Lorem ipsum dolor sit amet ..",
				priority: "high",
				deadline: 50,
			},
			{
				id: uuidv4(),
				title: "Admin Panel Front-end",
				description: "Lorem ipsum dolor sit amet ..",
				priority: "low",
				deadline: 50,										
			},
		],
	},
	{
		id: uuidv4(),
		name: "To Do",
		items: [
			{
				id: uuidv4(),
				title: "Admin Panel Front-end",
				description: "Lorem ipsum dolor sit amet ..",
				priority: "medium",
				deadline: 50,										
			},
		],
	},
	{
		id: uuidv4(),
		name: "Doing",
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
	{
		id: uuidv4(),
		name: "Done",
		items: [
			{
				id: uuidv4(),
				title: "Admin Panel Front-end",
				description: "LoLorem ipsum dolor sit amet ..Lorem ipsum dolor sit amet ..Lorem ipsum dolor sit amet ..Lorem ipsum dolor sit amet ..rem ipsum dolor sit amet ..",
				priority: "high",
				deadline: 50,												
			},
			{
				id: uuidv4(),
				title: "Admin Panel Front-end",
				description: "LoLorem ipsum dolor sit amet ..Lorem ipsum dolor sit amet ..Lorem ipsum dolor sit amet ..Lorem ipsum dolor sit amet ..rem ipsum dolor sit amet ..",
				priority: "high",
				deadline: 50,												
			},
			{
				id: uuidv4(),
				title: "Admin Panel Front-end",
				description: "LoLorem ipsum dolor sit amet ..Lorem ipsum dolor sit amet ..Lorem ipsum dolor sit amet ..Lorem ipsum dolor sit amet ..rem ipsum dolor sit amet ..",
				priority: "high",
				deadline: 50,												
			},
			{
				id: uuidv4(),
				title: "Admin Panel Front-end",
				description: "LoLorem ipsum dolor sit amet ..Lorem ipsum dolor sit amet ..Lorem ipsum dolor sit amet ..Lorem ipsum dolor sit amet ..rem ipsum dolor sit amet ..",
				priority: "high",
				deadline: 50,												
			},
			{
				id: uuidv4(),
				title: "Admin Panel Front-end",
				description: "LoLorem ipsum dolor sit amet ..Lorem ipsum dolor sit amet ..Lorem ipsum dolor sit amet ..Lorem ipsum dolor sit amet ..rem ipsum dolor sit amet ..",
				priority: "high",
				deadline: 50,												
			},
			{
				id: uuidv4(),
				title: "Admin Panel Front-end",
				description: "LoLorem ipsum dolor sit amet ..Lorem ipsum dolor sit amet ..Lorem ipsum dolor sit amet ..Lorem ipsum dolor sit amet ..rem ipsum dolor sit amet ..",
				priority: "high",
				deadline: 50,												
			},
			{
				id: uuidv4(),
				title: "Admin Panel Front-end",
				description: "LoLorem ipsum dolor sit amet ..Lorem ipsum dolor sit amet ..Lorem ipsum dolor sit amet ..Lorem ipsum dolor sit amet ..rem ipsum dolor sit amet ..",
				priority: "high",
				deadline: 50,												
			},
			{
				id: uuidv4(),
				title: "Admin Panel Front-end",
				description: "LoLorem ipsum dolor sit amet ..Lorem ipsum dolor sit amet ..Lorem ipsum dolor sit amet ..Lorem ipsum dolor sit amet ..rem ipsum dolor sit amet ..",
				priority: "high",
				deadline: 50,												
			},
		],
	},
	{
		id: uuidv4(),
		name: "Done",
		items: [
			{
				id: uuidv4(),
				title: "Admin Panel Front-end",
				description: "Lorem ipsum dolor sit amet ..",
				priority: "high",
				deadline: 50,												
			},
		],
	},
	{
		id: uuidv4(),
		name: "Done",
		items: [
			{
				id: uuidv4(),
				title: "Admin Panel Front-end",
				description: "Lorem ipsum dolor sit amet ..",
				priority: "high",
				deadline: 50,												
			},
		],
	},
]