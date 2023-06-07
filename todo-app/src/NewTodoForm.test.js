import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NewTodoForm from './NewTodoForm.js'
import TodoList from './TodoList.js'


it("renders without crashing", () => {
    render(<NewTodoForm />);
});
  
it("matches snapshot", () => {
    const { asFragment } = render(<NewTodoForm />);
    expect(asFragment()).toMatchSnapshot();
});


it("handles adding a new item", () => {
    // Render todolist which contains NewTodoForm 
    // Rendering todolist allows us to test that todos are created on form submission
    const { getByLabelText, getByText, getByTestId } = render(<TodoList />);

    // Submit todo through form
    const todoInput = getByLabelText('Todo:')
    const submitBtn = getByTestId('submitNewBtn')
    fireEvent.change(todoInput, { target: { value: 'Test' }})
    fireEvent.click(submitBtn);

    // Test that todo element is generated in the doc upon submission
    expect(getByText('Test')).toBeInTheDocument()
})
