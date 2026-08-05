import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { ServerControlService } from './server-control.service';
export declare class BackupService {
    private readonly configService;
    private readonly mailerService;
    private readonly serverControlService;
    private readonly logger;
    constructor(configService: ConfigService, mailerService: MailerService, serverControlService: ServerControlService);
    handleDailyBackup(): Promise<{
        message: string;
    }>;
    private uploadToGoogleDrive;
    private sendNotification;
    powerOff(): {
        message: string;
    };
}
