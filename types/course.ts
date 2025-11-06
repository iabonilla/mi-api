// types/course.ts - TIPOS COMPLETOS DEL SISTEMA ACADÉMICO

// ==================== PERSONAS ====================
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

// PersonFormValues DEBE ser igual a Persona pero con campos opcionales para creación
export interface PersonFormValues {
  id?: number
  codigo_persona: string
  nombres: string
  apellidos: string
  fecha_nacimiento: string
  edad?: number
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
  fecha_registro?: string
  estado?: boolean
  creado_en?: string
  actualizado_en?: string
}


// ==================== CURSOS ====================
export interface Turn {
  id: number;
  nombre: string;
  hora_inicio: string;
  hora_fin: string;
  estado: boolean;
}

export interface TipoCurso {
  id: number;
  nombre: string;
  estado: boolean;
}

export interface Departamento {
  id: number;
  nombre: string;
  codigo: string;
  estado: boolean;
}

export interface Carrera {
  id: number;
  nombre: string;
  codigo: string;
  estado: boolean;
}

export interface Centro {
  id: number;
  nombre: string;
  codigo: string;
  direccion?: string;
  telefono?: string;
  email?: string;
  estado: boolean;
}

export interface TipoOferta {
  id: number;
  nombre: string;
  estado: boolean;
}

export interface Idioma {
  id: number;
  nombre: string;
  codigo: string;
  estado: boolean;
}

// Curso principal - ACTUALIZADO PARA MATCH CON API
export interface Curso {
  id: number;
  nombre: string;
  codigo: string;
  descripcion?: string;
  
  // CAMBIOS: usar camelCase como el API
  tipoOfertaId: number;    // ← CAMBIADO de tipo_oferta_id
  idiomaId: number;        // ← CAMBIADO de idioma_id  
  centroId?: number;       // ← CAMBIADO de centro_id
  turnoId?: number;        // ← CAMBIADO de turno_id
  
  capacidad: number;
  inscritos: number;
  cupos: number;           // ← AGREGADO (viene del API)
  fechaInicio: string;     // ← CAMBIADO de fecha_inicio
  fechaFin: string;        // ← CAMBIADO de fecha_fin
  horario?: string;
  plataformaVirtual?: string;  // ← CAMBIADO de plataforma_virtual
  enlaceVirtual?: string;      // ← CAMBIADO de enlace_virtual
  estado: boolean;
  creadoEn?: string;       // ← CAMBIADO de creado_en
  actualizadoEn?: string;  // ← CAMBIADO de actualizado_en
  
  // Relaciones (opcionales - se cargan cuando se incluyen en la query)
  tipoOferta?: TipoOferta;
  idioma?: Idioma;
  centro?: Centro;
  turno?: Turn;
}

// ==================== MATRÍCULAS ====================
export interface Matricula {
  id: number;
  persona_id: number;
  curso_id: number;
  estado_matricula: string; // 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA'
  metodo_pago?: string;
  comprobante_pago?: string;
  monto_pagado?: number;
  fecha_pago?: string;
  calificacion_final?: number;
  porcentaje_asistencia?: number;
  observaciones?: string;
  fecha_matricula: string;
  fecha_confirmacion?: string;
  fecha_cancelacion?: string;
  estado: boolean;
  creado_en: string;
  actualizado_en: string;
  
  // Relaciones
  persona?: Persona;
  curso?: Curso;
}

// ==================== DTOs ====================
export interface CreateCursoDto {
  nombre: string;
  codigo: string;
  descripcion?: string;
  tipoOfertaId: number;
  idiomaId: number;
  centroId?: number;
  turnoId?: number;
  capacidad: number;
  inscritos: number;
  fechaInicio: string;
  fechaFin: string;
  horario?: string;
  plataformaVirtual?: string;
  enlaceVirtual?: string;
  estado: boolean;
}

export interface UpdateCursoDto extends Partial<CreateCursoDto> {}

export interface CreateMatriculaDto {
  persona_id: number;
  curso_id: number;
  estado_matricula?: string;
  observaciones?: string;
}

// ==================== FILTROS ====================
export interface CourseFilters {
  tipo_oferta_id?: number;
  idioma_id?: number;  
  centro_id?: number;
  turno_id?: number;
  estado?: boolean;
}

export interface PersonFilters {
  codigo_persona?: string;
  numero_cedula?: string;
  email?: string;
  nombres?: string;
  apellidos?: string;
}

// ==================== TIPOS ESPECIALES ====================
export type Modalidad = "presencial" | "virtual";
export type EstadoMatricula = "PENDIENTE" | "CONFIRMADA" | "CANCELADA";

// ==================== ALIASES ====================
export type Course = Curso;
export type Department = Departamento;
export type Center = Centro;
export type CreateCourseDto = CreateCursoDto;
export type UpdateCourseDto = UpdateCursoDto;
export type Student = Persona;