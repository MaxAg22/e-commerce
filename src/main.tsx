import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { initMercadoPago } from '@mercadopago/sdk-react'

const queryClient = new QueryClient();

initMercadoPago(import.meta.env.VITE_PUBLIC_KEY, {locale: "es-AR"}); // Inicializamos mercado pago una sola vez

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}> {/* Aquí se crea el cliente de TanStack Query */}
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  </StrictMode>,
)
