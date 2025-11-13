import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import theme from "./assets/theme/theme.ts";
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      {/* aplicamos todo el tema lila en la app*/}
      <ThemeProvider theme={theme}>
          <CssBaseline />   {/* gracias a estoaplica bien el fondo*/}
          <App />
      </ThemeProvider>
  </StrictMode>,
)
