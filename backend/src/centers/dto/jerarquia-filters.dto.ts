import { IsOptional, IsNumber } from "class-validator"
import { Type } from "class-transformer"

export class JerarquiaFiltersDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  departamento_id?: number;
}