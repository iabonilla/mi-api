import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoOferta } from './entities/tipo-oferta.entity';
import { CreateTipoOfertaDto } from './dto/create-tipo-oferta.dto';
import { UpdateTipoOfertaDto } from './dto/update-tipo-oferta.dto';

@Injectable()
export class TipoOfertasService {
  constructor(
    @InjectRepository(TipoOferta)
    private readonly tipoOfertaRepository: Repository<TipoOferta>,
  ) {}

  async create(createTipoOfertaDto: CreateTipoOfertaDto): Promise<TipoOferta> {
    const tipoOferta = this.tipoOfertaRepository.create(createTipoOfertaDto);
    return await this.tipoOfertaRepository.save(tipoOferta);
  }

  async findAll(): Promise<TipoOferta[]> {
    return await this.tipoOfertaRepository.find();
  }

  async findOne(id: number): Promise<TipoOferta> {
    const tipoOferta = await this.tipoOfertaRepository.findOne({ where: { id } });
    if (!tipoOferta) {
      throw new NotFoundException(`TipoOferta con ID ${id} no encontrado`);
    }
    return tipoOferta;
  }

  async update(id: number, updateTipoOfertaDto: UpdateTipoOfertaDto): Promise<TipoOferta> {
    await this.tipoOfertaRepository.update(id, updateTipoOfertaDto);
    const tipoOferta = await this.findOne(id);
    if (!tipoOferta) {
      throw new NotFoundException(`TipoOferta con ID ${id} no encontrado`);
    }
    return tipoOferta;
  }

  async remove(id: number): Promise<void> {
    const result = await this.tipoOfertaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`TipoOferta con ID ${id} no encontrado`);
    }
  }
}