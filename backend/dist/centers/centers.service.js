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
exports.CentersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const center_entity_1 = require("./entities/center.entity");
let CentersService = class CentersService {
    constructor(centersRepository) {
        this.centersRepository = centersRepository;
    }
    async create(createCenterDto) {
        try {
            const center = this.centersRepository.create(createCenterDto);
            return await this.centersRepository.save(center);
        }
        catch (error) {
            return null;
        }
    }
    async findAll() {
        try {
            return await this.centersRepository.find({ where: { estado: 1 } });
        }
        catch (error) {
            return [];
        }
    }
    async findOne(id) {
        try {
            return await this.centersRepository.findOne({ where: { id, estado: 1 } });
        }
        catch (error) {
            return null;
        }
    }
    async update(id, updateCenterDto) {
        try {
            const center = await this.findOne(id);
            if (!center)
                return null;
            Object.assign(center, updateCenterDto);
            return await this.centersRepository.save(center);
        }
        catch (error) {
            return null;
        }
    }
    async remove(id) {
        try {
            const center = await this.findOne(id);
            if (center) {
                center.estado = 0;
                await this.centersRepository.save(center);
            }
        }
        catch (error) {
        }
    }
};
exports.CentersService = CentersService;
exports.CentersService = CentersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(center_entity_1.Center)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CentersService);
//# sourceMappingURL=centers.service.js.map