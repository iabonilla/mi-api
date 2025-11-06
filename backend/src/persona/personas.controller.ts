// controllers/personas.controller.ts (MODIFICADO)
import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Patch,
  Delete, 
  Body, 
  Param, 
  Query, 
  ParseIntPipe,
  HttpCode,
  HttpStatus 
} from '@nestjs/common';
import { PersonasService } from '../persona/personas.service';
import { CreatePersonaDto } from '../persona/dto/create-persona.dto';
import { UpdatePersonaDto } from '../persona/dto/update-persona.dto';
import { Persona } from '../persona/entities/persona.entity';

@Controller('personas')
export class PersonasController {
  constructor(private readonly personasService: PersonasService) {}

  // UPSERT: Crear o actualizar persona por codigo_persona O numero_cedula
  @Post('upsert')
  async upsert(@Body() createPersonaDto: CreatePersonaDto): Promise<Persona> {
    return await this.personasService.upsert(createPersonaDto);
  }

  // CREATE: Crear nueva persona
  @Post()
  async create(@Body() createPersonaDto: CreatePersonaDto): Promise<Persona> {
    return await this.personasService.create(createPersonaDto);
  }

  // GET ALL: Obtener todas las personas activas
  @Get()
  async findAll(): Promise<Persona[]> {
    return await this.personasService.findAll();
  }

  // GET BY ID: Obtener persona por ID
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Persona> {
    return await this.personasService.findOne(id);
  }

  // GET BY CODIGO_PERSONA: Obtener persona por código
  @Get('codigo/:codigo')
  async findByCodigo(@Param('codigo') codigo: string): Promise<Persona> {
    return await this.personasService.findByCodigo(codigo);
  }

  // GET BY CEDULA: Obtener persona por cédula
  @Get('cedula/:cedula')
  async findByCedula(@Param('cedula') cedula: string): Promise<Persona> {
    return await this.personasService.findByCedula(cedula);
  }

  // GET BY EMAIL: Obtener persona por email
  @Get('email/:email')
  async findByEmail(@Param('email') email: string): Promise<Persona> {
    return await this.personasService.findByEmail(email);
  }

  // GET WITH FILTERS: Búsqueda con filtros
  @Get('buscar/filtros')
  async findWithFilters(@Query() filters: any): Promise<Persona[]> {
    return await this.personasService.findWithFilters(filters);
  }

  // UPDATE: Actualizar persona
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePersonaDto: UpdatePersonaDto,
  ): Promise<Persona> {
    return await this.personasService.update(id, updatePersonaDto);
  }

  // PATCH: Actualización parcial
  @Patch(':id')
  async patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePersonaDto: UpdatePersonaDto,
  ): Promise<Persona> {
    return await this.personasService.update(id, updatePersonaDto);
  }

  // DELETE: Borrado lógico
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.personasService.remove(id);
  }
}