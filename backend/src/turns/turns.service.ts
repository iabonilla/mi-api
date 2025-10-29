import { Injectable } from "@nestjs/common"
import { InjectRepository } from '@nestjs/typeorm'; // ← Asegúrate de tener esta línea
import { Repository } from "typeorm"
import { Turn } from "./entities/turn.entity"
import { CreateTurnDto } from "./dto/create-turn.dto"
import { UpdateTurnDto } from "./dto/update-turn.dto"

@Injectable()
export class TurnsService {
  constructor(@InjectRepository(Turn) private readonly turnsRepository: Repository<Turn>) {}

  async create(createTurnDto: CreateTurnDto): Promise<Turn | null> {
    try {
      const turn = this.turnsRepository.create(createTurnDto)
      return await this.turnsRepository.save(turn)
    } catch (error) {
      return null
    }
  }

  async findAll(): Promise<Turn[]> {
    try {
      const turns = await this.turnsRepository.find({ where: { estado:1 } })
      return turns || []
    } catch (error) {
      return []
    }
  }

  async findOne(id: number): Promise<Turn | null> {
    try {
      const turn = await this.turnsRepository.findOne({ where: { id } })
      return turn || null
    } catch (error) {
      return null
    }
  }

  async update(id: number, updateTurnDto: UpdateTurnDto): Promise<Turn | null> {
    try {
      const turn = await this.findOne(id)
      if (!turn) return null

      Object.assign(turn, updateTurnDto)
      return await this.turnsRepository.save(turn)
    } catch (error) {
      return null
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const turn = await this.findOne(id)
      if (turn) {
        await this.turnsRepository.remove(turn)
      }
    } catch (error) {
      // Silencioso
    }
  }
}
