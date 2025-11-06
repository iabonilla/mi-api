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
exports.Municipio = void 0;
const typeorm_1 = require("typeorm");
let Municipio = class Municipio {
};
exports.Municipio = Municipio;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Municipio.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'Id_departamento', nullable: true }),
    __metadata("design:type", Number)
], Municipio.prototype, "Id_departamento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', nullable: true }),
    __metadata("design:type", String)
], Municipio.prototype, "Codigo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', nullable: true }),
    __metadata("design:type", String)
], Municipio.prototype, "Nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'Fecha_Registro', type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Municipio.prototype, "Fecha_Registro", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'Fecha_Modificacion', type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Municipio.prototype, "Fecha_Modificacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'IdUsuario', nullable: true }),
    __metadata("design:type", Number)
], Municipio.prototype, "IdUsuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'IdDominio', nullable: true }),
    __metadata("design:type", Number)
], Municipio.prototype, "IdDominio", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Municipio.prototype, "Estado", void 0);
exports.Municipio = Municipio = __decorate([
    (0, typeorm_1.Entity)('Municipio', { schema: 'academia' })
], Municipio);
//# sourceMappingURL=entity.js.map