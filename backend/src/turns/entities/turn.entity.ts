import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "turnos", schema: "academia" })
export class Turn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ type: "time" })
  hora_inicio: string;

  @Column({ type: "time" })
  hora_fin: string;

@Column({ type: "bit", default: 1 })
estado: number;
}