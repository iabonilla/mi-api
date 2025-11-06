// components/person-form-standalone.tsx - VERSIÓN REPARADA
"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import type { PersonFormValues } from "@/types/course"
import { personService } from "@/services/person.service"

// Schema corregido - campos requeridos según SQL
const personFormSchema = z.object({
  // Campos OBLIGATORIOS en SQL
  codigo_persona: z.string().min(1, "El código de persona es requerido"),
  nombres: z.string().min(1, "El nombre es requerido"),
  apellidos: z.string().min(1, "El apellido es requerido"),
  fecha_nacimiento: z.string().min(1, "La fecha de nacimiento es requerida"),
  numero_cedula: z.string().min(1, "La cédula es requerida"),
  nacionalidad: z.string().min(1, "La nacionalidad es requerida"),
  genero: z.string().min(1, "El género es requerido"),
  email: z.string().email("Email inválido").min(1, "El email es requerido"),
  telefono_movil: z.string().min(1, "El teléfono móvil es requerido"),
  
  // Campos OPCIONALES en SQL
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

interface PersonFormStandaloneProps {
  onSuccess: (personData: PersonFormValues) => void
  defaultValues?: Partial<PersonFormValues>
  loading?: boolean
}

export function PersonFormStandalone({ onSuccess, defaultValues, loading }: PersonFormStandaloneProps) {
  const [internalLoading, setInternalLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<PersonFormValues>({
    resolver: zodResolver(personFormSchema),
    defaultValues: {
      codigo_persona: "", // ← VACÍO - El usuario ingresa su código
      nombres: "",
      apellidos: "",
      fecha_nacimiento: "",
      numero_cedula: "",
      nacionalidad: "Nicaragüense",
      genero: "",
      email: "",
      telefono_movil: "",
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
      ...defaultValues
    },
  })

  // Actualizar formulario cuando cambien los defaultValues
  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues)
    }
  }, [defaultValues, form])

  const onSubmit = async (data: PersonFormValues) => {
    setInternalLoading(true)
    try {
      console.log("📤 Enviando datos al backend:", data)
      
      // ✅ CORRECCIÓN: Enviar los datos exactamente como vienen del formulario
      // SIN generación automática de código
      const result = await personService.upsert(data)
      
      console.log("✅ Respuesta del backend:", result)
      
      // Enviar los datos ORIGINALES del formulario al modal
      onSuccess(data)
      
      toast({
        title: "¡Registro exitoso!",
        description: `Persona ${defaultValues ? "actualizada" : "registrada"} correctamente. Código: ${data.codigo_persona}`,
      })
      
    } catch (error: any) {
      console.error("❌ Error guardando persona:", error)
      
      let errorMessage = "Error al guardar los datos"
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error.message) {
        errorMessage = error.message
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setInternalLoading(false)
    }
  }

  const isSubmitting = loading || internalLoading

  return (
    <div className="w-full max-w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* PRIMERA FILA - 4 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="codigo_persona"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código Persona *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ingrese su código de persona" 
                      {...field} 
                      // ✅ QUITADO: readOnly - Ahora el usuario puede editarlo
                    />
                  </FormControl>
                  <FormDescription>
                    Ingrese el código de persona que se le asignó
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              name="numero_cedula"
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
          </div>

          {/* SEGUNDA FILA - 4 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
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

            <FormField
              control={form.control}
              name="nacionalidad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nacionalidad *</FormLabel>
                  <FormControl>
                    <Input placeholder="Nacionalidad" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="genero"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Género *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione género" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Masculino">Masculino</SelectItem>
                      <SelectItem value="Femenino">Femenino</SelectItem>
                      <SelectItem value="Otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email@ejemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* TERCERA FILA - 4 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="telefono_movil"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono Móvil *</FormLabel>
                  <FormControl>
                    <Input placeholder="Número de teléfono" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="telefono_alterno"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono Alterno</FormLabel>
                  <FormControl>
                    <Input placeholder="Teléfono alterno" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nivel_academico"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nivel Académico</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione nivel" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Primaria">Primaria</SelectItem>
                      <SelectItem value="Secundaria">Secundaria</SelectItem>
                      <SelectItem value="Universidad">Universidad</SelectItem>
                      <SelectItem value="Técnico">Técnico</SelectItem>
                      <SelectItem value="Maestría">Maestría</SelectItem>
                      <SelectItem value="Doctorado">Doctorado</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferencia_horario"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferencia Horario</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione horario" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Matutino">Matutino</SelectItem>
                      <SelectItem value="Vespertino">Vespertino</SelectItem>
                      <SelectItem value="Nocturno">Nocturno</SelectItem>
                      <SelectItem value="Sabatino">Sabatino</SelectItem>
                      <SelectItem value="Flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* CUARTA FILA - 4 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="idioma_interes_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Idioma de Interés</FormLabel>
                  <Select 
                    onValueChange={(value) => field.onChange(parseInt(value))} 
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione idioma" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Inglés</SelectItem>
                      <SelectItem value="2">Francés</SelectItem>
                      <SelectItem value="3">Portugués</SelectItem>
                      <SelectItem value="4">Alemán</SelectItem>
                      <SelectItem value="5">Italiano</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="departamento_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departamento</FormLabel>
                  <Select 
                    onValueChange={(value) => field.onChange(parseInt(value))} 
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione departamento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Managua</SelectItem>
                      <SelectItem value="2">León</SelectItem>
                      <SelectItem value="3">Chinandega</SelectItem>
                      <SelectItem value="4">Masaya</SelectItem>
                      <SelectItem value="5">Granada</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="municipio_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Municipio</FormLabel>
                  <Select 
                    onValueChange={(value) => field.onChange(parseInt(value))} 
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione municipio" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Managua</SelectItem>
                      <SelectItem value="2">Tipitapa</SelectItem>
                      <SelectItem value="3">Ciudad Sandino</SelectItem>
                      <SelectItem value="4">León</SelectItem>
                      <SelectItem value="5">Chinandega</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* QUINTA FILA - 3 columnas para contactos de emergencia */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="contacto_emergencia_nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contacto Emergencia</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contacto_emergencia_relacion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relación</FormLabel>
                  <FormControl>
                    <Input placeholder="Parentesco" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contacto_emergencia_telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono Emergencia</FormLabel>
                  <FormControl>
                    <Input placeholder="Número de contacto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div><hr /></div>

          {/* Dirección - Ocupa todo el ancho */}
          <FormField
            control={form.control}
            name="direccion_completa"
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

          {/* Botón de envío */}
          <div className="pt-4">
            <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
              {isSubmitting 
                ? "Procesando..." 
                : defaultValues ? "Actualizar Datos" : "Guardar Datos Personales"
              }
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}