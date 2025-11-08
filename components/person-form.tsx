// components/person-form.tsx - VERSIÓN CON VARIABLES RENOMBRADAS
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
import { MapPin, Calendar, Clock, Search, User, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { personService } from "@/services/person.service"
import { Badge } from "@/components/ui/badge"

// SCHEMA COMPLETO
const personFormSchema = z.object({
  nombres: z.string().min(1, "El nombre es requerido"),
  apellidos: z.string().min(1, "El apellido es requerido"),
  fecha_nacimiento: z.string().min(1, "La fecha de nacimiento es requerida"),
  numero_cedula: z.string().min(1, "La cédula es requerida"),
  codigo_persona: z.string(),  
  nacionalidad: z.string().min(1, "La nacionalidad es requerida"),
  email: z.string().email("Email inválido").min(1, "El email es requerido"),
  telefono_movil: z.string().min(1, "El teléfono móvil es requerido"),
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
  existingPersonData?: any
}

// ✅ RENOMBRAMOS LAS INTERFACES PARA EVITAR CONFLICTOS
interface DepartamentoPersona {
  id: number
  nombre: string
  codigo: string
  estado: boolean
}

interface MunicipioPersona {
  Id: number
  Id_departamento: number
  Codigo: string
  Nombre: string
  Estado: number
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function PersonForm({ course, onSuccess, initialData, existingPersonData }: PersonFormProps) {
  const [loading, setLoading] = useState(false)
  const [searching, setSearching] = useState(false)
  const [searchMethod, setSearchMethod] = useState<'cedula' | 'codigo' | 'email'>('cedula')
  const [searchValue, setSearchValue] = useState('')
  const [hasExistingData, setHasExistingData] = useState(false)
  
  // ✅ RENOMBRAMOS LAS VARIABLES PARA EVITAR CONFLICTOS
  const [departamentosPersona, setDepartamentosPersona] = useState<DepartamentoPersona[]>([])
  const [municipiosPersona, setMunicipiosPersona] = useState<MunicipioPersona[]>([])
  const [municipiosFiltradosPersona, setMunicipiosFiltradosPersona] = useState<MunicipioPersona[]>([])
  const [loadingData, setLoadingData] = useState(true)
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

  // ✅ CARGAR DATOS CON VARIABLES RENOMBRADAS
  useEffect(() => {
    const loadAllData = async () => {
      try {
        setLoadingData(true)
        console.log("🚀 CARGANDO DATOS CON VARIABLES RENOMBRADAS...")

        // ✅ 1. Cargar departamentos desde endpoint correcto
        console.log("📡 Cargando departamentos_persona desde:", `${API_URL}/api/departamentos_persona`)
        const departamentosResponse = await fetch(`${API_URL}/api/departamentos_persona`)
        
        if (departamentosResponse.ok) {
          const departamentosData = await departamentosResponse.json()
          console.log("✅ RESPUESTA CRUDA DEPARTAMENTOS_PERSONA:", departamentosData)
          
          // Procesar la respuesta para extraer el array
          let departamentosArray: DepartamentoPersona[] = []
          
          if (Array.isArray(departamentosData)) {
            departamentosArray = departamentosData
          } else if (departamentosData.data && Array.isArray(departamentosData.data)) {
            departamentosArray = departamentosData.data
          } else if (typeof departamentosData === 'object') {
            // Si es un objeto, intentar extraer valores
            departamentosArray = Object.values(departamentosData)
          }
          
          console.log("📊 DEPARTAMENTOS_PERSONA PROCESADOS:", departamentosArray.length)
          console.log("🔍 LISTA COMPLETA DE DEPARTAMENTOS_PERSONA:")
          departamentosArray.forEach((depto, index) => {
            console.log(`📍 Depto Persona ${index + 1}:`, depto.id, depto.nombre)
          })
          
          setDepartamentosPersona(departamentosArray)
        } else {
          console.error("❌ ERROR CARGANDO DEPARTAMENTOS_PERSONA:", departamentosResponse.status)
          toast({
            title: "Error",
            description: `No se pudieron cargar los departamentos: ${departamentosResponse.status}`,
            variant: "destructive"
          })
          setDepartamentosPersona([])
        }

        // ✅ 2. Cargar municipios desde endpoint correcto
        console.log("📡 Cargando municipios_persona desde:", `${API_URL}/api/municipios_persona`)
        const municipiosResponse = await fetch(`${API_URL}/api/municipios_persona`)
        
        if (municipiosResponse.ok) {
          const municipiosData = await municipiosResponse.json()
          console.log("✅ RESPUESTA CRUDA MUNICIPIOS_PERSONA:", municipiosData)
          
          // Procesar la respuesta para extraer el array
          let municipiosArray: MunicipioPersona[] = []
          
          if (Array.isArray(municipiosData)) {
            municipiosArray = municipiosData
          } else if (municipiosData.data && Array.isArray(municipiosData.data)) {
            municipiosArray = municipiosData.data
          } else if (typeof municipiosData === 'object') {
            // Si es un objeto, intentar extraer valores
            municipiosArray = Object.values(municipiosData)
          }
          
          console.log("📊 MUNICIPIOS_PERSONA PROCESADOS:", municipiosArray.length)
          setMunicipiosPersona(municipiosArray)
        } else {
          console.error("❌ ERROR CARGANDO MUNICIPIOS_PERSONA:", municipiosResponse.status)
          toast({
            title: "Error",
            description: `No se pudieron cargar los municipios: ${municipiosResponse.status}`,
            variant: "destructive"
          })
          setMunicipiosPersona([])
        }

      } catch (error) {
        console.error("❌ ERROR GENERAL CARGANDO DATOS:", error)
        toast({
          title: "Error de conexión",
          description: "No se pudieron cargar los datos de referencia. Verifique la conexión.",
          variant: "destructive"
        })
        setDepartamentosPersona([])
        setMunicipiosPersona([])
      } finally {
        setLoadingData(false)
      }
    }

    loadAllData()
  }, [toast])

  // ✅ FILTRAR MUNICIPIOS CON VARIABLES RENOMBRADAS
  useEffect(() => {
    const departamentoId = form.watch('departamento_id')
    console.log("🎯 Departamento seleccionado:", departamentoId)
    
    if (departamentoId && municipiosPersona.length > 0) {
      const filtered = municipiosPersona.filter(m => m.Id_departamento === departamentoId)
      console.log("🏙️ Municipios filtrados para departamento", departamentoId, ":", filtered.length)
      setMunicipiosFiltradosPersona(filtered)
      
      // Limpiar municipio si no pertenece al nuevo departamento
      const currentMunicipioId = form.watch('municipio_id')
      if (currentMunicipioId && !filtered.some(m => m.Id === currentMunicipioId)) {
        form.setValue('municipio_id', undefined)
        console.log("🔄 Municipio limpiado porque no pertenece al nuevo departamento")
      }
    } else {
      setMunicipiosFiltradosPersona([])
      if (form.watch('municipio_id')) {
        form.setValue('municipio_id', undefined)
      }
    }
  }, [form.watch('departamento_id'), municipiosPersona, form])

  // ✅ CARGAR DATOS EXISTENTES CON VARIABLES RENOMBRADAS
  useEffect(() => {
    const dataToLoad = existingPersonData || initialData;
    
    if (dataToLoad && departamentosPersona.length > 0 && municipiosPersona.length > 0) {
      console.log("🎯 CARGANDO DATOS EXISTENTES:", dataToLoad)
      
      const formValues = {
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
      }

      console.log("📝 VALORES DEL FORMULARIO:", formValues)
      form.reset(formValues)
      setHasExistingData(true)
      
      toast({
        title: "Datos cargados",
        description: "Sus datos han sido precargados correctamente",
      })
    }
  }, [existingPersonData, initialData, form, toast, departamentosPersona, municipiosPersona])

  // BUSCAR PERSONA EXISTENTE
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
          description: "Los datos han sido cargados exitosamente",
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

  // GUARDAR PERSONA
  const onSubmit = async (data: PersonFormValues) => {
    setLoading(true)
    
    try {
      const result = await personService.upsert(data)
      
      toast({
        title: hasExistingData ? "Datos actualizados" : "Registro exitoso",
        description: hasExistingData 
          ? "Sus datos han sido actualizados correctamente" 
          : "Sus datos personales han sido guardados exitosamente",
      })
      
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

  if (loadingData) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Cargando datos de referencia...</p>
          <p className="text-xs text-muted-foreground mt-1">
            Departamentos: {departamentosPersona.length} | Municipios: {municipiosPersona.length}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full max-w-full">
      {/* Información del curso */}
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

      {/* Formulario de persona */}
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
            {/* Búsqueda solo si no hay datos existentes */}
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

            {/* DEBUG INFO - CON VARIABLES RENOMBRADAS */}
            <div className="p-3 bg-gray-50 border border-gray-200 rounded text-xs">
              <p><strong>Estado de datos (VARIABLES RENOMBRADAS):</strong></p>
              <p>Departamentos Persona: {departamentosPersona.length}</p>
              <p>Municipios Persona: {municipiosPersona.length}</p>
              <p>Municipios Filtrados Persona: {municipiosFiltradosPersona.length}</p>
              <p>Depto seleccionado: {form.watch('departamento_id') || 'Ninguno'}</p>
              <p>Muni seleccionado: {form.watch('municipio_id') || 'Ninguno'}</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* SECCIÓN DE INFORMACIÓN PERSONAL BÁSICA */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="nombres"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombres *</FormLabel>
                        <FormControl>
                          <Input placeholder="Ingrese sus nombres" {...field} />
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
                          <Input placeholder="Ingrese sus apellidos" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="numero_cedula"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número de Cédula *</FormLabel>
                        <FormControl>
                          <Input placeholder="Ingrese su cédula" {...field} />
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
                        <FormLabel>Fecha de Nacimiento *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* SECCIÓN DE CONTACTO */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="correo@ejemplo.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="telefono_movil"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono Móvil *</FormLabel>
                        <FormControl>
                          <Input placeholder="8888-8888" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* ✅ SECCIÓN DE UBICACIÓN - CON VARIABLES RENOMBRADAS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* ✅ DEPARTAMENTO - USA VARIABLES RENOMBRADAS */}
                  <FormField
                    control={form.control}
                    name="departamento_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Departamento</FormLabel>
                        <Select 
                          onValueChange={(value) => {
                            const numValue = parseInt(value)
                            field.onChange(numValue)
                            console.log("📍 Departamento seleccionado:", numValue)
                          }} 
                          value={field.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione departamento">
                                {field.value && departamentosPersona.find(d => d.id === field.value)?.nombre}
                              </SelectValue>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {departamentosPersona.map((depto) => (
                              <SelectItem key={depto.id} value={depto.id.toString()}>
                                {depto.nombre}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* ✅ MUNICIPIO - USA VARIABLES RENOMBRADAS */}
                  <FormField
                    control={form.control}
                    name="municipio_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Municipio</FormLabel>
                        <Select 
                          onValueChange={(value) => {
                            const numValue = parseInt(value)
                            field.onChange(numValue)
                            console.log("🏙️ Municipio seleccionado:", numValue)
                          }} 
                          value={field.value?.toString()}
                          disabled={!form.watch('departamento_id') || municipiosFiltradosPersona.length === 0}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={
                                !form.watch('departamento_id') 
                                  ? "Seleccione departamento primero" 
                                  : municipiosFiltradosPersona.length === 0
                                  ? "No hay municipios disponibles"
                                  : "Seleccione municipio"
                              }>
                                {field.value && municipiosFiltradosPersona.find(m => m.Id === field.value)?.Nombre}
                              </SelectValue>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {municipiosFiltradosPersona.map((municipio) => (
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

                <FormField
                  control={form.control}
                  name="direccion_completa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dirección Completa</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Ingrese su dirección completa..." 
                          className="resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* SECCIÓN ADICIONAL */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="genero"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Género</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione género" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="M">Masculino</SelectItem>
                            <SelectItem value="F">Femenino</SelectItem>
                            <SelectItem value="O">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nacionalidad"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nacionalidad</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="idioma_interes_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Idioma de Interés</FormLabel>
                        <Select 
                          onValueChange={(value) => field.onChange(parseInt(value))} 
                          value={field.value?.toString()}
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
                </div>

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