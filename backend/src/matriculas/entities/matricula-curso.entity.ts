// backend/src/matriculas/entities/matricula-curso.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('matriculas_cursos', { schema: 'academia' })
export class MatriculaCurso {
  @PrimaryGeneratedColumn()
  id: number;

  // FOREIGN KEYS
  @Column({ name: 'persona_id' })
  persona_id: number;

  @Column({ name: 'curso_id' })
  curso_id: number;

  // DATOS DEL FORMULARIO
  @Column({ type: 'nvarchar', length: 20 })
  cedula: string;

  @Column({ type: 'nvarchar', length: 100 })
  nombre: string;

  @Column({ type: 'nvarchar', length: 100 })
  apellido: string;

  @Column({ type: 'nvarchar', length: 100 })
  email: string;

  @Column({ type: 'nvarchar', length: 20 })
  telefono: string;

  @Column({ name: 'idioma_interes', type: 'nvarchar', length: 50 })
  idioma_interes: string;

  @Column({ type: 'nvarchar', length: 500, nullable: true })
  direccion: string;

  @Column({ name: 'departamento_id'})
  departamento_id: number;

  @Column({ name: 'municipio_id'})
  municipio_id: number;

  // DATOS DE LA MATRÍCULA
  @Column({ name: 'estado_matricula', type: 'nvarchar', length: 20, default: 'PENDIENTE' })
  estado_matricula: string;

  @Column({ name: 'metodo_pago', type: 'nvarchar', length: 50, nullable: true })
  metodo_pago: string;

  @Column({ name: 'comprobante_pago', type: 'nvarchar', length: 100, nullable: true })
  comprobante_pago: string;

  @Column({ name: 'monto_pagado', type: 'decimal', precision: 10, scale: 2, nullable: true })
  monto_pagado: number;

  @Column({ name: 'fecha_pago', type: 'date', nullable: true })
  fecha_pago: Date;

  @Column({ name: 'calificacion_final', type: 'decimal', precision: 5, scale: 2, nullable: true })
  calificacion_final: number;

  @Column({ name: 'porcentaje_asistencia', type: 'decimal', precision: 5, scale: 2, nullable: true })
  porcentaje_asistencia: number;

  @Column({ type: 'nvarchar', length: 500, nullable: true })
  observaciones: string;

  // TIMESTAMPS
  @Column({ name: 'fecha_matricula', type: 'datetime2', default: () => 'GETDATE()' })
  fecha_matricula: Date;

  @Column({ name: 'fecha_confirmacion', type: 'datetime2', nullable: true })
  fecha_confirmacion: Date;

  @Column({ name: 'fecha_cancelacion', type: 'datetime2', nullable: true })
  fecha_cancelacion: Date;

  @Column({ default: true })
  estado: boolean;

  @Column({ name: 'creado_en', type: 'datetime2', default: () => 'GETDATE()' })
  creado_en: Date;

  @Column({ name: 'actualizado_en', type: 'datetime2', default: () => 'GETDATE()' })
  actualizado_en: Date;
}