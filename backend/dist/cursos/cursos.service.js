"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const curso_entity_1 = require("./entities/curso.entity");
let CursosService = class CursosService {
    constructor(cursoRepository) {
        this.cursoRepository = cursoRepository;
    }
    async findAll(filters) {
        try {
            const query = this.cursoRepository
                .createQueryBuilder('curso')
                .leftJoinAndSelect('curso.tipoOferta', 'tipoOferta')
                .leftJoinAndSelect('curso.idioma', 'idioma')
                .leftJoinAndSelect('curso.centro', 'centro')
                .leftJoinAndSelect('curso.turno', 'turno')
                .where('curso.estado = 1');
            if (filters?.tipo_oferta_id) {
                query.andWhere('curso.tipoOfertaId = :tipoOfertaId', {
                    tipoOfertaId: filters.tipo_oferta_id
                });
            }
            if (filters?.idioma_id) {
                query.andWhere('curso.idiomaId = :idiomaId', {
                    idiomaId: filters.idioma_id
                });
            }
            if (filters?.centro_id) {
                query.andWhere('curso.centroId = :centroId', {
                    centroId: filters.centro_id
                });
            }
            if (filters?.turno_id) {
                query.andWhere('curso.turnoId = :turnoId', {
                    turnoId: filters.turno_id
                });
            }
            query.andWhere('curso.fechaInicio >= CAST(GETDATE() AS DATE)');
            return await query.orderBy('curso.fechaInicio', 'ASC').getMany();
        }
        catch (error) {
            console.error('Error fetching courses:', error);
            return [];
        }
    }
    async findOne(id) {
        try {
            return await this.cursoRepository.findOne({
                where: { id, estado: 1 },
                relations: ['tipoOferta', 'idioma', 'centro', 'turno']
            });
        }
        catch (error) {
            console.error('Error fetching course:', error);
            return null;
        }
    }
    async getCursosDisponibles() {
        try {
            return await this.cursoRepository
                .createQueryBuilder('curso')
                .leftJoinAndSelect('curso.tipoOferta', 'tipoOferta')
                .leftJoinAndSelect('curso.idioma', 'idioma')
                .leftJoinAndSelect('curso.centro', 'centro')
                .leftJoinAndSelect('curso.turno', 'turno')
                .where('curso.estado = 1')
                .andWhere('curso.inscritos < curso.capacidad')
                .andWhere('curso.fechaInicio >= CAST(GETDATE() AS DATE)')
                .orderBy('curso.fechaInicio', 'ASC')
                .getMany();
        }
        catch (error) {
            console.error('Error fetching available courses:', error);
            return [];
        }
    }
    async findAllcursos(filters) {
        const { tipo_oferta_id, idioma_id, centro_id, turno_id, estado = true } = filters || {};
        const result = await this.cursoRepository.query(`EXEC [academia].[SP_FiltrarCursos] 
        @tipo_oferta_id = @0, 
        @idioma_id = @1, 
        @centro_id = @2, 
        @turno_id = @3, 
        @estado = @4`, [tipo_oferta_id, idioma_id, centro_id, turno_id, estado]);
        return result;
    }
    async debugAll() {
        try {
            const cursos = await this.cursoRepository.find({
                where: { estado: 1 },
                relations: ['tipoOferta', 'idioma', 'centro', 'turno']
            });
            console.log('🔍 DEBUG - Total cursos en BD:', cursos.length);
            if (cursos.length > 0) {
                cursos.forEach((curso, index) => {
                    console.log(`Curso ${index + 1}:`, {
                        id: curso.id,
                        nombre: curso.nombre,
                        codigo: curso.codigo,
                        fechaInicio: curso.fechaInicio,
                        tipoOfertaId: curso.tipoOfertaId,
                        tipoOferta: curso.tipoOferta,
                        idiomaId: curso.idiomaId,
                        idioma: curso.idioma
                    });
                });
            }
            return {
                message: `Found ${cursos.length} courses`,
                data: cursos
            };
        }
        catch (error) {
            console.error('❌ DEBUG Error:', error);
            return {
                error: error.message,
                stack: error.stack
            };
        }
    }
};
exports.CursosService = CursosService;
exports.CursosService = CursosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(curso_entity_1.Curso)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CursosService);
//# sourceMappingURL=cursos.service.js.map