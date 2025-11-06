import { Repository } from 'typeorm';
import { Municipio } from './entities/municipio.entity';
export declare class MunicipioService {
    private municipioRepository;
    constructor(municipioRepository: Repository<Municipio>);
    findAll(): Promise<Municipio[]>;
    findByDepartamento(departamentoId: number): Promise<Municipio[]>;
    findOne(id: number): Promise<Municipio>;
}
