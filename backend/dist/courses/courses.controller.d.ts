import type { CoursesService } from "./courses.service";
import type { CreateCourseDto } from "./dto/create-course.dto";
import type { UpdateCourseDto } from "./dto/update-course.dto";
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    create(createCourseDto: CreateCourseDto): Promise<import("./entities/course.entity").Course>;
    findAll(departmentId?: string, centerId?: string, turnId?: string, modality?: 'presencial' | 'virtual', status?: 'active' | 'inactive' | 'full', search?: string): Promise<import("./entities/course.entity").Course[]>;
    findOne(id: string): Promise<import("./entities/course.entity").Course>;
    update(id: string, updateCourseDto: UpdateCourseDto): Promise<import("./entities/course.entity").Course>;
    remove(id: string): Promise<void>;
}
