import { Repository } from 'typeorm';
import { MatriculaCurso } from './entities/matricula-curso.entity';
import { CreateMatriculaCursoDto } from './dto/create-matricula-curso.dto';
import { UpdateMatriculaCursoDto } from './dto/update-matricula-curso.dto';
export declare class MatriculasCursosService {
    private matriculaCursoRepository;
    constructor(matriculaCursoRepository: Repository<MatriculaCurso>);
    create(createMatriculaCursoDto: CreateMatriculaCursoDto): Promise<MatriculaCurso>;
    findAll(): Promise<MatriculaCurso[]>;
    findOne(id: number): Promise<MatriculaCurso>;
    findByPersona(personaId: number): Promise<MatriculaCurso[]>;
    findByCurso(cursoId: number): Promise<MatriculaCurso[]>;
    update(id: number, updateMatriculaCursoDto: UpdateMatriculaCursoDto): Promise<MatriculaCurso>;
    remove(id: number): Promise<void>;
}
