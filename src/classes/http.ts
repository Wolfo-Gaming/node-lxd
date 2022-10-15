import { Axios, AxiosRequestConfig } from "axios";
import { WebSocket } from "ws"
import { Agent } from "https"
export class HTTP {
  axios: Axios;
  agent: Agent;
  url: URL;
  options: { cert: Buffer, key: Buffer, rejectUnauthorized: boolean };

  get(url: string, config?: AxiosRequestConfig): Promise<any> {
    return new Promise((resolve, reject) => {
      this.axios.get(url, config).then((data) => {
        if (data.status == 403) {
          reject(data);
        } else {
          resolve(data.data);
        }
      }).catch((error) => {
        reject(error)
      })
    })
  }
  post(url: string, data: any, config?: AxiosRequestConfig): Promise<any> {
    return new Promise((resolve, reject) => {
      this.axios.post(url, JSON.stringify(data), config).then((data) => {
        if (data.status == 403) {
          reject(data);
        } else {
          resolve(data.data);
        }
      }).catch((error) => {
        reject(error)
      })
    })
  }
  put(url: string, data: any, config?: AxiosRequestConfig): Promise<any> {
    return new Promise((resolve, reject) => {
      this.axios.put(url, JSON.stringify(data), config).then((data) => {
        if (data.status == 403) {
          reject(data);
        } else {
          resolve(data.data);
        }
      }).catch((error) => {
        reject(error)
      })
    })
  }
  patch(url: string, data: any, config?: AxiosRequestConfig): Promise<any> {
    return new Promise((resolve, reject) => {
      this.axios.patch(url, JSON.stringify(data), config).then((data) => {
        if (data.status == 403) {
          reject(data);
        } else {
          resolve(data.data);
        }
      }).catch((error) => {
        reject(error)
      })
    })
  }
  delete(url: string, config?: AxiosRequestConfig): Promise<any> {
    return new Promise((resolve, reject) => {
      this.axios.delete(url, config).then((data) => {
        if (data.status == 403) {
          reject(data);
        } else {
          resolve(data.data);
        }
      }).catch((error) => {
        reject(error)
      })
    })
  }
  websocket(url: string): WebSocket {
    return new WebSocket("wss://" + this.url.hostname + ":" + this.url.port + url, {
      rejectUnauthorized: false,
      cert: this.options.cert,
      key: this.options.key
    })
  }
  constructor(url: string, options: { cert: Buffer, key: Buffer, rejectUnauthorized: boolean }) {
    this.url = new URL(url);
    this.options = options
    this.agent = new Agent({
      cert: options.cert,
      key: options.key,
      rejectUnauthorized: options.rejectUnauthorized ? options.rejectUnauthorized : false
    })
    this.axios = new Axios({
      baseURL: url,
      httpsAgent: this.agent
    })
  }
}