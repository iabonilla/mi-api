import { IsString, IsNotEmpty, IsOptional } from "class-validator"

export class CreateCenterDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  code: string

  @IsString()
  @IsOptional()
  address?: string

  @IsString()
  @IsOptional()
  city?: string

  @IsString()
  @IsOptional()
  phone?: string
}
