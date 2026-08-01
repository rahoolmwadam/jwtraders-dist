import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
export declare class BackupService {
    private readonly configService;
    private readonly mailerService;
    private readonly logger;
    constructor(configService: ConfigService, mailerService: MailerService);
    handleDailyBackup(): Promise<void>;
    private uploadToGoogleDrive;
    private sendNotification;
}
