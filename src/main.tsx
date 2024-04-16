import ReactDOM from 'react-dom/client'
import { App } from './app.tsx'
import { ThemeProvider } from "@/components/theme-provider.tsx"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <App />
  </ThemeProvider>      
)
