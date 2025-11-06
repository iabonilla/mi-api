"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateIdiomaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_idioma_dto_1 = require("./create-idioma.dto");
class UpdateIdiomaDto extends (0, mapped_types_1.PartialType)(create_idioma_dto_1.CreateIdiomaDto) {
}
exports.UpdateIdiomaDto = UpdateIdiomaDto;
//# sourceMappingURL=update-idioma.dto.js.map