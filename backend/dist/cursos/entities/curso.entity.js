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
const idioma_entity_1 = require("../../idiomas/entities/idioma.entity");
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
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Curso.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Curso.prototype, "codigo", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Curso.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tipo_oferta_id', nullable: true }),
    __metadata("design:type", Number)
], Curso.prototype, "tipoOfertaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'idioma_id', nullable: true }),
    __metadata("design:type", Number)
], Curso.prototype, "idiomaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'centro_id', nullable: true }),
    __metadata("design:type", Number)
], Curso.prototype, "centroId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'turno_id', nullable: true }),
    __metadata("design:type", Number)
], Curso.prototype, "turnoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Curso.prototype, "capacidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Curso.prototype, "inscritos", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Curso.prototype, "cupos", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_inicio', type: 'date', nullable: true }),
    __metadata("design:type", String)
], Curso.prototype, "fechaInicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_fin', type: 'date', nullable: true }),
    __metadata("design:type", String)
], Curso.prototype, "fechaFin", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Curso.prototype, "horario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'plataforma_virtual', nullable: true }),
    __metadata("design:type", String)
], Curso.prototype, "plataformaVirtual", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'enlace_virtual', nullable: true }),
    __metadata("design:type", String)
], Curso.prototype, "enlaceVirtual", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bit", default: 1 }),
    __metadata("design:type", Number)
], Curso.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'creado_en', type: 'datetime2', nullable: true }),
    __metadata("design:type", Date)
], Curso.prototype, "creadoEn", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'actualizado_en', type: 'datetime2', nullable: true }),
    __metadata("design:type", Date)
], Curso.prototype, "actualizadoEn", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tipo_oferta_entity_1.TipoOferta),
    (0, typeorm_1.JoinColumn)({ name: 'tipo_oferta_id' }),
    __metadata("design:type", tipo_oferta_entity_1.TipoOferta)
], Curso.prototype, "tipoOferta", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => idioma_entity_1.Idioma),
    (0, typeorm_1.JoinColumn)({ name: 'idioma_id' }),
    __metadata("design:type", idioma_entity_1.Idioma)
], Curso.prototype, "idioma", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => center_entity_1.Center),
    (0, typeorm_1.JoinColumn)({ name: 'centro_id' }),
    __metadata("design:type", center_entity_1.Center)
], Curso.prototype, "centro", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => turn_entity_1.Turn),
    (0, typeorm_1.JoinColumn)({ name: 'turno_id' }),
    __metadata("design:type", turn_entity_1.Turn)
], Curso.prototype, "turno", void 0);
exports.Curso = Curso = __decorate([
    (0, typeorm_1.Entity)({ name: 'cursos', schema: 'academia' })
], Curso);
//# sourceMappingURL=curso.entity.js.map