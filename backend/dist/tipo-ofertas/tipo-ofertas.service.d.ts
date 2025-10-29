import { Repository } from 'typeorm';
import { TipoOferta } from './entities/tipo-oferta.entity';
import { CreateTipoOfertaDto } from './dto/create-tipo-oferta.dto';
import { UpdateTipoOfertaDto } from './dto/update-tipo-oferta.dto';
export declare class TipoOfertasService {
    private readonly tipoOfertaRepository;
    constructor(tipoOfertaRepository: Repository<TipoOferta>);
    create(createTipoOfertaDto: CreateTipoOfertaDto): Promise<TipoOferta>;
    findAll(): Promise<TipoOferta[]>;
    findOne(id: number): Promise<TipoOferta>;
    update(id: number, updateTipoOfertaDto: UpdateTipoOfertaDto): Promise<TipoOferta>;
    remove(id: number): Promise<void>;
}
