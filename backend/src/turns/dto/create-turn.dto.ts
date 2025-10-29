import { IsString, IsNotEmpty, Matches } from "class-validator";

export class CreateTurnDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, {
    message: 'hora_inicio debe tener formato HH:mm o HH:mm:ss',
  })
  hora_inicio: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, {
    message: 'hora_fin debe tener formato HH:mm o HH:mm:ss',
  })
  hora_fin: string;

  estado: number;
}