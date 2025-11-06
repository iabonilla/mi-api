"use client"

import { Button } from "@/components/ui/button"
import { useTurnos } from "@/hooks/use-turnos"
import { Spinner } from "@/components/ui/spinner"

interface TurnFilterProps {
  onTurnSelect?: (turnId: number | null) => void
  selectedTurn?: number | null
}

export function TurnFilter({ onTurnSelect, selectedTurn }: TurnFilterProps) {
  const { turnos, loading, error } = useTurnos()

  const toggleTurn = (turnId: number) => {
    const newSelection = selectedTurn === turnId ? null : turnId
    onTurnSelect?.(newSelection)
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 md:grid-cols-2">
        {[...Array(4)].map((_, index) => (
          <Button
            key={index}
            variant="outline"
            disabled
            className="border-border text-muted-foreground"
          >
            <Spinner className="h-4 w-4 mr-2" />
            Cargando...
          </Button>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="text-center py-4 text-destructive text-sm">
          Error cargando turnos
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-2">
          <Button
            variant="outline"
            disabled
            className="border-border text-muted-foreground"
          >
            No disponible
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-2">
      {turnos.map((turno) => (
        <Button
          key={turno.id}
          variant={selectedTurn === turno.id ? "default" : "outline"}
          className={
            selectedTurn === turno.id
              ? "bg-primary text-primary-foreground border-primary shadow-sm"
              : "border-border text-foreground hover:bg-primary/20 hover:text-primary-foreground hover:border-primary/30"
          }
          onClick={() => toggleTurn(turno.id)}
        >
          {turno.nombre}
        </Button>
      ))}
    </div>
  )
}