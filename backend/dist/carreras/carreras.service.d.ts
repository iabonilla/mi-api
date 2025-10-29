import { Repository } from 'typeorm';
import { Carrera } from './entities/carrera.entity';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';
export declare class CarrerasService {
    private readonly carreraRepository;
    constructor(carreraRepository: Repository<Carrera>);
    create(createCarreraDto: CreateCarreraDto): Promise<Carrera>;
    findAll(): Promise<Carrera[]>;
    findOne(id: number): Promise<Carrera>;
    update(id: number, updateCarreraDto: UpdateCarreraDto): Promise<Carrera>;
    remove(id: number): Promise<void>;
}
