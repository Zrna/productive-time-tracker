import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";

import { Button } from "./Button";

describe("Button component", () => {
  it("renders correctly with given props", () => {
    render(<Button type="button" isDisabled={false} text="Click Me" />);
    const buttonElement = screen.getByText("Click Me");

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute("type", "button");
    expect(buttonElement).not.toBeDisabled();
  });

  it("renders Button as disabled when isDisabled prop is true", () => {
    render(<Button type="button" isDisabled text="Click Me" />);
    const buttonElement = screen.getByText("Click Me");

    expect(buttonElement).toBeDisabled();
  });

  it("calls onClick function when clicked", () => {
    const handleClick = jest.fn();
    render(<Button type="button" isDisabled={false} text="Click Me" onClick={handleClick} />);
    const buttonElement = screen.getByText("Click Me");
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
