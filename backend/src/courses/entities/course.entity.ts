import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm"
import { Department } from "../../departments/entities/department.entity"
import { Center } from "../../centers/entities/center.entity"
import { Turn } from "../../turns/entities/turn.entity"

@Entity("courses")
export class Course {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  name: string

  @Column({ unique: true })
  code: string

  @Column({ nullable: true })
  description: string

  @Column()
  departmentId: string

  @Column()
  centerId: string

  @Column()
  turnId: string

  @Column({ type: "enum", enum: ["presencial", "virtual"] })
  modality: "presencial" | "virtual"

  @Column({ type: "int" })
  capacity: number

  @Column({ type: "int", default: 0 })
  enrolled: number

  @Column({ type: "date" })
  startDate: string

  @Column({ type: "date" })
  endDate: string

  @Column({ nullable: true })
  schedule: string

  @Column({ nullable: true })
  teacher: string

  @Column({
    type: "enum",
    enum: ["active", "inactive", "full"],
    default: "active",
  })
  status: "active" | "inactive" | "full"

  @ManyToOne(() => Department)
  @JoinColumn({ name: "departmentId" })
  department: Department

  @ManyToOne(() => Center)
  @JoinColumn({ name: "centerId" })
  center: Center

  @ManyToOne(() => Turn)
  @JoinColumn({ name: "turnId" })
  turn: Turn

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
