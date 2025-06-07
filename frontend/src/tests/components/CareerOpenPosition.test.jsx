import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CareerOpenPosition from "../../components/career/CareerOpenPosition";

describe("CareerOpenPosition component", () => {
  it("renders the role information", () => {
    render(
      <CareerOpenPosition
        title="Senior Designer"
        location="UK/Europe"
        type="Full-time"
        onClick={() => {}}
      />
    );

    expect(screen.getByText("Senior Designer")).toBeInTheDocument();
    expect(screen.getByText("UK/Europe")).toBeInTheDocument();
    expect(screen.getByText("Full-time")).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();

    render(
      <CareerOpenPosition
        title="Senior Designer"
        location="UK/Europe"
        type="Full-time"
        onClick={handleClick}
      />
    );

    fireEvent.click(screen.getByText("Senior Designer"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
