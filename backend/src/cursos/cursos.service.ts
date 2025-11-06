import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Curso } from './entities/curso.entity';
import { CourseFiltersDto } from './dto/course-filters.dto';

@Injectable()
export class CursosService {
  constructor(
    @InjectRepository(Curso) 
    private readonly cursoRepository: Repository<Curso>
  ) {}



async findAll(filters?: CourseFiltersDto): Promise<Curso[]> {
    try {
      const query = this.cursoRepository
        .createQueryBuilder('curso')
        .leftJoinAndSelect('curso.tipoOferta', 'tipoOferta')
        .leftJoinAndSelect('curso.idioma', 'idioma')
        .leftJoinAndSelect('curso.centro', 'centro')
        .leftJoinAndSelect('curso.turno', 'turno')
        .where('curso.estado = 1');

      // Aplicar filtros
      if (filters?.tipo_oferta_id) {
        query.andWhere('curso.tipoOfertaId = :tipoOfertaId', { 
          tipoOfertaId: filters.tipo_oferta_id 
        });
      }

      if (filters?.idioma_id) {
        query.andWhere('curso.idiomaId = :idiomaId', { 
          idiomaId: filters.idioma_id 
        });
      }

      if (filters?.centro_id) {
        query.andWhere('curso.centroId = :centroId', { 
          centroId: filters.centro_id 
        });
      }

      if (filters?.turno_id) {
        query.andWhere('curso.turnoId = :turnoId', { 
          turnoId: filters.turno_id 
        });
      }

      // Solo cursos con fecha futura
      query.andWhere('curso.fechaInicio >= CAST(GETDATE() AS DATE)');

      return await query.orderBy('curso.fechaInicio', 'ASC').getMany();
    } catch (error) {
      console.error('Error fetching courses:', error);
      return [];
    }
  }



  async findOne(id: number): Promise<Curso | null> {
    try {
      return await this.cursoRepository.findOne({
        where: { id, estado: 1 },
        relations: ['tipoOferta', 'idioma', 'centro', 'turno']
      });
    } catch (error) {
      console.error('Error fetching course:', error);
      return null;
    }
  }

  async getCursosDisponibles(): Promise<Curso[]> {
    try {
      return await this.cursoRepository
        .createQueryBuilder('curso')
        .leftJoinAndSelect('curso.tipoOferta', 'tipoOferta')
        .leftJoinAndSelect('curso.idioma', 'idioma')
        .leftJoinAndSelect('curso.centro', 'centro')
        .leftJoinAndSelect('curso.turno', 'turno')
        .where('curso.estado = 1')
        .andWhere('curso.inscritos < curso.capacidad')
        .andWhere('curso.fechaInicio >= CAST(GETDATE() AS DATE)')
        .orderBy('curso.fechaInicio', 'ASC')
        .getMany();
    } catch (error) {
      console.error('Error fetching available courses:', error);
      return [];
    }
  }


 async findAllcursos(filters?: CourseFiltersDto): Promise<any[]> {
    const { tipo_oferta_id, idioma_id, centro_id, turno_id, estado = true } = filters || {};

    // Usar el stored procedure para filtrar
    const result = await this.cursoRepository.query(
      `EXEC [academia].[SP_FiltrarCursos] 
        @tipo_oferta_id = @0, 
        @idioma_id = @1, 
        @centro_id = @2, 
        @turno_id = @3, 
        @estado = @4`,
      [tipo_oferta_id, idioma_id, centro_id, turno_id, estado]
    );

    return result;
  }


// @Get('debug/all')
async debugAll() {
  try {
    // Query directa SIN filtros
    const cursos = await this.cursoRepository.find({
      where: { estado: 1 },
      relations: ['tipoOferta', 'idioma', 'centro', 'turno']
    });
    
    console.log('🔍 DEBUG - Total cursos en BD:', cursos.length);
    
    if (cursos.length > 0) {
      cursos.forEach((curso, index) => {
        console.log(`Curso ${index + 1}:`, {
          id: curso.id,
          nombre: curso.nombre,
          codigo: curso.codigo,
          fechaInicio: curso.fechaInicio,
          tipoOfertaId: curso.tipoOfertaId,
          tipoOferta: curso.tipoOferta,
          idiomaId: curso.idiomaId,
          idioma: curso.idioma
        });
      });
    }
    
    return {
      message: `Found ${cursos.length} courses`,
      data: cursos
    };
  } catch (error) {
    console.error('❌ DEBUG Error:', error);
    return {
      error: error.message,
      stack: error.stack
    };
  }
}




}