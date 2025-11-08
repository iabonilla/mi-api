// backend/src/municipio/municipio.controller.ts
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MunicipioService } from './municipio.service';
import { Municipio } from './entities/municipio.entity';

@Controller('municipios_persona')
export class MunicipioController {
  constructor(private readonly municipioService: MunicipioService) {}

  @Get()
  async findAll(): Promise<Municipio[]> {
    return this.municipioService.findAll();
  }

  @Get('departamento/:departamentoId')
  async findByDepartamento(
    @Param('departamentoId', ParseIntPipe) departamentoId: number,
  ): Promise<Municipio[]> {
    return this.municipioService.findByDepartamento(departamentoId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Municipio> {
    return this.municipioService.findOne(id);
  }
}