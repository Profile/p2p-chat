import {IUser} from "../Context";

export interface IChatContext {
    room?: {
        users: IUser[]
    },
    socket?: any;
    chat?: any;
    user?: IUser | null
}

export interface IMessage {
    socketId?: string;
    message?: string;
    user?: any;
    sentDate: Date;
}