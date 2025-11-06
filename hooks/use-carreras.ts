"use client"

import { useState, useEffect } from "react"
import { carreraService } from "@/services"
import type { Carrera } from "@/types/course"
import { useToast } from "@/hooks/use-toast"

export function useCarreras() {
  const [carreras, setCarreras] = useState<Carrera[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchCarreras = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await carreraService.getAll()
      setCarreras(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al cargar carreras"
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
    fetchCarreras()
  }, [])

  return {
    carreras,
    loading,
    error,
    refreshCarreras: fetchCarreras,
  }
}