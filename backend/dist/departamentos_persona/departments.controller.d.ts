import { DepartmentsService } from "./departments.service";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { UpdateDepartmentDto } from "./dto/update-department.dto";
export declare class DepartmentsController {
    private readonly departmentsService;
    constructor(departmentsService: DepartmentsService);
    create(createDepartmentDto: CreateDepartmentDto): Promise<import("./entities/department.entity").Department>;
    findAll(): Promise<import("./entities/department.entity").Department[]>;
    findOne(id: number): Promise<import("./entities/department.entity").Department>;
    update(id: number, updateDepartmentDto: UpdateDepartmentDto): Promise<import("./entities/department.entity").Department>;
    remove(id: number): Promise<void>;
}
