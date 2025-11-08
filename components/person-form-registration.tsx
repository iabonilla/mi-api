// components/person-form-registration.tsx - VERSIÓN SIN IDIOMA, DEPARTAMENTO Y MUNICIPIO
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Curso } from "@/types/course";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Calendar, Clock, Languages, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  matriculaService,
  CreateMatriculaDto,
} from "@/services/matricula.service";

const personFormSchema = z.object({
  cedula: z.string().min(1, "La cédula es requerida"),
  nombre: z.string().min(1, "El nombre es requerido"),
  apellido: z.string().min(1, "El apellido es requerido"),
  email: z.string().email("Email inválido"),
  telefono: z.string().min(1, "El teléfono es requerido"),
  direccion: z.string().optional(),
});

type PersonFormValues = z.infer<typeof personFormSchema>;

interface PersonFormRegistrationProps {
  course: Curso | null;
  onSuccess: (data: PersonFormValues) => void;
  existingPersonData?: any;
  isDataComplete?: boolean;
}

interface Idioma {
  id: number;
  nombre: string;
  codigo: string;
  estado: boolean;
}

interface Departamento {
  id: number;
  nombre: string;
  codigo: string;
  estado: boolean;
}

interface Municipio {
  Id: number;
  Id_departamento: number;
  Codigo: string;
  Nombre: string;
  Estado: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function PersonFormRegistration({
  course,
  onSuccess,
  existingPersonData,
}: PersonFormRegistrationProps) {
  const [loading, setLoading] = useState(false);
  const [hasExistingData, setHasExistingData] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const { toast } = useToast();

  const form = useForm<PersonFormValues>({
    resolver: zodResolver(personFormSchema),
    defaultValues: {
      cedula: "",
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      direccion: "",
    },
  });

  // Cargar datos existentes si los hay
  useEffect(() => {
    const loadExistingData = async () => {
      try {
        setLoadingData(true);

        // Si tenemos datos existentes, cargar datos completos de persona
        if (existingPersonData?.id) {
          console.log(
            "🎯 Cargando datos completos de persona ID:",
            existingPersonData.id
          );
          try {
            const personaResponse = await fetch(
              `${API_URL}/personas/${existingPersonData.id}`
            );
            if (personaResponse.ok) {
              const personaData = await personaResponse.json();
              console.log("✅ Datos completos de persona:", personaData);

              // Pre-llenar formulario inmediatamente
              form.reset({
                cedula: personaData.numero_cedula || "",
                nombre: personaData.nombres || "",
                apellido: personaData.apellidos || "",
                email: personaData.email || "",
                telefono: personaData.telefono_movil || "",
                direccion: personaData.direccion_completa || "",
              });

              setHasExistingData(true);
              console.log("✅ Formulario pre-llenado con datos básicos");
            } else {
              console.error("❌ Error cargando datos de persona");
            }
          } catch (error) {
            console.error("❌ Error fetch persona:", error);
          }
        } else {
          console.log(
            "ℹ️ No hay existingPersonData.id, saltando carga de persona"
          );
        }
      } catch (error) {
        console.error("❌ Error general cargando datos:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los datos de la persona",
          variant: "destructive",
        });
      } finally {
        setLoadingData(false);
      }
    };

    loadExistingData();
  }, [existingPersonData, form, toast]);

  const onSubmit = async (data: PersonFormValues) => {
    setLoading(true);

    try {
      // 1. Preparar datos para la matrícula
      const matriculaData: CreateMatriculaDto = {
        persona_id: existingPersonData?.id || 0, // Si no hay persona_id, usar 0 temporalmente
        curso_id: course?.id || 0,
        cedula: data.cedula,
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        telefono: data.telefono,
        direccion: data.direccion,
        estado_matricula: "PENDIENTE",
        observaciones: `Matrícula creada desde formulario - ${new Date().toLocaleString()}`,
      };

      console.log("📤 Guardando matrícula:", matriculaData);

      // 2. Guardar en la base de datos
      const matriculaGuardada = await matriculaService.create(matriculaData);

      console.log("✅ Matrícula guardada:", matriculaGuardada);

      toast({
        title: "¡Matrícula exitosa!",
        description: "Su matrícula ha sido registrada correctamente",
      });

      // 3. Notificar al componente padre
      onSuccess(data);
    } catch (error) {
      console.error("❌ Error guardando matrícula:", error);
      toast({
        title: "Error",
        description: "No se pudo completar la matrícula. Intente nuevamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">
            Cargando datos de persona...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full max-w-full">
      {/* Columna izquierda - Información del curso */}
      {course && (
        <div className="lg:flex-1 min-w-0">
          <Card className="border-l-4 border-l-green-500 shadow-md h-full">
            <CardHeader>
              <CardTitle>Información del Curso</CardTitle>
              <CardDescription>Detalles del curso seleccionado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{course.nombre}</h3>
                <p className="text-sm text-muted-foreground">{course.codigo}</p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>
                    {new Date(course.fechaInicio).toLocaleDateString()} -{" "}
                    {new Date(course.fechaFin).toLocaleDateString()}
                  </span>
                </div>

                {course.horario && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{course.horario}</span>
                  </div>
                )}

                {course.centro && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{course.centro.nombre}</span>
                  </div>
                )}

                {course.tipoOferta && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      {course.tipoOferta.nombre}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Columna derecha - Formulario de persona */}
      <div className={course ? "lg:flex-[2] min-w-0" : "w-full"}>
        <Card className="border-l-4 border-l-blue-500 shadow-md h-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Datos Personales</CardTitle>
                <CardDescription>
                  Complete su información personal para matricularse en el curso
                </CardDescription>
              </div>
             
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  {/* Primera columna */}
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="cedula"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cédula *</FormLabel>
                          <FormControl>
                            <Input placeholder="Número de cédula" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="nombre"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre *</FormLabel>
                          <FormControl>
                            <Input placeholder="Su nombre" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="apellido"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Apellido *</FormLabel>
                          <FormControl>
                            <Input placeholder="Su apellido" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Segunda columna - SIN LOS COMBOS ELIMINADOS */}
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input placeholder="email@ejemplo.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="telefono"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teléfono *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Número de teléfono"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="direccion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dirección Completa</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Dirección completa de residencia"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

             
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}