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
exports.TipoOfertasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tipo_oferta_entity_1 = require("./entities/tipo-oferta.entity");
let TipoOfertasService = class TipoOfertasService {
    constructor(tipoOfertaRepository) {
        this.tipoOfertaRepository = tipoOfertaRepository;
    }
    async create(createTipoOfertaDto) {
        const tipoOferta = this.tipoOfertaRepository.create(createTipoOfertaDto);
        return await this.tipoOfertaRepository.save(tipoOferta);
    }
    async findAll() {
        return await this.tipoOfertaRepository.find();
    }
    async findOne(id) {
        const tipoOferta = await this.tipoOfertaRepository.findOne({ where: { id } });
        if (!tipoOferta) {
            throw new common_1.NotFoundException(`TipoOferta con ID ${id} no encontrado`);
        }
        return tipoOferta;
    }
    async update(id, updateTipoOfertaDto) {
        await this.tipoOfertaRepository.update(id, updateTipoOfertaDto);
        const tipoOferta = await this.findOne(id);
        if (!tipoOferta) {
            throw new common_1.NotFoundException(`TipoOferta con ID ${id} no encontrado`);
        }
        return tipoOferta;
    }
    async remove(id) {
        const result = await this.tipoOfertaRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`TipoOferta con ID ${id} no encontrado`);
        }
    }
};
exports.TipoOfertasService = TipoOfertasService;
exports.TipoOfertasService = TipoOfertasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tipo_oferta_entity_1.TipoOferta)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TipoOfertasService);
//# sourceMappingURL=tipo-ofertas.service.js.map