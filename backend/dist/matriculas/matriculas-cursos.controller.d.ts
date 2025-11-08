import { MatriculasCursosService } from './matriculas-cursos.service';
import { CreateMatriculaCursoDto } from './dto/create-matricula-curso.dto';
import { UpdateMatriculaCursoDto } from './dto/update-matricula-curso.dto';
import { MatriculaCurso } from './entities/matricula-curso.entity';
export declare class MatriculasCursosController {
    private readonly matriculasCursosService;
    constructor(matriculasCursosService: MatriculasCursosService);
    create(createMatriculaCursoDto: CreateMatriculaCursoDto): Promise<MatriculaCurso>;
    findAll(): Promise<MatriculaCurso[]>;
    findOne(id: number): Promise<MatriculaCurso>;
    findByPersona(personaId: number): Promise<MatriculaCurso[]>;
    findByCurso(cursoId: number): Promise<MatriculaCurso[]>;
    update(id: number, updateMatriculaCursoDto: UpdateMatriculaCursoDto): Promise<MatriculaCurso>;
    remove(id: number): Promise<void>;
}
