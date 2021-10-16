import {useChatContext} from "../Context";
import {Header as ContentHeader} from "./Header";
import {Messages} from "./Messages";
import {MessageForm} from "./MessageForm";
import {IChatContext} from "./models";

export function Content () {
    const chatContext: IChatContext = useChatContext();

    return (
        <div className="w-full h-full z-10 relative flex flex-col">
            {
                chatContext?.room?.users && chatContext.user && (
                    <>
                        <ContentHeader room={chatContext.room} user={chatContext.user} />
                        <Messages chat={chatContext.chat} user={chatContext.user}  />
                        <MessageForm user={chatContext.user} />
                    </>
                )
            }
        </div>
    )
}