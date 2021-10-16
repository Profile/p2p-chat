import {Message} from "../Message";
import {useEffect, useRef} from "react";
import {IChatContext, IMessage} from "../models";
import {use} from "ast-types";

export function Messages({chat, user}: IChatContext) {

     const elRef = useRef(null);
     const isMine = (message: IMessage) => {
        return message.user.id === user?.id
    }

    const playReceiveSound = async () => {
        const receiveAudio = await new Audio('/sounds/receive.mp3')
        receiveAudio.play()
    };

    useEffect(() => {
        if(!chat.length) return

        playReceiveSound();

        if(elRef.current) {
            //@ts-ignore
            elRef.current.scrollIntoView({ behavior: "smooth" })
        }

    }, [chat.length]);

    const isNextSamePerson = (item: any, itemIndex: number) => {
        // const before = chat[itemIndex - 1]?.user.id === item?.user.id;
        return chat[itemIndex + 1]?.user.id === item?.user.id;
    }

    return (
        <div className="messages-list bg-chat-content overflow-y-auto px-8 py-3 flex-1" ref={elRef}>
            {
                chat.map((item: IMessage, itemIndex: number) =>(
                    <div className={`mb-4 flex justify-${isMine(item) ? 'end' : 'start'}`} key={itemIndex}>
                       <div ref={ itemIndex === chat.length - 1 ? elRef: null }>
                           <div className={`max-w-lg flex items-center justify-${isMine(item) ? 'end' : 'start'} flex-shrink-0`}>
                               {
                                   // !isNextSamePerson(item, itemIndex) //TODO: it works but I don`t like
                                   !isMine(item) && (
                                       <div className="w-full">
                                           {/*<p className="text-xs text-gray-200 mb-3">*/}
                                           {/*    {item.user.username}*/}
                                           {/*</p>*/}
                                           <div className="flex rounded-full items-center mb-3">
                                               <img className="rounded-full mr-3 border-2" src={`https://picsum.photos/50?q=${item.user?.id}`} alt=""/>
                                           </div>
                                       </div>
                                   )
                               }
                               <div className="flex items-center">
                                   <div className={`mb-2 bg-message-item-${isMine(item) ? 'sent' : 'receive'} text-white px-5 py-3 text-sm rounded-smooth`}>
                                       <div className="flex flex-col">
                                           <span className="text-sm text-gray-400 italic">{item.user.username}</span>
                                           <Message item={item} />
                                       </div>
                                   </div>
                               </div>
                           </div>
                           <p className="text-xs text-gray-200">
                               {(new Date(item.sentDate)).toLocaleString()}
                           </p>
                       </div>
                    </div>
                ))
            }
        </div>
    )
}