// components/requirements-section.tsx - ACTUALIZADO
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  BookOpen,
  User,
  History,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { PersonFormModal } from "@/components/person-form-modal";
import { EnrolledCourses } from "@/components/enrolled-courses";
import { CourseHistoryModal } from "@/components/course-history-modal";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";



// ✅ AGREGAR INTERFACE CON PROP NUEVA
interface RequirementsSectionProps {
  onPersonDataUpdate?: (personData: any) => void; // ← NUEVA PROP
}



export function RequirementsSection({ onPersonDataUpdate }: RequirementsSectionProps) { // ← AGREGAR PROP
  const [personModalOpen, setPersonModalOpen] = useState(false);
  const [currentPersonData, setCurrentPersonData] = useState<any>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();



    const handlePersonLoaded = (personData: any) => {
    setCurrentPersonData(personData);
    setIsExpanded(true);
    
    // ✅ NOTIFICAR AL PADRE - SOLO AGREGAR ESTA LÍNEA
    onPersonDataUpdate?.(personData);
    
    toast({
      title: "Datos cargados",
      description: "Los datos de la persona están disponibles para matrículas",
    });
  };

  const handleClearPersonData = () => {
    setCurrentPersonData(null);
    
    // ✅ NOTIFICAR AL PADRE - SOLO AGREGAR ESTA LÍNEA  
    onPersonDataUpdate?.(null);
    
    toast({
      title: "Datos limpiados",
      description: "Puede cargar los datos de otra persona",
    });
  };



  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleRegisterClick = () => {
    setPersonModalOpen(true);
    setIsExpanded(true); // Expandir la sección al hacer clic en Registrarse
  };

  return (
    <div className="mb-8">
      {/* Banner/Sección Expandible de Área Personal */}
      <div className="mb-6">
        {/* Header del Banner - Siempre visible */}
        <div
          className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
          onClick={toggleExpanded}
        >
          <div className="flex items-center gap-3">
            <User className="h-4 w-4 text-blue-600" />
            <div>
              <span className="text-sm font-bold text-primary mb-2">
                {currentPersonData
                  ? `Registro: ${currentPersonData.nombre} ${currentPersonData.apellido}`
                  : "Área de registro"}
              </span>
              {currentPersonData && (
                <p className="font-bold text-primary mb-2">
                  Código: {currentPersonData.codigo} • Cédula:{" "}
                  {currentPersonData.cedula}
                </p>
              )}
            </div>
            {currentPersonData && (
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800 text-xs"
              >
                Listo para matrícula
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            {currentPersonData ? (
              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPersonModalOpen(true)}
                  className="text-xs"
                >
                  <FileText className="h-3 w-3 mr-1" />
                  Ver/Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearPersonData}
                  className="text-xs"
                >
                  Cambiar
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRegisterClick();
                }}
                className="text-xs bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Registrarse
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={toggleExpanded}
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Contenido Expandible - Solo visible cuando isExpanded es true */}
        {isExpanded && (
          <div className="mt-4 p-4 bg-white border border-t-0 border-blue-200 rounded-b-lg">
            <div className="grid gap-4 md:grid-cols-3">
              
              {/* Tarjeta 1: Registro de Persona */}
              <Card className="border-border bg-white border-l-4 border-l-blue-200">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-card-foreground">
                    Registro de personas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {currentPersonData
                        ? "Sus datos están registrados. Puede actualizarlos si es necesario."
                        : "Complete su registro para poder matricularse en los cursos."}
                    </p>
                    <Button
                      className="w-full"
                      onClick={handleRegisterClick}
                      variant={currentPersonData ? "outline" : "default"}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      {currentPersonData
                        ? "Actualizar datos"
                        : "Registrarse ahora"}
                    </Button>

                    {currentPersonData && (
                      <div className="text-xs text-muted-foreground p-2 bg-green-50 rounded">
                        <p className="font-semibold mb-2">🆔 Datos actuales:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-1 gap-x-4">
                          <div>
                            <p>👤 {currentPersonData.nombre}</p>
                            <p>👤 {currentPersonData.apellido}</p>
                          </div>
                          <div>
                            <p>📧 {currentPersonData.email}</p>
                            <p>📞 {currentPersonData.telefono}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Tarjeta 2: Cursos Matriculados */}
              <Card className="border-border bg-white border-l-4 border-l-blue-200">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-card-foreground">
                    Cursos matriculados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <EnrolledCourses />
                </CardContent>
              </Card>

              {/* Tarjeta 3: Historial de Cursos */}
              <Card className="border-border bg-white border-l-4 border-l-blue-200">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <History className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-card-foreground">
                    Historial de cursos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Consulte su historial completo de cursos aprobados y
                      reprobados.
                    </p>
                    <CourseHistoryModal />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* <CourseFilters currentPersonData={currentPersonData} /> */}

      <PersonFormModal
        open={personModalOpen}
        onOpenChange={setPersonModalOpen}
        onPersonLoaded={handlePersonLoaded}
      />
    </div>
  );
}
