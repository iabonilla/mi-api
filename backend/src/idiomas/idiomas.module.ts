import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { IdiomasService } from "./idiomas.service"
import { IdiomasController } from "./idiomas.controller"
import { Idioma } from "./entities/idioma.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Idioma])],  
  controllers: [IdiomasController],
  providers: [IdiomasService],
  exports: [IdiomasService],
})
export class IdiomasModule {}