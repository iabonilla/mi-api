import type { Repository } from "typeorm";
import type { Turn } from "./entities/turn.entity";
import type { CreateTurnDto } from "./dto/create-turn.dto";
import type { UpdateTurnDto } from "./dto/update-turn.dto";
export declare class TurnsService {
    private readonly turnsRepository;
    constructor(turnsRepository: Repository<Turn>);
    create(createTurnDto: CreateTurnDto): Promise<Turn | null>;
    findAll(): Promise<Turn[]>;
    findOne(id: string): Promise<Turn | null>;
    update(id: string, updateTurnDto: UpdateTurnDto): Promise<Turn | null>;
    remove(id: string): Promise<void>;
}
