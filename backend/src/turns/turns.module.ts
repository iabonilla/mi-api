import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TurnsService } from "./turns.service"
import { TurnsController } from "./turns.controller"
import { Turn } from "./entities/turn.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Turn])],
  controllers: [TurnsController],
  providers: [TurnsService],
  exports: [TurnsService],
})
export class TurnsModule {}
