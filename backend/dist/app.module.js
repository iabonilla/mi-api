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
const courses_module_1 = require("./courses/courses.module");
const departments_module_1 = require("./departments/departments.module");
const centers_module_1 = require("./centers/centers.module");
const turns_module_1 = require("./turns/turns.module");
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
                type: "mysql",
                host: process.env.DB_HOST || "localhost",
                port: Number.parseInt(process.env.DB_PORT) || 3306,
                username: process.env.DB_USERNAME || "root",
                password: process.env.DB_PASSWORD || "",
                database: process.env.DB_DATABASE || "academia_idiomas",
                entities: [__dirname + "/**/*.entity{.ts,.js}"],
                synchronize: true,
                logging: false,
            }),
            courses_module_1.CoursesModule,
            departments_module_1.DepartmentsModule,
            centers_module_1.CentersModule,
            turns_module_1.TurnsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map