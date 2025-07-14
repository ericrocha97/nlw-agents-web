import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { CreateRoom } from '@/pages/create-room'
import { Room } from '@/pages/room'
import { NotFound } from './pages/not-found'
import { RecordRoomAudio } from './pages/record-room-audio'

const queryClient = new QueryClient()

export function App() {
  return (
    <ThemeProvider
      defaultTheme="dark"
      storageKey={import.meta.env.VITE_UI_THEME_STORAGE_KEY}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<CreateRoom />} index />
            <Route element={<Room />} path="/room/:roomId" />
            <Route element={<RecordRoomAudio />} path="/room/:roomId/audio" />
            <Route element={<NotFound />} path="*" />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
