// components/course-history-table.tsx - ACTUALIZADO
"use client"

import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, BookOpen } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface CourseHistoryItem {
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
  nota: number
  aprobado: boolean
  diploma: boolean
  ubicacion?: string
  plataforma?: string
  cupos?: string
}

interface CourseHistoryTableProps {
  courses: CourseHistoryItem[]
}

export function CourseHistoryTable({ courses }: CourseHistoryTableProps) {
  if (courses.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No se encontró historial de cursos.</p>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Historial Completo de Cursos
        </CardTitle>
        <CardDescription>
          Lista de todos los cursos tomados, incluyendo estados de aprobación y diplomas
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
                <TableHead>Nota</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Diploma</TableHead>
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
                    {new Date(course.fecha_inicio).toLocaleDateString()} -{" "}
                    {new Date(course.fecha_fin).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{course.horario}</TableCell>
                  <TableCell>{course.duracion}</TableCell>
                  <TableCell>{course.instructor}</TableCell>
                  <TableCell>
                    <span className={
                      course.nota >= 70 ? "text-green-600 font-medium" :
                      course.nota >= 60 ? "text-yellow-600 font-medium" :
                      "text-red-600 font-medium"
                    }>
                      {course.nota}
                    </span>
                  </TableCell>
                  <TableCell>
                    {course.aprobado ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Aprobado
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-red-100 text-red-800">
                        Reprobado
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {course.diploma ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </TableCell>
                  <TableCell>
                    {course.modalidad === "Virtual" ? course.plataforma : course.ubicacion}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p><strong>Nota:</strong> El historial incluye todos los cursos tomados, tanto aprobados como reprobados.</p>
        </div>
      </CardContent>
    </Card>
  )
}