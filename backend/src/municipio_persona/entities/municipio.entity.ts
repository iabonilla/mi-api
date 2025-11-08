// backend/src/municipio/entities/municipio.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Municipio_persona', schema: 'academia' })
export class Municipio {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ name: 'Id_departamento', nullable: true })
  Id_departamento: number;

  @Column({ type: 'nvarchar', nullable: true })
  Codigo: string;

  @Column({ type: 'nvarchar', nullable: true })
  Nombre: string;

  @Column({ name: 'Fecha_Registro', type: 'datetime', nullable: true })
  Fecha_Registro: Date;

  @Column({ name: 'Fecha_Modificacion', type: 'datetime', nullable: true })
  Fecha_Modificacion: Date;

  @Column({ name: 'IdUsuario', nullable: true })
  IdUsuario: number;

  @Column({ name: 'IdDominio', nullable: true })
  IdDominio: number;

  @Column({ nullable: true })
  Estado: number;
}