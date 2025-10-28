import { Controller, Get, Post, Patch, Param, Delete, Query } from "@nestjs/common"
import type { CoursesService } from "./courses.service"
import type { CreateCourseDto } from "./dto/create-course.dto"
import type { UpdateCourseDto } from "./dto/update-course.dto"

@Controller("courses")
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto)
  }

  @Get()
  findAll(
    @Query('departmentId') departmentId?: string,
    @Query('centerId') centerId?: string,
    @Query('turnId') turnId?: string,
    @Query('modality') modality?: 'presencial' | 'virtual',
    @Query('status') status?: 'active' | 'inactive' | 'full',
    @Query('search') search?: string,
  ) {
    return this.coursesService.findAll({
      departmentId,
      centerId,
      turnId,
      modality,
      status,
      search,
    })
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id)
  }

  @Patch(":id")
  update(@Param('id') id: string, updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id)
  }
}
