import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";

interface IMessageFormProps {
    user: {
        id: string
    }
}

export function MessageForm ({ user }: IMessageFormProps) {

    const [msg, setMsg] = useState<string>();


    function handleInputTyping (e:React.SyntheticEvent) {
        setMsg((e.target as HTMLTextAreaElement).value)
    }
    function handleFormSubmit (e: React.SyntheticEvent) {
        e.preventDefault();
        sendMessage()
    }

    function canSend () {

    }

    const sendMessage = async () => {
        if (!msg) {
            alert("Empty message")
        }
        // build message obj
        const message = {
            roomId: 1,
            userId: user.id,
            msg,
        };

        console.log(message)

        // dispatch message to other users
        const resp = await fetch("/api/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(message),
        });

        if (resp.ok) setMsg("");
    }

    return (
        <div className="px-8 py-4 bg-smooth border-t border-tiny">
            <div className="m-0 p-0 flex items-end">
                <div className="flex-1">
                    <textarea name="" id="" className="w-full" onChange={handleInputTyping}></textarea>
                </div>
                <button type="submit" className="w-14 p-4" onClick={handleFormSubmit}>
                    <FontAwesomeIcon icon={faPaperPlane} color="white" />
                </button>
            </div>
        </div>
    )
}