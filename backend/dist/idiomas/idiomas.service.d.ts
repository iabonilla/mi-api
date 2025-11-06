import { Repository } from 'typeorm';
import { Idioma } from './entities/idioma.entity';
import { CreateIdiomaDto } from './dto/create-idioma.dto';
import { UpdateIdiomaDto } from './dto/update-idioma.dto';
export declare class IdiomasService {
    private readonly idiomaRepository;
    constructor(idiomaRepository: Repository<Idioma>);
    create(createIdiomaDto: CreateIdiomaDto): Promise<Idioma | null>;
    findAll(): Promise<Idioma[]>;
    findOne(id: number): Promise<Idioma | null>;
    update(id: number, updateIdiomaDto: UpdateIdiomaDto): Promise<Idioma | null>;
    remove(id: number): Promise<void>;
}
