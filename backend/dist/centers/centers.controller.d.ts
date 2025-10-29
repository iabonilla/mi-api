import { CentersService } from "./centers.service";
import { CreateCenterDto } from "./dto/create-center.dto";
import { UpdateCenterDto } from "./dto/update-center.dto";
export declare class CentersController {
    private readonly centersService;
    constructor(centersService: CentersService);
    create(createCenterDto: CreateCenterDto): Promise<import("./entities/center.entity").Center>;
    findAll(): Promise<import("./entities/center.entity").Center[]>;
    findOne(id: number): Promise<import("./entities/center.entity").Center>;
    update(id: number, updateCenterDto: UpdateCenterDto): Promise<import("./entities/center.entity").Center>;
    remove(id: number): Promise<void>;
}
