// components/enrollment-summary.tsx - ESPACIOS OPTIMIZADOS
"use client";

import { useState } from "react";
import { Curso } from "@/types/course";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Mail,
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  User,
  BookOpen,
  Info,
  Shield,
  FileText,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EnrollmentSummaryProps {
  course: Curso | null;
  personData: any;
  onBack: () => void;
}

export function EnrollmentSummary({
  course,
  personData,
  onBack,
}: EnrollmentSummaryProps) {
  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const { toast } = useToast();

  const handleEnroll = async () => {
    setLoading(true);
    // Simular proceso de matrícula
    setTimeout(() => {
      setLoading(false);
      setEnrolled(true);
      toast({
        title: "¡Matrícula Exitosa!",
        description:
          "Se ha enviado un correo con los detalles de su matrícula.",
      });
    }, 2000);
  };

  if (!course || !personData) {
    return <div>Datos incompletos</div>;
  }

  return (
    <div className="space-y-4">
      {enrolled ? (
        /* Confirmación de matrícula */
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100 shadow-lg">
          <CardContent className="pt-6 pb-6">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <div className="flex justify-center">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-green-800">
                  ¡Matrícula Completada Exitosamente!
                </h3>
                <p className="text-green-700">
                  Se ha enviado un correo de confirmación a:
                </p>
                <p className="text-green-800 font-semibold text-lg">
                  {personData.email}
                </p>
                <p className="text-green-600 text-sm">
                  Revise su bandeja de entrada y carpeta de spam para los
                  detalles completos.
                </p>
              </div>
              <div className="flex justify-center gap-3 pt-2">
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 px-3 py-1 text-xs"
                >
                  <Mail className="h-3 w-3 mr-1" />
                  Correo enviado
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 px-3 py-1 text-xs"
                >
                  <FileText className="h-3 w-3 mr-1" />
                  Comprobante disponible
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Resumen antes de matricular */
        <div className="space-y-4">
          {/* Botón para volver */}
          <div className="flex justify-between items-center pb-2">
            <Button variant="outline" onClick={onBack} className="gap-2 h-9">
              <ArrowLeft className="h-4 w-4" />
              Volver a datos personales
            </Button>
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 border-blue-200 text-xs"
            >
              <FileText className="h-3 w-3 mr-1" />
              Resumen de Matrícula
            </Badge>
          </div>

          {/* Tarjetas principales - Espacios optimizados */}
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Información de la persona - Mejorada y uniforme */}
            <Card className="border-l-4 border-l-blue-500 shadow-sm h-full">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">
                      Datos Personales
                    </div>
                    <CardDescription className="text-xs">
                      Información del estudiante
                    </CardDescription>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                    <span className="font-semibold text-blue-800">Cédula:</span>
                    <span className="font-medium">{personData.cedula}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="font-semibold text-gray-700">
                      Nombre completo:
                    </span>
                    <span className="font-medium text-right">
                      {personData.nombre} {personData.apellido}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                    <span className="font-semibold text-blue-800">Email:</span>
                    <span className="font-medium">{personData.email}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="font-semibold text-gray-700">
                      Teléfono:
                    </span>
                    <span className="font-medium">{personData.telefono}</span>
                  </div>
                  {personData.departamento && (
                    <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                      <span className="font-semibold text-blue-800">
                        Ubicación:
                      </span>
                      <span className="font-medium text-right text-xs">
                        {personData.departamento}, {personData.municipio}
                      </span>
                    </div>
                  )}
                  {personData.direccion && (
                    <div className="col-span-2 p-2 bg-gray-50 rounded">
                      <div className="font-semibold text-gray-700 mb-1 text-xs">
                        Dirección completa:
                      </div>
                      <div className="text-xs text-gray-600 leading-tight">
                        {personData.direccion}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Información del curso seleccionado - Espacios optimizados */}
            <Card className="border-l-4 border-l-green-500 shadow-sm h-full">
              <CardHeader className="pb-1">
                <CardTitle className="flex items-center gap-2 text-base">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                    <BookOpen className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">
                      Curso Seleccionado
                    </div>
                    <CardDescription className="text-xs">
                      Detalles del programa académico
                    </CardDescription>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1 mb-2">
                  <h3 className="font-bold text-base text-gray-900 leading-tight">
                    {course.nombre}
                  </h3>
                  <p className="text-xs text-muted-foreground font-medium">
                    {course.codigo}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 bg-green-50 rounded text-xs">
                    <Calendar className="h-3 w-3 text-green-600 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-green-800">
                        Período Académico
                      </div>
                      <div>
                        {new Date(course.fechaInicio).toLocaleDateString()} -{" "}
                        {new Date(course.fechaFin).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {course.horario && (
                    <div className="flex items-center gap-2 p-2 bg-blue-50 rounded text-xs">
                      <Clock className="h-3 w-3 text-blue-600 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-blue-800">
                          Horario
                        </div>
                        <div>{course.horario}</div>
                      </div>
                    </div>
                  )}

                  {course.centro && (
                    <div className="flex items-center gap-2 p-2 bg-purple-50 rounded text-xs">
                      <MapPin className="h-3 w-3 text-purple-600 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-purple-800">
                          Centro de Estudios
                        </div>
                        <div>{course.centro.nombre}</div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 p-2 bg-orange-50 rounded text-xs">
                    <Shield className="h-3 w-3 text-orange-600 flex-shrink-0" />
                    <div className="flex-1 flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-orange-800">
                          Disponibilidad
                        </div>
                        <div>
                          {course.inscritos} / {course.capacidad} estudiantes
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className={
                          course.inscritos < course.capacidad
                            ? "bg-green-100 text-green-800 text-xs"
                            : "bg-red-100 text-red-800 text-xs"
                        }
                      >
                        {course.inscritos < course.capacidad
                          ? "Disponible"
                          : "Lleno"}
                      </Badge>
                    </div>
                  </div>

                  {course.tipoOferta && (
                    <div className="flex justify-center pt-1">
                      <Badge
                        variant="default"
                        className="bg-primary text-primary-foreground px-3 py-1 text-xs"
                      >
                        Modalidad: {course.tipoOferta.nombre}
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tarjeta de información importante - 4 COLUMNAS 1 FILA MEJORADA */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-sm">
            <CardContent className="p-2">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-1 text-xs">
                {/* Columna 1 - Confirmación inmediata */}
                <div className="flex items-center gap-1 p-2 bg-white/60 rounded border border-blue-200">
                  <Mail className="h-3 w-3 text-blue-600 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-blue-800">
                      Confirmación
                    </div>
                    <div className="text-blue-700 leading-tight">
                      Inmediata vía email
                    </div>
                  </div>
                </div>

                {/* Columna 2 - Documentación */}
                <div className="flex items-center gap-1 p-2 bg-white/60 rounded border border-green-200">
                  <FileText className="h-3 w-3 text-green-600 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-green-800">
                      Comprobante
                    </div>
                    <div className="text-green-700 leading-tight">
                      Descargue PDF
                    </div>
                  </div>
                </div>

                {/* Columna 3 - Flexibilidad */}
                <div className="flex items-center gap-1 p-2 bg-white/60 rounded border border-amber-200">
                  <Clock className="h-3 w-3 text-amber-600 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-amber-800">Cambios</div>
                    <div className="text-amber-700 leading-tight">
                      48h disponibles
                    </div>
                  </div>
                </div>

                {/* Columna 4 - Asistencia requerida */}
                <div className="flex items-center gap-1 p-2 bg-white/60 rounded border border-purple-200">
                  <Shield className="h-3 w-3 text-purple-600 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-purple-800">
                      Asistencia
                    </div>
                    <div className="text-purple-700 leading-tight">
                      Mínimo 80%
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Botón de matrícula - Más compacto */}
      {!enrolled && (
        <div className="text-center pt-4 border-t border-gray-200">
          <div className="max-w-md mx-auto space-y-3">
            <Button
              onClick={handleEnroll}
              disabled={loading}
              className="gap-2 px-8 py-4 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300"
              size="lg"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Procesando matrícula...
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5" />
                  Confirmar Matrícula
                </>
              )}
            </Button>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">
                Al confirmar, acepta los términos y condiciones de matrícula
              </p>
              <div className="flex justify-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  Datos verificados
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  Cupo disponible
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  Información completa
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
