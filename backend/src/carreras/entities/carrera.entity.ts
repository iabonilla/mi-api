import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('academia.carreras')
export class Carrera {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar' })
  nombre: string;

  @Column({ type: 'nvarchar' })
  codigo: string;

  @Column({ type: 'bit' })
  estado: boolean;
}