import React, { useState } from "react";
import './todo.css'


const Todo = ({ id, task, edit, remove }) => {

    const [editTodo, setEditTodo] = useState(task)
    const [editing, setEditing] = useState(false)

    const handleDelete = (e) => {
        remove(e.target.previousSibling.previousSibling)
    }

    const handleEdit = (e) => {
        e.preventDefault();
        edit(id, editTodo)
        setEditing(false)
    }

    // Toggle edit input
    const toggleEdit = () => {
        editing ? setEditing(false) : setEditing(true)
    }

    // Update input value when changed
    const handleChange = (e) => {
        setEditTodo(e.target.value)
    }

    let todoContainer;
    
    !editing ? 
    todoContainer = (
        <div className='todo-container' data-testid={`todo`}>
            <div id={ id } className='task' data-testid={`task`}>{ task }</div>
            <button className='edit-btn' data-testid={`edit-btn`} onClick={ toggleEdit }>Edit</button>
            <button className='delete-btn' data-testid={`delete-btn`} onClick={ handleDelete }>X</button>
        </div>
    ) : 
    todoContainer = (
        <div className='todo-container' data-testid={`edit-todo`}>
            <input
                data-testid={`edit-todo-input`}
                type="text"
                value={ editTodo }
                onChange={ handleChange }
            />
            <button className='submit-edit-btn' data-testid={`submit-edit-btn`} onClick={ handleEdit }>Submit </button>
            <button className='cancel-edit-btn' data-testid={`cancel-edit-btn`} onClick={ toggleEdit }>Cancel</button>
        </div>
    )

    return todoContainer
}

export default Todo