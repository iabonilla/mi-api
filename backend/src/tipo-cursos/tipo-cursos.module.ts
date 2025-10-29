import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoCursosService } from './tipo-cursos.service';
import { TipoCursosController } from './tipo-cursos.controller';
import { TipoCurso } from './entities/tipo-curso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoCurso])],
  controllers: [TipoCursosController],
  providers: [TipoCursosService],
})
export class TipoCursosModule {}