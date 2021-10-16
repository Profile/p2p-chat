import {IUser} from "../Context";

export interface IChatContext {
    room?: {
        name: string,
        id: string,
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