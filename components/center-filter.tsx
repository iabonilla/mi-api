"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Search } from "lucide-react"

const centers = [
  'CENTRO NACIONAL DE INNOVACIÓN Y TECNOLOGÍA FRANCISCO "EL CHELE" MORENO',
  "CENTRO TECNOLOGICO DE JALAPA - INATEC",
  "CENTRO TECNOLOGICO OLOF PALME, ESTELI - INATEC",
  "CENTRO TECNOLOGICO CARLOS MANUEL VANEGAS OLIVAS, CHINANDEGA - INATEC",
  "CENTRO TECNOLOGICO ARLEN SIU, EL SAUCE - INATEC",
  "CENTRO TECNOLOGICO SIMON BOLIVAR, MANAGUA - INATEC",
  "CENTRO TECNOLOGICO DE IDIOMAS, MANAGUA - INATEC",
  "CENTRO TECNOLOGICO JUAN DE DIOS MUÑOZ REYES, LEON - INATEC",
]

export function CenterFilter() {
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<string[]>([])

  const filteredCenters = centers.filter((center) => center.toLowerCase().includes(search.toLowerCase()))

  const toggleCenter = (center: string) => {
    setSelected((prev) => (prev.includes(center) ? prev.filter((c) => c !== center) : [...prev, center]))
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar centro tecnológico..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>
      <ScrollArea className="h-64 rounded-md border border-border bg-secondary p-4">
        <div className="space-y-3">
          {filteredCenters.map((center) => (
            <div key={center} className="flex items-start space-x-3">
              <Checkbox
                id={center}
                checked={selected.includes(center)}
                onCheckedChange={() => toggleCenter(center)}
                className="mt-1"
              />
              <label htmlFor={center} className="text-sm leading-relaxed text-secondary-foreground cursor-pointer">
                {center}
              </label>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
