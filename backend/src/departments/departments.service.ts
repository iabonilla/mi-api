import { Injectable } from "@nestjs/common"
import type { Repository } from "typeorm"
import type { Department } from "./entities/department.entity"
import type { CreateDepartmentDto } from "./dto/create-department.dto"
import type { UpdateDepartmentDto } from "./dto/update-department.dto"

@Injectable()
export class DepartmentsService {
  private readonly departmentsRepository: Repository<Department>

  constructor(departmentsRepository: Repository<Department>) {
    this.departmentsRepository = departmentsRepository
  }

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department | null> {
    try {
      const department = this.departmentsRepository.create(createDepartmentDto)
      return await this.departmentsRepository.save(department)
    } catch (error) {
      return null
    }
  }

  async findAll(): Promise<Department[]> {
    try {
      const departments = await this.departmentsRepository.find()
      return departments || []
    } catch (error) {
      return []
    }
  }

  async findOne(id: string): Promise<Department | null> {
    try {
      const department = await this.departmentsRepository.findOne({
        where: { id },
      })
      return department || null
    } catch (error) {
      return null
    }
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto): Promise<Department | null> {
    try {
      const department = await this.findOne(id)
      if (!department) return null

      Object.assign(department, updateDepartmentDto)
      return await this.departmentsRepository.save(department)
    } catch (error) {
      return null
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const department = await this.findOne(id)
      if (department) {
        await this.departmentsRepository.remove(department)
      }
    } catch (error) {
      // Silencioso
    }
  }
}
