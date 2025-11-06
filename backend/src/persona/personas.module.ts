// modules/personas.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonasService } from '../persona/personas.service';
import { PersonasController } from '../persona/personas.controller';
import { Persona } from '../persona/entities/persona.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Persona])],
  controllers: [PersonasController],
  providers: [PersonasService],
  exports: [PersonasService], // Exportar si otros módulos necesitan usar PersonasService
})
export class PersonasModule {}