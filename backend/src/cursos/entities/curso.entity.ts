import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { TipoOferta } from "../../tipo-ofertas/entities/tipo-oferta.entity"
import { Idioma } from "../../idiomas/entities/idioma.entity"
import { Center } from "../../centers/entities/center.entity"
import { Turn } from "../../turns/entities/turn.entity"

@Entity({ name: 'cursos', schema: 'academia' })
export class Curso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  codigo: string;

  @Column('text', { nullable: true })
  descripcion: string;

  @Column({ name: 'tipo_oferta_id', nullable: true })
  tipoOfertaId: number;

  @Column({ name: 'idioma_id', nullable: true })
  idiomaId: number;

  @Column({ name: 'centro_id', nullable: true })
  centroId: number;

  @Column({ name: 'turno_id', nullable: true })
  turnoId: number;

  @Column({ default: 0 })
  capacidad: number;

  @Column({ default: 0 })
  inscritos: number;

  @Column({ nullable: true })
  cupos: number;

  @Column({ name: 'fecha_inicio', type: 'date', nullable: true })
  fechaInicio: string;

  @Column({ name: 'fecha_fin', type: 'date', nullable: true })
  fechaFin: string;

  @Column({ nullable: true })
  horario: string;

  @Column({ name: 'plataforma_virtual', nullable: true })
  plataformaVirtual: string;

  @Column({ name: 'enlace_virtual', nullable: true })
  enlaceVirtual: string;

  @Column({ type: "bit", default: 1 })
  estado: number;

  @Column({ name: 'creado_en', type: 'datetime2', nullable: true })
  creadoEn: Date;

  @Column({ name: 'actualizado_en', type: 'datetime2', nullable: true })
  actualizadoEn: Date;

  // Relaciones (opcionales - para joins)
  @ManyToOne(() => TipoOferta)
  @JoinColumn({ name: 'tipo_oferta_id' })
  tipoOferta: TipoOferta;

  @ManyToOne(() => Idioma)
  @JoinColumn({ name: 'idioma_id' })
  idioma: Idioma;

  @ManyToOne(() => Center)
  @JoinColumn({ name: 'centro_id' })
  centro: Center;

  @ManyToOne(() => Turn)
  @JoinColumn({ name: 'turno_id' })
  turno: Turn;
}