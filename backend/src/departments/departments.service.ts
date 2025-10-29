import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department) 
    private readonly departmentRepository: Repository<Department>
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department | null> {
    try {
      const department = this.departmentRepository.create(createDepartmentDto);
      return await this.departmentRepository.save(department);
    } catch (error) {
      return null;
    }
  }

  async findAll(): Promise<Department[]> {
    try {
      return await this.departmentRepository.find({ where: { estado: 1 } });
    } catch (error) {
      return [];
    }
  }

  async findOne(id: number): Promise<Department | null> {
    try {
      return await this.departmentRepository.findOne({ where: { id, estado: 1 } });
    } catch (error) {
      return null;
    }
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto): Promise<Department | null> {
    try {
      const department = await this.findOne(id);
      if (!department) return null;
      Object.assign(department, updateDepartmentDto);
      return await this.departmentRepository.save(department);
    } catch (error) {
      return null;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const department = await this.findOne(id);
      if (department) {
        department.estado = 0; // eliminación lógica
        await this.departmentRepository.save(department);
      }
    } catch (error) {
      // silencioso
    }
  }
}