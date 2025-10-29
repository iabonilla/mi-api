import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateCenterDto {
  @IsString()
  @IsNotEmpty()
  nombre: string; // ← coincide con la BD

  @IsString()
  @IsNotEmpty()
  codigo: string; // ← coincide con la BD

  @IsString()
  @IsOptional()
  direccion?: string; // ← nombre en español

  @IsString()
  @IsOptional()
  telefono?: string; // ← nombre en español

  @IsString()
  estado ?:number;

  // Nota: "city" NO existe en tu tabla `centros`, así que se omite
  // Si lo necesitas, añádelo primero en la BD y en la entidad
}