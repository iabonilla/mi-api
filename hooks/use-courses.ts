// hooks/use-courses.ts - VERSIÓN CORREGIDA
"use client"

import { useState, useEffect, useCallback } from "react"
import { courseService } from "@/services"
import type { Curso, CreateCursoDto, UpdateCursoDto, CourseFilters } from "@/types/course"
import { useToast } from "@/hooks/use-toast"

export function useCourses(initialFilters?: CourseFilters) {
  const [courses, setCourses] = useState<Curso[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Función para obtener cursos - MANTENER igual
  const fetchCourses = useCallback(async (filters?: CourseFilters) => {
    try {
      setLoading(true)
      setError(null)
      
      console.log("🔍 Fetching courses from API with filters:", filters)
      
      // LLAMADA REAL A LA API
      const data = await courseService.getAll(filters)
      
      console.log(`📊 API returned ${data.length} courses`)
      setCourses(data)
      
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al cargar cursos"
      setError(message)
      console.error("❌ Error fetching courses:", err)
      
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  // ✅ EFECTO CORREGIDO: Ejecutar cuando cambien los filtros
  useEffect(() => {
    console.log("🎯 Filters changed, fetching courses:", initialFilters)
    fetchCourses(initialFilters)
  }, [fetchCourses, initialFilters]) // ← AGREGAR initialFilters a las dependencias

  // ✅ ELIMINAR searchWithFilters - Ya no es necesario
  // const searchWithFilters = async (newFilters: CourseFilters) => {
  //   console.log("🎯 Buscando con nuevos filtros:", newFilters)
  //   await fetchCourses(newFilters)
  // }

  // Funciones CRUD existentes (mantener igual)...
  const createCourse = async (data: CreateCursoDto) => {
    try {
      await courseService.create(data)
      toast({
        title: "Éxito",
        description: "Curso creado correctamente",
      })
      await fetchCourses(initialFilters) // ← Usar los filtros actuales
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al crear curso"
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      })
      throw err
    }
  }

  const updateCourse = async (id: string, data: UpdateCursoDto) => {
    try {
      await courseService.update(id, data)
      toast({
        title: "Éxito",
        description: "Curso actualizado correctamente",
      })
      await fetchCourses(initialFilters) // ← Usar los filtros actuales
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al actualizar curso"
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      })
      throw err
    }
  }

  const deleteCourse = async (id: string) => {
    try {
      await courseService.delete(id)
      toast({
        title: "Éxito",
        description: "Curso eliminado correctamente",
      })
      await fetchCourses(initialFilters) // ← Usar los filtros actuales
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al eliminar curso"
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      })
      throw err
    }
  }

  const refreshCourses = () => {
    fetchCourses(initialFilters) // ← Usar los filtros actuales
  }

  return {
    courses,
    loading,
    error,
    // ❌ ELIMINAR: searchWithFilters, // Ya no es necesario
    createCourse,
    updateCourse,
    deleteCourse,
    refreshCourses,
  }
}