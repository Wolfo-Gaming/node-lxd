export type ImageMeta = {
    "aliases": {
        "description": string,
        "name": string
    }[],
    "architecture": string,
    "auto_update": boolean,
    "cached": boolean,
    "created_at": string,
    "expires_at": string,
    "filename": string,
    "fingerprint": string,
    "last_used_at": string,
    "profiles": string[],
    "properties": {
        "os": string,
        "release": string,
        "variant": string
    },
    "public": boolean,
    "size": number,
    "type": string,
    "update_source": {
        "alias": string,
        "certificate": string,
        "image_type": string,
        "protocol": string,
        "server": string
    },
    "uploaded_at": string
}