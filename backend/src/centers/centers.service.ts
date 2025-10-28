import { Injectable } from "@nestjs/common"
import type { Repository } from "typeorm"
import type { Center } from "./entities/center.entity"
import type { CreateCenterDto } from "./dto/create-center.dto"
import type { UpdateCenterDto } from "./dto/update-center.dto"

@Injectable()
export class CentersService {
  constructor(private readonly centersRepository: Repository<Center>) {}

  async create(createCenterDto: CreateCenterDto): Promise<Center | null> {
    try {
      const center = this.centersRepository.create(createCenterDto)
      return await this.centersRepository.save(center)
    } catch (error) {
      return null
    }
  }

  async findAll(): Promise<Center[]> {
    try {
      const centers = await this.centersRepository.find()
      return centers || []
    } catch (error) {
      return []
    }
  }

  async findOne(id: string): Promise<Center | null> {
    try {
      const center = await this.centersRepository.findOne({ where: { id } })
      return center || null
    } catch (error) {
      return null
    }
  }

  async update(id: string, updateCenterDto: UpdateCenterDto): Promise<Center | null> {
    try {
      const center = await this.findOne(id)
      if (!center) return null

      Object.assign(center, updateCenterDto)
      return await this.centersRepository.save(center)
    } catch (error) {
      return null
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const center = await this.findOne(id)
      if (center) {
        await this.centersRepository.remove(center)
      }
    } catch (error) {
      // Silencioso
    }
  }
}
