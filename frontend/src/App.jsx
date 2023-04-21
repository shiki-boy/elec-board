import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import 'react-datepicker/dist/react-datepicker.css'
import './App.scss'

import AppRoutes from '@/router/AppRoutes'
import Title from '@/components/Title'
import ToastMessage from '@/components/ToastMessage'
import { UiContextProvider } from '@/context/UiContext'
import { AuthContextProvider } from '@/context/AuthContext'
import Modal from '@/components/Modal'

function App() {
  const queryClient = new QueryClient( { defaultOptions: { queries: { refetchOnWindowFocus: false } } } )

  return (
    <HelmetProvider>
      <QueryClientProvider client={ queryClient }>
        <BrowserRouter>
          <AuthContextProvider>
            <UiContextProvider>
              <Title />

              <AppRoutes />

              <ToastMessage />

              <Modal />
            </UiContextProvider>
          </AuthContextProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  )
}

export default App
