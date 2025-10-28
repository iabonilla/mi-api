"use client"

import { useState, useEffect } from "react"
import { getAllTurns } from "@/lib/api/turns"
import type { Turn } from "@/types/course"
import { useToast } from "@/hooks/use-toast"

export function useTurns() {
  const [turns, setTurns] = useState<Turn[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchTurns = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getAllTurns()
      setTurns(data)
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
    fetchTurns()
  }, [])

  return {
    turns,
    loading,
    error,
    refreshTurns: fetchTurns,
  }
}
