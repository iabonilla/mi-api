import { Controller, Get, Post, Patch, Param, Delete } from "@nestjs/common"
import type { CentersService } from "./centers.service"
import type { CreateCenterDto } from "./dto/create-center.dto"
import type { UpdateCenterDto } from "./dto/update-center.dto"

@Controller("centers")
export class CentersController {
  constructor(private readonly centersService: CentersService) {}

  @Post()
  create(createCenterDto: CreateCenterDto) {
    return this.centersService.create(createCenterDto)
  }

  @Get()
  findAll() {
    return this.centersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.centersService.findOne(id)
  }

  @Patch(":id")
  update(@Param('id') id: string, updateCenterDto: UpdateCenterDto) {
    return this.centersService.update(id, updateCenterDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.centersService.remove(id)
  }
}
