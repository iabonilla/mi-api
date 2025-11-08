// components/edit-person-form-standalone.tsx - VERSIÓN CON DATOS DINÁMICOS
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

// Mismo schema pero con validaciones más flexibles para edición
const personFormSchema = z.object({
  codigo_persona: z.string().min(1, "El código de persona es requerido"),
  nombres: z.string().min(1, "El nombre es requerido"),
  apellidos: z.string().min(1, "El apellido es requerido"),
  fecha_nacimiento: z.string().min(1, "La fecha de nacimiento es requerida"),
  numero_cedula: z.string().min(1, "La cédula es requerida"),
  nacionalidad: z.string().min(1, "La nacionalidad es requerida"),
  genero: z.string().min(1, "El género es requerido"),
  email: z.string().email("Email inválido").min(1, "El email es requerido"),
  telefono_movil: z.string().min(1, "El teléfono móvil es requerido"),
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

interface EditPersonFormStandaloneProps {
  personData: PersonFormValues
  onSaveAndContinue: (personData: PersonFormValues) => void
  onContinueOnly: (personData: PersonFormValues) => void
  onCancel?: () => void
}

interface Departamento {
  id: number
  nombre: string
  codigo: string
  estado: boolean
}

interface Municipio {
  Id: number
  Id_departamento: number
  Codigo: string
  Nombre: string
  Estado: number
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function EditPersonFormStandalone({ 
  personData, 
  onSaveAndContinue, 
  onContinueOnly, 
  onCancel 
}: EditPersonFormStandaloneProps) {
  const [loading, setLoading] = useState(false)
  const [departamentos, setDepartamentos] = useState<Departamento[]>([])
  const [municipios, setMunicipios] = useState<Municipio[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const { toast } = useToast()

  const form = useForm<PersonFormValues>({
    resolver: zodResolver(personFormSchema),
    defaultValues: personData
  })

  // Cargar departamentos y municipios desde endpoints
  useEffect(() => {
    const loadReferenceData = async () => {
      try {
        setLoadingData(true)
        console.log("📡 Cargando datos de referencia para edición...")

        const [departamentosResponse, municipiosResponse] = await Promise.all([
          fetch(`${API_URL}/departamentos_persona`),
          fetch(`${API_URL}/municipios_persona`)
        ])

        if (departamentosResponse.ok) {
          const departamentosData = await departamentosResponse.json()
          setDepartamentos(departamentosData)
          console.log("✅ Departamentos cargados:", departamentosData.length)
        } else {
          console.error("❌ Falló carga de departamentos")
          setDepartamentos([])
        }

        if (municipiosResponse.ok) {
          const municipiosData = await municipiosResponse.json()
          setMunicipios(municipiosData)
          console.log("✅ Municipios cargados:", municipiosData.length)
        } else {
          console.error("❌ Falló carga de municipios")
          setMunicipios([])
        }

      } catch (error) {
        console.error("❌ Error cargando datos de referencia:", error)
        toast({
          title: "Error",
          description: "No se pudieron cargar los datos de referencia",
          variant: "destructive"
        })
      } finally {
        setLoadingData(false)
      }
    }

    loadReferenceData()
  }, [toast])

  // Actualizar formulario cuando cambien los datos
  useEffect(() => {
    if (personData) {
      form.reset(personData)
    }
  }, [personData, form])

  // Filtrar municipios por departamento seleccionado
  const municipiosFiltrados = municipios.filter(m => {
    const departamentoId = form.watch('departamento_id')
    if (!departamentoId) return false
    return m.Id_departamento === departamentoId
  })

  const handleSaveAndContinue = async (data: PersonFormValues) => {
    setLoading(true)
    try {
      console.log("💾 Guardando y continuando:", data)
      
      // Hacer upsert para actualizar los datos
      const result = await personService.upsert(data)
      
      console.log("✅ Datos guardados:", result)
      
      // ✅ INCLUIR EL ID en los datos que se pasan al padre
      const personDataWithId = {
        ...data,
        id: result.id // ← AGREGAR EL ID DEL REGISTRO
      }
      
      toast({
        title: "¡Datos actualizados!",
        description: "La información se guardó correctamente",
      })
      
      // Notificar al padre con el ID incluido
      onSaveAndContinue(personDataWithId)
      
    } catch (error: any) {
      console.error("❌ Error guardando:", error)
      toast({
        title: "Error",
        description: "No se pudieron guardar los cambios",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleContinueOnly = () => {
    console.log("🚀 Continuando sin guardar:", form.getValues())
    // Simplemente pasar los datos actuales (pueden tener cambios no guardados)
    // ✅ INCLUIR EL ID existente
    const currentData = {
      ...form.getValues(),
      id: personData.id // ← MANTENER EL ID EXISTENTE
    }
    onContinueOnly(currentData)
  }

  if (loadingData) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Cargando datos de referencia...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-full">
      <Form {...form}>
        <form className="space-y-6">
          {/* PRIMERA FILA - Campos de solo lectura */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="codigo_persona"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código Persona *</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      readOnly 
                      className="bg-gray-100"
                    />
                  </FormControl>
                  <FormDescription>
                    Código único (no editable)
                  </FormDescription>
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
                    <Input 
                      {...field} 
                      readOnly 
                      className="bg-gray-100"
                    />
                  </FormControl>
                  <FormDescription>
                    Número de cédula (no editable)
                  </FormDescription>
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
                    <Input 
                      type="email"
                      {...field} 
                      readOnly 
                      className="bg-gray-100"
                    />
                  </FormControl>
                  <FormDescription>
                    Correo electrónico (no editable)
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
          </div>

          {/* SEGUNDA FILA - Campos editables */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
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

            {/* DEPARTAMENTO - CARGADO DESDE ENDPOINT */}
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
                      {departamentos.map((departamento) => (
                        <SelectItem key={departamento.id} value={departamento.id.toString()}>
                          {departamento.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* MUNICIPIO - CARGADO DESDE ENDPOINT Y FILTRADO POR DEPARTAMENTO */}
            <FormField
              control={form.control}
              name="municipio_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Municipio</FormLabel>
                  <Select 
                    onValueChange={(value) => field.onChange(parseInt(value))} 
                    defaultValue={field.value?.toString()}
                    disabled={!form.watch('departamento_id')}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={
                          !form.watch('departamento_id') 
                            ? "Seleccione departamento primero" 
                            : municipiosFiltrados.length === 0
                            ? "No hay municipios disponibles"
                            : "Seleccione municipio"
                        } />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {municipiosFiltrados.map((municipio) => (
                        <SelectItem key={municipio.Id} value={municipio.Id.toString()}>
                          {municipio.Nombre}
                        </SelectItem>
                      ))}
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

          {/* Botones de acción */}
          <div className="flex gap-4 pt-6">
            <Button
              type="button"
              onClick={form.handleSubmit(handleSaveAndContinue)}
              disabled={loading}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {loading ? "Guardando..." : "💾 Guardar y Continuar"}
            </Button>

            <Button
              type="button"
              onClick={handleContinueOnly}
              disabled={loading}
              variant="outline"
              className="flex-1"
            >
              🚀 Solo Continuar
            </Button>

            {onCancel && (
              <Button
                type="button"
                onClick={onCancel}
                variant="outline"
                className="flex-1"
              >
                ↩️ Volver
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}