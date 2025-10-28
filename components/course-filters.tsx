"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DepartmentFilter } from "@/components/department-filter"
import { CenterFilter } from "@/components/center-filter"
import { TurnFilter } from "@/components/turn-filter"
import { MapPin, Building2, Clock } from "lucide-react"

export function CourseFilters() {
  const [modalidad, setModalidad] = useState<"presencial" | "virtual">("presencial")

  return (
    <div className="space-y-8">
      <Tabs defaultValue="presencial" className="w-full" onValueChange={(v) => setModalidad(v as any)}>
        <TabsList className="grid w-full max-w-md grid-cols-2 bg-muted">
          <TabsTrigger
            value="presencial"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Oferta Presencial
          </TabsTrigger>
          <TabsTrigger
            value="virtual"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Oferta Virtual
          </TabsTrigger>
        </TabsList>

        <TabsContent value="presencial" className="mt-8 space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
                  <MapPin className="h-5 w-5 text-accent" />
                </div>
                <CardTitle className="text-card-foreground">Departamentos</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <DepartmentFilter />
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
                  <Building2 className="h-5 w-5 text-accent" />
                </div>
                <CardTitle className="text-card-foreground">Centros Tecnológicos</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CenterFilter />
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
                  <Clock className="h-5 w-5 text-accent" />
                </div>
                <CardTitle className="text-card-foreground">Turnos</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <TurnFilter />
            </CardContent>
          </Card>

          <div className="flex justify-center pt-4">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-12">
              Buscar Cursos
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="virtual" className="mt-8 space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Cursos Virtuales Disponibles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border border-border bg-secondary p-4">
                  <h3 className="font-semibold text-secondary-foreground">Inglés Básico - Nivel A1</h3>
                  <p className="text-sm text-muted-foreground mt-1">Modalidad: 100% Virtual</p>
                  <p className="text-sm text-muted-foreground">Duración: 3 meses</p>
                </div>
                <div className="rounded-lg border border-border bg-secondary p-4">
                  <h3 className="font-semibold text-secondary-foreground">Inglés Intermedio - Nivel B1</h3>
                  <p className="text-sm text-muted-foreground mt-1">Modalidad: 100% Virtual</p>
                  <p className="text-sm text-muted-foreground">Duración: 4 meses</p>
                </div>
                <div className="rounded-lg border border-border bg-secondary p-4">
                  <h3 className="font-semibold text-secondary-foreground">Francés Básico - Nivel A1</h3>
                  <p className="text-sm text-muted-foreground mt-1">Modalidad: 100% Virtual</p>
                  <p className="text-sm text-muted-foreground">Duración: 3 meses</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center pt-4">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-12">
              Ver Más Cursos
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
