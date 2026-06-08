"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSellOrderDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_sell_order_dto_1 = require("./create-sell-order.dto");
class UpdateSellOrderDto extends (0, mapped_types_1.PartialType)(create_sell_order_dto_1.CreateSellOrderDto) {
}
exports.UpdateSellOrderDto = UpdateSellOrderDto;
//# sourceMappingURL=update-sell-order.dto.js.map