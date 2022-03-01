"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Backup = void 0;
class Backup {
    constructor(root, client, instance, backupData) {
        console.log(backupData);
        this.backup = backupData;
        this.root = root;
        this.client = client;
        this.instance = instance;
    }
    rename(name) {
        return new Promise((resolve, reject) => {
            this.client.post('/1.0/instances/' + this.instance.name() + '/backups/' + this.backup.name, {
                name: name
            }).then(r => {
                //@ts-expect-error
                var data = JSON.parse(r);
            });
        });
    }
}
exports.Backup = Backup;
