"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

const departments = [
  "Boaco",
  "Carazo",
  "Chinandega",
  "Chontales",
  "Estelí",
  "Granada",
  "Jinotega",
  "León",
  "Madriz",
  "Managua",
  "Masaya",
  "Matagalpa",
  "Nueva Segovia",
  "RAAN",
  "RACCS",
  "Rio San Juan",
  "Rivas",
]

export function DepartmentFilter() {
  const [showAll, setShowAll] = useState(false)
  const [selected, setSelected] = useState<string[]>([])

  const displayedDepartments = showAll ? departments : departments.slice(0, 8)

  const toggleDepartment = (dept: string) => {
    setSelected((prev) => (prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]))
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {displayedDepartments.map((dept) => (
          <Button
            key={dept}
            variant={selected.includes(dept) ? "default" : "outline"}
            className={
              selected.includes(dept)
                ? "bg-primary text-primary-foreground"
                : "border-border text-foreground hover:bg-accent hover:text-accent-foreground"
            }
            onClick={() => toggleDepartment(dept)}
          >
            {dept}
          </Button>
        ))}
      </div>
      <Button
        variant="ghost"
        className="w-full text-muted-foreground hover:text-foreground"
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? (
          <>
            <ChevronUp className="mr-2 h-4 w-4" />
            Mostrar menos
          </>
        ) : (
          <>
            <ChevronDown className="mr-2 h-4 w-4" />
            Mostrar todos
          </>
        )}
      </Button>
    </div>
  )
}
