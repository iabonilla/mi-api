// components/person-form-registration.tsx - CORREGIDO
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
import { MapPin, Calendar, Clock, Languages, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

const personFormSchema = z.object({
  cedula: z.string().min(1, "La cédula es requerida"),
  nombre: z.string().min(1, "El nombre es requerido"),
  apellido: z.string().min(1, "El apellido es requerido"),
  email: z.string().email("Email inválido"),
  telefono: z.string().min(1, "El teléfono es requerido"),
  idioma: z.string().min(1, "El idioma es requerido"),
  direccion: z.string().optional(),
  departamento: z.string().optional(),
  municipio: z.string().optional(),
})

type PersonFormValues = z.infer<typeof personFormSchema>

interface PersonFormRegistrationProps {
  course: Curso | null
  onSuccess: (data: PersonFormValues) => void
  existingPersonData?: any 
  isDataComplete?: boolean
}

interface Idioma {
  id: number
  nombre: string
  codigo: string
  estado: boolean
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

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005'

export function PersonFormRegistration({ course, onSuccess, existingPersonData }: PersonFormRegistrationProps) {
  const [loading, setLoading] = useState(false)
  const [hasExistingData, setHasExistingData] = useState(false)
  const [idiomas, setIdiomas] = useState<Idioma[]>([])
  const [departamentos, setDepartamentos] = useState<Departamento[]>([])
  const [municipios, setMunicipios] = useState<Municipio[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const { toast } = useToast()

  const form = useForm<PersonFormValues>({
    resolver: zodResolver(personFormSchema),
    defaultValues: {
      cedula: "",
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      idioma: "",
      direccion: "",
      departamento: "",
      municipio: "",
    },
  })

  // Función para obtener el nombre del idioma por ID - CORREGIDA
  const getIdiomaNombre = (idiomaId: string | undefined) => {
    if (!idiomaId) return ""
    const idioma = idiomas.find(i => i.id.toString() === idiomaId)
    return idioma ? idioma.nombre : ""
  }

  // Función para obtener el nombre del departamento por ID - CORREGIDA
  const getDepartamentoNombre = (departamentoId: string | undefined) => {
    if (!departamentoId) return ""
    const departamento = departamentos.find(d => d.id.toString() === departamentoId)
    return departamento ? departamento.nombre : ""
  }

  // Cargar datos de los endpoints
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingData(true)
        console.log("📡 Cargando datos de endpoints...")

        const [idiomasResponse, departamentosResponse, municipiosResponse] = await Promise.all([
          fetch(`${API_URL}/idiomas`),
          fetch(`${API_URL}/departmentos`),
          fetch(`${API_URL}/municipios`)
        ])

        if (!idiomasResponse.ok) throw new Error('Error cargando idiomas')
        if (!departamentosResponse.ok) throw new Error('Error cargando departamentos')
        if (!municipiosResponse.ok) throw new Error('Error cargando municipios')

        const [idiomasData, departamentosData, municipiosData] = await Promise.all([
          idiomasResponse.json(),
          departamentosResponse.json(),
          municipiosResponse.json()
        ])

        setIdiomas(idiomasData)
        setDepartamentos(departamentosData)
        setMunicipios(municipiosData)

        console.log("✅ Datos cargados:", {
          idiomas: idiomasData,
          departamentos: departamentosData,
          municipios: municipiosData
        })

      } catch (error) {
        console.error("❌ Error cargando datos:", error)
        toast({
          title: "Error",
          description: "No se pudieron cargar los datos de referencia",
          variant: "destructive"
        })
      } finally {
        setLoadingData(false)
      }
    }

    fetchData()
  }, [toast])

  // Cargar datos existentes
  useEffect(() => {
    if (existingPersonData && !loadingData) {
      console.log("🎯 Cargando datos existentes:", existingPersonData)
      
      form.reset({
        cedula: existingPersonData.numero_cedula || existingPersonData.cedula || "",
        nombre: existingPersonData.nombres || existingPersonData.nombre || "",
        apellido: existingPersonData.apellidos || existingPersonData.apellido || "",
        email: existingPersonData.email || "",
        telefono: existingPersonData.telefono_movil || existingPersonData.telefono || "",
        // Guardar IDs como strings
        idioma: existingPersonData.idioma_interes_id ? existingPersonData.idioma_interes_id.toString() : "",
        departamento: existingPersonData.departamento_id ? existingPersonData.departamento_id.toString() : "",
        municipio: existingPersonData.municipio || "",
        direccion: existingPersonData.direccion_completa || existingPersonData.direccion || "",
      })

      setHasExistingData(true)
      
      // DEBUG después de cargar
      setTimeout(() => {
        const currentValues = form.getValues()
        console.log("🔍 DEBUG - Valores en el formulario:", {
          idioma: currentValues.idioma,
          idiomaNombre: getIdiomaNombre(currentValues.idioma),
          departamento: currentValues.departamento,
          departamentoNombre: getDepartamentoNombre(currentValues.departamento),
          municipio: currentValues.municipio
        })
      }, 200)
      
      toast({
        title: "Datos cargados automáticamente",
        description: "Sus datos han sido precargados",
      })
    }
  }, [existingPersonData, form, toast, loadingData])

  const onSubmit = async (data: PersonFormValues) => {
    setLoading(true)
    console.log("📤 Enviando datos:", data)
    
    setTimeout(() => {
      setLoading(false)
      toast({
        title: hasExistingData ? "Datos actualizados" : "Datos guardados",
        description: hasExistingData 
          ? "Sus datos han sido actualizados. Continúe con la matrícula." 
          : "Sus datos han sido guardados. Continúe con la matrícula.",
      })
      onSuccess(data)
    }, 1000)
  }

  const handleUseExistingData = () => {
    if (existingPersonData && !loadingData) {
      const dataToSend = {
        cedula: existingPersonData.numero_cedula || existingPersonData.cedula || "",
        nombre: existingPersonData.nombres || existingPersonData.nombre || "",
        apellido: existingPersonData.apellidos || existingPersonData.apellido || "",
        email: existingPersonData.email || "",
        telefono: existingPersonData.telefono_movil || existingPersonData.telefono || "",
        idioma: existingPersonData.idioma_interes_id ? existingPersonData.idioma_interes_id.toString() : "",
        departamento: existingPersonData.departamento_id ? existingPersonData.departamento_id.toString() : "",
        municipio: existingPersonData.municipio || "",
        direccion: existingPersonData.direccion_completa || existingPersonData.direccion || "",
      }
      console.log("🚀 Usando datos existentes:", dataToSend)
      onSuccess(dataToSend)
    }
  }

  // Filtrar municipios por departamento seleccionado
  const municipiosFiltrados = municipios.filter(m => {
    const departamentoId = form.watch('departamento')
    if (!departamentoId) return false
    const departamentoSeleccionado = departamentos.find(d => d.id.toString() === departamentoId)
    return departamentoSeleccionado ? m.Id_departamento === departamentoSeleccionado.id : false
  })

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
              {hasExistingData && (
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Datos cargados
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {existingPersonData && !hasExistingData && (
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800 mb-2">
                  <strong>¡Tiene datos guardados!</strong> Puede usar sus datos existentes.
                </p>
                <Button 
                  onClick={handleUseExistingData} 
                  variant="outline" 
                  size="sm"
                  className="gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  Usar mis datos guardados
                </Button>
              </div>
            )}

            {/* DEBUG INFO MEJORADA - CORREGIDA */}
            {hasExistingData && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-xs">
                <p className="font-semibold">Debug Info - Valores actuales:</p>
                <p>Idioma ID: "{form.watch('idioma')}"</p>
                <p>Idioma Nombre: "{getIdiomaNombre(form.watch('idioma'))}"</p>
                <p>Departamento ID: "{form.watch('departamento')}"</p>
                <p>Departamento Nombre: "{getDepartamentoNombre(form.watch('departamento'))}"</p>
                <p>Municipio: "{form.watch('municipio')}"</p>
                <p>Idiomas disponibles: {idiomas.length}</p>
              </div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  </div>

                  {/* Segunda columna */}
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="telefono"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teléfono *</FormLabel>
                          <FormControl>
                            <Input placeholder="Número de teléfono" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* IDIOMA - SOLUCIÓN DEFINITIVA */}
                    <FormField
                      control={form.control}
                      name="idioma"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Idioma de Interés *</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            value={field.value}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccione idioma">
                                  {field.value ? (
                                    <span>{getIdiomaNombre(field.value)}</span>
                                  ) : null}
                                </SelectValue>
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {idiomas.map((idioma) => (
                                <SelectItem key={idioma.id} value={idioma.id.toString()}>
                                  {idioma.nombre}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* DEPARTAMENTO - MISMOS PRINCIPIOS */}
                    <FormField
                      control={form.control}
                      name="departamento"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Departamento</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            value={field.value}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccione departamento">
                                  {field.value ? (
                                    <span>{getDepartamentoNombre(field.value)}</span>
                                  ) : null}
                                </SelectValue>
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

                    <FormField
                      control={form.control}
                      name="municipio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Municipio</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            value={field.value}
                            defaultValue={field.value}
                            disabled={!form.watch('departamento')}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={
                                  !form.watch('departamento') 
                                    ? "Seleccione departamento primero" 
                                    : municipiosFiltrados.length === 0
                                    ? "No hay municipios disponibles"
                                    : "Seleccione municipio"
                                } />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {municipiosFiltrados.map((municipio) => (
                                <SelectItem key={municipio.Id} value={municipio.Nombre}>
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

                <Button type="submit" disabled={loading} className="w-full">
                  {loading 
                    ? "Procesando..." 
                    : hasExistingData ? "Actualizar y Continuar" : "Continuar a Matrícula"
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