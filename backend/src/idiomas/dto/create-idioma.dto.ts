import { IsString, IsNotEmpty } from "class-validator"

export class CreateIdiomaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  codigo: string;
}