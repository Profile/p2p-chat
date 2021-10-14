export function ChatList () {
    return  <>
        {
            Array(50).fill(null).map((item, itemIndex) =>(
                <div className="peer block px-4 py-3 rounded cursor-pointer transition hover:bg-gray-900" key={itemIndex}>
                    <h4 className="name text-white text-md">Kush Gibson</h4>
                    <div className="overflow-ellipsis overflow-hidden flex">
                        <span className="last-message text-gray-400 text-xs truncate">Lorem ipsum asd d a d as das das d as d asd a s as Lorem ipsum asd d a d as das das d as d asd a s as </span>
                        <span className="last-message-date text-xs text-gray-300 px-1">12m</span>
                    </div>
                </div>
            ))
        }
    </>
}