import { render, screen, waitFor, getByText } from "@testing-library/react";
import {Messages} from "../index";

describe("Messages component", () => {

    it("should render default messages length properly", async () => {

        // We can use faker mock
        const user = {
            id:"1",
            roomId: "2",
            username: "hello",
            joined: new Date(),
            created: new Date(),
        };
        const chat = [{user}, {user}, {user}]

        render(<Messages chat={chat} user={user} />);
        expect(screen.getByTestId("messages").children.length).toBe(3)
    });

    it("should properly render my and others message length", async () => {

        const user = {
            id:"1",
            roomId: "2",
            username: "hello",
            joined: new Date(),
            created: new Date(),
        };

        const chat = [{ user:{ ...user, id: "3" } }, {user},{user}, {user}]
        const { container } = render(<Messages chat={chat} user={user} />);

        expect(container.querySelectorAll(".isMine").length).toBe(3)
        expect(container.querySelectorAll(".isOther").length).toBe(1)
    });
});