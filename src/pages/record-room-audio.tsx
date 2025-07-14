import { useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function'

type RoomParams = {
  roomId: string
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

export function RecordRoomAudio() {
  const params = useParams<RoomParams>()
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const recorder = useRef<MediaRecorder | null>(null)
  const intervalRef = useRef<NodeJS.Timeout>(null)
  const timerRef = useRef<NodeJS.Timeout>(null)

  function stopRecording() {
    setIsRecording(false)
    setRecordingTime(0)

    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop()
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData()

    formData.append('file', audio, 'audio.webm')

    const response = await fetch(
      `http://localhost:3333/rooms/${params.roomId}/audio`,
      {
        method: 'POST',
        body: formData,
      }
    )

    const result = await response.json()

    if (response.ok) {
      toast.success('Áudio enviado com sucesso!')
    } else {
      toast.error(
        `Erro ao enviar áudio: ${result.message || 'Erro desconhecido'}`
      )
    }
  }

  function createRecorder(audio: MediaStream) {
    recorder.current = new MediaRecorder(audio, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000,
    })

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data)
      }
    }

    recorder.current.onstart = () => {
      toast.success('Gravação iniciada com sucesso!')
    }

    recorder.current.onstop = () => {
      toast.success('Gravação pausada com sucesso!')
    }

    recorder.current.start()
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      toast.warning('O seu navegador não suporta gravação')
      return
    }

    setIsRecording(true)
    setRecordingTime(0)

    timerRef.current = setInterval(() => {
      setRecordingTime((time) => time + 1)
    }, 1000)

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    })

    createRecorder(audio)

    intervalRef.current = setInterval(() => {
      recorder.current?.stop()

      createRecorder(audio)
    }, 5000)
  }

  if (!params.roomId) {
    return <Navigate replace to="/" />
  }

  return (
    <div className="flex h-screen flex-col">
      <Header backTo={`/room/${params.roomId}`} showBackButton />

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
