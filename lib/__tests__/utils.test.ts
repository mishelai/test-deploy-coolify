import { cn } from "../utils";

describe("cn utility", () => {
  it("merges class names correctly", () => {
    expect(cn("class-1", "class-2")).toBe("class-1 class-2");
  });

  it("handles conditional classes", () => {
    expect(cn("class-1", false && "class-2", "class-3")).toBe("class-1 class-3");
  });

  it("merges Tailwind classes correctly", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  it("handles empty input", () => {
    expect(cn()).toBe("");
  });

  it("handles undefined and null", () => {
    expect(cn("class-1", undefined, null, "class-2")).toBe("class-1 class-2");
  });

  it("handles arrays", () => {
    expect(cn(["class-1", "class-2"], "class-3")).toBe("class-1 class-2 class-3");
  });

  it("handles objects", () => {
    expect(cn({ "class-1": true, "class-2": false, "class-3": true })).toBe("class-1 class-3");
  });
});
