import { PersonasService } from '../persona/personas.service';
import { CreatePersonaDto } from '../persona/dto/create-persona.dto';
import { UpdatePersonaDto } from '../persona/dto/update-persona.dto';
import { Persona } from '../persona/entities/persona.entity';
export declare class PersonasController {
    private readonly personasService;
    constructor(personasService: PersonasService);
    upsert(createPersonaDto: CreatePersonaDto): Promise<Persona>;
    create(createPersonaDto: CreatePersonaDto): Promise<Persona>;
    findAll(): Promise<Persona[]>;
    findOne(id: number): Promise<Persona>;
    findByCodigo(codigo: string): Promise<Persona>;
    findByCedula(cedula: string): Promise<Persona>;
    findByEmail(email: string): Promise<Persona>;
    findWithFilters(filters: any): Promise<Persona[]>;
    update(id: number, updatePersonaDto: UpdatePersonaDto): Promise<Persona>;
    patch(id: number, updatePersonaDto: UpdatePersonaDto): Promise<Persona>;
    remove(id: number): Promise<void>;
}
