import type { DepartmentsService } from "./departments.service";
import type { CreateDepartmentDto } from "./dto/create-department.dto";
import type { UpdateDepartmentDto } from "./dto/update-department.dto";
export declare class DepartmentsController {
    private readonly departmentsService;
    constructor(departmentsService: DepartmentsService);
    create(createDepartmentDto: CreateDepartmentDto): Promise<import("./entities/department.entity").Department>;
    findAll(): Promise<import("./entities/department.entity").Department[]>;
    findOne(id: string): Promise<import("./entities/department.entity").Department>;
    update(id: string, updateDepartmentDto: UpdateDepartmentDto): Promise<import("./entities/department.entity").Department>;
    remove(id: string): Promise<void>;
}
