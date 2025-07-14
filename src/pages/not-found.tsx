import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="font-bold text-4xl">Página não encontrada</h1>
      <p className="text-muted-foreground">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Link className="text-primary hover:underline" to="/">
        Voltar para o início
      </Link>
    </div>
  )
}
