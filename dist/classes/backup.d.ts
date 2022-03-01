import { Client, HTTP, UNIX } from "..";
import { BackupData } from "../types/responses/instance/backup";
import { Instance } from "./instance";
export declare class Backup {
    instance: Instance;
    root: Client;
    client: HTTP | UNIX;
    backup: BackupData;
    constructor(root: Client, client: HTTP | UNIX, instance: Instance, backupData: BackupData);
    rename(name: string): Promise<Backup>;
}
