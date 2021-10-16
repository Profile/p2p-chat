import { render, screen, waitFor, getByText } from "@testing-library/react";
import {Loading} from "../index";

describe("Loading component", () => {

    it("should render default loading spinner", async () => {
        render(<Loading visible={true} />);
        expect(screen.findByTestId("defaultSpinner")).toBeTruthy();
    });

    it("should render message", () => {
        render(<Loading visible={true} message={"visible"} />);
        expect(screen.getByText("visible")).toBeTruthy();
    })

    it("should not render message", () => {
        const { container } = render(<Loading visible={false} message={<div className="visible">visible</div>} />);
        expect(container.querySelector(".visible")).toBeFalsy();
    })
});