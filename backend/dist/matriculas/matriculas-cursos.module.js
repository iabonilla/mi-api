"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatriculasCursosModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const matriculas_cursos_service_1 = require("./matriculas-cursos.service");
const matriculas_cursos_controller_1 = require("./matriculas-cursos.controller");
const matricula_curso_entity_1 = require("./entities/matricula-curso.entity");
let MatriculasCursosModule = class MatriculasCursosModule {
};
exports.MatriculasCursosModule = MatriculasCursosModule;
exports.MatriculasCursosModule = MatriculasCursosModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([matricula_curso_entity_1.MatriculaCurso])],
        controllers: [matriculas_cursos_controller_1.MatriculasCursosController],
        providers: [matriculas_cursos_service_1.MatriculasCursosService],
        exports: [matriculas_cursos_service_1.MatriculasCursosService],
    })
], MatriculasCursosModule);
//# sourceMappingURL=matriculas-cursos.module.js.map