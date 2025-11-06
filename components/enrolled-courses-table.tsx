// components/enrolled-courses-table.tsx
"use client"

import { Badge } from "@/components/ui/badge"
import { BookOpen, Calendar, MapPin, Clock } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface EnrolledCourseItem {
  id: number
  nombre: string
  codigo: string
  nivel: string
  modalidad: string
  fecha_inicio: string
  fecha_fin: string
  horario: string
  duracion: string
  instructor: string
  centro: string
  estado: string
  progreso?: string
  ubicacion?: string
  plataforma?: string
}

interface EnrolledCoursesTableProps {
  courses: EnrolledCourseItem[]
}

export function EnrolledCoursesTable({ courses }: EnrolledCoursesTableProps) {
  if (courses.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No se encontraron cursos matriculados activos.</p>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Cursos Matriculados Activos
        </CardTitle>
        <CardDescription>
          Lista de todos los cursos en los que actualmente está matriculado
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Curso</TableHead>
                <TableHead>Nivel</TableHead>
                <TableHead>Modalidad</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Horario</TableHead>
                <TableHead>Duración</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Progreso</TableHead>
                <TableHead>Ubicación/Plataforma</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div>{course.nombre}</div>
                      <div className="text-sm text-muted-foreground">{course.codigo}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      course.nivel === "Básico" ? "bg-blue-50 text-blue-700" :
                      course.nivel === "Intermedio" ? "bg-green-50 text-green-700" :
                      course.nivel === "Avanzado" ? "bg-purple-50 text-purple-700" :
                      "bg-gray-50 text-gray-700"
                    }>
                      {course.nivel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={course.modalidad === "Virtual" ? "secondary" : "default"}>
                      {course.modalidad}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs">
                        {new Date(course.fecha_inicio).toLocaleDateString()} -{" "}
                        {new Date(course.fecha_fin).toLocaleDateString()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs">{course.horario}</span>
                    </div>
                  </TableCell>
                  <TableCell>{course.duracion}</TableCell>
                  <TableCell>{course.instructor}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={
                      course.estado === "Activo" ? "bg-green-100 text-green-800" :
                      course.estado === "En progreso" ? "bg-blue-100 text-blue-800" :
                      "bg-gray-100 text-gray-800"
                    }>
                      {course.estado}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: course.progreso || '0%' }}
                      ></div>
                    </div>
                    <span className="text-xs text-muted-foreground">{course.progreso}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs">
                        {course.modalidad === "Virtual" ? course.plataforma : course.ubicacion}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p><strong>Nota:</strong> Esta lista muestra solo los cursos activos en los que actualmente está matriculado.</p>
        </div>
      </CardContent>
    </Card>
  )
}