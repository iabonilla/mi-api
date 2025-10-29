import { Repository } from 'typeorm';
import { Curso } from './entities/curso.entity';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
export declare class CursosService {
    private readonly cursoRepository;
    constructor(cursoRepository: Repository<Curso>);
    create(createCursoDto: CreateCursoDto): Promise<Curso>;
    findAll(): Promise<Curso[]>;
    findOne(id: number): Promise<Curso>;
    update(id: number, updateCursoDto: UpdateCursoDto): Promise<Curso>;
    remove(id: number): Promise<void>;
}
