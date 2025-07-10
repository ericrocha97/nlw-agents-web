import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'

interface HeaderProps {
  showBackButton?: boolean
}

export function Header({ showBackButton }: HeaderProps) {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <Button asChild variant="outline">
              <Link to="/">
                <ArrowLeft className="mr-2 size-4" />
                Voltar ao Início
              </Link>
            </Button>
          )}
          {!showBackButton && (
            <h1 className="font-bold text-2xl">
              <Link to="/">Let Me Ask</Link>
            </h1>
          )}
        </div>
        <ModeToggle />
      </div>
    </header>
  )
}
