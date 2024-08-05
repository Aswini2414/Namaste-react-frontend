import { render, screen } from "@testing-library/react";
import Contact from "../Contact";
import "@testing-library/jest-dom";

test("Should load contact us component", () => {
  render(<Contact />);

  //Querying
  const heading = screen.getByRole("heading");

  //Asserting
  expect(heading).toBeInTheDocument();
});

test("Should load button in contact us component", () => {
    render(<Contact />);

    //Querying
    const button = screen.getByRole("button");

    //Assertion
    expect(button).toBeInTheDocument();
});

test("Should load submit text in contact us component", () => {
    render(<Contact />);

    const submit = screen.getByText("Submit");
    expect(submit).toBeInTheDocument();
});

test("should two input boxes in contact component", () => {
    render(<Contact />);
    const inputBoxes = screen.getAllByRole("textbox");

    expect(inputBoxes[0]).toBeInTheDocument();
    
});