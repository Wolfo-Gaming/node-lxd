import { TypedEmitter } from 'tiny-typed-emitter';
import { RawData, WebSocket } from 'ws';
import { HTTP } from './classes/http';
import { Instance } from './classes/instance';
import { UNIX } from './classes/unix';
import { InstanceConfig } from './types/configs/instance';
import { CreateEvents } from './types/types';
import { Resources } from './types/types';
import { ImageAlias } from './types/ImageAliases';
export type InstanceOptions = {
    config?: InstanceConfig,
    image: string,
    raw?: any,
    description?: string,
    profiles?: ["default"|string],
    imageServer?: {
        url: string,
        protocol: string
    }
}
class Client {
    client: HTTP | UNIX;
    caluclateUsingHyperthreading: boolean;
    constructor(url: string, options: { type: "http" | "unix", rejectUnauthorized?: boolean, cert?: Buffer, key?: Buffer, caluclateUsingHyperthreading?: boolean }) {
        if (!options.caluclateUsingHyperthreading || options.caluclateUsingHyperthreading == true) {
            this.caluclateUsingHyperthreading = true
        } else if (options.caluclateUsingHyperthreading == false) {
            this.caluclateUsingHyperthreading = false;
        }
        if (options.type == "http") {
            if (!options.cert) throw new Error('Certificate not specified');
            if (!options.key) throw new Error('Key not specified');
            if (!options.rejectUnauthorized) options.rejectUnauthorized = false;
            this.client = new HTTP(url, {
                cert: options.cert,
                key: options.key,
                rejectUnauthorized: false
            })

        } else if (options.type == "unix") {
            if (url == null) url = UNIX.DEFAULT_SOCKET;
            this.client = new UNIX(url)
        } else {
            throw new Error('Connection type not specified')
        }
    }
    /**
     * Fetches LXD resource stats
     */
    fetchResources(): Promise<Resources> {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/resources', {}).then((data) => {
                // @ts-expect-error
                resolve(JSON.parse(data))
            }).catch(error => {
                reject(error)
            })
        })
    }
    connectEvents(type?: "operation" | "logging" | "lifecycle"): WebSocket {
        if (!type) {
            return this.client.websocket('/1.0/events')
        } else {
            return this.client.websocket('/1.0/events?type=' + type)
        }
    }
    fetchInstance(name: string): Promise<Instance> {
        return new Promise((resolve, reject) => {
            this.client.get('/1.0/instances/' + name).then(data => {
                // @ts-expect-error
                resolve(new Instance(this, this.client, JSON.parse(data).metadata))
            }).catch(error => {
                reject(error)
            })
        })
    }
    fetchInstances(): Promise<Instance[]> {
        return new Promise((resolve,reject) => {
            this.client.get('/1.0/instances?recursion=1').then((data) => {
                // @ts-expect-error
                var res = JSON.parse(data)
                var arr = res.metadata;
                var result = []
                for (const inst of arr) {
                    result.push(new Instance(this, this.client, inst))
                }
                resolve(result)
            })
        })
    }
    createInstance(name: string, options: InstanceOptions): Promise<TypedEmitter<CreateEvents>> {
        return new Promise(async (resolve, reject) => {

            try {
                var response = await this.client.post('/1.0/instances', {
                    name: name,
                    config: options.config ? options.config : {},
                    description: options.description ? options.description : "",
                    source: {
                        type: "image",
                        alias: options.image,
                        "server": options.imageServer.url ? options.imageServer.url :"https://images.linuxcontainers.org/",
                        "protocol": options.imageServer.protocol ? options.imageServer.protocol : "simplestreams"
                    },
                    ...options.raw
                })
                //console.log(response)
                //@ts-expect-error
                var res = JSON.parse(response)
                if (res.type == "error") {
                    return reject(res.error)
                }
                var waiter = new TypedEmitter<CreateEvents>()
                var events = this.connectEvents("operation")
                var operationID = res.metadata.id
                var self = this
                async function listener(d: RawData) {
                    var data = JSON.parse(d.toString())
                    if (data.metadata.id == operationID) {
                        if (data.metadata.status == "Failure") {
                            waiter.emit("error", new Error(data.metadata.err))
                            events.removeAllListeners()
                            events.close()
                        }
                        if (data.metadata.status == "Success") {
                            waiter.emit("finished", await self.fetchInstance(name))
                            events.removeAllListeners()
                            events.close()
                        }
                        if (!data.metadata.metadata) return;
                        if (data.metadata.metadata.download_progress) {
                            var s = data.metadata.metadata.download_progress.match(/: (.*)%/)
                            waiter.emit("progress", s[1])
                        }
                    }
                }
                events.on('message', listener)
            } catch (error) {
                return reject(error)
            }
            if (res.type == "error") {
                return reject(res.data)
            }
            //
            return resolve(waiter)
        })
    }
}
export { HTTP }
export { UNIX }
export { Client }