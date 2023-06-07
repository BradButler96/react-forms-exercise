import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoList from './TodoList.js'

it("renders without crashing", () => {
    render(<TodoList />);
});
  
it("matches snapshot", () => {
    const { asFragment } = render(<TodoList />);
    expect(asFragment()).toMatchSnapshot();
});
  
it("handles delete todo button click", () => {
    const { getByTestId, getByLabelText } = render(<TodoList />);

    // Add todo
    const todoInput = getByLabelText('Todo:')
    const addTodoBtn = getByTestId('submitNewBtn')
    fireEvent.change(todoInput, { target: { value: 'Test' }})
    fireEvent.click(addTodoBtn);

    const todoContainer = getByTestId('todo')
    const deleteBtn = getByTestId('delete-btn')
    // Test that todo is in document
    expect(todoContainer).toBeInTheDocument()
    // Click delete button
    fireEvent.click(deleteBtn)
    // Test that todo is not in the document
    expect(todoContainer).not.toBeInTheDocument()
})

it("handles edit todo", () => {
    const { getByTestId, getByLabelText, getByText } = render(<TodoList />);

    // Add todo
    const todoInput = getByLabelText('Todo:')
    const addTodoBtn = getByTestId('submitNewBtn')
    fireEvent.change(todoInput, { target: { value: 'Test' }})
    fireEvent.click(addTodoBtn);

    // Test for standard todo container with appropriate text
    const todoContainer = getByTestId('todo')
    expect(todoContainer).toBeInTheDocument()

    // Test that correct text was inserted
    expect(getByText('Test')).toBeInTheDocument()

    // Click edit todo button
    const editBtn = getByTestId('edit-btn')
    fireEvent.click(editBtn)

    // Test that edit todo container has replaced standard todo container
    const editTodoContainer = getByTestId('edit-todo')
    expect(editTodoContainer).toBeInTheDocument()

    // Update the edit todo input
    const editTodoInput = getByTestId('edit-todo-input')
    fireEvent.change(editTodoInput, { target: { value: 'Edited Todo' }})

    // Submit edited todo
    const submitEditInput = getByTestId('submit-edit-btn')
    fireEvent.click(submitEditInput);

    // Test for updated task text
    expect(getByText('Edited Todo')).toBeInTheDocument()
})

it("handles cancelling edit todo", () => {
    const { getByTestId, getByLabelText, getByText } = render(<TodoList />);

    // Add todo
    const todoInput = getByLabelText('Todo:')
    const addTodoBtn = getByTestId('submitNewBtn')
    fireEvent.change(todoInput, { target: { value: 'Test' }})
    fireEvent.click(addTodoBtn);

    // Test for standard todo container with appropriate text
    const todoContainer = getByTestId('todo')
    expect(todoContainer).toBeInTheDocument()

    // Test that correct text was inserted
    expect(getByText('Test')).toBeInTheDocument()

    // Click edit todo button
    const editBtn = getByTestId('edit-btn')
    fireEvent.click(editBtn)

    // Test that edit todo container has replaced standard todo container
    const editTodoContainer = getByTestId('edit-todo')
    expect(editTodoContainer).toBeInTheDocument()

    // Click cancel edit button
    const cancelEditBtn = getByTestId('cancel-edit-btn')
    fireEvent.click(cancelEditBtn)

    // Test for standard todo container with appropriate text
    expect(todoContainer).toBeInTheDocument()

    // Test that text was unchanged
    expect(getByText('Test')).toBeInTheDocument()
})
