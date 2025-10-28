import { Controller, Get, Post, Patch, Param, Delete } from "@nestjs/common"
import type { DepartmentsService } from "./departments.service"
import type { CreateDepartmentDto } from "./dto/create-department.dto"
import type { UpdateDepartmentDto } from "./dto/update-department.dto"

@Controller("departments")
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  create(createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto)
  }

  @Get()
  findAll() {
    return this.departmentsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentsService.findOne(id)
  }

  @Patch(":id")
  update(@Param('id') id: string, updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentsService.update(id, updateDepartmentDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentsService.remove(id)
  }
}
