import { CarrerasService } from './carreras.service';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';
export declare class CarrerasController {
    private readonly carrerasService;
    constructor(carrerasService: CarrerasService);
    create(createCarreraDto: CreateCarreraDto): Promise<import("./entities/carrera.entity").Carrera>;
    findAll(): Promise<import("./entities/carrera.entity").Carrera[]>;
    findOne(id: string): Promise<import("./entities/carrera.entity").Carrera>;
    update(id: string, updateCarreraDto: UpdateCarreraDto): Promise<import("./entities/carrera.entity").Carrera>;
    remove(id: string): Promise<void>;
}
