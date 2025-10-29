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
exports.CursosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const curso_entity_1 = require("./entities/curso.entity");
let CursosService = class CursosService {
    constructor(cursoRepository) {
        this.cursoRepository = cursoRepository;
    }
    async create(createCursoDto) {
        const curso = this.cursoRepository.create({
            ...createCursoDto,
            creado_en: new Date(),
            actualizado_en: new Date()
        });
        return await this.cursoRepository.save(curso);
    }
    async findAll() {
        return await this.cursoRepository.find({
            relations: [
                'tipoOferta',
                'tipoCurso',
                'carrera',
                'departamento',
                'centro',
                'turno'
            ]
        });
    }
    async findOne(id) {
        const curso = await this.cursoRepository.findOne({
            where: { id },
            relations: [
                'tipoOferta',
                'tipoCurso',
                'carrera',
                'departamento',
                'centro',
                'turno'
            ]
        });
        if (!curso) {
            throw new common_1.NotFoundException(`Curso con ID ${id} no encontrado`);
        }
        return curso;
    }
    async update(id, updateCursoDto) {
        const curso = await this.findOne(id);
        if (!curso) {
            throw new common_1.NotFoundException(`Curso con ID ${id} no encontrado`);
        }
        await this.cursoRepository.update(id, {
            ...updateCursoDto,
            actualizado_en: new Date()
        });
        return await this.findOne(id);
    }
    async remove(id) {
        const result = await this.cursoRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Curso con ID ${id} no encontrado`);
        }
    }
};
exports.CursosService = CursosService;
exports.CursosService = CursosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(curso_entity_1.Curso)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CursosService);
//# sourceMappingURL=cursos.service.js.map