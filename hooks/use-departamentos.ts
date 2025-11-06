"use client"

import { useState, useEffect } from "react"
import { departmentService } from "@/services"
import type { Departamento } from "@/types/course"
import { useToast } from "@/hooks/use-toast"

export function useDepartamentos() {
  const [departamentos, setDepartamentos] = useState<Departamento[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchDepartamentos = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await departmentService.getAll()
      setDepartamentos(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al cargar departamentos"
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
    fetchDepartamentos()
  }, [])

  return {
    departamentos,
    loading,
    error,
    refreshDepartamentos: fetchDepartamentos,
  }
}