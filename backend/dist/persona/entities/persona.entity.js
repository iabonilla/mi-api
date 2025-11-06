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
exports.Persona = void 0;
const typeorm_1 = require("typeorm");
let Persona = class Persona {
    calculateAge() {
        if (this.fecha_nacimiento) {
            const birthDate = new Date(this.fecha_nacimiento);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 ||
                (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            this.edad = age;
        }
    }
    generatePersonCode() {
        if (!this.codigo_persona) {
            const random = Math.random().toString(36).substring(2, 8).toUpperCase();
            this.codigo_persona = `PER-${random}`;
        }
    }
};
exports.Persona = Persona;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Persona.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "nvarchar" }),
    __metadata("design:type", String)
], Persona.prototype, "codigo_persona", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "nvarchar" }),
    __metadata("design:type", String)
], Persona.prototype, "nombres", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "nvarchar" }),
    __metadata("design:type", String)
], Persona.prototype, "apellidos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", String)
], Persona.prototype, "fecha_nacimiento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true }),
    __metadata("design:type", Number)
], Persona.prototype, "edad", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "nvarchar", nullable: true }),
    __metadata("design:type", String)
], Persona.prototype, "numero_cedula", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "nvarchar" }),
    __metadata("design:type", String)
], Persona.prototype, "nacionalidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "nvarchar", length: 20, nullable: true }),
    __metadata("design:type", String)
], Persona.prototype, "genero", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "nvarchar", length: 100 }),
    __metadata("design:type", String)
], Persona.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "nvarchar", length: 20 }),
    __metadata("design:type", String)
], Persona.prototype, "telefono_movil", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "nvarchar", length: 20, nullable: true }),
    __metadata("design:type", String)
], Persona.prototype, "telefono_alterno", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "nvarchar", nullable: true }),
    __metadata("design:type", String)
], Persona.prototype, "direccion_completa", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true }),
    __metadata("design:type", Number)
], Persona.prototype, "municipio_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true }),
    __metadata("design:type", Number)
], Persona.prototype, "departamento_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "nvarchar", length: 50, nullable: true }),
    __metadata("design:type", String)
], Persona.prototype, "nivel_academico", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true }),
    __metadata("design:type", Number)
], Persona.prototype, "idioma_interes_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "nvarchar", length: 100, nullable: true }),
    __metadata("design:type", String)
], Persona.prototype, "preferencia_horario", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "nvarchar", length: 100, nullable: true }),
    __metadata("design:type", String)
], Persona.prototype, "contacto_emergencia_nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "nvarchar", length: 50, nullable: true }),
    __metadata("design:type", String)
], Persona.prototype, "contacto_emergencia_relacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "nvarchar", length: 20, nullable: true }),
    __metadata("design:type", String)
], Persona.prototype, "contacto_emergencia_telefono", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "datetime2" }),
    __metadata("design:type", Date)
], Persona.prototype, "fecha_registro", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bit", default: true }),
    __metadata("design:type", Boolean)
], Persona.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "datetime2" }),
    __metadata("design:type", Date)
], Persona.prototype, "creado_en", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "datetime2" }),
    __metadata("design:type", Date)
], Persona.prototype, "actualizado_en", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Persona.prototype, "calculateAge", null);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Persona.prototype, "generatePersonCode", null);
exports.Persona = Persona = __decorate([
    (0, typeorm_1.Entity)("personas", { schema: "academia" })
], Persona);
//# sourceMappingURL=persona.entity.js.map