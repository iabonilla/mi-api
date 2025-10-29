import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoOfertasService } from './tipo-ofertas.service';
import { CreateTipoOfertaDto } from './dto/create-tipo-oferta.dto';
import { UpdateTipoOfertaDto } from './dto/update-tipo-oferta.dto';

@Controller('tipo-ofertas')
export class TipoOfertasController {
  constructor(private readonly tipoOfertasService: TipoOfertasService) {}

  @Post()
  create(@Body() createTipoOfertaDto: CreateTipoOfertaDto) {
    return this.tipoOfertasService.create(createTipoOfertaDto);
  }

  @Get()
  findAll() {
    return this.tipoOfertasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoOfertasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoOfertaDto: UpdateTipoOfertaDto) {
    return this.tipoOfertasService.update(+id, updateTipoOfertaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoOfertasService.remove(+id);
  }
}