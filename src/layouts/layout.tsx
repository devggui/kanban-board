import { Header } from "@/components/header"
import { Toaster } from "@/components/ui/sonner"
import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <div className="flex flex-1 flex-col min-h-screen bg-secondary">
      <Header />
      <Outlet />  
      <Toaster />                      
    </div>
  )
}