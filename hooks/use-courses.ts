"use client"

import { useState, useEffect, useCallback } from "react"
import {
  getAllCourses,
  createCourse as createCourseApi,
  updateCourse as updateCourseApi,
  deleteCourse as deleteCourseApi,
} from "@/lib/api/courses"
import type { Course, CreateCourseDto, UpdateCourseDto, CourseFilters } from "@/types/course"
import { useToast } from "@/hooks/use-toast"

export function useCourses(initialFilters?: CourseFilters) {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<CourseFilters>(initialFilters || {})
  const { toast } = useToast()

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getAllCourses(filters)
      setCourses(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al cargar cursos"
      setError(message)
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [filters, toast])

  const createCourse = async (data: CreateCourseDto) => {
    try {
      const newCourse = await createCourseApi(data)
      setCourses((prev) => [...prev, newCourse])
      toast({
        title: "Éxito",
        description: "Curso creado correctamente",
      })
      return newCourse
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

  const updateCourse = async (id: string, data: UpdateCourseDto) => {
    try {
      const updatedCourse = await updateCourseApi(id, data)
      setCourses((prev) => prev.map((course) => (course.id === id ? updatedCourse : course)))
      toast({
        title: "Éxito",
        description: "Curso actualizado correctamente",
      })
      return updatedCourse
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
      await deleteCourseApi(id)
      setCourses((prev) => prev.filter((course) => course.id !== id))
      toast({
        title: "Éxito",
        description: "Curso eliminado correctamente",
      })
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
    fetchCourses()
  }

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  return {
    courses,
    loading,
    error,
    filters,
    setFilters,
    createCourse,
    updateCourse,
    deleteCourse,
    refreshCourses,
  }
}
