"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCenterDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_center_dto_1 = require("./create-center.dto");
class UpdateCenterDto extends (0, mapped_types_1.PartialType)(create_center_dto_1.CreateCenterDto) {
}
exports.UpdateCenterDto = UpdateCenterDto;
//# sourceMappingURL=update-center.dto.js.map