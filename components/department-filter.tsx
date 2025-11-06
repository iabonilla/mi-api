"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from "lucide-react"
import { useDepartamentos } from "@/hooks/use-departamentos"
import { Spinner } from "@/components/ui/spinner"

interface DepartmentFilterProps {
  onDepartmentSelect?: (departmentId: number | null) => void
  selectedDepartment?: number | null
}

export function DepartmentFilter({ onDepartmentSelect, selectedDepartment }: DepartmentFilterProps) {
  const [search, setSearch] = useState("")
  const { departamentos, loading, error } = useDepartamentos()

  const filteredDepartments = departamentos.filter((dept) => 
    dept.nombre.toLowerCase().includes(search.toLowerCase())
  )

  const handleDepartmentSelect = (departmentId: number) => {
    const newSelection = selectedDepartment === departmentId ? null : departmentId
    onDepartmentSelect?.(newSelection)
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cargando departamentos..."
            disabled
            className="pl-10 bg-input border-border text-muted-foreground"
          />
        </div>
        <div className="h-64 rounded-md border border-border bg-white p-4 flex items-center justify-center">
          <Spinner className="h-6 w-6" />
          <span className="ml-2 text-muted-foreground">Cargando departamentos...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar departamentos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <div className="h-64 rounded-md border border-border bg-destructive/10 p-4 flex items-center justify-center">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar departamentos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>
      <ScrollArea className="h-64 rounded-md border border-border bg-white p-4">
        <div className="space-y-2">
          {filteredDepartments.map((department) => (
            <div 
              key={department.id} 
              className={`flex items-start space-x-3 p-3 rounded-md cursor-pointer transition-all duration-200 ${
                selectedDepartment === department.id 
                  ? "bg-primary text-primary-foreground border border-primary shadow-sm" 
                  : "border border-transparent hover:bg-primary/20 hover:text-primary-foreground hover:border-primary/30"
              }`}
              onClick={() => handleDepartmentSelect(department.id)}
            >
              <div className={`flex items-center justify-center w-4 h-4 mt-1 rounded-full border ${
                selectedDepartment === department.id 
                  ? "bg-primary-foreground border-primary-foreground" 
                  : "border-muted-foreground/60"
              }`}>
                {selectedDepartment === department.id && (
                  <div className="w-2 h-2 rounded-full bg-primary" />
                )}
              </div>
              <label 
                htmlFor={`department-${department.id}`} 
                className="text-sm leading-relaxed cursor-pointer flex-1"
              >
                {department.nombre}
              </label>
            </div>
          ))}
          {filteredDepartments.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No se encontraron departamentos
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}