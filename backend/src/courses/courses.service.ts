import { Injectable } from "@nestjs/common"
import { type Repository, Like } from "typeorm"
import type { Course } from "./entities/course.entity"
import type { CreateCourseDto } from "./dto/create-course.dto"
import type { UpdateCourseDto } from "./dto/update-course.dto"

@Injectable()
export class CoursesService {
  private readonly coursesRepository: Repository<Course>

  constructor(coursesRepository: Repository<Course>) {
    this.coursesRepository = coursesRepository
  }

  async create(createCourseDto: CreateCourseDto): Promise<Course | null> {
    try {
      const course = this.coursesRepository.create(createCourseDto)
      return await this.coursesRepository.save(course)
    } catch (error) {
      return null
    }
  }

  async findAll(filters?: {
    departmentId?: string
    centerId?: string
    turnId?: string
    modality?: "presencial" | "virtual"
    status?: "active" | "inactive" | "full"
    search?: string
  }): Promise<Course[]> {
    try {
      const where: any = {}

      if (filters?.departmentId) where.departmentId = filters.departmentId
      if (filters?.centerId) where.centerId = filters.centerId
      if (filters?.turnId) where.turnId = filters.turnId
      if (filters?.modality) where.modality = filters.modality
      if (filters?.status) where.status = filters.status
      if (filters?.search) {
        where.name = Like(`%${filters.search}%`)
      }

      const courses = await this.coursesRepository.find({
        where,
        relations: ["department", "center", "turn"],
      })

      return courses || []
    } catch (error) {
      return []
    }
  }

  async findOne(id: string): Promise<Course | null> {
    try {
      const course = await this.coursesRepository.findOne({
        where: { id },
        relations: ["department", "center", "turn"],
      })
      return course || null
    } catch (error) {
      return null
    }
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course | null> {
    try {
      const course = await this.findOne(id)
      if (!course) return null

      Object.assign(course, updateCourseDto)
      return await this.coursesRepository.save(course)
    } catch (error) {
      return null
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const course = await this.findOne(id)
      if (course) {
        await this.coursesRepository.remove(course)
      }
    } catch (error) {
      // Silencioso - no hace nada si falla
    }
  }
}
