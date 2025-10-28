import { type Repository } from "typeorm";
import type { Course } from "./entities/course.entity";
import type { CreateCourseDto } from "./dto/create-course.dto";
import type { UpdateCourseDto } from "./dto/update-course.dto";
export declare class CoursesService {
    private readonly coursesRepository;
    constructor(coursesRepository: Repository<Course>);
    create(createCourseDto: CreateCourseDto): Promise<Course | null>;
    findAll(filters?: {
        departmentId?: string;
        centerId?: string;
        turnId?: string;
        modality?: "presencial" | "virtual";
        status?: "active" | "inactive" | "full";
        search?: string;
    }): Promise<Course[]>;
    findOne(id: string): Promise<Course | null>;
    update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course | null>;
    remove(id: string): Promise<void>;
}
