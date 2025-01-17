export interface LifecycleEvent {
    type: string,
    timestamp: string,
    metadata: {
      action: string,
      source: string,
      requestor: { username: string, protocol: string, address: string }
    },
    location: string
  }