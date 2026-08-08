"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStockListDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_stock_list_dto_1 = require("./create-stock-list.dto");
class UpdateStockListDto extends (0, mapped_types_1.PartialType)(create_stock_list_dto_1.CreateStockListDto) {
}
exports.UpdateStockListDto = UpdateStockListDto;
//# sourceMappingURL=update-stock-list.dto.js.map