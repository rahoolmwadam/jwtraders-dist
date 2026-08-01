import { BackupService } from './backup.service';
export declare class AppController {
    private readonly backupService;
    constructor(backupService: BackupService);
    backup(): void;
}
