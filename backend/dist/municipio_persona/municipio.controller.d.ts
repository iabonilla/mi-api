import { MunicipioService } from './municipio.service';
import { Municipio } from './entities/municipio.entity';
export declare class MunicipioController {
    private readonly municipioService;
    constructor(municipioService: MunicipioService);
    findAll(): Promise<Municipio[]>;
    findByDepartamento(departamentoId: number): Promise<Municipio[]>;
    findOne(id: number): Promise<Municipio>;
}
