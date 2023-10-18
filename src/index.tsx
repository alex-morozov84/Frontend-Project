import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { ErrorBoundary } from '@/app/providers/ErrorBoundary'
import { StoreProvider } from '@/app/providers/StoreProvider'
import App from './app/App'
import '@/app/styles/index.scss'
import './shared/config/i18n/i18n'
import {ForceUpdateProvider} from "@/shared/lib/render/forceUpdate";

const container = document.getElementById('root')

if (!container) {
  throw new Error(
    'Контейнер root не найден. Не удалось вмонтировать реакт приложение',
  )
}

const root = createRoot(container)
root.render(
  <BrowserRouter>
    <StoreProvider>
      <ErrorBoundary>
        <ForceUpdateProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </ForceUpdateProvider>
      </ErrorBoundary>
    </StoreProvider>
  </BrowserRouter>,
)
export { Theme } from '@/shared/const/theme'
