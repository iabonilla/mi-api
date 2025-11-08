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
exports.MatriculasCursosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const matricula_curso_entity_1 = require("./entities/matricula-curso.entity");
let MatriculasCursosService = class MatriculasCursosService {
    constructor(matriculaCursoRepository) {
        this.matriculaCursoRepository = matriculaCursoRepository;
    }
    async create(createMatriculaCursoDto) {
        const matricula = this.matriculaCursoRepository.create({
            ...createMatriculaCursoDto,
            estado_matricula: createMatriculaCursoDto.estado_matricula || 'PENDIENTE',
            estado: createMatriculaCursoDto.estado ?? true,
        });
        return await this.matriculaCursoRepository.save(matricula);
    }
    async findAll() {
        return await this.matriculaCursoRepository.find({
            where: { estado: true },
            order: { fecha_matricula: 'DESC' },
        });
    }
    async findOne(id) {
        const matricula = await this.matriculaCursoRepository.findOne({
            where: { id, estado: true },
        });
        if (!matricula) {
            throw new common_1.NotFoundException(`Matrícula con ID ${id} no encontrada`);
        }
        return matricula;
    }
    async findByPersona(personaId) {
        return await this.matriculaCursoRepository.find({
            where: { persona_id: personaId, estado: true },
            order: { fecha_matricula: 'DESC' },
        });
    }
    async findByCurso(cursoId) {
        return await this.matriculaCursoRepository.find({
            where: { curso_id: cursoId, estado: true },
            order: { fecha_matricula: 'DESC' },
        });
    }
    async update(id, updateMatriculaCursoDto) {
        const matricula = await this.findOne(id);
        Object.assign(matricula, {
            ...updateMatriculaCursoDto,
            actualizado_en: new Date(),
        });
        return await this.matriculaCursoRepository.save(matricula);
    }
    async remove(id) {
        const matricula = await this.findOne(id);
        matricula.estado = false;
        matricula.actualizado_en = new Date();
        await this.matriculaCursoRepository.save(matricula);
    }
};
exports.MatriculasCursosService = MatriculasCursosService;
exports.MatriculasCursosService = MatriculasCursosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(matricula_curso_entity_1.MatriculaCurso)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MatriculasCursosService);
//# sourceMappingURL=matriculas-cursos.service.js.map