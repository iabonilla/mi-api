// backend/src/matriculas/dto/create-matricula-curso.dto.ts
export class CreateMatriculaCursoDto {
  persona_id: number;
  curso_id: number;
  cedula: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  idioma_interes?: string;
  direccion?: string;
  departamento?: string;
  municipio?: string;
  estado_matricula?: string;
  metodo_pago?: string;
  comprobante_pago?: string;
  monto_pagado?: number;
  fecha_pago?: Date;
  calificacion_final?: number;
  porcentaje_asistencia?: number;
  observaciones?: string;
  estado?: boolean;
}