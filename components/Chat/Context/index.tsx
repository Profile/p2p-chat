import React, {useEffect, useState} from "react";
import SocketIOClient from "socket.io-client";
import {Loading} from "../../Loading";

export interface IMsg {
    user: string;
    msg: string;
}


export function ChatContext ({children}: { children: React.ReactNode }) {
    // connected flag
    const [connected, setConnected] = useState<boolean>(false);
    // init chat and message
    const [chat, setChat] = useState<IMsg[]>([]);
    const [msg, setMsg] = useState<string>("");

    console.log(connected)

    useEffect((): any => {
        // connect to socket server
        const socket = SocketIOClient.connect(process.env.BASE_URL, {
            path: "/api/socketio",
        });

        // log socket connection
        socket.on("connect", () => {
            // console.log("SOCKET CONNECTED!", socket.id);
            setConnected(true);
        });

        // update chat on new message dispatched
        socket.on("message", (message: IMsg) => {
            chat.push(message);
            setChat([...chat]);
        });

        // socket disconnet onUnmount if exists
        if (socket) return () => socket.disconnect();
    }, []);

    return <Loading visible={!connected} message={"Connecting..."}>
        {children}
    </Loading>
}