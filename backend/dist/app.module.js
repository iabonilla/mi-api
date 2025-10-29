"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const cursos_module_1 = require("./cursos/cursos.module");
const departments_module_1 = require("./departments/departments.module");
const centers_module_1 = require("./centers/centers.module");
const turns_module_1 = require("./turns/turns.module");
const tipo_cursos_module_1 = require("./tipo-cursos/tipo-cursos.module");
const carreras_module_1 = require("./carreras/carreras.module");
const tipo_ofertas_module_1 = require("./tipo-ofertas/tipo-ofertas.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mssql',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT, 10) || 1433,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: false,
                logging: false,
                options: {
                    encrypt: false,
                    trustServerCertificate: true,
                },
            }),
            cursos_module_1.CursosModule,
            departments_module_1.DepartmentsModule,
            centers_module_1.CentersModule,
            turns_module_1.TurnsModule,
            tipo_cursos_module_1.TipoCursosModule,
            carreras_module_1.CarrerasModule,
            tipo_ofertas_module_1.TipoOfertasModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map