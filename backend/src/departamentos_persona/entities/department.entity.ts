import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity({ name: 'Departamento_persona', schema: 'academia' })
export class Department {
  
 @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string; 

  @Column({ unique: true })
  codigo: string; 

 @Column({ type: "bit", default: 1 })
estado: number;
}