"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const department_entity_1 = require("./entities/department.entity");
let DepartmentsService = class DepartmentsService {
    constructor(departmentRepository) {
        this.departmentRepository = departmentRepository;
    }
    async create(createDepartmentDto) {
        try {
            const department = this.departmentRepository.create(createDepartmentDto);
            return await this.departmentRepository.save(department);
        }
        catch (error) {
            return null;
        }
    }
    async findAll() {
        try {
            return await this.departmentRepository.find({ where: { estado: 1 } });
        }
        catch (error) {
            return [];
        }
    }
    async findOne(id) {
        try {
            return await this.departmentRepository.findOne({ where: { id, estado: 1 } });
        }
        catch (error) {
            return null;
        }
    }
    async update(id, updateDepartmentDto) {
        try {
            const department = await this.findOne(id);
            if (!department)
                return null;
            Object.assign(department, updateDepartmentDto);
            return await this.departmentRepository.save(department);
        }
        catch (error) {
            return null;
        }
    }
    async remove(id) {
        try {
            const department = await this.findOne(id);
            if (department) {
                department.estado = 0;
                await this.departmentRepository.save(department);
            }
        }
        catch (error) {
        }
    }
};
exports.DepartmentsService = DepartmentsService;
exports.DepartmentsService = DepartmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DepartmentsService);
//# sourceMappingURL=departments.service.js.map