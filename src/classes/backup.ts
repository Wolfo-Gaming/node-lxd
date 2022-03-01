import { Client, HTTP, UNIX } from "..";
import { BackupData } from "../types/responses/instance/backup";
import { Instance } from "./instance";

export class Backup {
    instance: Instance;
    root: Client;
    client: HTTP | UNIX;
    backup: BackupData;
    constructor(root: Client, client: HTTP | UNIX, instance: Instance, backupData: BackupData) {
        console.log(backupData)
        this.backup = backupData
        this.root = root;
        this.client = client;
        this.instance = instance;
    }
    rename(name: string): Promise<Backup> {
       return new Promise((resolve,reject) => {
           this.client.post('/1.0/instances/' + this.instance.name() + '/backups/' + this.backup.name, {
               name: name
           }).then(r => {
               //@ts-expect-error
               var data = JSON.parse(r)
           })
       })
    }
}