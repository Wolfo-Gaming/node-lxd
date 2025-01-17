export class LifecycleEvent<ctx> {
    action: string;
    requestor: string;
    source: string;
    context: ctx;
}
export class OperationEvent<metadata> {
    id: string;
    class: "task" | "token" | "websocket";
    description: string;
    created_at: string;
    updated_at: string;
    status: string;
    status_code: number;
    resources: string;
    metadata: metadata
    may_cancel: boolean;
    err: string;
    location: string;
}