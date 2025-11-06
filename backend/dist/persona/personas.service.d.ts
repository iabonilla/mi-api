import { Repository } from 'typeorm';
import { Persona } from '../persona/entities/persona.entity';
import { CreatePersonaDto } from '../persona/dto/create-persona.dto';
import { UpdatePersonaDto } from '../persona/dto/update-persona.dto';
export declare class PersonasService {
    private personasRepository;
    constructor(personasRepository: Repository<Persona>);
    upsert(createPersonaDto: CreatePersonaDto): Promise<Persona>;
    create(createPersonaDto: CreatePersonaDto): Promise<Persona>;
    private generatePersonCode;
    findAll(): Promise<Persona[]>;
    findOne(id: number): Promise<Persona>;
    findByCodigo(codigo_persona: string): Promise<Persona>;
    findByCedula(cedula: string): Promise<Persona>;
    findByEmail(email: string): Promise<Persona>;
    update(id: number, updatePersonaDto: UpdatePersonaDto): Promise<Persona>;
    findWithFilters(filters: any): Promise<Persona[]>;
    remove(id: number): Promise<void>;
}
