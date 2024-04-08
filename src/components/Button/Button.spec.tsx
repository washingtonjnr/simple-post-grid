// to test
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
// component
import Button from ".";

describe("<Button />", () => {
  // - Check on children PROP
  it("should render the button with the o text 'Continue'", () => {
    // Render the button
    render(<Button>Continue</Button>);

    // Expect at least one assertion
    expect.assertions(1);

    const button = screen.getByRole("button", { name: /Continue/i });

    expect(button).toHaveAttribute("class", "btn-pattern");
  });

  // - Check on onClick function
  it("should call function on button click", () => {
    const fn = jest.fn()

    render(<Button onClick={fn}>Continue</Button>);

    const button = screen.getByRole("button", { name: /Continue/i });
    userEvent.click(button)

    expect(fn).toHaveBeenCalledTimes(1)
  })

  // - Check on disabled PROP
  it("should be disabled when disabled is true", () => {
    render(<Button disabled={true}>Continue</Button>);

    const button = screen.getByRole("button", { name: /Continue/i });

    expect(button).not.toBeDisabled()
  })
});
