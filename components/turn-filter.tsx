"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const turns = ["Matutino", "Vespertino", "Nocturno", "Dominical", "Sabatino", "Diurno"]

export function TurnFilter() {
  const [selected, setSelected] = useState<string[]>([])

  const toggleTurn = (turn: string) => {
    setSelected((prev) => (prev.includes(turn) ? prev.filter((t) => t !== turn) : [...prev, turn]))
  }

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      {turns.map((turn) => (
        <Button
          key={turn}
          variant={selected.includes(turn) ? "default" : "outline"}
          className={
            selected.includes(turn)
              ? "bg-primary text-primary-foreground"
              : "border-border text-foreground hover:bg-accent hover:text-accent-foreground"
          }
          onClick={() => toggleTurn(turn)}
        >
          {turn}
        </Button>
      ))}
    </div>
  )
}
