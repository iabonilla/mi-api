import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoCursosService } from './tipo-cursos.service';
import { CreateTipoCursoDto } from './dto/create-tipo-curso.dto';
import { UpdateTipoCursoDto } from './dto/update-tipo-curso.dto';

@Controller('tipo-cursos')
export class TipoCursosController {
  constructor(private readonly tipoCursosService: TipoCursosService) {}

  @Post()
  create(@Body() createTipoCursoDto: CreateTipoCursoDto) {
    return this.tipoCursosService.create(createTipoCursoDto);
  }

  @Get()
  findAll() {
    return this.tipoCursosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoCursosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoCursoDto: UpdateTipoCursoDto) {
    return this.tipoCursosService.update(+id, updateTipoCursoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoCursosService.remove(+id);
  }
}