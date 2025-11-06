"use client"

import { useState, useEffect } from "react"
import { tipoOfertaService } from "@/services"
import type { TipoOferta } from "@/types/course"
import { useToast } from "@/hooks/use-toast"

export function useTipoOfertas() {
  const [tipoOfertas, setTipoOfertas] = useState<TipoOferta[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchTipoOfertas = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await tipoOfertaService.getAll()
      setTipoOfertas(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al cargar tipos de ofertas"
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
    fetchTipoOfertas()
  }, [])

  return {
    tipoOfertas,
    loading,
    error,
    refreshTipoOfertas: fetchTipoOfertas,
  }
}