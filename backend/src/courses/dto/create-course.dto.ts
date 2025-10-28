import { IsString, IsNotEmpty, IsOptional, IsEnum, IsNumber, IsDateString, Min } from "class-validator"

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  code: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsNotEmpty()
  departmentId: string

  @IsString()
  @IsNotEmpty()
  centerId: string

  @IsString()
  @IsNotEmpty()
  turnId: string

  @IsEnum(["presencial", "virtual"])
  modality: "presencial" | "virtual"

  @IsNumber()
  @Min(1)
  capacity: number

  @IsDateString()
  startDate: string

  @IsDateString()
  endDate: string

  @IsString()
  @IsOptional()
  schedule?: string

  @IsString()
  @IsOptional()
  teacher?: string
}
