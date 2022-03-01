export interface OperationEvent {
    type: string,
    timestamp: string,
    metadata: {
      id: string,
      class: string,
      description: string,
      created_at: string,
      updated_at: string,
      status: string,
      status_code: number,
      resources: {},
      metadata: {},
      may_cancel: boolean,
      err: string,
      location: string
    },
    location: string
  }