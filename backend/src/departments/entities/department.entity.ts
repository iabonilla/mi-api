import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity({ name: 'departamentos', schema: 'academia' })
export class Department {
  
 @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string; // ← español

  @Column({ unique: true })
  codigo: string; // ← español

 @Column({ type: "bit", default: 1 })
estado: number;
}