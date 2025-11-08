// components/course-list.tsx - VERSIÓN CORREGIDA
"use client";

import { useState, useEffect, useRef } from "react";
import { useCourses } from "@/hooks/use-courses";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Calendar, MapPin, Clock, Users, Globe, BookOpen } from "lucide-react";
import type { CourseFilters } from "@/types/course";
import { RegistrationModal } from "@/components/registration-modal";

interface CourseListProps {
  filters?: CourseFilters;
  currentPersonData?: any;
}

export function CourseList({ filters, currentPersonData }: CourseListProps) {
  // ✅ CAMBIO IMPORTANTE: Pasar los filtros directamente al hook
  const { courses, loading, error } = useCourses(filters);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  

  const isCourseAvailable = (course: any) => {
    return course.estado && course.inscritos < course.capacidad;
  };

  const handleInscribirme = (course: any) => {
    setSelectedCourse(course);
    setModalOpen(true);
  };

  // ✅ AGREGAR: Debug para verificar qué cursos se están mostrando
  useEffect(() => {
    console.log("📊 COURSES LOADED:", courses.length);
    console.log("🎯 CURRENT FILTERS:", filters);
    courses.forEach((course, index) => {
      console.log(`📝 Course ${index + 1}:`, {
        id: course.id,
        nombre: course.nombre,
        tipoOfertaId: course.tipoOfertaId,
        tipoOferta: course.tipoOferta?.nombre
      });
    });
  }, [courses, filters]);

  if (loading) {
    
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner className="h-8 w-8" />
        <span className="ml-2 text-muted-foreground">Cargando cursos...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
        <p className="text-destructive">Error: {error}</p>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-12 text-center">
        <p className="text-muted-foreground">
          {filters?.tipo_oferta_id === 2
            ? "No se encontraron cursos virtuales disponibles"
            : "No se encontraron cursos con los filtros seleccionados"}
        </p>
      </div>
    );
  }

  return (
    <>
      {/* ✅ AGREGAR: Información de debug */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
        <p className="text-sm font-mono">
          <strong>Debug:</strong> Mostrando {courses.length} cursos | 
          Filtro: {filters?.tipo_oferta_id === 1 ? "Presencial" : filters?.tipo_oferta_id === 2 ? "Virtual" : "Sin filtro"}
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => {
          const available = isCourseAvailable(course);
          
          return (
            <Card
              key={course.id}
              className="hover:shadow-lg transition-shadow duration-300 border-border"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-foreground">
                      {course.nombre}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {course.codigo}
                    </CardDescription>
                  </div>
                  <Badge
                    variant={available ? "default" : "secondary"}
                    className={
                      available 
                        ? "bg-green-500 hover:bg-green-600" 
                        : "bg-red-500 hover:bg-red-600"
                    }
                  >
                    {available ? "Disponible" : "No disponible"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {course.descripcion && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {course.descripcion}
                  </p>
                )}

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(course.fechaInicio).toLocaleDateString()} -{" "}
                      {new Date(course.fechaFin).toLocaleDateString()}
                    </span>
                  </div>

                  {course.horario && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{course.horario}</span>
                    </div>
                  )}

                  {/* Mostrar ubicación para cursos presenciales, plataforma para virtuales */}
                  {course.tipoOfertaId === 1 ? (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{course.centro?.nombre || "Por asignar"}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Globe className="h-4 w-4" />
                      <span>
                        {course.plataformaVirtual || "Plataforma virtual"}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>
                      {course.inscritos} / {course.capacidad} estudiantes
                    </span>
                  </div>

                  {course.tipoOferta && (
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          course.tipoOfertaId === 2
                            ? "bg-blue-100 text-blue-800 border border-blue-200 font-medium"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        {course.tipoOferta.nombre}
                      </span>
                    </div>
                  )}
                </div>

                <Button
                  className="w-full mt-4"
                  onClick={() => handleInscribirme(course)}
                  disabled={!available}
                >
                  Inscribirme
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <RegistrationModal
        course={selectedCourse}
        open={modalOpen}
        onOpenChange={setModalOpen}
        existingPersonData={currentPersonData}
      />
    </>
  );
}