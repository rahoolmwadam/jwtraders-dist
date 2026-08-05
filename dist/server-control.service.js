"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ServerControlService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerControlService = void 0;
const common_1 = require("@nestjs/common");
const child_process_1 = require("child_process");
let ServerControlService = ServerControlService_1 = class ServerControlService {
    logger = new common_1.Logger(ServerControlService_1.name);
    shutdownServer() {
        this.logger.warn('Initiating server shutdown sequence...');
        setImmediate(() => {
            (0, child_process_1.exec)('sudo /sbin/shutdown -h now "System shutdown triggered via NestJS API"', (error, stdout, stderr) => {
                if (error) {
                    this.logger.error(`Shutdown execution failed: ${error.message}`);
                    return;
                }
                if (stderr) {
                    this.logger.error(`Shutdown stderr: ${stderr}`);
                    return;
                }
                this.logger.log(`Shutdown output: ${stdout}`);
            });
        });
        return { message: 'Server shutdown initiated. System will power down in 1 minute.' };
    }
};
exports.ServerControlService = ServerControlService;
exports.ServerControlService = ServerControlService = ServerControlService_1 = __decorate([
    (0, common_1.Injectable)()
], ServerControlService);
//# sourceMappingURL=server-control.service.js.map