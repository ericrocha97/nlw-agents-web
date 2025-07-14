import { Navigate, useParams } from 'react-router-dom'
import { Header } from '@/components/header'
import { QuestionForm } from '@/components/question-form'
import { QuestionList } from '@/components/question-list'
import { RoomHeader } from '@/components/room-header'
import type { RoomParams } from '@/types'

export function Room() {
  const params = useParams<RoomParams>()

  if (!params.roomId) {
    return <Navigate replace to="/" />
  }

  return (
    <div className="min-h-screen">
      <Header showBackButton />
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <RoomHeader roomId={params.roomId} />
        </div>

        <div className="mb-8">
          <QuestionForm roomId={params.roomId} />
        </div>

        <QuestionList roomId={params.roomId} />
      </div>
    </div>
  )
}
