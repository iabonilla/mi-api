"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTurnDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_turn_dto_1 = require("./create-turn.dto");
class UpdateTurnDto extends (0, mapped_types_1.PartialType)(create_turn_dto_1.CreateTurnDto) {
}
exports.UpdateTurnDto = UpdateTurnDto;
//# sourceMappingURL=update-turn.dto.js.map