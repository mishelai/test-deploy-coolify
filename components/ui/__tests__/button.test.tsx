import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../button";

describe("Button", () => {
  it("renders with text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("handles click events", async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);
    await user.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("can be disabled", () => {
    render(<Button disabled>Disabled button</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("applies default variant class", () => {
    render(<Button>Default</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-primary");
  });

  it("applies destructive variant class", () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-destructive");
  });

  it("applies outline variant class", () => {
    render(<Button variant="outline">Outline</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("border");
  });

  it("applies secondary variant class", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-secondary");
  });

  it("applies ghost variant class", () => {
    render(<Button variant="ghost">Ghost</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("hover:bg-accent");
  });

  it("applies link variant class", () => {
    render(<Button variant="link">Link</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("text-primary");
  });

  it("applies small size class", () => {
    render(<Button size="sm">Small</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("h-8");
  });

  it("applies large size class", () => {
    render(<Button size="lg">Large</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("h-10");
  });

  it("applies icon size class", () => {
    render(<Button size="icon" aria-label="Icon button" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("size-9");
  });

  it("applies custom className", () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });
});
