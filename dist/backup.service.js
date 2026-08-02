"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var BackupService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackupService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const mailer_1 = require("@nestjs-modules/mailer");
const child_process_1 = require("child_process");
const util_1 = require("util");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const googleapis_1 = require("googleapis");
const execPromise = (0, util_1.promisify)(child_process_1.exec);
let BackupService = BackupService_1 = class BackupService {
    configService;
    mailerService;
    logger = new common_1.Logger(BackupService_1.name);
    constructor(configService, mailerService) {
        this.configService = configService;
        this.mailerService = mailerService;
    }
    async handleDailyBackup() {
        this.logger.log('Starting automated MySQL database backup...');
        const dbName = this.configService.get('DB_NAME');
        const dbHost = this.configService.get('DB_HOST');
        const dbUser = this.configService.get('DB_USER');
        const dbPass = this.configService.get('DB_PASS');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const fileName = `backup-${dbName}-${timestamp}.sql`;
        const filePath = path.join(process.cwd(), 'temp', fileName);
        if (!fs.existsSync(path.join(process.cwd(), 'temp'))) {
            fs.mkdirSync(path.join(process.cwd(), 'temp'));
        }
        try {
            const mysqldumpBin = this.configService.get('MYSQLDUMP_PATH') || 'mysqldump';
            const dumpCommand = `"${mysqldumpBin}" -h ${dbHost} -u ${dbUser} -p"${dbPass}" ${dbName} > "${filePath}"`;
            await execPromise(dumpCommand);
            this.logger.log(`Database dump created successfully: ${fileName}`);
            const { id, webViewLink } = await this.uploadToGoogleDrive(filePath, fileName);
            this.logger.log(`File uploaded to Google Drive. File ID: ${id}`);
            await this.sendNotification(true, `Backup successful! File saved as "${fileName}" (ID: ${id}), File: ${webViewLink}`);
        }
        catch (error) {
            this.logger.error('Backup failed!', error.stack);
            await this.sendNotification(false, `Backup failed. Error message: ${error.message}`);
        }
        finally {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                this.logger.log(`Local temporary file removed: ${filePath}`);
            }
        }
        return { message: 'Backup process completed. Check email for details.' };
    }
    async uploadToGoogleDrive(filePath, fileName) {
        const oauth2Client = new googleapis_1.google.auth.OAuth2(this.configService.get('GDRIVE_CLIENT_ID'), this.configService.get('GDRIVE_CLIENT_SECRET'));
        oauth2Client.setCredentials({
            refresh_token: this.configService.get('GDRIVE_REFRESH_TOKEN'),
        });
        const drive = googleapis_1.google.drive({ version: 'v3', auth: oauth2Client });
        const folderId = this.configService.get('GDRIVE_FOLDER_ID');
        const response = await drive.files.create({
            requestBody: {
                name: fileName,
                parents: folderId ? [folderId] : undefined,
            },
            media: {
                mimeType: 'application/sql',
                body: fs.createReadStream(filePath),
            },
            fields: 'id, webViewLink',
        });
        return {
            id: response.data.id,
            webViewLink: response.data.webViewLink,
        };
    }
    async sendNotification(success, details) {
        const recipient = this.configService.get('NOTIFICATION_EMAIL');
        const subject = success
            ? '🟢 MySQL Backup Success Report'
            : '🔴 MySQL Backup Failure Alert';
        try {
            await this.mailerService.sendMail({
                to: recipient,
                subject,
                html: `
          <h2>Database Backup Report</h2>
          <p><strong>Status:</strong> ${success ? '<span style="color:green;">SUCCESS</span>' : '<span style="color:red;">FAILED</span>'}</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          <p><strong>Details:</strong> ${details}</p>
        `,
            });
            this.logger.log(`Notification email sent to ${recipient}`);
        }
        catch (emailError) {
            this.logger.error('Failed to send notification email', emailError.stack);
        }
    }
};
exports.BackupService = BackupService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BackupService.prototype, "handleDailyBackup", null);
exports.BackupService = BackupService = BackupService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        mailer_1.MailerService])
], BackupService);
//# sourceMappingURL=backup.service.js.map