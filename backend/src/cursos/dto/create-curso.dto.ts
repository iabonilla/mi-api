import { IsString, IsInt, IsBoolean, IsDate, IsOptional, IsUrl, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCursoDto {
  @IsString()
  @Length(1, 255)
  nombre: string;

  @IsString()
  @Length(1, 50)
  codigo: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsInt()
  tipo_oferta_id: number;

  @IsInt()
  tipo_curso_id: number;

  @IsInt()
  carrera_id: number;

  @IsOptional()
  @IsInt()
  departamento_id?: number;

  @IsOptional()
  @IsInt()
  centro_id?: number;

  @IsOptional()
  @IsInt()
  turno_id?: number;

  @IsInt()
  capacidad: number;

  @IsInt()
  inscritos: number;

  @IsDate()
  @Type(() => Date)
  fecha_inicio: Date;

  @IsDate()
  @Type(() => Date)
  fecha_fin: Date;

  @IsOptional()
  @IsString()
  @Length(0, 200)
  horario?: string;

  @IsOptional()
  @IsString()
  @Length(0, 100)
  plataforma_virtual?: string;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  enlace_virtual?: string;

  @IsBoolean()
  estado: boolean;
}