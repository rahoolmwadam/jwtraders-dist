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
exports.SystemParametersController = void 0;
const common_1 = require("@nestjs/common");
const system_parameters_service_1 = require("./system-parameters.service");
const create_system_parameter_dto_1 = require("./dto/create-system-parameter.dto");
const update_system_parameter_dto_1 = require("./dto/update-system-parameter.dto");
let SystemParametersController = class SystemParametersController {
    systemParametersService;
    constructor(systemParametersService) {
        this.systemParametersService = systemParametersService;
    }
    create(createSystemParameterDto) {
        return this.systemParametersService.create(createSystemParameterDto);
    }
    findAll() {
        return this.systemParametersService.findAll();
    }
    findOne(id) {
        return this.systemParametersService.findOne(+id);
    }
    update(id, updateSystemParameterDto) {
        return this.systemParametersService.update(+id, updateSystemParameterDto);
    }
    remove(id) {
        return this.systemParametersService.remove(+id);
    }
};
exports.SystemParametersController = SystemParametersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_system_parameter_dto_1.CreateSystemParameterDto]),
    __metadata("design:returntype", void 0)
], SystemParametersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SystemParametersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SystemParametersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_system_parameter_dto_1.UpdateSystemParameterDto]),
    __metadata("design:returntype", void 0)
], SystemParametersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SystemParametersController.prototype, "remove", null);
exports.SystemParametersController = SystemParametersController = __decorate([
    (0, common_1.Controller)('api/system-parameters'),
    __metadata("design:paramtypes", [system_parameters_service_1.SystemParametersService])
], SystemParametersController);
//# sourceMappingURL=system-parameters.controller.js.map