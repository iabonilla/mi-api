import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { Center } from "./entities/center.entity";
import { CreateCenterDto } from "./dto/create-center.dto";
import { UpdateCenterDto } from "./dto/update-center.dto";

@Injectable()
export class CentersService {
  constructor(
    @InjectRepository(Center)
    private readonly centersRepository: Repository<Center>
  ) {}

  async create(createCenterDto: CreateCenterDto): Promise<Center | null> {
    try {
      const center = this.centersRepository.create(createCenterDto);
      return await this.centersRepository.save(center);
    } catch (error) {
      return null;
    }
  }

  async findAll(): Promise<Center[]> {
    try {
      return await this.centersRepository.find({ where: { estado: 1 } });
    } catch (error) {
      return [];
    }
  }

  async findOne(id: number): Promise<Center | null> { // ← number, no string
    try {
      return await this.centersRepository.findOne({ where: { id, estado: 1 } });
    } catch (error) {
      return null;
    }
  }

  async update(id: number, updateCenterDto: UpdateCenterDto): Promise<Center | null> { // ← number
    try {
      const center = await this.findOne(id);
      if (!center) return null;
      Object.assign(center, updateCenterDto);
      return await this.centersRepository.save(center);
    } catch (error) {
      return null;
    }
  }

  async remove(id: number): Promise<void> { // ← number
    try {
      const center = await this.findOne(id);
      if (center) {
        center.estado = 0; // eliminación lógica
        await this.centersRepository.save(center);
      }
    } catch (error) {
      // silencioso
    }
  }
}