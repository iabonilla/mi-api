// services/personas.service.ts (MODIFICADO)
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Persona } from '../persona/entities/persona.entity';
import { CreatePersonaDto } from '../persona/dto/create-persona.dto';
import { UpdatePersonaDto } from '../persona/dto/update-persona.dto';

@Injectable()
export class PersonasService {
  constructor(
    @InjectRepository(Persona)
    private personasRepository: Repository<Persona>,
  ) {}

  // UPSERT MODIFICADO: Buscar por codigo_persona O numero_cedula
  async upsert(createPersonaDto: CreatePersonaDto): Promise<Persona> {
    const { codigo_persona, numero_cedula } = createPersonaDto;

    if (!codigo_persona && !numero_cedula) {
      throw new ConflictException('Se requiere código de persona o cédula para UPSERT');
    }

    // Buscar persona existente por codigo_persona O numero_cedula
    const existingPerson = await this.personasRepository.findOne({
      where: [
        { codigo_persona, estado: true },
        { numero_cedula, estado: true }
      ]
    });

    if (existingPerson) {
      console.log('🔄 Persona encontrada, actualizando...', { 
        id: existingPerson.id,
        codigo_persona: existingPerson.codigo_persona,
        cedula: existingPerson.numero_cedula
      });
      
      // Actualizar persona existente (mantener el ID original)
      return await this.update(existingPerson.id, createPersonaDto);
    }

    console.log('➕ Persona no encontrada, creando nueva...');
    // Crear nueva persona
    return await this.create(createPersonaDto);
  }

  // CREATE MODIFICADO: Validar unicidad de codigo_persona y numero_cedula
  async create(createPersonaDto: CreatePersonaDto): Promise<Persona> {
    const { codigo_persona, numero_cedula, email } = createPersonaDto;

    // Verificar si ya existe una persona activa con el mismo codigo_persona, cedula o email
    const existingPerson = await this.personasRepository.findOne({
      where: [
        { codigo_persona, estado: true },
        { numero_cedula, estado: true },
        { email, estado: true }
      ]
    });

    if (existingPerson) {
      const conflictField = 
        existingPerson.codigo_persona === codigo_persona ? 'código de persona' :
        existingPerson.numero_cedula === numero_cedula ? 'cédula' : 'email';
      
      throw new ConflictException(`Ya existe una persona con este ${conflictField}`);
    }

    const persona = this.personasRepository.create(createPersonaDto);
    
    // Si no viene codigo_persona, generar uno automáticamente
    if (!persona.codigo_persona) {
      persona.codigo_persona = this.generatePersonCode();
    }
    
    return await this.personasRepository.save(persona);
  }

  // GENERAR CÓDIGO DE PERSONA (método auxiliar)
  private generatePersonCode(): string {
    const random = Math.random().toString(36).substring(2, 10).toUpperCase();
    return `PER-${random}`;
  }

  // FIND ALL: Obtener todas las personas activas
  async findAll(): Promise<Persona[]> {
    return await this.personasRepository.find({
      where: { estado: true },
      order: { creado_en: 'DESC' }
    });
  }

  // FIND BY ID: Obtener persona por ID
  async findOne(id: number): Promise<Persona> {
    const persona = await this.personasRepository.findOne({
      where: { id, estado: true }
    });

    if (!persona) {
      throw new NotFoundException(`Persona con ID ${id} no encontrada`);
    }

    return persona;
  }

  // FIND BY CODIGO_PERSONA: Obtener persona por código
  async findByCodigo(codigo_persona: string): Promise<Persona> {
    const persona = await this.personasRepository.findOne({
      where: { codigo_persona, estado: true }
    });

    if (!persona) {
      throw new NotFoundException(`Persona con código ${codigo_persona} no encontrada`);
    }

    return persona;
  }

  // FIND BY CEDULA: Obtener persona por cédula
  async findByCedula(cedula: string): Promise<Persona> {
    const persona = await this.personasRepository.findOne({
      where: { numero_cedula: cedula, estado: true }
    });

    if (!persona) {
      throw new NotFoundException(`Persona con cédula ${cedula} no encontrada`);
    }

    return persona;
  }

  // FIND BY EMAIL: Obtener persona por email
  async findByEmail(email: string): Promise<Persona> {
    const persona = await this.personasRepository.findOne({
      where: { email, estado: true }
    });

    if (!persona) {
      throw new NotFoundException(`Persona con email ${email} no encontrada`);
    }

    return persona;
  }

  // UPDATE: Actualizar persona
  async update(id: number, updatePersonaDto: UpdatePersonaDto): Promise<Persona> {
    const persona = await this.findOne(id);
    
    // No permitir cambiar codigo_persona y numero_cedula en actualización
    if (updatePersonaDto.codigo_persona && updatePersonaDto.codigo_persona !== persona.codigo_persona) {
      throw new ConflictException('No se puede modificar el código de persona');
    }
    
    if (updatePersonaDto.numero_cedula && updatePersonaDto.numero_cedula !== persona.numero_cedula) {
      throw new ConflictException('No se puede modificar la cédula');
    }
    
    Object.assign(persona, updatePersonaDto);
    return await this.personasRepository.save(persona);
  }

  // FIND WITH FILTERS: Búsqueda con filtros
  async findWithFilters(filters: any): Promise<Persona[]> {
    const query = this.personasRepository.createQueryBuilder('persona')
      .where('persona.estado = :estado', { estado: true });

    if (filters.codigo_persona) {
      query.andWhere('persona.codigo_persona = :codigo_persona', { codigo_persona: filters.codigo_persona });
    }

    if (filters.numero_cedula) {
      query.andWhere('persona.numero_cedula = :numero_cedula', { numero_cedula: filters.numero_cedula });
    }

    if (filters.nombres) {
      query.andWhere('persona.nombres LIKE :nombres', { nombres: `%${filters.nombres}%` });
    }

    if (filters.apellidos) {
      query.andWhere('persona.apellidos LIKE :apellidos', { apellidos: `%${filters.apellidos}%` });
    }

    if (filters.email) {
      query.andWhere('persona.email = :email', { email: filters.email });
    }

    return await query.getMany();
  }

  // SOFT DELETE: Borrado lógico
  async remove(id: number): Promise<void> {
    const persona = await this.findOne(id);
    persona.estado = false;
    await this.personasRepository.save(persona);
  }
}