import { TipoCursosService } from './tipo-cursos.service';
import { CreateTipoCursoDto } from './dto/create-tipo-curso.dto';
import { UpdateTipoCursoDto } from './dto/update-tipo-curso.dto';
export declare class TipoCursosController {
    private readonly tipoCursosService;
    constructor(tipoCursosService: TipoCursosService);
    create(createTipoCursoDto: CreateTipoCursoDto): Promise<import("./entities/tipo-curso.entity").TipoCurso>;
    findAll(): Promise<import("./entities/tipo-curso.entity").TipoCurso[]>;
    findOne(id: string): Promise<import("./entities/tipo-curso.entity").TipoCurso>;
    update(id: string, updateTipoCursoDto: UpdateTipoCursoDto): Promise<import("./entities/tipo-curso.entity").TipoCurso>;
    remove(id: string): Promise<void>;
}
