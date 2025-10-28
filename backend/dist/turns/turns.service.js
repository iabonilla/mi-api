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
exports.TurnsService = void 0;
const common_1 = require("@nestjs/common");
let TurnsService = class TurnsService {
    constructor(turnsRepository) {
        this.turnsRepository = turnsRepository;
    }
    async create(createTurnDto) {
        try {
            const turn = this.turnsRepository.create(createTurnDto);
            return await this.turnsRepository.save(turn);
        }
        catch (error) {
            return null;
        }
    }
    async findAll() {
        try {
            const turns = await this.turnsRepository.find();
            return turns || [];
        }
        catch (error) {
            return [];
        }
    }
    async findOne(id) {
        try {
            const turn = await this.turnsRepository.findOne({ where: { id } });
            return turn || null;
        }
        catch (error) {
            return null;
        }
    }
    async update(id, updateTurnDto) {
        try {
            const turn = await this.findOne(id);
            if (!turn)
                return null;
            Object.assign(turn, updateTurnDto);
            return await this.turnsRepository.save(turn);
        }
        catch (error) {
            return null;
        }
    }
    async remove(id) {
        try {
            const turn = await this.findOne(id);
            if (turn) {
                await this.turnsRepository.remove(turn);
            }
        }
        catch (error) {
        }
    }
};
exports.TurnsService = TurnsService;
exports.TurnsService = TurnsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Function])
], TurnsService);
//# sourceMappingURL=turns.service.js.map