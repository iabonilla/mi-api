"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursosModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cursos_service_1 = require("./cursos.service");
const cursos_controller_1 = require("./cursos.controller");
const curso_entity_1 = require("./entities/curso.entity");
const tipo_ofertas_module_1 = require("../tipo-ofertas/tipo-ofertas.module");
const tipo_cursos_module_1 = require("../tipo-cursos/tipo-cursos.module");
const carreras_module_1 = require("../carreras/carreras.module");
const departments_module_1 = require("../departments/departments.module");
const centers_module_1 = require("../centers/centers.module");
const turns_module_1 = require("../turns/turns.module");
let CursosModule = class CursosModule {
};
exports.CursosModule = CursosModule;
exports.CursosModule = CursosModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([curso_entity_1.Curso]),
            tipo_ofertas_module_1.TipoOfertasModule,
            tipo_cursos_module_1.TipoCursosModule,
            carreras_module_1.CarrerasModule,
            departments_module_1.DepartmentsModule,
            centers_module_1.CentersModule,
            turns_module_1.TurnsModule
        ],
        controllers: [cursos_controller_1.CursosController],
        providers: [cursos_service_1.CursosService],
    })
], CursosModule);
//# sourceMappingURL=cursos.module.js.map