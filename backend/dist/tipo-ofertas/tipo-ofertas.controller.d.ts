import { TipoOfertasService } from './tipo-ofertas.service';
import { CreateTipoOfertaDto } from './dto/create-tipo-oferta.dto';
import { UpdateTipoOfertaDto } from './dto/update-tipo-oferta.dto';
export declare class TipoOfertasController {
    private readonly tipoOfertasService;
    constructor(tipoOfertasService: TipoOfertasService);
    create(createTipoOfertaDto: CreateTipoOfertaDto): Promise<import("./entities/tipo-oferta.entity").TipoOferta>;
    findAll(): Promise<import("./entities/tipo-oferta.entity").TipoOferta[]>;
    findOne(id: string): Promise<import("./entities/tipo-oferta.entity").TipoOferta>;
    update(id: string, updateTipoOfertaDto: UpdateTipoOfertaDto): Promise<import("./entities/tipo-oferta.entity").TipoOferta>;
    remove(id: string): Promise<void>;
}
