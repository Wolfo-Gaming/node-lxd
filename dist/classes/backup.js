"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Backup = void 0;
class Backup {
    constructor(client, instance, backupData) {
        console.log(backupData);
        this.backup = backupData;
        this.client = client;
        this.instance = instance;
    }
    rename(name) {
        return new Promise((resolve, reject) => {
            this.client.post('/1.0/instances/' + this.instance.name() + '/backups/' + this.backup.name, {
                name: name
            }).then(r => {
                var data = JSON.parse(r);
                this.client.get(data.operation + "/wait?timeout=-1").then(() => {
                    //console.log(name)
                    this.client.get('/1.0/instances/' + this.instance.name() + '/backups/' + name).then((da) => {
                        var response = JSON.parse(da);
                        //console.log(response + "ads")
                        resolve(new Backup(this.client, this.instance, response.metadata));
                    }).catch(error => {
                        reject(error);
                    });
                }).catch(error => {
                    reject(error);
                });
            }).catch(error => {
                reject(error);
            });
        });
    }
    delete() {
        return new Promise((resolve, reject) => {
            this.client.delete('/1.0/instances/' + this.instance.name() + '/backups/' + this.backup.name).then(() => {
            }).catch(error => {
                reject(error);
            });
        });
    }
}
exports.Backup = Backup;
