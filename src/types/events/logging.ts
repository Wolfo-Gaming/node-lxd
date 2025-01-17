export interface LoggingEvent {
    type: string,
    timestamp: string,
    metadata: {
        message: string,
        level: string,
        context: {}
    },
    location: string
}