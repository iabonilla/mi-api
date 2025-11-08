import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
export declare class DepartmentsService {
    private readonly departmentRepository;
    constructor(departmentRepository: Repository<Department>);
    create(createDepartmentDto: CreateDepartmentDto): Promise<Department | null>;
    findAll(): Promise<Department[]>;
    findOne(id: number): Promise<Department | null>;
    update(id: number, updateDepartmentDto: UpdateDepartmentDto): Promise<Department | null>;
    remove(id: number): Promise<void>;
}
