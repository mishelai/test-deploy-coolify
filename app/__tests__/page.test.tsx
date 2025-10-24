import { render, screen } from "@testing-library/react";
import LandingPage from "../page";

// Mock next-themes
jest.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: jest.fn(),
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ priority, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} data-priority={priority} />;
  },
}));

describe("LandingPage", () => {
  it("renders the main heading", () => {
    render(<LandingPage />);
    const heading = screen.getByRole("heading", {
      name: /Deploy Next.js Apps very easily/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<LandingPage />);
    const coolifyLink = screen.getByRole("link", { name: /Coolify Docs/i });
    expect(coolifyLink).toBeInTheDocument();
    expect(coolifyLink).toHaveAttribute("href", "https://coolify.io");
  });

  it("renders feature cards", () => {
    render(<LandingPage />);
    // Check for the main section heading first
    expect(screen.getByRole("heading", { name: /Why Deploy on Coolify?/i })).toBeInTheDocument();
    // Check for card content (cards use divs, not headings)
    expect(screen.getByText("Self-Hosted")).toBeInTheDocument();
    expect(screen.getByText("Easy Configuration")).toBeInTheDocument();
    expect(screen.getByText("Next.js Optimized")).toBeInTheDocument();
  });

  it("renders deployment steps", () => {
    render(<LandingPage />);
    // Check for the main section heading
    expect(screen.getByRole("heading", { name: /Deployment Steps/i })).toBeInTheDocument();
    // Check for step content
    expect(screen.getByText("Connect Repository")).toBeInTheDocument();
    expect(screen.getByText("Configure Build")).toBeInTheDocument();
    expect(screen.getByText("Deploy")).toBeInTheDocument();
  });

  it("renders call-to-action buttons", () => {
    render(<LandingPage />);
    const buttons = screen.getAllByRole("button", {
      name: /Watch Tutorial|Watch Full Tutorial/i,
    });
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("renders footer", () => {
    render(<LandingPage />);
    expect(
      screen.getByText(/Created for tutorial purposes/i)
    ).toBeInTheDocument();
  });

  it("includes proper external link attributes", () => {
    render(<LandingPage />);
    const externalLinks = screen.getAllByRole("link", {
      name: /Coolify Docs|GitHub|YouTube/i,
    });
    externalLinks.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noreferrer");
    });
  });
});
