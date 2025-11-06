import { Repository } from 'typeorm';
import { Center } from './entities/center.entity';
import { CreateCenterDto } from './dto/create-center.dto';
import { UpdateCenterDto } from './dto/update-center.dto';
import { JerarquiaFiltersDto } from './dto/jerarquia-filters.dto';
export declare class CentersService {
    private readonly centersRepository;
    constructor(centersRepository: Repository<Center>);
    create(createCenterDto: CreateCenterDto): Promise<Center | null>;
    findAll(): Promise<Center[]>;
    findOne(id: number): Promise<Center | null>;
    findJerarquia(filters: JerarquiaFiltersDto): Promise<any[]>;
    update(id: number, updateCenterDto: UpdateCenterDto): Promise<Center | null>;
    remove(id: number): Promise<void>;
}
