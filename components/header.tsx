import { GraduationCap } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-10 w-10 text-primary-foreground" />
            </div>
            <div>
              <div className="text-sm font-semibold text-primary">SETEC</div>
              <h1 className="text-2xl font-bold text-foreground text-balance">
                Academia de Idiomas Héroe Brian Willson
              </h1>
              <p className="text-sm text-muted-foreground">Servicios en Línea</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
