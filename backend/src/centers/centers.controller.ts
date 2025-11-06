import { Controller, Get, Post, Patch, Param, Delete, Body, Query } from "@nestjs/common"; // ← Agregar Query
import { CentersService } from "./centers.service";
import { CreateCenterDto } from "./dto/create-center.dto";
import { UpdateCenterDto } from "./dto/update-center.dto";
import { JerarquiaFiltersDto } from "./dto/jerarquia-filters.dto"; // ← Nuevo DTO

@Controller("centros")
export class CentersController {
  constructor(private readonly centersService: CentersService) {}

  @Post()
  create(@Body() createCenterDto: CreateCenterDto) {
    return this.centersService.create(createCenterDto);
  }

  @Get()
  findAll() {
    return this.centersService.findAll();
  }

  // ✅ NUEVO ENDPOINT - Jerarquía completa
  @Get("jerarquia")
  findJerarquia(@Query() filters: JerarquiaFiltersDto) {
    return this.centersService.findJerarquia(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.centersService.findOne(id);
  }

  @Patch(":id")
  update(@Param('id') id: number, @Body() updateCenterDto: UpdateCenterDto) {
    return this.centersService.update(id, updateCenterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.centersService.remove(id);
  }
}