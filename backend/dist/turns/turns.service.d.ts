import { Repository } from "typeorm";
import { Turn } from "./entities/turn.entity";
import { CreateTurnDto } from "./dto/create-turn.dto";
import { UpdateTurnDto } from "./dto/update-turn.dto";
export declare class TurnsService {
    private readonly turnsRepository;
    constructor(turnsRepository: Repository<Turn>);
    create(createTurnDto: CreateTurnDto): Promise<Turn | null>;
    findAll(): Promise<Turn[]>;
    findOne(id: number): Promise<Turn | null>;
    update(id: number, updateTurnDto: UpdateTurnDto): Promise<Turn | null>;
    remove(id: number): Promise<void>;
}
