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
exports.MunicipioService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const municipio_entity_1 = require("./entities/municipio.entity");
let MunicipioService = class MunicipioService {
    constructor(municipioRepository) {
        this.municipioRepository = municipioRepository;
    }
    async findAll() {
        return this.municipioRepository.find({
            where: { Estado: 1 },
            order: { Nombre: 'ASC' },
        });
    }
    async findByDepartamento(departamentoId) {
        const municipios = await this.municipioRepository.find({
            where: {
                Id_departamento: departamentoId,
                Estado: 1
            },
            order: { Nombre: 'ASC' },
        });
        if (!municipios || municipios.length === 0) {
            throw new common_1.NotFoundException(`No se encontraron municipios para el departamento con ID ${departamentoId}`);
        }
        return municipios;
    }
    async findOne(id) {
        const municipio = await this.municipioRepository.findOne({
            where: { Id: id, Estado: 1 },
        });
        if (!municipio) {
            throw new common_1.NotFoundException(`Municipio con ID ${id} no encontrado`);
        }
        return municipio;
    }
};
exports.MunicipioService = MunicipioService;
exports.MunicipioService = MunicipioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(municipio_entity_1.Municipio)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MunicipioService);
//# sourceMappingURL=municipio.service.js.map