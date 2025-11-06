// hooks/use-jerarquia-filtros.tsx - VERSIÓN CORREGIDA
"use client"

import { useState, useEffect, useMemo } from "react"
import { useToast } from "@/hooks/use-toast"

export interface JerarquiaItem {
  departamento_id: number
  departamento_nombre: string
  departamento_codigo: string
  municipio_id?: number
  municipio_nombre?: string
  municipio_codigo?: string
  centro_id?: number
  centro_nombre?: string
  centro_direccion?: string
  centro_telefono?: string
}

export function useJerarquiaFiltros(departamentoId?: number) {
  const [data, setData] = useState<JerarquiaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchJerarquia = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const params = departamentoId ? `?departamento_id=${departamentoId}` : ''
      const response = await fetch(`http://localhost:3005/api/centros/jerarquia${params}`)
      
      if (!response.ok) throw new Error('Error cargando jerarquía')
      
      const result = await response.json()
      setData(result)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al cargar datos"
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
    fetchJerarquia()
  }, [departamentoId])

  // SOLUCIÓN: Usar useMemo para evitar re-cálculos en cada render
  const departamentos = useMemo(() => 
    data
      .filter(item => !item.municipio_id)
      .map(item => ({
        id: item.departamento_id,
        nombre: item.departamento_nombre,
        codigo: item.departamento_codigo
      }))
  , [data])

  const municipios = useMemo(() =>
    data
      .filter(item => item.municipio_id && !item.centro_id)
      .map(item => ({
        id: item.municipio_id!,
        nombre: item.municipio_nombre!,
        codigo: item.municipio_codigo!
      }))
  , [data])

  const centros = useMemo(() =>
    data
      .filter(item => item.centro_id)
      .map(item => ({
        id: item.centro_id!,
        nombre: item.centro_nombre!,
        direccion: item.centro_direccion,
        telefono: item.centro_telefono
      }))
  , [data])

  return {
    // Datos crudos
    data,
    // Datos procesados para componentes existentes (AHORA MEMOIZADOS)
    departamentos, 
    municipios,
    centros,
    // Estados
    loading,
    error,
    refresh: fetchJerarquia,
  }
}