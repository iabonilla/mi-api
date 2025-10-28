"use client"

import { useCourses } from "@/hooks/use-courses"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Calendar, MapPin, Clock, Users, Trash2, Edit } from "lucide-react"
import type { CourseFilters } from "@/types/course"

interface CourseListProps {
  filters?: CourseFilters
}

export function CourseList({ filters }: CourseListProps) {
  const { courses, loading, error, deleteCourse } = useCourses(filters)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner className="h-8 w-8" />
        <span className="ml-2 text-muted-foreground">Cargando cursos...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
        <p className="text-destructive">Error: {error}</p>
      </div>
    )
  }

  if (courses.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-12 text-center">
        <p className="text-muted-foreground">No se encontraron cursos</p>
      </div>
    )
  }

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar este curso?")) {
      await deleteCourse(id)
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <Card key={course.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg">{course.name}</CardTitle>
                <CardDescription className="mt-1">{course.code}</CardDescription>
              </div>
              <Badge variant={course.status === "active" ? "default" : "secondary"}>{course.modality}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {course.description && <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>}

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{new Date(course.startDate).toLocaleDateString()}</span>
              </div>

              {course.schedule && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{course.schedule}</span>
                </div>
              )}

              {course.teacher && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{course.teacher}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>
                  {course.enrolled} / {course.capacity} estudiantes
                </span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                <Edit className="h-4 w-4 mr-1" />
                Editar
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(course.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
