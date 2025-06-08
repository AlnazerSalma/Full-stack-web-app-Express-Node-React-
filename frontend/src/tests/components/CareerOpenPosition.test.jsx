import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CareerOpenPosition from "../../components/career/CareerOpenPosition";
import mockCareer from "../__mocks_data__/mockCareer";

describe("CareerOpenPosition component", () => {
  it("renders the role information", () => {
    render(
      <CareerOpenPosition
        title={mockCareer.title}
        location={mockCareer.location}
        type={mockCareer.type}
        onClick={() => {}}
      />
    );

    expect(screen.getByText(mockCareer.title)).toBeInTheDocument();
    expect(screen.getByText(mockCareer.location)).toBeInTheDocument();
    expect(screen.getByText(mockCareer.type)).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();

    render(
      <CareerOpenPosition
        title={mockCareer.title}
        location={mockCareer.location}
        type={mockCareer.type}
        onClick={handleClick}
      />
    );

    fireEvent.click(screen.getByText(mockCareer.title));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
