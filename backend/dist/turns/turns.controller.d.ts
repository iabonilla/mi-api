import { TurnsService } from "./turns.service";
import { CreateTurnDto } from "./dto/create-turn.dto";
import { UpdateTurnDto } from "./dto/update-turn.dto";
export declare class TurnsController {
    private readonly turnsService;
    constructor(turnsService: TurnsService);
    create(createTurnDto: CreateTurnDto): Promise<import("./entities/turn.entity").Turn>;
    findAll(): Promise<import("./entities/turn.entity").Turn[]>;
    findOne(id: number): Promise<import("./entities/turn.entity").Turn>;
    update(id: number, updateTurnDto: UpdateTurnDto): Promise<import("./entities/turn.entity").Turn>;
    remove(id: number): Promise<void>;
}
