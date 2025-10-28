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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentsService = void 0;
const common_1 = require("@nestjs/common");
let DepartmentsService = class DepartmentsService {
    constructor(departmentsRepository) {
        this.departmentsRepository = departmentsRepository;
    }
    async create(createDepartmentDto) {
        try {
            const department = this.departmentsRepository.create(createDepartmentDto);
            return await this.departmentsRepository.save(department);
        }
        catch (error) {
            return null;
        }
    }
    async findAll() {
        try {
            const departments = await this.departmentsRepository.find();
            return departments || [];
        }
        catch (error) {
            return [];
        }
    }
    async findOne(id) {
        try {
            const department = await this.departmentsRepository.findOne({
                where: { id },
            });
            return department || null;
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
            return await this.departmentsRepository.save(department);
        }
        catch (error) {
            return null;
        }
    }
    async remove(id) {
        try {
            const department = await this.findOne(id);
            if (department) {
                await this.departmentsRepository.remove(department);
            }
        }
        catch (error) {
        }
    }
};
exports.DepartmentsService = DepartmentsService;
exports.DepartmentsService = DepartmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Function])
], DepartmentsService);
//# sourceMappingURL=departments.service.js.map