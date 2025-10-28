import { Injectable } from "@nestjs/common"
import type { Repository } from "typeorm"
import type { Turn } from "./entities/turn.entity"
import type { CreateTurnDto } from "./dto/create-turn.dto"
import type { UpdateTurnDto } from "./dto/update-turn.dto"

@Injectable()
export class TurnsService {
  constructor(private readonly turnsRepository: Repository<Turn>) {}

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
      const turns = await this.turnsRepository.find()
      return turns || []
    } catch (error) {
      return []
    }
  }

  async findOne(id: string): Promise<Turn | null> {
    try {
      const turn = await this.turnsRepository.findOne({ where: { id } })
      return turn || null
    } catch (error) {
      return null
    }
  }

  async update(id: string, updateTurnDto: UpdateTurnDto): Promise<Turn | null> {
    try {
      const turn = await this.findOne(id)
      if (!turn) return null

      Object.assign(turn, updateTurnDto)
      return await this.turnsRepository.save(turn)
    } catch (error) {
      return null
    }
  }

  async remove(id: string): Promise<void> {
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
