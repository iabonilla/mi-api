"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

interface Centro {
  id: number
  nombre: string
  direccion?: string
  telefono?: string
}

interface CenterFilterProps {
  municipioId?: number | null
  centros: Centro[]
  onCenterSelect?: (centerId: number | null) => void
  selectedCenter?: number | null
  loading?: boolean
}

export function CenterFilter({ 
  municipioId, 
  centros, 
  onCenterSelect, 
  selectedCenter, 
  loading = false 
}: CenterFilterProps) {
  const [search, setSearch] = useState("")

  const filteredCenters = centros.filter((center) => 
    center.nombre.toLowerCase().includes(search.toLowerCase())
  )

  const handleCenterSelect = (centerId: number) => {
    const newSelection = selectedCenter === centerId ? null : centerId
    onCenterSelect?.(newSelection)
  }

  // Reset selection cuando cambia el municipio
  useEffect(() => {
    onCenterSelect?.(null)
  }, [municipioId, onCenterSelect])

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cargando centros..."
            disabled
            className="pl-10 bg-input border-border text-muted-foreground"
          />
        </div>
        <div className="h-64 rounded-md border border-border bg-white p-4 flex items-center justify-center">
          <Spinner className="h-6 w-6" />
          <span className="ml-2 text-muted-foreground">Cargando centros...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar centros..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>
      <ScrollArea className="h-64 rounded-md border border-border bg-white p-4">
        <div className="space-y-2">
          {filteredCenters.map((center) => (
            <div 
              key={center.id} 
              className={`flex items-start space-x-3 p-3 rounded-md cursor-pointer transition-all duration-200 ${
                selectedCenter === center.id 
                  ? "bg-primary text-primary-foreground border border-primary shadow-sm" 
                  : "border border-transparent hover:bg-primary/20 hover:text-primary-foreground hover:border-primary/30"
              }`}
              onClick={() => handleCenterSelect(center.id)}
            >
              <div className={`flex items-center justify-center w-4 h-4 mt-1 rounded-full border ${
                selectedCenter === center.id 
                  ? "bg-primary-foreground border-primary-foreground" 
                  : "border-muted-foreground/60"
              }`}>
                {selectedCenter === center.id && (
                  <div className="w-2 h-2 rounded-full bg-primary" />
                )}
              </div>
              <label 
                htmlFor={`center-${center.id}`} 
                className="text-sm leading-relaxed cursor-pointer flex-1"
              >
                {center.nombre}
                {center.direccion && (
                  <div className="text-xs text-muted-foreground mt-1">
                    {center.direccion}
                  </div>
                )}
              </label>
            </div>
          ))}
          {filteredCenters.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No se encontraron centros
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}