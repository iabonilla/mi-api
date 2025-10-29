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
exports.Curso = void 0;
const typeorm_1 = require("typeorm");
const tipo_oferta_entity_1 = require("../../tipo-ofertas/entities/tipo-oferta.entity");
const tipo_curso_entity_1 = require("../../tipo-cursos/entities/tipo-curso.entity");
const carrera_entity_1 = require("../../carreras/entities/carrera.entity");
const department_entity_1 = require("../../departments/entities/department.entity");
const center_entity_1 = require("../../centers/entities/center.entity");
const turn_entity_1 = require("../../turns/entities/turn.entity");
let Curso = class Curso {
};
exports.Curso = Curso;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Curso.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 255 }),
    __metadata("design:type", String)
], Curso.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 50 }),
    __metadata("design:type", String)
], Curso.prototype, "codigo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', nullable: true }),
    __metadata("design:type", String)
], Curso.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Curso.prototype, "tipo_oferta_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Curso.prototype, "tipo_curso_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Curso.prototype, "carrera_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Curso.prototype, "departamento_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Curso.prototype, "centro_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Curso.prototype, "turno_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Curso.prototype, "capacidad", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Curso.prototype, "inscritos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Curso.prototype, "fecha_inicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Curso.prototype, "fecha_fin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 200, nullable: true }),
    __metadata("design:type", String)
], Curso.prototype, "horario", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Curso.prototype, "plataforma_virtual", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 500, nullable: true }),
    __metadata("design:type", String)
], Curso.prototype, "enlace_virtual", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bit' }),
    __metadata("design:type", Boolean)
], Curso.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime2', nullable: true }),
    __metadata("design:type", Date)
], Curso.prototype, "creado_en", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime2', nullable: true }),
    __metadata("design:type", Date)
], Curso.prototype, "actualizado_en", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tipo_oferta_entity_1.TipoOferta),
    (0, typeorm_1.JoinColumn)({ name: 'tipo_oferta_id' }),
    __metadata("design:type", tipo_oferta_entity_1.TipoOferta)
], Curso.prototype, "tipoOferta", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tipo_curso_entity_1.TipoCurso),
    (0, typeorm_1.JoinColumn)({ name: 'tipo_curso_id' }),
    __metadata("design:type", tipo_curso_entity_1.TipoCurso)
], Curso.prototype, "tipoCurso", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => carrera_entity_1.Carrera),
    (0, typeorm_1.JoinColumn)({ name: 'carrera_id' }),
    __metadata("design:type", carrera_entity_1.Carrera)
], Curso.prototype, "carrera", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'departamento_id' }),
    __metadata("design:type", department_entity_1.Department)
], Curso.prototype, "departamento", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => center_entity_1.Center, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'centro_id' }),
    __metadata("design:type", center_entity_1.Center)
], Curso.prototype, "centro", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => turn_entity_1.Turn, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'turno_id' }),
    __metadata("design:type", turn_entity_1.Turn)
], Curso.prototype, "turno", void 0);
exports.Curso = Curso = __decorate([
    (0, typeorm_1.Entity)('academia.cursos')
], Curso);
//# sourceMappingURL=curso.entity.js.map