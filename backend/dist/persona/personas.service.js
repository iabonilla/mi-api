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
exports.PersonasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const persona_entity_1 = require("../persona/entities/persona.entity");
let PersonasService = class PersonasService {
    constructor(personasRepository) {
        this.personasRepository = personasRepository;
    }
    async upsert(createPersonaDto) {
        const { codigo_persona, numero_cedula } = createPersonaDto;
        if (!codigo_persona && !numero_cedula) {
            throw new common_1.ConflictException('Se requiere código de persona o cédula para UPSERT');
        }
        const existingPerson = await this.personasRepository.findOne({
            where: [
                { codigo_persona, estado: true },
                { numero_cedula, estado: true }
            ]
        });
        if (existingPerson) {
            console.log('🔄 Persona encontrada, actualizando...', {
                id: existingPerson.id,
                codigo_persona: existingPerson.codigo_persona,
                cedula: existingPerson.numero_cedula
            });
            return await this.update(existingPerson.id, createPersonaDto);
        }
        console.log('➕ Persona no encontrada, creando nueva...');
        return await this.create(createPersonaDto);
    }
    async create(createPersonaDto) {
        const { codigo_persona, numero_cedula, email } = createPersonaDto;
        const existingPerson = await this.personasRepository.findOne({
            where: [
                { codigo_persona, estado: true },
                { numero_cedula, estado: true },
                { email, estado: true }
            ]
        });
        if (existingPerson) {
            const conflictField = existingPerson.codigo_persona === codigo_persona ? 'código de persona' :
                existingPerson.numero_cedula === numero_cedula ? 'cédula' : 'email';
            throw new common_1.ConflictException(`Ya existe una persona con este ${conflictField}`);
        }
        const persona = this.personasRepository.create(createPersonaDto);
        if (!persona.codigo_persona) {
            persona.codigo_persona = this.generatePersonCode();
        }
        return await this.personasRepository.save(persona);
    }
    generatePersonCode() {
        const random = Math.random().toString(36).substring(2, 10).toUpperCase();
        return `PER-${random}`;
    }
    async findAll() {
        return await this.personasRepository.find({
            where: { estado: true },
            order: { creado_en: 'DESC' }
        });
    }
    async findOne(id) {
        const persona = await this.personasRepository.findOne({
            where: { id, estado: true }
        });
        if (!persona) {
            throw new common_1.NotFoundException(`Persona con ID ${id} no encontrada`);
        }
        return persona;
    }
    async findByCodigo(codigo_persona) {
        const persona = await this.personasRepository.findOne({
            where: { codigo_persona, estado: true }
        });
        if (!persona) {
            throw new common_1.NotFoundException(`Persona con código ${codigo_persona} no encontrada`);
        }
        return persona;
    }
    async findByCedula(cedula) {
        const persona = await this.personasRepository.findOne({
            where: { numero_cedula: cedula, estado: true }
        });
        if (!persona) {
            throw new common_1.NotFoundException(`Persona con cédula ${cedula} no encontrada`);
        }
        return persona;
    }
    async findByEmail(email) {
        const persona = await this.personasRepository.findOne({
            where: { email, estado: true }
        });
        if (!persona) {
            throw new common_1.NotFoundException(`Persona con email ${email} no encontrada`);
        }
        return persona;
    }
    async update(id, updatePersonaDto) {
        const persona = await this.findOne(id);
        if (updatePersonaDto.codigo_persona && updatePersonaDto.codigo_persona !== persona.codigo_persona) {
            throw new common_1.ConflictException('No se puede modificar el código de persona');
        }
        if (updatePersonaDto.numero_cedula && updatePersonaDto.numero_cedula !== persona.numero_cedula) {
            throw new common_1.ConflictException('No se puede modificar la cédula');
        }
        Object.assign(persona, updatePersonaDto);
        return await this.personasRepository.save(persona);
    }
    async findWithFilters(filters) {
        const query = this.personasRepository.createQueryBuilder('persona')
            .where('persona.estado = :estado', { estado: true });
        if (filters.codigo_persona) {
            query.andWhere('persona.codigo_persona = :codigo_persona', { codigo_persona: filters.codigo_persona });
        }
        if (filters.numero_cedula) {
            query.andWhere('persona.numero_cedula = :numero_cedula', { numero_cedula: filters.numero_cedula });
        }
        if (filters.nombres) {
            query.andWhere('persona.nombres LIKE :nombres', { nombres: `%${filters.nombres}%` });
        }
        if (filters.apellidos) {
            query.andWhere('persona.apellidos LIKE :apellidos', { apellidos: `%${filters.apellidos}%` });
        }
        if (filters.email) {
            query.andWhere('persona.email = :email', { email: filters.email });
        }
        return await query.getMany();
    }
    async remove(id) {
        const persona = await this.findOne(id);
        persona.estado = false;
        await this.personasRepository.save(persona);
    }
};
exports.PersonasService = PersonasService;
exports.PersonasService = PersonasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(persona_entity_1.Persona)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PersonasService);
//# sourceMappingURL=personas.service.js.map