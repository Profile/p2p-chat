import React, {createContext, useContext, useEffect, useState} from "react";
import { useRouter } from 'next/router'
import SocketIOClient from "socket.io-client";

import {Loading} from "../../Loading";

export interface IMsg {
    user: string;
    msg: string;
}

export interface INotification {
    username: string;
    msg: string;
}

interface IUser {
    id: string;
    username: string;
}

export const ChatContext = createContext({});

export function useChatContext() {
    return useContext(ChatContext);
}

export function ChatContextWrapper ({user, children}: { user:IUser, children: React.ReactNode }) {
    const [room, setRoom] = useState({ initial: true });
    const [socket, setSocket] = useState<any>();
    const [chat, setChat] = useState<IMsg[]>([]);
    const [notification, setNotification] = useState<INotification | null>(null);
    const router = useRouter();


    useEffect(() => {
        if(!router.query?.id) return;


        // const notificationAudio = new Audio('/sounds/notification.mp3')

        // connect to socket server
        //@ts-ignore
        const socketIO = SocketIOClient.connect(process.env.BASE_URL, {
            query: {
                roomId: router.query?.id
            }
        });

        // log socket connection
        socketIO.on("connect", () => {
            setSocket(socketIO);
            socketIO.emit("join", {
                roomId: router.query?.id,
                user
            });
        });

        socketIO.on("joined", (result: any) => {
            setRoom(result?.room);
        });

        socketIO.on("left", (result: any) => {
            setRoom(result?.room);
        });

        // update chat on new message dispatched
        socketIO.on("message", (message: IMsg) => {
            chat.push(message);
            setChat([...chat]);
            // setNotification(message)
        });

        // socket disconnet onUnmount if exists
        if (socketIO) return () => {
            socketIO.disconnect()
            setSocket(null);
        };
    }, [router.query?.id]);

    return (
        <ChatContext.Provider value={{room, chat, socket }}>
            {/*{*/}
            {/*    notification && (*/}
            {/*        <div className="absolute w-full flex items-center justify-center z-20">*/}
            {/*            <div className="mt-4 bg-green-500 px-12 py-4 rounded-smooth">*/}
            {/*                <div>new Message from { notification.username }</div>*/}
            {/*                <button className="bg-gray-900 text-white w-full" onClick={() => setNotification(null)}>*/}
            {/*                    Close*/}
            {/*                </button>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    )*/}
            {/*}*/}
            <Loading visible={!room} message={"Connecting..."}>
                {children}
            </Loading>
        </ChatContext.Provider>
    )
}