"use client"

import { useState, useEffect } from "react"
import { idiomaService } from "@/services"
import type { Idioma } from "@/types/course"
import { useToast } from "@/hooks/use-toast"

export function useIdiomas() {
  const [idiomas, setIdiomas] = useState<Idioma[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchIdiomas = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await idiomaService.getAll()
      setIdiomas(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al cargar idiomas"
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
    fetchIdiomas()
  }, [])

  return {
    idiomas,
    loading, 
    error,
    refreshIdiomas: fetchIdiomas,
  }
}