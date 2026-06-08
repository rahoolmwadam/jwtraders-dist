"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellOrdersModule = void 0;
const common_1 = require("@nestjs/common");
const sell_orders_service_1 = require("./sell-orders.service");
const sell_orders_controller_1 = require("./sell-orders.controller");
const open_orders_module_1 = require("../open_orders/open_orders.module");
const system_parameters_module_1 = require("../system-parameters/system-parameters.module");
const common_module_1 = require("../common.module");
const instruments_module_1 = require("../instruments/instruments.module");
let SellOrdersModule = class SellOrdersModule {
};
exports.SellOrdersModule = SellOrdersModule;
exports.SellOrdersModule = SellOrdersModule = __decorate([
    (0, common_1.Module)({
        controllers: [sell_orders_controller_1.SellOrdersController],
        providers: [sell_orders_service_1.SellOrdersService],
        imports: [
            open_orders_module_1.OpenOrdersModule,
            system_parameters_module_1.SystemParametersModule,
            common_module_1.CommonModule,
            instruments_module_1.InstrumentsModule
        ]
    })
], SellOrdersModule);
//# sourceMappingURL=sell-orders.module.js.map