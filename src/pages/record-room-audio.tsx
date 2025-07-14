import { Navigate, useParams } from 'react-router-dom'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useAudioRecorder } from '@/hooks/use-audio-recorder'
import { formatTime } from '@/lib/utils'
import type { RoomParams } from '@/types'

export function RecordRoomAudio() {
  const params = useParams<RoomParams>()
  const roomId = params.roomId ?? ''

  const {
    isRecording,
    recordingTime,
    startRecording,
    stopRecording,
    isRecordingSupported,
  } = useAudioRecorder({ roomId })

  if (!roomId) {
    return <Navigate replace to="/" />
  }

  if (!isRecordingSupported) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <p className="mb-4 text-destructive text-lg">
          A gravação de áudio não é suportada neste navegador.
        </p>
        <Button asChild>
          <a href="/">Voltar para o início</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col">
      <Header backTo={`/room/${roomId}`} showBackButton />

      <main className="flex-1">
        <div className="mx-auto flex h-full max-w-4xl flex-col items-center justify-center gap-4 p-4">
          <Card className="flex w-full max-w-lg flex-col items-center gap-6 p-8">
            <h2 className="font-bold text-2xl">Gravação de áudio</h2>

            <div className="flex items-center gap-4">
              {isRecording && (
                <div className="flex items-center gap-4">
                  <div className="size-3 animate-pulse rounded-full bg-destructive" />
                  <span className="font-mono text-lg">
                    {formatTime(recordingTime)}
                  </span>
                </div>
              )}
            </div>

            {isRecording ? (
              <Button onClick={stopRecording} size="lg" variant="destructive">
                Pausar gravação
              </Button>
            ) : (
              <Button onClick={startRecording} size="lg">
                Iniciar gravação
              </Button>
            )}

            <p className="text-lg">
              {isRecording
                ? 'Gravando...'
                : 'Clique no botão para iniciar a gravação'}
            </p>
          </Card>
        </div>
      </main>
    </div>
  )
}
