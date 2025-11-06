import { IdiomasService } from "./idiomas.service";
import { CreateIdiomaDto } from "./dto/create-idioma.dto";
import { UpdateIdiomaDto } from "./dto/update-idioma.dto";
export declare class IdiomasController {
    private readonly idiomasService;
    constructor(idiomasService: IdiomasService);
    create(createIdiomaDto: CreateIdiomaDto): Promise<import("./entities/idioma.entity").Idioma>;
    findAll(): Promise<import("./entities/idioma.entity").Idioma[]>;
    findOne(id: number): Promise<import("./entities/idioma.entity").Idioma>;
    update(id: number, updateIdiomaDto: UpdateIdiomaDto): Promise<import("./entities/idioma.entity").Idioma>;
    remove(id: number): Promise<void>;
}
