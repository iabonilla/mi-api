import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Idioma } from './entities/idioma.entity';
import { CreateIdiomaDto } from './dto/create-idioma.dto';
import { UpdateIdiomaDto } from './dto/update-idioma.dto';

@Injectable()
export class IdiomasService {
  constructor(
    @InjectRepository(Idioma) 
    private readonly idiomaRepository: Repository<Idioma>
  ) {}

  async create(createIdiomaDto: CreateIdiomaDto): Promise<Idioma | null> {
    try {
      const idioma = this.idiomaRepository.create(createIdiomaDto);
      return await this.idiomaRepository.save(idioma);
    } catch (error) {
      console.error('Error creating idioma:', error);
      return null;
    }
  }

  async findAll(): Promise<Idioma[]> {
    try {
      return await this.idiomaRepository.find({ 
        where: { estado: 1 },
        order: { nombre: 'ASC' }
      });
    } catch (error) {
      console.error('Error fetching idiomas:', error);
      return [];
    }
  }

  async findOne(id: number): Promise<Idioma | null> {
    try {
      return await this.idiomaRepository.findOne({ 
        where: { id, estado: 1 } 
      });
    } catch (error) {
      console.error('Error fetching idioma:', error);
      return null;
    }
  }

  async update(id: number, updateIdiomaDto: UpdateIdiomaDto): Promise<Idioma | null> {
    try {
      const idioma = await this.findOne(id);
      if (!idioma) return null;
      
      Object.assign(idioma, updateIdiomaDto);
      return await this.idiomaRepository.save(idioma);
    } catch (error) {
      console.error('Error updating idioma:', error);
      return null;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const idioma = await this.findOne(id);
      if (idioma) {
        idioma.estado = 0;
        await this.idiomaRepository.save(idioma);
      }
    } catch (error) {
      console.error('Error deleting idioma:', error);
    }
  }
}