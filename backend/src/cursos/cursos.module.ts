import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursosService } from './cursos.service';
import { CursosController } from './cursos.controller';
import { Curso } from './entities/curso.entity';
import { TipoOfertasModule } from '../tipo-ofertas/tipo-ofertas.module';
import { TipoCursosModule } from '../tipo-cursos/tipo-cursos.module';
import { CarrerasModule } from '../carreras/carreras.module';
import { DepartmentsModule } from '../departments/departments.module';
import { CentersModule } from '../centers/centers.module';
import { TurnsModule } from '../turns/turns.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Curso]),
    TipoOfertasModule,
    TipoCursosModule,
    CarrerasModule,
    DepartmentsModule,
    CentersModule,
    TurnsModule
  ],
  controllers: [CursosController],
  providers: [CursosService],
})
export class CursosModule {}