import { Repository } from 'typeorm';
import { Curso } from './entities/curso.entity';
import { CourseFiltersDto } from './dto/course-filters.dto';
export declare class CursosService {
    private readonly cursoRepository;
    constructor(cursoRepository: Repository<Curso>);
    findAll(filters?: CourseFiltersDto): Promise<Curso[]>;
    findOne(id: number): Promise<Curso | null>;
    getCursosDisponibles(): Promise<Curso[]>;
    findAllcursos(filters?: CourseFiltersDto): Promise<any[]>;
    debugAll(): Promise<{
        message: string;
        data: Curso[];
        error?: undefined;
        stack?: undefined;
    } | {
        error: any;
        stack: any;
        message?: undefined;
        data?: undefined;
    }>;
}
