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
exports.MatriculasCursosController = void 0;
const common_1 = require("@nestjs/common");
const matriculas_cursos_service_1 = require("./matriculas-cursos.service");
const create_matricula_curso_dto_1 = require("./dto/create-matricula-curso.dto");
const update_matricula_curso_dto_1 = require("./dto/update-matricula-curso.dto");
let MatriculasCursosController = class MatriculasCursosController {
    constructor(matriculasCursosService) {
        this.matriculasCursosService = matriculasCursosService;
    }
    async create(createMatriculaCursoDto) {
        return this.matriculasCursosService.create(createMatriculaCursoDto);
    }
    async findAll() {
        return this.matriculasCursosService.findAll();
    }
    async findOne(id) {
        return this.matriculasCursosService.findOne(id);
    }
    async findByPersona(personaId) {
        return this.matriculasCursosService.findByPersona(personaId);
    }
    async findByCurso(cursoId) {
        return this.matriculasCursosService.findByCurso(cursoId);
    }
    async update(id, updateMatriculaCursoDto) {
        return this.matriculasCursosService.update(id, updateMatriculaCursoDto);
    }
    async remove(id) {
        return this.matriculasCursosService.remove(id);
    }
};
exports.MatriculasCursosController = MatriculasCursosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_matricula_curso_dto_1.CreateMatriculaCursoDto]),
    __metadata("design:returntype", Promise)
], MatriculasCursosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MatriculasCursosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MatriculasCursosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('persona/:personaId'),
    __param(0, (0, common_1.Param)('personaId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MatriculasCursosController.prototype, "findByPersona", null);
__decorate([
    (0, common_1.Get)('curso/:cursoId'),
    __param(0, (0, common_1.Param)('cursoId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MatriculasCursosController.prototype, "findByCurso", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_matricula_curso_dto_1.UpdateMatriculaCursoDto]),
    __metadata("design:returntype", Promise)
], MatriculasCursosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MatriculasCursosController.prototype, "remove", null);
exports.MatriculasCursosController = MatriculasCursosController = __decorate([
    (0, common_1.Controller)('matriculas'),
    __metadata("design:paramtypes", [matriculas_cursos_service_1.MatriculasCursosService])
], MatriculasCursosController);
//# sourceMappingURL=matriculas-cursos.controller.js.map