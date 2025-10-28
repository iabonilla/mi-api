import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity("centers")
export class Center {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  name: string

  @Column({ unique: true })
  code: string

  @Column({ nullable: true })
  address: string

  @Column({ nullable: true })
  city: string

  @Column({ nullable: true })
  phone: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
