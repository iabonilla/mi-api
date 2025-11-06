import { CentersService } from "./centers.service";
import { CreateCenterDto } from "./dto/create-center.dto";
import { UpdateCenterDto } from "./dto/update-center.dto";
import { JerarquiaFiltersDto } from "./dto/jerarquia-filters.dto";
export declare class CentersController {
    private readonly centersService;
    constructor(centersService: CentersService);
    create(createCenterDto: CreateCenterDto): Promise<import("./entities/center.entity").Center>;
    findAll(): Promise<import("./entities/center.entity").Center[]>;
    findJerarquia(filters: JerarquiaFiltersDto): Promise<any[]>;
    findOne(id: number): Promise<import("./entities/center.entity").Center>;
    update(id: number, updateCenterDto: UpdateCenterDto): Promise<import("./entities/center.entity").Center>;
    remove(id: number): Promise<void>;
}
