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
exports.TurnsController = void 0;
const common_1 = require("@nestjs/common");
const turns_service_1 = require("./turns.service");
const create_turn_dto_1 = require("./dto/create-turn.dto");
const update_turn_dto_1 = require("./dto/update-turn.dto");
let TurnsController = class TurnsController {
    constructor(turnsService) {
        this.turnsService = turnsService;
    }
    create(createTurnDto) {
        return this.turnsService.create(createTurnDto);
    }
    findAll() {
        return this.turnsService.findAll();
    }
    findOne(id) {
        return this.turnsService.findOne(+id);
    }
    update(id, updateTurnDto) {
        return this.turnsService.update(+id, updateTurnDto);
    }
    remove(id) {
        return this.turnsService.remove(+id);
    }
};
exports.TurnsController = TurnsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_turn_dto_1.CreateTurnDto]),
    __metadata("design:returntype", void 0)
], TurnsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TurnsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TurnsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_turn_dto_1.UpdateTurnDto]),
    __metadata("design:returntype", void 0)
], TurnsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TurnsController.prototype, "remove", null);
exports.TurnsController = TurnsController = __decorate([
    (0, common_1.Controller)("turns"),
    __metadata("design:paramtypes", [turns_service_1.TurnsService])
], TurnsController);
//# sourceMappingURL=turns.controller.js.map