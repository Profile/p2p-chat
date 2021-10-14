import {Message} from "../Message";
import {useEffect} from "react";

export function Messages({chat, socket}) {

     const isMine = (message: number) => {
        return message.socketId === socket.id
    }

    const playReceiveSound = async () => {
        const receiveAudio = await new Audio('/sounds/receive.mp3')
        receiveAudio.play()
    };

    useEffect(() => {
        chat.length && playReceiveSound()
    }, [chat.length]);

    return (
        <div className="messages-list bg-chat-content overflow-y-auto px-8 py-3 flex-1">
            {
                chat.map((item, itemIndex) =>(
                    <div className={`mb-4 flex justify-${isMine(item) ? 'end' : 'start'}`} key={itemIndex}>
                        <div className="max-w-lg">
                            <p className="text-xs text-gray-100 mb-2">
                                {item.user.username}
                            </p>
                            <div className={`mb-2 bg-message-item-${isMine(item) ? 'sent' : 'receive'} text-white px-5 py-3 text-sm rounded-smooth`}>
                                <Message item={item} />
                            </div>
                            <p className="text-xs text-gray-200">
                                {item.sentDate}
                            </p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}