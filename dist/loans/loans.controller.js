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
exports.LoansController = void 0;
const common_1 = require("@nestjs/common");
const create_loan_dto_1 = require("./dto/create-loan.dto");
const update_loan_dto_1 = require("./dto/update-loan.dto");
const loans_service_1 = require("./loans.service");
let LoansController = class LoansController {
    loansService;
    constructor(loansService) {
        this.loansService = loansService;
    }
    create(createLoanDto) {
        return this.loansService.create(createLoanDto);
    }
    findAll(req) {
        const user = req['user'];
        return this.loansService.findAll(user);
    }
    getBalances(req) {
        const user = req['user'];
        return this.loansService.getBalances(user);
    }
    getLoanOrders(req) {
        const user = req['user'];
        return this.loansService.getLoanOrders(user);
    }
    getTotalLoanOrders(req) {
        const user = req['user'];
        return this.loansService.getTotalLoanOrders(user);
    }
    getCustomerTotalLoanOrders(req) {
        const user = req['user'];
        return this.loansService.getCustomerTotalLoanOrders(user);
    }
    getCustomerTotalLoanSellOrders(req) {
        const user = req['user'];
        return this.loansService.getCustomerTotalLoanSellOrders(user);
    }
    findOne(id) {
        return this.loansService.findOne(+id);
    }
    update(id, updateLoanDto) {
        return this.loansService.update(+id, updateLoanDto);
    }
    remove(id) {
        return this.loansService.remove(+id);
    }
};
exports.LoansController = LoansController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_loan_dto_1.CreateLoanDto]),
    __metadata("design:returntype", void 0)
], LoansController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", void 0)
], LoansController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('balances'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", void 0)
], LoansController.prototype, "getBalances", null);
__decorate([
    (0, common_1.Get)('loan-orders'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", void 0)
], LoansController.prototype, "getLoanOrders", null);
__decorate([
    (0, common_1.Get)('total-loan-orders'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", void 0)
], LoansController.prototype, "getTotalLoanOrders", null);
__decorate([
    (0, common_1.Get)('customer-total-loan-orders'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", void 0)
], LoansController.prototype, "getCustomerTotalLoanOrders", null);
__decorate([
    (0, common_1.Get)('customer-total-loan-sell-orders'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", void 0)
], LoansController.prototype, "getCustomerTotalLoanSellOrders", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LoansController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_loan_dto_1.UpdateLoanDto]),
    __metadata("design:returntype", void 0)
], LoansController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LoansController.prototype, "remove", null);
exports.LoansController = LoansController = __decorate([
    (0, common_1.Controller)('api/loans'),
    __metadata("design:paramtypes", [loans_service_1.LoansService])
], LoansController);
//# sourceMappingURL=loans.controller.js.map