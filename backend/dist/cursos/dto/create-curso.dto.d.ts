export declare class CreateCursoDto {
    nombre: string;
    codigo: string;
    descripcion?: string;
    tipo_oferta_id: number;
    tipo_curso_id: number;
    carrera_id: number;
    departamento_id?: number;
    centro_id?: number;
    turno_id?: number;
    capacidad: number;
    inscritos: number;
    fecha_inicio: Date;
    fecha_fin: Date;
    horario?: string;
    plataforma_virtual?: string;
    enlace_virtual?: string;
    estado: boolean;
}
