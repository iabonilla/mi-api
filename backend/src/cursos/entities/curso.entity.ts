import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TipoOferta } from '../../tipo-ofertas/entities/tipo-oferta.entity';
import { TipoCurso } from '../../tipo-cursos/entities/tipo-curso.entity';
import { Carrera } from '../../carreras/entities/carrera.entity';
import { Department } from '../../departments/entities/department.entity';
import { Center } from '../../centers/entities/center.entity';
import { Turn } from '../../turns/entities/turn.entity';

@Entity('academia.cursos')
export class Curso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar', length: 255 })
  nombre: string;

  @Column({ type: 'nvarchar', length: 50 })
  codigo: string;

  @Column({ type: 'nvarchar', nullable: true })
  descripcion: string;

  @Column()
  tipo_oferta_id: number;

  @Column()
  tipo_curso_id: number;

  @Column()
  carrera_id: number;

  @Column({ nullable: true })
  departamento_id: number;

  @Column({ nullable: true })
  centro_id: number;

  @Column({ nullable: true })
  turno_id: number;

  @Column()
  capacidad: number;

  @Column()
  inscritos: number;

  @Column({ type: 'date' })
  fecha_inicio: Date;

  @Column({ type: 'date' })
  fecha_fin: Date;

  @Column({ type: 'nvarchar', length: 200, nullable: true })
  horario: string;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  plataforma_virtual: string;

  @Column({ type: 'nvarchar', length: 500, nullable: true })
  enlace_virtual: string;

  @Column({ type: 'bit' })
  estado: boolean;

  @Column({ type: 'datetime2', nullable: true })
  creado_en: Date;

  @Column({ type: 'datetime2', nullable: true })
  actualizado_en: Date;

  // Relaciones
  @ManyToOne(() => TipoOferta)
  @JoinColumn({ name: 'tipo_oferta_id' })
  tipoOferta: TipoOferta;

  @ManyToOne(() => TipoCurso)
  @JoinColumn({ name: 'tipo_curso_id' })
  tipoCurso: TipoCurso;

  @ManyToOne(() => Carrera)
  @JoinColumn({ name: 'carrera_id' })
  carrera: Carrera;

  @ManyToOne(() => Department, { nullable: true })
  @JoinColumn({ name: 'departamento_id' })
  departamento: Department;

  @ManyToOne(() => Center, { nullable: true })
  @JoinColumn({ name: 'centro_id' })
  centro: Center;

  @ManyToOne(() => Turn, { nullable: true })
  @JoinColumn({ name: 'turno_id' })
  turno: Turn;
}