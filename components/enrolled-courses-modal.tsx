// components/enrolled-courses-modal.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search, BookOpen } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { EnrolledCoursesTable } from "@/components/enrolled-courses-table"

export function EnrolledCoursesModal() {
  const [personCode, setPersonCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [courses, setCourses] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const handleSearch = async () => {
    if (!personCode) {
      toast({
        title: "Error",
        description: "Por favor ingrese su código de persona",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    // Simular búsqueda de cursos matriculados activos
    setTimeout(() => {
      setLoading(false)
      // Datos de ejemplo para cursos matriculados activos
      setCourses([
        {
          id: 1,
          nombre: "Inglés Básico - Nivel A1",
          codigo: "ING-A1-2024",
          nivel: "Básico",
          modalidad: "Presencial",
          fecha_inicio: "2024-01-15",
          fecha_fin: "2024-04-15",
          horario: "Lunes y Miércoles 18:00-20:00",
          duracion: "3 meses",
          instructor: "Prof. María González",
          centro: "Centro Tecnológico de Idiomas, Managua - INATEC",
          estado: "Activo",
          progreso: "60%",
          ubicacion: "Centro Managua"
        },
        {
          id: 2,
          nombre: "Programación Web Avanzada",
          codigo: "PWA-2024",
          nivel: "Avanzado",
          modalidad: "Virtual",
          fecha_inicio: "2024-02-01",
          fecha_fin: "2024-05-01",
          horario: "Martes y Jueves 16:00-18:00",
          duracion: "4 meses",
          instructor: "Prof. Carlos Rodríguez",
          centro: "Virtual",
          estado: "En progreso",
          progreso: "30%",
          plataforma: "Plataforma SETEC Virtual"
        },
        {
          id: 3,
          nombre: "Francés Intermedio - Nivel B1",
          codigo: "FRA-B1-2024",
          nivel: "Intermedio",
          modalidad: "Presencial",
          fecha_inicio: "2024-03-01",
          fecha_fin: "2024-06-01",
          horario: "Viernes 16:00-19:00",
          duracion: "3 meses",
          instructor: "Prof. Sophie Martin",
          centro: "Centro León",
          estado: "Activo",
          progreso: "25%",
          ubicacion: "Centro León"
        }
      ])
      toast({
        title: "Cursos cargados",
        description: `Se encontraron ${3} cursos matriculados activos.`,
      })
    }, 1500)
  }

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
    if (!open) {
      // Resetear estado cuando se cierra el modal
      setPersonCode("")
      setCourses([])
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Search className="h-4 w-4" />
          Consultar matrículas
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Cursos matriculados activos
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex gap-2 items-center">
            <Input
              placeholder="Ingrese su código de persona"
              value={personCode}
              onChange={(e) => setPersonCode(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={loading}>
              <Search className="h-4 w-4 mr-2" />
              {loading ? "Buscando..." : "Buscar matrículas"}
            </Button>
          </div>

          {loading && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Cargando cursos matriculados...</p>
            </div>
          )}

          {!loading && courses.length > 0 && (
            <EnrolledCoursesTable courses={courses} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}