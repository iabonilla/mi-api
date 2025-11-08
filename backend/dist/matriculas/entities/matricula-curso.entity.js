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
exports.MatriculaCurso = void 0;
const typeorm_1 = require("typeorm");
let MatriculaCurso = class MatriculaCurso {
};
exports.MatriculaCurso = MatriculaCurso;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MatriculaCurso.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'persona_id' }),
    __metadata("design:type", Number)
], MatriculaCurso.prototype, "persona_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'curso_id' }),
    __metadata("design:type", Number)
], MatriculaCurso.prototype, "curso_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 20 }),
    __metadata("design:type", String)
], MatriculaCurso.prototype, "cedula", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 100 }),
    __metadata("design:type", String)
], MatriculaCurso.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 100 }),
    __metadata("design:type", String)
], MatriculaCurso.prototype, "apellido", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 100 }),
    __metadata("design:type", String)
], MatriculaCurso.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 20 }),
    __metadata("design:type", String)
], MatriculaCurso.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'idioma_interes', type: 'nvarchar', length: 50 }),
    __metadata("design:type", String)
], MatriculaCurso.prototype, "idioma_interes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 500, nullable: true }),
    __metadata("design:type", String)
], MatriculaCurso.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'departamento_id' }),
    __metadata("design:type", Number)
], MatriculaCurso.prototype, "departamento_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'municipio_id' }),
    __metadata("design:type", Number)
], MatriculaCurso.prototype, "municipio_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'estado_matricula', type: 'nvarchar', length: 20, default: 'PENDIENTE' }),
    __metadata("design:type", String)
], MatriculaCurso.prototype, "estado_matricula", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'metodo_pago', type: 'nvarchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], MatriculaCurso.prototype, "metodo_pago", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'comprobante_pago', type: 'nvarchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], MatriculaCurso.prototype, "comprobante_pago", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'monto_pagado', type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], MatriculaCurso.prototype, "monto_pagado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_pago', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], MatriculaCurso.prototype, "fecha_pago", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'calificacion_final', type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], MatriculaCurso.prototype, "calificacion_final", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'porcentaje_asistencia', type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], MatriculaCurso.prototype, "porcentaje_asistencia", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 500, nullable: true }),
    __metadata("design:type", String)
], MatriculaCurso.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_matricula', type: 'datetime2', default: () => 'GETDATE()' }),
    __metadata("design:type", Date)
], MatriculaCurso.prototype, "fecha_matricula", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_confirmacion', type: 'datetime2', nullable: true }),
    __metadata("design:type", Date)
], MatriculaCurso.prototype, "fecha_confirmacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_cancelacion', type: 'datetime2', nullable: true }),
    __metadata("design:type", Date)
], MatriculaCurso.prototype, "fecha_cancelacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], MatriculaCurso.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'creado_en', type: 'datetime2', default: () => 'GETDATE()' }),
    __metadata("design:type", Date)
], MatriculaCurso.prototype, "creado_en", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'actualizado_en', type: 'datetime2', default: () => 'GETDATE()' }),
    __metadata("design:type", Date)
], MatriculaCurso.prototype, "actualizado_en", void 0);
exports.MatriculaCurso = MatriculaCurso = __decorate([
    (0, typeorm_1.Entity)('matriculas_cursos', { schema: 'academia' })
], MatriculaCurso);
//# sourceMappingURL=matricula-curso.entity.js.map