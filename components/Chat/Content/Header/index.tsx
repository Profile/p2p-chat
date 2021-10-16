import {IChatContext, IMessage} from "../models";
import {IUser} from "../../Context";

export function Header ({ room, user }: IChatContext) {
    const isMine = (chatUser: IUser) => {
        return chatUser.id === user?.id
    }
    return  (
        <div className="px-8 py-6 bg-smooth border-b">
            <h2 className="text-white text-2xl mb-4">
                <b className="font-bold">{room?.name}</b>
                <div>
                    <code className="text-sm">
                        {room?.id}
                    </code>
                </div>
            </h2>
            <div className="border-tiny flex items-center overflow-x-auto">
                {
                    Object.values(room?.users || {}).map((chatUser: IUser, index) => {
                        return (<div key={index} className="mr-4">
                            <div>
                                <img
                                    src={`https://picsum.photos/50?q=${chatUser?.id}`}
                                    alt={chatUser?.username}
                                    className="rounded-full border-4 max-w-sm mb-1"
                                />
                                <p className="text-white text-sm text-center">
                                    {
                                        isMine(chatUser) ? "You" : chatUser.username
                                    }
                                </p>
                            </div>
                        </div>)
                    })
                }
                <div className="ml-3"></div>
            </div>
        </div>
    )
}