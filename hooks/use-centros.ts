"use client"

import { useState, useEffect } from "react"
import { centerService } from "@/services"
import type { Centro } from "@/types/course"
import { useToast } from "@/hooks/use-toast"

export function useCentros() {
  const [centros, setCentros] = useState<Centro[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchCentros = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await centerService.getAll()
      setCentros(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al cargar centros"
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
    fetchCentros()
  }, [])

  return {
    centros,
    loading,
    error,
    refreshCentros: fetchCentros,
  }
}