import { BackupService } from './backup.service';
export declare class AppController {
    private readonly backupService;
    constructor(backupService: BackupService);
    backup(): Promise<{
        message: string;
    }>;
    poweroff(): Promise<{
        message: string;
    }>;
}
