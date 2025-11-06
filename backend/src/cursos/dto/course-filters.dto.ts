// En tu backend - cursos/dto/course-filters.dto.ts
import { IsOptional, IsNumber, IsBoolean } from "class-validator"
import { Type } from "class-transformer"

export class CourseFiltersDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number) // ← ESTA LÍNEA ES IMPORTANTE
  tipo_oferta_id?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  idioma_id?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  centro_id?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  turno_id?: number;

  @IsOptional()
  @IsBoolean()
  estado?: boolean;
}