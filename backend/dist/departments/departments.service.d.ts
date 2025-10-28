import type { Repository } from "typeorm";
import type { Department } from "./entities/department.entity";
import type { CreateDepartmentDto } from "./dto/create-department.dto";
import type { UpdateDepartmentDto } from "./dto/update-department.dto";
export declare class DepartmentsService {
    private readonly departmentsRepository;
    constructor(departmentsRepository: Repository<Department>);
    create(createDepartmentDto: CreateDepartmentDto): Promise<Department | null>;
    findAll(): Promise<Department[]>;
    findOne(id: string): Promise<Department | null>;
    update(id: string, updateDepartmentDto: UpdateDepartmentDto): Promise<Department | null>;
    remove(id: string): Promise<void>;
}
