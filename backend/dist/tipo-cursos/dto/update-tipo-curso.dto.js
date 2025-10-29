"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTipoCursoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_tipo_curso_dto_1 = require("./create-tipo-curso.dto");
class UpdateTipoCursoDto extends (0, mapped_types_1.PartialType)(create_tipo_curso_dto_1.CreateTipoCursoDto) {
}
exports.UpdateTipoCursoDto = UpdateTipoCursoDto;
//# sourceMappingURL=update-tipo-curso.dto.js.map