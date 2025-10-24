import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ModeToggle } from "../ThemeToggle";

const mockSetTheme = jest.fn();

jest.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: mockSetTheme,
  }),
}));

describe("ModeToggle", () => {
  beforeEach(() => {
    mockSetTheme.mockClear();
  });

  it("renders the theme toggle button", () => {
    render(<ModeToggle />);
    const button = screen.getByRole("button", { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
  });

  it("opens dropdown menu when clicked", async () => {
    const user = userEvent.setup();
    render(<ModeToggle />);

    const button = screen.getByRole("button", { name: /toggle theme/i });
    await user.click(button);

    expect(screen.getByRole("menuitem", { name: /light/i })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: /dark/i })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: /system/i })).toBeInTheDocument();
  });

  it("calls setTheme with 'light' when Light is clicked", async () => {
    const user = userEvent.setup();
    render(<ModeToggle />);

    const button = screen.getByRole("button", { name: /toggle theme/i });
    await user.click(button);

    const lightOption = screen.getByRole("menuitem", { name: /light/i });
    await user.click(lightOption);

    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });

  it("calls setTheme with 'dark' when Dark is clicked", async () => {
    const user = userEvent.setup();
    render(<ModeToggle />);

    const button = screen.getByRole("button", { name: /toggle theme/i });
    await user.click(button);

    const darkOption = screen.getByRole("menuitem", { name: /dark/i });
    await user.click(darkOption);

    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("calls setTheme with 'system' when System is clicked", async () => {
    const user = userEvent.setup();
    render(<ModeToggle />);

    const button = screen.getByRole("button", { name: /toggle theme/i });
    await user.click(button);

    const systemOption = screen.getByRole("menuitem", { name: /system/i });
    await user.click(systemOption);

    expect(mockSetTheme).toHaveBeenCalledWith("system");
  });
});
