// services/matricula.service.ts
export interface CreateMatriculaDto {
  persona_id: number;
  curso_id: number;
  cedula: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;  
  direccion?: string;
  departamento?: string;
  municipio?: string;
  estado_matricula?: string;
  metodo_pago?: string;
  comprobante_pago?: string;
  monto_pagado?: number;
  observaciones?: string;
}

export interface Matricula {
  id: number;
  persona_id: number;
  curso_id: number;
  cedula: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  idioma_interes: string;
  direccion?: string;
  departamento?: string;
  municipio?: string;
  estado_matricula: string;
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
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';

export const matriculaService = {
  async create(matriculaData: CreateMatriculaDto): Promise<Matricula> {
    const response = await fetch(`${API_URL}/matriculas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(matriculaData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Error creando matrícula: ${response.status} ${response.statusText}`);
    }

    return response.json();
  },

  async getByPersona(personaId: number): Promise<Matricula[]> {
    const response = await fetch(`${API_URL}/matriculas/persona/${personaId}`);
    if (!response.ok) {
      throw new Error('Error obteniendo matrículas');
    }
    return response.json();
  },

  async getByCurso(cursoId: number): Promise<Matricula[]> {
    const response = await fetch(`${API_URL}/matriculas/curso/${cursoId}`);
    if (!response.ok) {
      throw new Error('Error obteniendo matrículas del curso');
    }
    return response.json();
  },

  async getAll(): Promise<Matricula[]> {
    const response = await fetch(`${API_URL}/matriculas`);
    if (!response.ok) {
      throw new Error('Error obteniendo todas las matrículas');
    }
    return response.json();
  }
};