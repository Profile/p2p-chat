import {Message} from "../Message";

export function Messages() {

     function isMine (senderId: number) {
        return senderId % 2 === 0
    }

    return (
        <div className="messages-list bg-chat-content overflow-y-auto px-8 py-3 flex-1">
            {
                Array(5).fill(null).map((item, itemIndex) =>(
                    <div className={`mb-2 flex justify-${isMine(itemIndex) ? 'end' : 'start'}`}>
                        <div className="max-w-lg">
                            <div className={`bg-message-item-${isMine(itemIndex) ? 'sent' : 'receive'} text-white px-5 py-3 text-sm rounded-smooth`}>
                                <Message />
                            </div>
                            <p className="text-xs text-gray-200">12:30</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}