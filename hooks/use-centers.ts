"use client"

import { useState, useEffect } from "react"
import { getAllCenters } from "@/lib/api/centers"
import type { Center } from "@/types/course"
import { useToast } from "@/hooks/use-toast"

export function useCenters() {
  const [centers, setCenters] = useState<Center[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchCenters = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getAllCenters()
      setCenters(data)
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
    fetchCenters()
  }, [])

  return {
    centers,
    loading,
    error,
    refreshCenters: fetchCenters,
  }
}
