"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const passport_1 = require("@nestjs/passport");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const auth_module_1 = require("./auth/auth.module");
const customers_module_1 = require("./customers/customers.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const instruments_module_1 = require("./instruments/instruments.module");
const investments_module_1 = require("./investments/investments.module");
const loans_module_1 = require("./loans/loans.module");
const open_orders_module_1 = require("./open_orders/open_orders.module");
const sell_orders_module_1 = require("./sell-orders/sell-orders.module");
const system_parameters_module_1 = require("./system-parameters/system-parameters.module");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const mailer_1 = require("@nestjs-modules/mailer");
const fs_1 = require("fs");
const app_controller_1 = require("./app.controller");
const live_market_data_module_1 = require("./live-market-data/live-market-data.module");
const stock_list_module_1 = require("./stock-list/stock-list.module");
const publicPath = (0, path_1.join)(process.cwd(), 'public/browser');
console.log('📁 Checking Static Path:', publicPath);
console.log('📄 index.html exists?:', (0, fs_1.existsSync)((0, path_1.join)(publicPath, 'index.html')));
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            investments_module_1.InvestmentsModule,
            customers_module_1.CustomersModule,
            loans_module_1.LoansModule,
            open_orders_module_1.OpenOrdersModule,
            instruments_module_1.InstrumentsModule,
            sell_orders_module_1.SellOrdersModule,
            system_parameters_module_1.SystemParametersModule,
            dashboard_module_1.DashboardModule,
            live_market_data_module_1.LiveMarketDataModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: publicPath,
                exclude: ['/api/*path']
            }),
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            schedule_1.ScheduleModule.forRoot(),
            mailer_1.MailerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    transport: {
                        host: config.get('SMTP_HOST'),
                        port: config.get('SMTP_PORT'),
                        secure: false,
                        auth: {
                            user: config.get('SMTP_USER'),
                            pass: config.get('SMTP_PASS'),
                        },
                    },
                    defaults: {
                        from: `"System Backup" <${config.get('SMTP_USER')}>`,
                    },
                }),
            }),
            stock_list_module_1.StockListModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: (0, passport_1.AuthGuard)('jwt'),
            },
        ],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map