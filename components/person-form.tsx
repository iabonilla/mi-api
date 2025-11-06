// components/person-form.tsx - VERSIÓN ACTUALIZADA
"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Curso } from "@/types/course"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Calendar, Clock, Search, User, CheckCircle } from "lucide-react" // ← Agregar CheckCircle
import { useToast } from "@/hooks/use-toast"
import { personService } from "@/services/person.service"
import { Badge } from "@/components/ui/badge" // ← Agregar Badge

// SCHEMA COMPLETO - TODOS los campos requeridos por SQL Server
const personFormSchema = z.object({
  // Campos OBLIGATORIOS en SQL
  nombres: z.string().min(1, "El nombre es requerido"),
  apellidos: z.string().min(1, "El apellido es requerido"),
  fecha_nacimiento: z.string().min(1, "La fecha de nacimiento es requerida"),
  numero_cedula: z.string().min(1, "La cédula es requerida"),
  codigo_persona: z.string(),  
  nacionalidad: z.string().min(1, "La nacionalidad es requerida"),
  email: z.string().email("Email inválido").min(1, "El email es requerido"),
  telefono_movil: z.string().min(1, "El teléfono móvil es requerido"),
  
  // Campos OPCIONALES en SQL
  genero: z.string(),
  telefono_alterno: z.string().optional(),
  direccion_completa: z.string().optional(),
  municipio_id: z.number().optional(),
  departamento_id: z.number().optional(),
  nivel_academico: z.string().optional(),
  idioma_interes_id: z.number().optional(),
  preferencia_horario: z.string().optional(),
  contacto_emergencia_nombre: z.string().optional(),
  contacto_emergencia_relacion: z.string().optional(),
  contacto_emergencia_telefono: z.string().optional(),
})

type PersonFormValues = z.infer<typeof personFormSchema>

interface PersonFormProps {
  course?: Curso | null
  onSuccess: (personData: any) => void
  initialData?: any
  existingPersonData?: any // ← NUEVA PROP PARA DATOS EXISTENTES
}

