import { CursosService } from "./cursos.service";
import { CourseFiltersDto } from "./dto/course-filters.dto";
export declare class CursosController {
    private readonly cursosService;
    constructor(cursosService: CursosService);
    findAll(filters: CourseFiltersDto): Promise<import("./entities/curso.entity").Curso[]>;
    findAllcursos(filters: CourseFiltersDto): Promise<any[]>;
    findAvailable(): Promise<import("./entities/curso.entity").Curso[]>;
    findOne(id: number): Promise<import("./entities/curso.entity").Curso>;
}
