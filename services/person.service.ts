
import { apiClient } from "@/lib/api-client"
import type { PersonFormValues } from "@/types/course"

export interface Persona {
  id: number
  codigo_persona: string
  nombres: string
  apellidos: string
  fecha_nacimiento: string
  edad: number
  numero_cedula: string
  nacionalidad: string
  genero: string
  email: string
  telefono_movil: string
  telefono_alterno?: string
  direccion_completa?: string
  municipio_id?: number
  departamento_id?: number
  nivel_academico?: string
  idioma_interes_id?: number
  preferencia_horario?: string
  contacto_emergencia_nombre?: string
  contacto_emergencia_relacion?: string
  contacto_emergencia_telefono?: string
  fecha_registro: string
  estado: boolean
  creado_en: string
  actualizado_en: string
}

const endpoint = "/personas"

export const personService = {
  // UPSERT: Crear o actualizar persona
  async upsert(data: PersonFormValues): Promise<Persona> {
    return await apiClient.post(`${endpoint}/upsert`, data)
  },

  // CREATE: Crear nueva persona
  async create(data: PersonFormValues): Promise<Persona> {
    return await apiClient.post(endpoint, data)
  },

  // GET ALL: Obtener todas las personas
  async getAll(): Promise<Persona[]> {
    return await apiClient.get(endpoint)
  },

  // GET BY ID: Obtener por ID
  async getById(id: string): Promise<Persona> {
    return await apiClient.get(`${endpoint}/${id}`)
  },

  // GET BY CÓDIGO: Buscar por código_persona
  async getByCodigo(codigo: string): Promise<Persona> {
    return await apiClient.get(`${endpoint}/codigo/${codigo}`)
  },

  // GET BY CÉDULA: Buscar por número_cedula  
  async getByCedula(cedula: string): Promise<Persona> {
    return await apiClient.get(`${endpoint}/cedula/${cedula}`)
  },

  // GET BY EMAIL: Buscar por email
  async getByEmail(email: string): Promise<Persona> {
    return await apiClient.get(`${endpoint}/email/${email}`)
  },

  // UPDATE: Actualizar persona
  async update(id: string, data: Partial<PersonFormValues>): Promise<Persona> {
    return await apiClient.put(`${endpoint}/${id}`, data)
  },

  // DELETE: Borrado lógico
  async delete(id: string): Promise<void> {
    return await apiClient.delete(`${endpoint}/${id}`)
  }
}