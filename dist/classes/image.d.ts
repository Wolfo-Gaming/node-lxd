import { Client, HTTP, UNIX } from "..";
import { ImageMeta } from "../types/responses/image/metadata";
export default class Image {
    private client;
    meta: ImageMeta;
    constructor(root: Client, client: UNIX | HTTP, data: ImageMeta);
    refetch(): Promise<void>;
    updateConfig(config: any): Promise<void>;
    createAlias(alias: string, type: string, description?: string): Promise<void>;
    deleteAlias(alias: string): Promise<void>;
    renameAlias(alias: string, newName: string): Promise<void>;
    /**
     * Returns operation url
     */
    refresh(): Promise<string>;
    delete(): Promise<void>;
}
