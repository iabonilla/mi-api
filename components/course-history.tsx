// components/course-history.tsx - ACTUALIZADO
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { CourseHistoryTable } from "@/components/course-history-table"

export function CourseHistory() {
  const [personCode, setPersonCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [courses, setCourses] = useState<any[]>([])
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
      // Datos de ejemplo
      setCourses([
        {
          id: 1,
          nombre: "Inglés Básico - Nivel A1",
          codigo: "ING-A1-2023",
          fecha_inicio: "2023-01-15",
          fecha_fin: "2023-04-15",
          nota: 85,
          aprobado: true,
          diploma: true
        },
        {
          id: 2,
          nombre: "Inglés Intermedio - Nivel B1",
          codigo: "ING-B1-2023",
          fecha_inicio: "2023-05-01",
          fecha_fin: "2023-08-01",
          nota: 78,
          aprobado: true,
          diploma: true
        },
        {
          id: 3,
          nombre: "Francés Básico - Nivel A1",
          codigo: "FRA-A1-2023",
          fecha_inicio: "2023-09-01",
          fecha_fin: "2023-12-01",
          nota: 65,
          aprobado: false,
          diploma: false
        }
      ])
      toast({
        title: "Historial cargado",
        description: `Se encontraron ${3} cursos en su historial.`,
      })
    }, 1500)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Ingrese su código de persona"
          value={personCode}
          onChange={(e) => setPersonCode(e.target.value)}
        />
        <Button onClick={handleSearch} disabled={loading}>
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {loading && (
        <div className="text-center py-4">
          <p>Cargando historial...</p>
        </div>
      )}

      {/* Usamos el componente de tabla independiente */}
      <CourseHistoryTable courses={courses} />
    </div>
  )
}