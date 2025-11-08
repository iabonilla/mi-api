// backend/src/matriculas/matriculas-cursos.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MatriculaCurso } from './entities/matricula-curso.entity';
import { CreateMatriculaCursoDto } from './dto/create-matricula-curso.dto';
import { UpdateMatriculaCursoDto } from './dto/update-matricula-curso.dto';

@Injectable()
export class MatriculasCursosService {
  constructor(
    @InjectRepository(MatriculaCurso)
    private matriculaCursoRepository: Repository<MatriculaCurso>,
  ) {}

  async create(createMatriculaCursoDto: CreateMatriculaCursoDto): Promise<MatriculaCurso> {
    const matricula = this.matriculaCursoRepository.create({
      ...createMatriculaCursoDto,
      estado_matricula: createMatriculaCursoDto.estado_matricula || 'PENDIENTE',
      estado: createMatriculaCursoDto.estado ?? true,
    });

    return await this.matriculaCursoRepository.save(matricula);
  }

  async findAll(): Promise<MatriculaCurso[]> {
    return await this.matriculaCursoRepository.find({
      where: { estado: true },
      order: { fecha_matricula: 'DESC' },
    });
  }

  async findOne(id: number): Promise<MatriculaCurso> {
    const matricula = await this.matriculaCursoRepository.findOne({
      where: { id, estado: true },
    });

    if (!matricula) {
      throw new NotFoundException(`Matrícula con ID ${id} no encontrada`);
    }

    return matricula;
  }

  async findByPersona(personaId: number): Promise<MatriculaCurso[]> {
    return await this.matriculaCursoRepository.find({
      where: { persona_id: personaId, estado: true },
      order: { fecha_matricula: 'DESC' },
    });
  }

  async findByCurso(cursoId: number): Promise<MatriculaCurso[]> {
    return await this.matriculaCursoRepository.find({
      where: { curso_id: cursoId, estado: true },
      order: { fecha_matricula: 'DESC' },
    });
  }

  async update(id: number, updateMatriculaCursoDto: UpdateMatriculaCursoDto): Promise<MatriculaCurso> {
    const matricula = await this.findOne(id);
    
    Object.assign(matricula, {
      ...updateMatriculaCursoDto,
      actualizado_en: new Date(),
    });

    return await this.matriculaCursoRepository.save(matricula);
  }

  async remove(id: number): Promise<void> {
    const matricula = await this.findOne(id);
    matricula.estado = false;
    matricula.actualizado_en = new Date();
    
    await this.matriculaCursoRepository.save(matricula);
  }
}