import { useRef, useState } from 'react'
import { toast } from 'sonner'

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function'

interface UseAudioRecorderProps {
  roomId: string
}

export function useAudioRecorder({ roomId }: UseAudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const recorder = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  async function uploadAudio(audio: Blob) {
    const formData = new FormData()
    formData.append('file', audio, 'audio.webm')

    try {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/audio`,
        {
          method: 'POST',
          body: formData,
        }
      )

      if (!response.ok) {
        const result = await response.json()
        toast.error(
          `Erro ao enviar áudio: ${result.message || 'Erro desconhecido'}`
        )
      }
    } catch (_error) {
      toast.error('Falha ao enviar o áudio. Verifique sua conexão.')
    }
  }

  function createRecorder(stream: MediaStream) {
    const newRecorder = new MediaRecorder(stream, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000,
    })

    newRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data)
      }
    }

    newRecorder.onstart = () => {
      if (recordingTime === 0) {
        toast.success('Gravação iniciada com sucesso!')
      }
    }

    newRecorder.onstop = () => {
      if (!isRecording) {
        toast.success('Gravação finalizada com sucesso!')
      }
    }

    newRecorder.start()
    recorder.current = newRecorder
  }

  function stopRecording() {
    setIsRecording(false)

    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop()
    }

    if (streamRef.current) {
      for (const track of streamRef.current.getTracks()) {
        track.stop()
      }
      streamRef.current = null
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    setRecordingTime(0)
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      toast.warning('O seu navegador não suporta gravação.')
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44_100,
        },
      })
      streamRef.current = stream
      setIsRecording(true)

      timerRef.current = setInterval(() => {
        setRecordingTime((time) => time + 1)
      }, 1000)

      createRecorder(stream)

      intervalRef.current = setInterval(() => {
        if (recorder.current?.state === 'recording') {
          recorder.current.stop()
        }
        createRecorder(stream)
      }, 5000)
    } catch (_error) {
      toast.error(
        'Não foi possível iniciar a gravação. Verifique as permissões do microfone.'
      )
      setIsRecording(false)
    }
  }

  return {
    isRecording,
    recordingTime,
    startRecording,
    stopRecording,
    isRecordingSupported,
  }
}
