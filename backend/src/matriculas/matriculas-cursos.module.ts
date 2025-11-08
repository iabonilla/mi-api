// backend/src/matriculas/matriculas-cursos.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatriculasCursosService } from './matriculas-cursos.service';
import { MatriculasCursosController } from './matriculas-cursos.controller';
import { MatriculaCurso } from './entities/matricula-curso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MatriculaCurso])],
  controllers: [MatriculasCursosController],
  providers: [MatriculasCursosService],
  exports: [MatriculasCursosService],
})
export class MatriculasCursosModule {}