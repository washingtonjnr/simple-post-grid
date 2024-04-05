// test
import { render, screen } from "@testing-library/react";
// component
import Header from ".";

describe("<Header />", () => {
  // - Checking if the Header renders
  it("should render the header with the logo", () => {
    // Render the button
    render(<Header />);
    
    const header = screen.getByRole("header");
    
    // Check if the "app-header" class in Header component
    expect(header).toHaveAttribute("class", "app-header");
  });
});
