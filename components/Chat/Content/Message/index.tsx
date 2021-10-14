import {IMessage} from "../models";

interface IProps {
    item: IMessage;
}

export function Message ({item}: IProps) {

    return (
        <span className="break-words">
            {item.message}
        </span>
    )

}