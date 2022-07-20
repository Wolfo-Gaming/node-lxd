export type NetworkMeta = {
  "config": any,
  "description": string,
  "locations": string[],
  "managed": boolean,
  "name": string,
  "status": "Pending" | "Created" | "Errored" | "Unknown" | "Unavailable",
  "type": string,
  "used_by": string[],
}