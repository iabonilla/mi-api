import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'idiomas', schema: 'academia' })
export class Idioma {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  codigo: string;

  @Column({ type: "bit", default: 1 })
  estado: number;
}