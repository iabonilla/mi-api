import { TipoOferta } from "../../tipo-ofertas/entities/tipo-oferta.entity";
import { Idioma } from "../../idiomas/entities/idioma.entity";
import { Center } from "../../centers/entities/center.entity";
import { Turn } from "../../turns/entities/turn.entity";
export declare class Curso {
    id: number;
    nombre: string;
    codigo: string;
    descripcion: string;
    tipoOfertaId: number;
    idiomaId: number;
    centroId: number;
    turnoId: number;
    capacidad: number;
    inscritos: number;
    cupos: number;
    fechaInicio: string;
    fechaFin: string;
    horario: string;
    plataformaVirtual: string;
    enlaceVirtual: string;
    estado: number;
    creadoEn: Date;
    actualizadoEn: Date;
    tipoOferta: TipoOferta;
    idioma: Idioma;
    centro: Center;
    turno: Turn;
}
