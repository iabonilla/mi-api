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
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let CoursesService = class CoursesService {
    constructor(coursesRepository) {
        this.coursesRepository = coursesRepository;
    }
    async create(createCourseDto) {
        try {
            const course = this.coursesRepository.create(createCourseDto);
            return await this.coursesRepository.save(course);
        }
        catch (error) {
            return null;
        }
    }
    async findAll(filters) {
        try {
            const where = {};
            if (filters?.departmentId)
                where.departmentId = filters.departmentId;
            if (filters?.centerId)
                where.centerId = filters.centerId;
            if (filters?.turnId)
                where.turnId = filters.turnId;
            if (filters?.modality)
                where.modality = filters.modality;
            if (filters?.status)
                where.status = filters.status;
            if (filters?.search) {
                where.name = (0, typeorm_1.Like)(`%${filters.search}%`);
            }
            const courses = await this.coursesRepository.find({
                where,
                relations: ["department", "center", "turn"],
            });
            return courses || [];
        }
        catch (error) {
            return [];
        }
    }
    async findOne(id) {
        try {
            const course = await this.coursesRepository.findOne({
                where: { id },
                relations: ["department", "center", "turn"],
            });
            return course || null;
        }
        catch (error) {
            return null;
        }
    }
    async update(id, updateCourseDto) {
        try {
            const course = await this.findOne(id);
            if (!course)
                return null;
            Object.assign(course, updateCourseDto);
            return await this.coursesRepository.save(course);
        }
        catch (error) {
            return null;
        }
    }
    async remove(id) {
        try {
            const course = await this.findOne(id);
            if (course) {
                await this.coursesRepository.remove(course);
            }
        }
        catch (error) {
        }
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Function])
], CoursesService);
//# sourceMappingURL=courses.service.js.map