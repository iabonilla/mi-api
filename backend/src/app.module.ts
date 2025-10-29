import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CursosModule } from './cursos/cursos.module';
import { DepartmentsModule } from "./departments/departments.module"
import { CentersModule } from "./centers/centers.module"
import { TurnsModule } from "./turns/turns.module"
import { TipoCursosModule } from './tipo-cursos/tipo-cursos.module';
import { CarrerasModule } from './carreras/carreras.module'; 
import { TipoOfertasModule } from './tipo-ofertas/tipo-ofertas.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
TypeOrmModule.forRoot({
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
    CursosModule,
    DepartmentsModule,
    CentersModule,
    TurnsModule,
    TipoCursosModule,
    CarrerasModule,
    TipoOfertasModule,
  ],
})
export class AppModule {}
