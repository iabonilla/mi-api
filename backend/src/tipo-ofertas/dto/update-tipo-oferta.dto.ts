import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoOfertaDto } from './create-tipo-oferta.dto';

export class UpdateTipoOfertaDto extends PartialType(CreateTipoOfertaDto) {}