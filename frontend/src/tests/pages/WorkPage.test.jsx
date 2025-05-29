import React from "react";
import { render, screen } from "@testing-library/react";
import WorkPage from "../../pages/WorkPage";

jest.mock("../../components/stack/TechStack", () => () => (
  <div data-testid="techstack-mock">TechStack Component</div>
));

jest.mock("../../components/card/work/WorkCard", () => () => (
  <div data-testid="workcard-mock">WorkCard Component</div>
));

describe("WorkPage", () => {
  test("renders WorkCard, and Techstack components", async () => {
    render(<WorkPage />);

    expect(screen.getByText(/Partners \+ Projects/i)).toBeInTheDocument();
    expect(screen.getByText(/Technologies We Work With/i)).toBeInTheDocument();

    // Check that mocked WorkCard is rendered
    expect(screen.getByTestId("workcard-mock")).toBeInTheDocument();

    // Check for the fallback loading message from Suspense before Techstack loads
    expect(screen.getByText(/Loading tech stack.../i)).toBeInTheDocument();

    // Wait for the lazy-loaded Techstack to appear
    const techstack = await screen.findByTestId("techstack-mock");
    expect(techstack).toBeInTheDocument();
  });
});
