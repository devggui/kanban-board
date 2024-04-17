import ReactDOM from 'react-dom/client'
import { App } from './app.tsx'
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { Provider } from "react-redux"
import { store } from "../store.ts"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>      
)
