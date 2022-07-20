import { HTTP, UNIX } from "..";
import { BackupData } from "../types/responses/instance/backup";
import { Instance } from "./instance";

export class Backup {
    instance: Instance;
    private client: HTTP | UNIX;
    backup: BackupData;
    constructor(client: HTTP | UNIX, instance: Instance, backupData: BackupData) {
        console.log(backupData)
        this.backup = backupData
        this.client = client;
        this.instance = instance;
    }
    rename(name: string): Promise<Backup> {
        return new Promise((resolve, reject) => {
            this.client.post('/1.0/instances/' + this.instance.name() + '/backups/' + this.backup.name, {
                name: name   
            }).then(r => {

                var data = JSON.parse(r)
                this.client.get(data.operation + "/wait?timeout=-1").then(() => {
                    //console.log(name)
                    this.client.get('/1.0/instances/' + this.instance.name() + '/backups/' + name).then((da) => {
                        var response = JSON.parse(da)
                        //console.log(response + "ads")
                        resolve(
                            new Backup(this.client, this.instance, response.metadata)
                        )
                    }).catch(error => { 
                        reject(error)
                    }) 
 
                }).catch(error => { 
                    reject(error)
                })
            }).catch(error => {
                reject(error) 
            })
        })
    }
    delete(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.delete('/1.0/instances/' + this.instance.name() + '/backups/' + this.backup.name).then(() => {

            }).catch(error => {
                reject(error)
            })
        })
    }
}