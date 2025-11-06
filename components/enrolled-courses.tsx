// components/enrolled-courses.tsx - ACTUALIZADO
"use client"

import { EnrolledCoursesModal } from "@/components/enrolled-courses-modal"

export function EnrolledCourses() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Consulte sus cursos matriculados activos y su progreso actual.
      </p>
      <EnrolledCoursesModal />
    </div>
  )
}