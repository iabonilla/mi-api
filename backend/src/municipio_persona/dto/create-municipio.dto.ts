// backend/src/municipio/dto/create-municipio.dto.ts
export class CreateMunicipioDto {
  Id_departamento?: number;
  Codigo?: string;
  Nombre?: string;
  IdUsuario?: number;
  IdDominio?: number;
  Estado?: number;
}

export class UpdateMunicipioDto {
  Id_departamento?: number;
  Codigo?: string;
  Nombre?: string;
  Fecha_Modificacion?: Date;
  IdUsuario?: number;
  IdDominio?: number;
  Estado?: number;
}