import { IsString, IsNotEmpty } from "class-validator"

export class CreateTurnDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  code: string

  @IsString()
  @IsNotEmpty()
  startTime: string

  @IsString()
  @IsNotEmpty()
  endTime: string
}
