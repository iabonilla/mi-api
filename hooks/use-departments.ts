"use client"

import { useState, useEffect } from "react"
import { getAllDepartments } from "@/lib/api/departments"
import type { Department } from "@/types/course"
import { useToast } from "@/hooks/use-toast"

export function useDepartments() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchDepartments = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getAllDepartments()
      setDepartments(data)
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
    fetchDepartments()
  }, [])

  return {
    departments,
    loading,
    error,
    refreshDepartments: fetchDepartments,
  }
}
