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
exports.TipoCursosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tipo_curso_entity_1 = require("./entities/tipo-curso.entity");
let TipoCursosService = class TipoCursosService {
    constructor(tipoCursoRepository) {
        this.tipoCursoRepository = tipoCursoRepository;
    }
    async create(createTipoCursoDto) {
        const tipoCurso = this.tipoCursoRepository.create(createTipoCursoDto);
        return await this.tipoCursoRepository.save(tipoCurso);
    }
    async findAll() {
        return await this.tipoCursoRepository.find();
    }
    async findOne(id) {
        const tipoCurso = await this.tipoCursoRepository.findOne({ where: { id } });
        if (!tipoCurso) {
            throw new common_1.NotFoundException(`TipoCurso con ID ${id} no encontrado`);
        }
        return tipoCurso;
    }
    async update(id, updateTipoCursoDto) {
        await this.tipoCursoRepository.update(id, updateTipoCursoDto);
        const tipoCurso = await this.findOne(id);
        if (!tipoCurso) {
            throw new common_1.NotFoundException(`TipoCurso con ID ${id} no encontrado`);
        }
        return tipoCurso;
    }
    async remove(id) {
        const result = await this.tipoCursoRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`TipoCurso con ID ${id} no encontrado`);
        }
    }
};
exports.TipoCursosService = TipoCursosService;
exports.TipoCursosService = TipoCursosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tipo_curso_entity_1.TipoCurso)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TipoCursosService);
//# sourceMappingURL=tipo-cursos.service.js.map