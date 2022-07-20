export type StoragePoolMetadata = {
  "config": any,
  "description": string,
  "driver": "btrfs" | "ceph" | "cephfs" | "dir" | "lvm" | "zfs",
  "locations": string[],
  "name": string,
  "status": "Pending" | "Created" | "Errored" | "Unknown",
  "used_by": string[],
}