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
exports.PersonasController = void 0;
const common_1 = require("@nestjs/common");
const personas_service_1 = require("../persona/personas.service");
const create_persona_dto_1 = require("../persona/dto/create-persona.dto");
const update_persona_dto_1 = require("../persona/dto/update-persona.dto");
let PersonasController = class PersonasController {
    constructor(personasService) {
        this.personasService = personasService;
    }
    async upsert(createPersonaDto) {
        return await this.personasService.upsert(createPersonaDto);
    }
    async create(createPersonaDto) {
        return await this.personasService.create(createPersonaDto);
    }
    async findAll() {
        return await this.personasService.findAll();
    }
    async findOne(id) {
        return await this.personasService.findOne(id);
    }
    async findByCodigo(codigo) {
        return await this.personasService.findByCodigo(codigo);
    }
    async findByCedula(cedula) {
        return await this.personasService.findByCedula(cedula);
    }
    async findByEmail(email) {
        return await this.personasService.findByEmail(email);
    }
    async findWithFilters(filters) {
        return await this.personasService.findWithFilters(filters);
    }
    async update(id, updatePersonaDto) {
        return await this.personasService.update(id, updatePersonaDto);
    }
    async patch(id, updatePersonaDto) {
        return await this.personasService.update(id, updatePersonaDto);
    }
    async remove(id) {
        await this.personasService.remove(id);
    }
};
exports.PersonasController = PersonasController;
__decorate([
    (0, common_1.Post)('upsert'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_persona_dto_1.CreatePersonaDto]),
    __metadata("design:returntype", Promise)
], PersonasController.prototype, "upsert", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_persona_dto_1.CreatePersonaDto]),
    __metadata("design:returntype", Promise)
], PersonasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PersonasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PersonasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('codigo/:codigo'),
    __param(0, (0, common_1.Param)('codigo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PersonasController.prototype, "findByCodigo", null);
__decorate([
    (0, common_1.Get)('cedula/:cedula'),
    __param(0, (0, common_1.Param)('cedula')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PersonasController.prototype, "findByCedula", null);
__decorate([
    (0, common_1.Get)('email/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PersonasController.prototype, "findByEmail", null);
__decorate([
    (0, common_1.Get)('buscar/filtros'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PersonasController.prototype, "findWithFilters", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_persona_dto_1.UpdatePersonaDto]),
    __metadata("design:returntype", Promise)
], PersonasController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_persona_dto_1.UpdatePersonaDto]),
    __metadata("design:returntype", Promise)
], PersonasController.prototype, "patch", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PersonasController.prototype, "remove", null);
exports.PersonasController = PersonasController = __decorate([
    (0, common_1.Controller)('personas'),
    __metadata("design:paramtypes", [personas_service_1.PersonasService])
], PersonasController);
//# sourceMappingURL=personas.controller.js.map