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
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const dashboard_service_1 = require("./dashboard.service");
let DashboardController = class DashboardController {
    dashboardService;
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    findAll() {
        return this.dashboardService.findAll();
    }
    findMain() {
        return this.dashboardService.findMain();
    }
    findCustomerProfits() {
        return this.dashboardService.findCustomerProfits();
    }
    findCustomerProfitsMonthly() {
        return this.dashboardService.findCustomerProfitsMonthly();
    }
    findCustomerProfitsDaily() {
        return this.dashboardService.findCustomerProfitsDaily();
    }
    findCustomerProfitsQuarterly() {
        return this.dashboardService.findCustomerProfitsQuarterly();
    }
    findCustomerProfitsYearly() {
        return this.dashboardService.findCustomerProfitsYearly();
    }
    getCustomerProfits(interval) {
        return this.dashboardService.getCustomerProfitsInGroups(interval);
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('main'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "findMain", null);
__decorate([
    (0, common_1.Get)('customer-profits'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "findCustomerProfits", null);
__decorate([
    (0, common_1.Get)('customer-profits-monthly'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "findCustomerProfitsMonthly", null);
__decorate([
    (0, common_1.Get)('customer-profits-daily'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "findCustomerProfitsDaily", null);
__decorate([
    (0, common_1.Get)('customer-profits-quarterly'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "findCustomerProfitsQuarterly", null);
__decorate([
    (0, common_1.Get)('customer-profits-yearly'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "findCustomerProfitsYearly", null);
__decorate([
    (0, common_1.Get)('customer-profits/:interval'),
    __param(0, (0, common_1.Param)('interval')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "getCustomerProfits", null);
exports.DashboardController = DashboardController = __decorate([
    (0, common_1.Controller)('api/dashboard'),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map