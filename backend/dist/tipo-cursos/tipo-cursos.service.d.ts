import { Repository } from 'typeorm';
import { TipoCurso } from './entities/tipo-curso.entity';
import { CreateTipoCursoDto } from './dto/create-tipo-curso.dto';
import { UpdateTipoCursoDto } from './dto/update-tipo-curso.dto';
export declare class TipoCursosService {
    private readonly tipoCursoRepository;
    constructor(tipoCursoRepository: Repository<TipoCurso>);
    create(createTipoCursoDto: CreateTipoCursoDto): Promise<TipoCurso>;
    findAll(): Promise<TipoCurso[]>;
    findOne(id: number): Promise<TipoCurso>;
    update(id: number, updateTipoCursoDto: UpdateTipoCursoDto): Promise<TipoCurso>;
    remove(id: number): Promise<void>;
}
