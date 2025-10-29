import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  nombre: string; // ← en español, coincide con la BD

  @IsString()
  @IsNotEmpty()
  codigo: string; // ← en español

  // Elimina "description" si no existe en la entidad
}