import {useChatContext} from "../Context";
import {Header as ContentHeader} from "./Header";
import {Messages} from "./Messages";
import {MessageForm} from "./MessageForm";

export function Content () {
    const chatContext = useChatContext();
    console.log(chatContext)

    return (
        <div className="w-full h-full z-10 relative flex flex-col">
            {
                chatContext?.room?.users && chatContext.socket && (
                    <>
                        <ContentHeader />
                        <Messages chat={chatContext.chat} socket={chatContext.socket}  />
                        <MessageForm user={chatContext.room.users[chatContext.socket.id]} />
                    </>
                )
            }
        </div>
    )
}