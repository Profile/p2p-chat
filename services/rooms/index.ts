import {apiCall} from "../index";

/** Room create request model. */
export interface ICreateRoomRq {
    username: string;
    roomName: string;
}
/** Room join request model. */
export interface IJoinRoomRq {
    username: string;
    roomId: string;
}

export interface ISuccessRoomActionRs {
    roomId: string;
    userId: string;
}

export const roomsEndpoints = {
    base () {
      return "/api/rooms"
    },
    create () {
        return `${this.base()}`
    },
    join () {
        return `${this.base()}/join`
    },
}


export const roomsServices = {
    async create(body: ICreateRoomRq): Promise<ISuccessRoomActionRs> {
        return await apiCall(roomsEndpoints.create(), {
            method: "POST",
            body
        });
    },
    async join(body: IJoinRoomRq): Promise<ISuccessRoomActionRs> {
        return await apiCall(roomsEndpoints.join(), {
            method: "POST",
            body
        });
    }
}