// entities/persona.entity.ts
import { max } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";

@Entity("personas", { schema: "academia" })
export class Persona {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "nvarchar" }) // nvarchar(max)
  codigo_persona: string;

  @Column({ type: "nvarchar" }) // nvarchar(max)
  nombres: string;

  @Column({ type: "nvarchar" }) // nvarchar(max)
  apellidos: string;

  @Column({ type: "date" })
  fecha_nacimiento: string;

  @Column({ type: "int", nullable: true })
  edad: number;

  @Column({ type: "nvarchar", nullable: true }) // max
  numero_cedula: string;

  @Column({ type: "nvarchar" }) // max
  nacionalidad: string;

  @Column({ type: "nvarchar", length: 20, nullable: true })
  genero: string;

  @Column({ type: "nvarchar", length: 100 })
  email: string;

  @Column({ type: "nvarchar", length: 20 })
  telefono_movil: string;

  @Column({ type: "nvarchar", length: 20, nullable: true })
  telefono_alterno: string;

  @Column({ type: "nvarchar", nullable: true }) // max
  direccion_completa: string;

  @Column({ type: "int", nullable: true })
  municipio_id: number;

  @Column({ type: "int", nullable: true })
  departamento_id: number;

  @Column({ type: "nvarchar", length: 50, nullable: true })
  nivel_academico: string;

  @Column({ type: "int", nullable: true })
  idioma_interes_id: number;

  @Column({ type: "nvarchar", length: 100, nullable: true })
  preferencia_horario: string;

  @Column({ type: "nvarchar", length: 100, nullable: true })
  contacto_emergencia_nombre: string;

  @Column({ type: "nvarchar", length: 50, nullable: true })
  contacto_emergencia_relacion: string;

  @Column({ type: "nvarchar", length: 20, nullable: true })
  contacto_emergencia_telefono: string;

  @CreateDateColumn({ type: "datetime2" })
  fecha_registro: Date;

  @Column({ type: "bit", default: true })
  estado: boolean;

  @CreateDateColumn({ type: "datetime2" })
  creado_en: Date;

  @UpdateDateColumn({ type: "datetime2" })
  actualizado_en: Date;

  // Calcular edad automáticamente
  @BeforeInsert()
  @BeforeUpdate()
  calculateAge() {
    if (this.fecha_nacimiento) {
      const birthDate = new Date(this.fecha_nacimiento);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      this.edad = age;
    }
  }

  // Generar código de persona automáticamente
  @BeforeInsert()
  generatePersonCode() {
    if (!this.codigo_persona) {
      const random = Math.random().toString(36).substring(2, 8).toUpperCase();
      this.codigo_persona = `PER-${random}`;
    }
  }
}
