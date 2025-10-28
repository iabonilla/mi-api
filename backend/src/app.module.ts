import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CoursesModule } from "./courses/courses.module"
import { DepartmentsModule } from "./departments/departments.module"
import { CentersModule } from "./centers/centers.module"
import { TurnsModule } from "./turns/turns.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST || "localhost",
      port: Number.parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_DATABASE || "academia_idiomas",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true, // Solo para desarrollo
      logging: false, // Silencioso en desarrollo
    }),
    CoursesModule,
    DepartmentsModule,
    CentersModule,
    TurnsModule,
  ],
})
export class AppModule {}
