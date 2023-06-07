import React from "react";
import { render } from "@testing-library/react";
import Todo from './Todo.js'

it("renders without crashing", () => {
    render(<Todo id={1} task={'Testing'} />);
});

it("matches snapshot", () => {
    const { asFragment } = render(<Todo id={1} task={'Testing'} />);
    expect(asFragment()).toMatchSnapshot();
});