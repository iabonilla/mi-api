// components/course-history-modal.tsx - ACTUALIZADO
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search, History } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { CourseHistoryTable } from "@/components/course-history-table"

export function CourseHistoryModal() {
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
    // Simular búsqueda de historial de cursos
    setTimeout(() => {
      setLoading(false)
      // Datos de ejemplo más completos
      setCourses([
        {
          id: 1,
          nombre: "Inglés Básico - Nivel A1",
          codigo: "ING-A1-2023",
          nivel: "Básico",
          modalidad: "Presencial",
          fecha_inicio: "2023-01-15",
          fecha_fin: "2023-04-15",
          horario: "Lunes y Miércoles 14:00 - 16:00",
          duracion: "3 meses",
          instructor: "Prof. María González",
          nota: 85,
          aprobado: true,
          diploma: true,
          ubicacion: "Centro Managua"
        },
        {
          id: 2,
          nombre: "Inglés Intermedio - Nivel B1",
          codigo: "ING-B1-2023",
          nivel: "Intermedio",
          modalidad: "Virtual",
          fecha_inicio: "2023-05-01",
          fecha_fin: "2023-08-01",
          horario: "Martes y Jueves 19:00 - 21:00",
          duracion: "4 meses",
          instructor: "Prof. Carlos Rodríguez",
          nota: 78,
          aprobado: true,
          diploma: true,
          plataforma: "Plataforma SETEC Virtual"
        },
        {
          id: 3,
          nombre: "Francés Básico - Nivel A1",
          codigo: "FRA-A1-2023",
          nivel: "Básico",
          modalidad: "Presencial",
          fecha_inicio: "2023-09-01",
          fecha_fin: "2023-12-01",
          horario: "Viernes 16:00 - 19:00",
          duracion: "3 meses",
          instructor: "Prof. Sophie Martin",
          nota: 65,
          aprobado: false,
          diploma: false,
          ubicacion: "Centro León"
        },
        {
          id: 4,
          nombre: "Inglés Avanzado - Nivel C1",
          codigo: "ING-C1-2024",
          nivel: "Avanzado",
          modalidad: "Virtual",
          fecha_inicio: "2024-01-10",
          fecha_fin: "2024-05-10",
          horario: "Sábados 9:00 - 13:00",
          duracion: "5 meses",
          instructor: "Prof. Laura Martínez",
          nota: 92,
          aprobado: true,
          diploma: true,
          plataforma: "Microsoft Teams"
        },
        {
          id: 5,
          nombre: "Portugués Básico - Nivel A1",
          codigo: "POR-A1-2023",
          nivel: "Básico",
          modalidad: "Presencial",
          fecha_inicio: "2023-03-01",
          fecha_fin: "2023-06-01",
          horario: "Lunes a Viernes 8:00 - 10:00",
          duracion: "3 meses",
          instructor: "Prof. João Silva",
          nota: 58,
          aprobado: false,
          diploma: false,
          ubicacion: "Centro Granada"
        }
      ])
      toast({
        title: "Historial cargado",
        description: `Se encontraron ${5} cursos en su historial.`,
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
          Consultar historial
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Historial completo de cursos
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
              {loading ? "Buscando..." : "Buscar Historial"}
            </Button>
          </div>

          {loading && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Cargando historial de cursos...</p>
            </div>
          )}

          {!loading && courses.length > 0 && (
            <CourseHistoryTable courses={courses} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}