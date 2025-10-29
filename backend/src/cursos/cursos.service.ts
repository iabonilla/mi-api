import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Curso } from './entities/curso.entity';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@Injectable()
export class CursosService {
  constructor(
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
  ) {}

  async create(createCursoDto: CreateCursoDto): Promise<Curso> {
    const curso = this.cursoRepository.create({
      ...createCursoDto,
      creado_en: new Date(),
      actualizado_en: new Date()
    });
    return await this.cursoRepository.save(curso);
  }

  async findAll(): Promise<Curso[]> {
    return await this.cursoRepository.find({
      relations: [
        'tipoOferta',
        'tipoCurso', 
        'carrera',
        'departamento',
        'centro',
        'turno'
      ]
    });
  }

  async findOne(id: number): Promise<Curso> {
    const curso = await this.cursoRepository.findOne({
      where: { id },
      relations: [
        'tipoOferta',
        'tipoCurso',
        'carrera',
        'departamento',
        'centro',
        'turno'
      ]
    });
    if (!curso) {
      throw new NotFoundException(`Curso con ID ${id} no encontrado`);
    }
    return curso;
  }

  async update(id: number, updateCursoDto: UpdateCursoDto): Promise<Curso> {
    const curso = await this.findOne(id);
    if (!curso) {
      throw new NotFoundException(`Curso con ID ${id} no encontrado`);
    }
    
    await this.cursoRepository.update(id, {
      ...updateCursoDto,
      actualizado_en: new Date()
    });
    
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.cursoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Curso con ID ${id} no encontrado`);
    }
  }
}