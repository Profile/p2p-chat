export interface IChatContext {
    room?: {
        users?: any[]
    },
    socket?: any;
    chat?: any
}

export interface IMessage {
    socketId?: string;
    message?: string;
    user?: any;
    sentDate: Date;
}