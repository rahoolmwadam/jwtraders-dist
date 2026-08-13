import { BackupService } from './backup.service';
import { AppService } from './app.service';
export declare class AppController {
    private readonly backupService;
    private readonly appService;
    constructor(backupService: BackupService, appService: AppService);
    backup(): Promise<{
        message: string;
    }>;
    poweroff(): Promise<{
        message: string;
    }>;
    importLiveFeed(spreadsheetId: string): Promise<any[]>;
}
