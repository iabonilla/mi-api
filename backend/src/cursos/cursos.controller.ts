import { Controller, Get, Query, Param } from "@nestjs/common";
import { CursosService } from "./cursos.service";
import { CourseFiltersDto } from "./dto/course-filters.dto";

@Controller("cursos")
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  
  @Get()
  findAll(@Query() filters: CourseFiltersDto) {
    return this.cursosService.findAll(filters);
  }
  

 @Get('filtrado')
  findAllcursos(@Query() filters: CourseFiltersDto) {
    return this.cursosService.findAllcursos(filters);
  }

  @Get('disponibles')
  findAvailable() {
    return this.cursosService.getCursosDisponibles();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cursosService.findOne(id);
  }




}