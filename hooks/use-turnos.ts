"use client"

import { useState, useEffect } from "react"
import { turnService } from "@/services"
import type { Turn } from "@/types/course"
import { useToast } from "@/hooks/use-toast"

export function useTurnos() {
  const [turnos, setTurnos] = useState<Turn[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchTurnos = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await turnService.getAll()
      setTurnos(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al cargar turnos"
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
    fetchTurnos()
  }, [])

  return {
    turnos,
    loading,
    error,
    refreshTurnos: fetchTurnos,
  }
}