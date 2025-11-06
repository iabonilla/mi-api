"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

export interface Municipio {
  id: number
  nombre: string
  codigo: string
  estado: boolean
}

export function useMunicipios(departamentoId?: number) {
  const [municipios, setMunicipios] = useState<Municipio[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchMunicipios = async () => {
    if (!departamentoId) {
      setMunicipios([])
      return
    }

    try {
      setLoading(true)
      setError(null)
      // TODO: Conectar con endpoint real /api/municipios?departamento_id=X
      const response = await fetch(`http://localhost:3005/api/municipios?departamento_id=${departamentoId}`)
      const data = await response.json()
      setMunicipios(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al cargar municipios"
      setError(message)
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMunicipios()
  }, [departamentoId])

  return {
    municipios,
    loading,
    error,
    refreshMunicipios: fetchMunicipios,
  }
}