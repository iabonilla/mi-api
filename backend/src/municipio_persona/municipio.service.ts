// backend/src/municipio/municipio.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Municipio } from './entities/municipio.entity';

@Injectable()
export class MunicipioService {
  constructor(
    @InjectRepository(Municipio)
    private municipioRepository: Repository<Municipio>,
  ) {}

  async findAll(): Promise<Municipio[]> {
    return this.municipioRepository.find({
      where: { Estado: 1 },
      order: { Nombre: 'ASC' },
    });
  }

  async findByDepartamento(departamentoId: number): Promise<Municipio[]> {
    const municipios = await this.municipioRepository.find({
      where: { 
        Id_departamento: departamentoId,
        Estado: 1 
      },
      order: { Nombre: 'ASC' },
    });

    if (!municipios || municipios.length === 0) {
      throw new NotFoundException(
        `No se encontraron municipios para el departamento con ID ${departamentoId}`,
      );
    }

    return municipios;
  }

  async findOne(id: number): Promise<Municipio> {
    const municipio = await this.municipioRepository.findOne({
      where: { Id: id, Estado: 1 },
    });

    if (!municipio) {
      throw new NotFoundException(`Municipio con ID ${id} no encontrado`);
    }

    return municipio;
  }
}