import React, { useState } from "react";
import Todo from './Todo.js'
import NewTodoForm from './NewTodoForm.js'

const TodoList = () => {

    const [todos, setTodos] = useState([])

    const addTodo = (newTodo) => {
        setTodos(todos => [...todos, newTodo])
    }
    const removeTodo = (todo) => {
        setTodos(todos.filter(t => t.id !== todo.id))
    }
 
    const editTodo = (id, editedTask) => {
        const updatedTodos = todos.map(todo => 
            todo.id === id ? { ...todo, task: editedTask } : todo
        );
        setTodos(updatedTodos)
    }

    return (
        <div data-testid={`todolist`}>
            <NewTodoForm addTodo={ addTodo } />
            { todos.map(({ id, task }) => <Todo id={ id } 
                                                task={ task } 
                                                key={ id } 
                                                edit={ editTodo } 
                                                remove={ removeTodo } />)}
        </div>
    )
}

export default TodoList