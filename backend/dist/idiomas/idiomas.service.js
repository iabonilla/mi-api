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
exports.IdiomasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const idioma_entity_1 = require("./entities/idioma.entity");
let IdiomasService = class IdiomasService {
    constructor(idiomaRepository) {
        this.idiomaRepository = idiomaRepository;
    }
    async create(createIdiomaDto) {
        try {
            const idioma = this.idiomaRepository.create(createIdiomaDto);
            return await this.idiomaRepository.save(idioma);
        }
        catch (error) {
            console.error('Error creating idioma:', error);
            return null;
        }
    }
    async findAll() {
        try {
            return await this.idiomaRepository.find({
                where: { estado: 1 },
                order: { nombre: 'ASC' }
            });
        }
        catch (error) {
            console.error('Error fetching idiomas:', error);
            return [];
        }
    }
    async findOne(id) {
        try {
            return await this.idiomaRepository.findOne({
                where: { id, estado: 1 }
            });
        }
        catch (error) {
            console.error('Error fetching idioma:', error);
            return null;
        }
    }
    async update(id, updateIdiomaDto) {
        try {
            const idioma = await this.findOne(id);
            if (!idioma)
                return null;
            Object.assign(idioma, updateIdiomaDto);
            return await this.idiomaRepository.save(idioma);
        }
        catch (error) {
            console.error('Error updating idioma:', error);
            return null;
        }
    }
    async remove(id) {
        try {
            const idioma = await this.findOne(id);
            if (idioma) {
                idioma.estado = 0;
                await this.idiomaRepository.save(idioma);
            }
        }
        catch (error) {
            console.error('Error deleting idioma:', error);
        }
    }
};
exports.IdiomasService = IdiomasService;
exports.IdiomasService = IdiomasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(idioma_entity_1.Idioma)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], IdiomasService);
//# sourceMappingURL=idiomas.service.js.map