"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOpenOrderDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_open_order_dto_1 = require("./create-open_order.dto");
class UpdateOpenOrderDto extends (0, mapped_types_1.PartialType)(create_open_order_dto_1.CreateOpenOrderDto) {
}
exports.UpdateOpenOrderDto = UpdateOpenOrderDto;
//# sourceMappingURL=update-open_order.dto.js.map