import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { Icon } from "./Icon";

describe("Icon", () => {
  it("renders an SVG with correct aria-label", () => {
    render(<Icon iconName="bell" data-testid="icon" ariaLabel="Bell Icon" />);

    const svg = screen.getByTestId("icon");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-label", "Bell Icon");
    expect(svg.tagName.toLowerCase()).toBe("svg");
  });
});