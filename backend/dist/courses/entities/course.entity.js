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
exports.Course = void 0;
const typeorm_1 = require("typeorm");
const department_entity_1 = require("../../departments/entities/department.entity");
const center_entity_1 = require("../../centers/entities/center.entity");
const turn_entity_1 = require("../../turns/entities/turn.entity");
let Course = class Course {
};
exports.Course = Course;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Course.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Course.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Course.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Course.prototype, "departmentId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Course.prototype, "centerId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Course.prototype, "turnId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: ["presencial", "virtual"] }),
    __metadata("design:type", String)
], Course.prototype, "modality", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], Course.prototype, "capacity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], Course.prototype, "enrolled", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", String)
], Course.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", String)
], Course.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "schedule", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "teacher", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ["active", "inactive", "full"],
        default: "active",
    }),
    __metadata("design:type", String)
], Course.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department),
    (0, typeorm_1.JoinColumn)({ name: "departmentId" }),
    __metadata("design:type", department_entity_1.Department)
], Course.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => center_entity_1.Center),
    (0, typeorm_1.JoinColumn)({ name: "centerId" }),
    __metadata("design:type", center_entity_1.Center)
], Course.prototype, "center", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => turn_entity_1.Turn),
    (0, typeorm_1.JoinColumn)({ name: "turnId" }),
    __metadata("design:type", turn_entity_1.Turn)
], Course.prototype, "turn", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Course.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Course.prototype, "updatedAt", void 0);
exports.Course = Course = __decorate([
    (0, typeorm_1.Entity)("courses")
], Course);
//# sourceMappingURL=course.entity.js.map