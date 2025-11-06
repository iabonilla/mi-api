import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CursosModule } from './cursos/cursos.module';
import { DepartmentsModule } from "./departments/departments.module"
import { MunicipioModule } from "./municipio/municipio.module"
import { CentersModule } from "./centers/centers.module"
import { TurnsModule } from "./turns/turns.module"
import { TipoCursosModule } from './tipo-cursos/tipo-cursos.module';
import { CarrerasModule } from './carreras/carreras.module'; 
import { TipoOfertasModule } from './tipo-ofertas/tipo-ofertas.module';
import { IdiomasModule } from './idiomas/idiomas.module'; 
import {PersonasModule } from './persona/personas.module'; 



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
TypeOrmModule.forRoot({
  type: 'mssql',
  host: process.env.DB_HOST_local,
  port: parseInt(process.env.DB_PORT_local, 10) || 1433,
  username: process.env.DB_USERNAME_local,
  password: process.env.DB_PASSWORD_local,
  database: process.env.DB_DATABASE_local,
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
    MunicipioModule,
    CentersModule,
    TurnsModule,
    TipoCursosModule,
    CarrerasModule,
    TipoOfertasModule,
    IdiomasModule,
    PersonasModule,
  ],
})
export class AppModule {}
