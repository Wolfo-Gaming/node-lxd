import { HTTP, UNIX } from "..";
import { BackupData } from "../types/responses/instance/backup";
import { Instance } from "./instance";
export declare class Backup {
    instance: Instance;
    private client;
    backup: BackupData;
    constructor(client: HTTP | UNIX, instance: Instance, backupData: BackupData);
    rename(name: string): Promise<Backup>;
    delete(): Promise<void>;
}
