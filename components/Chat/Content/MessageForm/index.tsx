import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";
import {useRouter} from "next/router";

interface IMessageFormProps {
    user: {
        id: string
    }
}

export function MessageForm ({ user }: IMessageFormProps) {

    const [message, setMessage] = useState<string>();
    const router = useRouter();

    function handleInputTyping (e:React.SyntheticEvent) {
        setMessage((e.target as HTMLTextAreaElement).value)
    }
    function handleFormSubmit (e: React.SyntheticEvent) {
        e.preventDefault();
        sendMessage()
    }

    const sendMessage = async () => {
        if (!message) {
            alert("Empty message")
        }
        // build message obj
        const payload = {
            user,
            message,
        };

        // dispatch message to other users
        const resp = await fetch("/api/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });


        if (!resp.ok) return

        setMessage("");
        const sendAudio = await new Audio('/sounds/send.mp3')
        sendAudio.play();
    }

    return (
        <div className="px-8 py-4 bg-smooth border-t border-tiny">
            <div className="m-0 p-0 flex items-end">
                <div className="flex-1">
                    <textarea value={message} className="w-full" onChange={handleInputTyping}></textarea>
                </div>
                <button type="submit" className="w-14 p-4" onClick={handleFormSubmit}>
                    <FontAwesomeIcon icon={faPaperPlane} color="white" />
                </button>
            </div>
        </div>
    )
}