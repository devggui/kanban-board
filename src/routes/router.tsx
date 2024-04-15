import Layout from "@/layouts/layout"
import { Boards } from "@/pages/Boards"
import { createBrowserRouter } from "react-router-dom"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,    
    children: [
      {
        path: "",
        element: <Boards />,        
      },
    ],
  },
])