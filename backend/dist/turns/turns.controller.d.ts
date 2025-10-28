import type { TurnsService } from "./turns.service";
import type { CreateTurnDto } from "./dto/create-turn.dto";
import type { UpdateTurnDto } from "./dto/update-turn.dto";
export declare class TurnsController {
    private readonly turnsService;
    constructor(turnsService: TurnsService);
    create(createTurnDto: CreateTurnDto): Promise<import("./entities/turn.entity").Turn>;
    findAll(): Promise<import("./entities/turn.entity").Turn[]>;
    findOne(id: string): Promise<import("./entities/turn.entity").Turn>;
    update(id: string, updateTurnDto: UpdateTurnDto): Promise<import("./entities/turn.entity").Turn>;
    remove(id: string): Promise<void>;
}
