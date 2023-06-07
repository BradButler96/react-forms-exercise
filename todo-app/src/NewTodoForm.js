import React, { useState } from "react";
import { v4 as uuid } from 'uuid';


const NewTodoForm = ({ addTodo }) => {

    const initialState = { task: '' }

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo({ task: formData.task, id: uuid() });
        setFormData(initialState)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="task">Todo: </label>
            <input
                id="task"
                type="text"
                name="task"
                value={formData.task}
                onChange={handleChange}
            />

            <button id='submitNewBtn' data-testid={'submitNewBtn'}>Add Todo</button>
        </form>


    )
}

export default NewTodoForm