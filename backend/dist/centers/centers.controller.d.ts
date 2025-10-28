import type { CentersService } from "./centers.service";
import type { CreateCenterDto } from "./dto/create-center.dto";
import type { UpdateCenterDto } from "./dto/update-center.dto";
export declare class CentersController {
    private readonly centersService;
    constructor(centersService: CentersService);
    create(createCenterDto: CreateCenterDto): Promise<import("./entities/center.entity").Center>;
    findAll(): Promise<import("./entities/center.entity").Center[]>;
    findOne(id: string): Promise<import("./entities/center.entity").Center>;
    update(id: string, updateCenterDto: UpdateCenterDto): Promise<import("./entities/center.entity").Center>;
    remove(id: string): Promise<void>;
}
