// dto/create-persona.dto.ts (MODIFICADO)
import { IsEmail, IsOptional, IsString, IsDateString, IsNumber } from 'class-validator';

export class CreatePersonaDto {
  @IsString()
  nombres: string;

  @IsString()
  apellidos: string;

  @IsDateString()
  fecha_nacimiento: string;

  @IsString()
  @IsOptional()
  codigo_persona?: string; // ← NUEVO: identificador principal

  @IsString()
  @IsOptional()
  numero_cedula?: string; // ← identificador secundario

  @IsString()
  @IsOptional()
  nacionalidad?: string;

  @IsString()
  @IsOptional()
  genero?: string;

  @IsEmail()
  email: string;

  @IsString()
  telefono_movil: string;

  @IsString()
  @IsOptional()
  telefono_alterno?: string;

  @IsString()
  @IsOptional()
  direccion_completa?: string;

  @IsNumber()
  @IsOptional()
  municipio_id?: number;

  @IsNumber()
  @IsOptional()
  departamento_id?: number;

  @IsString()
  @IsOptional()
  nivel_academico?: string;

  @IsNumber()
  @IsOptional()
  idioma_interes_id?: number;

  @IsString()
  @IsOptional()
  preferencia_horario?: string;

  @IsString()
  @IsOptional()
  contacto_emergencia_nombre?: string;

  @IsString()
  @IsOptional()
  contacto_emergencia_relacion?: string;

  @IsString()
  @IsOptional()
  contacto_emergencia_telefono?: string;
}