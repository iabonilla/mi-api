import type { Repository } from "typeorm";
import type { Center } from "./entities/center.entity";
import type { CreateCenterDto } from "./dto/create-center.dto";
import type { UpdateCenterDto } from "./dto/update-center.dto";
export declare class CentersService {
    private readonly centersRepository;
    constructor(centersRepository: Repository<Center>);
    create(createCenterDto: CreateCenterDto): Promise<Center | null>;
    findAll(): Promise<Center[]>;
    findOne(id: string): Promise<Center | null>;
    update(id: string, updateCenterDto: UpdateCenterDto): Promise<Center | null>;
    remove(id: string): Promise<void>;
}
