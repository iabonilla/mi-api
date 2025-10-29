import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoCurso } from './entities/tipo-curso.entity';
import { CreateTipoCursoDto } from './dto/create-tipo-curso.dto';
import { UpdateTipoCursoDto } from './dto/update-tipo-curso.dto';

@Injectable()
export class TipoCursosService {
  constructor(
    @InjectRepository(TipoCurso)
    private readonly tipoCursoRepository: Repository<TipoCurso>,
  ) {}

  async create(createTipoCursoDto: CreateTipoCursoDto): Promise<TipoCurso> {
    const tipoCurso = this.tipoCursoRepository.create(createTipoCursoDto);
    return await this.tipoCursoRepository.save(tipoCurso);
  }

  async findAll(): Promise<TipoCurso[]> {
    return await this.tipoCursoRepository.find();
  }

  async findOne(id: number): Promise<TipoCurso> {
    const tipoCurso = await this.tipoCursoRepository.findOne({ where: { id } });
    if (!tipoCurso) {
      throw new NotFoundException(`TipoCurso con ID ${id} no encontrado`);
    }
    return tipoCurso;
  }

  async update(id: number, updateTipoCursoDto: UpdateTipoCursoDto): Promise<TipoCurso> {
    await this.tipoCursoRepository.update(id, updateTipoCursoDto);
    const tipoCurso = await this.findOne(id);
    if (!tipoCurso) {
      throw new NotFoundException(`TipoCurso con ID ${id} no encontrado`);
    }
    return tipoCurso;
  }

  async remove(id: number): Promise<void> {
    const result = await this.tipoCursoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`TipoCurso con ID ${id} no encontrado`);
    }
  }
}