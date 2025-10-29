import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('academia.tipo_cursos')
export class TipoCurso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar', length: 50 })
  nombre: string;

  @Column({ type: 'bit' })
  estado: boolean;
}