export function PersonForm({ course, onSuccess, initialData, existingPersonData }: PersonFormProps) {
  const [loading, setLoading] = useState(false)
  const [searching, setSearching] = useState(false)
  const [searchMethod, setSearchMethod] = useState<'cedula' | 'codigo' | 'email'>('cedula')
  const [searchValue, setSearchValue] = useState('')
  const [hasExistingData, setHasExistingData] = useState(false) // ← NUEVO ESTADO
  const { toast } = useToast()

  const form = useForm<PersonFormValues>({
    resolver: zodResolver(personFormSchema),
    defaultValues: {
      nombres: "",
      apellidos: "",
      fecha_nacimiento: "",
      numero_cedula: "",
      nacionalidad: "Nicaragüense",
      email: "",
      telefono_movil: "",
      genero: "",
      telefono_alterno: "",
      direccion_completa: "",
      municipio_id: undefined,
      departamento_id: undefined,
      nivel_academico: "",
      idioma_interes_id: undefined,
      preferencia_horario: "",
      contacto_emergencia_nombre: "",
      contacto_emergencia_relacion: "",
      contacto_emergencia_telefono: "",
    },
  })

  // ✅ EFECTO MEJORADO: Cargar datos existentes automáticamente
  useEffect(() => {
    // Prioridad: existingPersonData > initialData
    const dataToLoad = existingPersonData || initialData;
    
    if (dataToLoad) {
      console.log("🎯 Cargando datos existentes en formulario:", dataToLoad)
      
      form.reset({
        nombres: dataToLoad.nombres || dataToLoad.nombre || "",
        apellidos: dataToLoad.apellidos || dataToLoad.apellido || "",
        fecha_nacimiento: dataToLoad.fecha_nacimiento ? dataToLoad.fecha_nacimiento.split('T')[0] : "",
        numero_cedula: dataToLoad.numero_cedula || dataToLoad.cedula || "",
        codigo_persona: dataToLoad.codigo_persona || dataToLoad.codigo || "",
        nacionalidad: dataToLoad.nacionalidad || "Nicaragüense",
        email: dataToLoad.email || "",
        telefono_movil: dataToLoad.telefono_movil || dataToLoad.telefono || "",
        genero: dataToLoad.genero || "",
        telefono_alterno: dataToLoad.telefono_alterno || "",
        direccion_completa: dataToLoad.direccion_completa || dataToLoad.direccion || "",
        municipio_id: dataToLoad.municipio_id || undefined,
        departamento_id: dataToLoad.departamento_id || undefined,
        nivel_academico: dataToLoad.nivel_academico || "",
        idioma_interes_id: dataToLoad.idioma_interes_id || undefined,
        preferencia_horario: dataToLoad.preferencia_horario || "",
        contacto_emergencia_nombre: dataToLoad.contacto_emergencia_nombre || "",
        contacto_emergencia_relacion: dataToLoad.contacto_emergencia_relacion || "",
        contacto_emergencia_telefono: dataToLoad.contacto_emergencia_telefono || "",
      })

      setHasExistingData(true)
      
      toast({
        title: "Datos cargados automáticamente",
        description: "Sus datos han sido precargados. Puede editarlos si es necesario.",
      })
    }
  }, [existingPersonData, initialData, form, toast])

  // Buscar persona existente
  const handleSearchPerson = async () => {
    if (!searchValue.trim()) {
      toast({
        title: "Error",
        description: "Ingrese un valor para buscar",
        variant: "destructive",
      })
      return
    }

    setSearching(true)
    try {
      let personData
      
      switch (searchMethod) {
        case 'cedula':
          personData = await personService.getByCedula(searchValue)
          break
        case 'codigo':
          personData = await personService.getByCodigo(searchValue)
          break
        case 'email':
          personData = await personService.getByEmail(searchValue)
          break
      }

      if (personData) {
        form.reset({
          nombres: personData.nombres,
          apellidos: personData.apellidos,
          fecha_nacimiento: personData.fecha_nacimiento ? personData.fecha_nacimiento.split('T')[0] : "",
          numero_cedula: personData.numero_cedula,
          codigo_persona: personData.codigo_persona,
          nacionalidad: personData.nacionalidad,
          email: personData.email,
          telefono_movil: personData.telefono_movil,
          genero: personData.genero || "",
          telefono_alterno: personData.telefono_alterno || "",
          direccion_completa: personData.direccion_completa || "",
          municipio_id: personData.municipio_id || undefined,
          departamento_id: personData.departamento_id || undefined,
          nivel_academico: personData.nivel_academico || "",
          idioma_interes_id: personData.idioma_interes_id || undefined,
          preferencia_horario: personData.preferencia_horario || "",
          contacto_emergencia_nombre: personData.contacto_emergencia_nombre || "",
          contacto_emergencia_relacion: personData.contacto_emergencia_relacion || "",
          contacto_emergencia_telefono: personData.contacto_emergencia_telefono || "",
        })

        setHasExistingData(true)

        toast({
          title: "Persona encontrada",
          description: "Los datos han sido cargados en el formulario",
        })
      } else {
        toast({
          title: "No encontrado",
          description: "No se encontró ninguna persona con esos datos",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error buscando persona:", error)
      toast({
        title: "Error",
        description: "Error al buscar la persona",
        variant: "destructive",
      })
    } finally {
      setSearching(false)
    }
  }

  // Guardar o actualizar persona
  const onSubmit = async (data: PersonFormValues) => {
    setLoading(true)
    
    try {
      // Usar UPSERT para crear o actualizar
      const result = await personService.upsert(data)
      
      toast({
        title: hasExistingData ? "Datos actualizados" : "Registro exitoso",
        description: hasExistingData 
          ? "Sus datos han sido actualizados. Continúe con la matrícula." 
          : "Sus datos personales han sido guardados correctamente.",
      })
      
      // Pasar los datos completos de la persona (incluyendo ID y código)
      onSuccess({
        ...result,
        codigo: result.codigo_persona,
        cedula: result.numero_cedula,
        nombre: result.nombres,
        apellido: result.apellidos
      })
      
    } catch (error) {
      console.error("Error guardando persona:", error)
      toast({
        title: "Error",
        description: "Error al guardar los datos. Intente nuevamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full max-w-full">
      {/* Columna izquierda - Información del curso (si existe) */}
      {course && (
        <div className="lg:flex-1 min-w-0">
          <Card className="h-full">
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

      {/* Columna derecha - Formulario de persona COMPLETO */}
      <div className={course ? "lg:flex-[2] min-w-0" : "w-full"}>
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Datos Personales
                </CardTitle>
                <CardDescription>
                  {course 
                    ? "Complete su información personal para matricularse en el curso" 
                    : "Complete su información personal para poder matricularse en los cursos."
                  }
                </CardDescription>
              </div>
              {hasExistingData && (
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Datos cargados
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* ✅ MOSTRAR BÚSQUEDA SOLO SI NO HAY DATOS EXISTENTES */}
            {!hasExistingData && !initialData && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  ¿Ya está registrado?
                </h4>
                <div className="flex gap-2 mb-2">
                  <Select value={searchMethod} onValueChange={(value: 'cedula' | 'codigo' | 'email') => setSearchMethod(value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cedula">Cédula</SelectItem>
                      <SelectItem value="codigo">Código</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder={`Ingrese ${searchMethod}`}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSearchPerson} 
                    disabled={searching}
                    variant="outline"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-blue-600">
                  Busque por cédula, código de persona o email para cargar sus datos automáticamente
                </p>
              </div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Resto del formulario igual que antes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="nombres"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombres *</FormLabel>
                        <FormControl>
                          <Input placeholder="Sus nombres" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="apellidos"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellidos *</FormLabel>
                        <FormControl>
                          <Input placeholder="Sus apellidos" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fecha_nacimiento"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha Nacimiento *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* ... resto de los campos del formulario igual que antes ... */}
                
                <Button type="submit" disabled={loading} className="w-full">
                  {loading 
                    ? "Procesando..." 
                    : hasExistingData 
                      ? "Actualizar y Continuar" 
                      : course 
                        ? "Continuar a Matrícula" 
                        : "Guardar Datos Personales"
                  }
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}