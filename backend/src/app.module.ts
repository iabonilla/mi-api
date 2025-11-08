

import { config } from 'dotenv';

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
import {MatriculasCursosModule} from'./matriculas/matriculas-cursos.module';
import { DepartmentsModule_persona } from "./departamentos_persona/departments.module"
import { MunicipioModule_persona } from "./municipio_persona/municipio.module"


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
TypeOrmModule.forRoot({
  type: 'mssql',
  host: process.env.DB_HOST_local,
  port: parseInt(process.env.DB_PORT_local) || 1433,
  username: process.env.DB_USERNAME_local,
  password: process.env.DB_PASSWORD_local,  
  database: process.env.DB_DATABASE_local,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  retryDelay: 3000,
  retryAttempts: 10,
  logging: false,
  options: {
    encrypt: false,
    enableArithAbort: true,
    trustServerCertificate: true,
    connectTimeout: 90000, 
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
    MatriculasCursosModule,
    DepartmentsModule_persona,
    MunicipioModule_persona,
  ],
})
export class AppModule {}
