import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoOfertasService } from './tipo-ofertas.service';
import { TipoOfertasController } from './tipo-ofertas.controller';
import { TipoOferta } from './entities/tipo-oferta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoOferta])],
  controllers: [TipoOfertasController],
  providers: [TipoOfertasService],
})
export class TipoOfertasModule {}