"use client"

import { useState, useEffect } from "react"
import { tipoCursoService } from "@/services"
import type { TipoCurso } from "@/types/course"
import { useToast } from "@/hooks/use-toast"

export function useTipoCursos() {
  const [tipoCursos, setTipoCursos] = useState<TipoCurso[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchTipoCursos = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await tipoCursoService.getAll()
      setTipoCursos(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al cargar tipos de cursos"
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
    fetchTipoCursos()
  }, [])

  return {
    tipoCursos,
    loading,
    error,
    refreshTipoCursos: fetchTipoCursos,
  }
}