// backend/src/matriculas/matriculas-cursos.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { MatriculasCursosService } from './matriculas-cursos.service';
import { CreateMatriculaCursoDto } from './dto/create-matricula-curso.dto';
import { UpdateMatriculaCursoDto } from './dto/update-matricula-curso.dto';
import { MatriculaCurso } from './entities/matricula-curso.entity';

@Controller('matriculas')
export class MatriculasCursosController {
  constructor(private readonly matriculasCursosService: MatriculasCursosService) {}

  @Post()
  async create(@Body() createMatriculaCursoDto: CreateMatriculaCursoDto): Promise<MatriculaCurso> {
    return this.matriculasCursosService.create(createMatriculaCursoDto);
  }

  @Get()
  async findAll(): Promise<MatriculaCurso[]> {
    return this.matriculasCursosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<MatriculaCurso> {
    return this.matriculasCursosService.findOne(id);
  }

  @Get('persona/:personaId')
  async findByPersona(@Param('personaId', ParseIntPipe) personaId: number): Promise<MatriculaCurso[]> {
    return this.matriculasCursosService.findByPersona(personaId);
  }

  @Get('curso/:cursoId')
  async findByCurso(@Param('cursoId', ParseIntPipe) cursoId: number): Promise<MatriculaCurso[]> {
    return this.matriculasCursosService.findByCurso(cursoId);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMatriculaCursoDto: UpdateMatriculaCursoDto,
  ): Promise<MatriculaCurso> {
    return this.matriculasCursosService.update(id, updateMatriculaCursoDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.matriculasCursosService.remove(id);
  }
}