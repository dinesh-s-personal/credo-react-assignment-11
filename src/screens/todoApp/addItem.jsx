import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppRoutes } from "../../router/routes";

export const AddItem = () => {

    const objNavigate = useNavigate();

    const [txtArea, setTextArea] = React.useState('');
    const [todoDate, setTodoDate] = React.useState(new Date());
    
    const updateTextArea = (e) => {
        setTextArea(e.target.value);
    }

    const btnBack = () => {
        objNavigate(AppRoutes.todoapp);
    }

    const btnAddTodo = () => {
        axios.post('https://664189a13d66a67b34341c2e.mockapi.io/api/v1/todos', {
            "title": txtArea,
            "date": todoDate,
            "is_completed": false,
            "created_at": new Date().toString(),
            "updated_at": new Date().toString(),
            "completed_on": ''
          })
            .then((response) => {
                alert('Todo item added successfully');
                objNavigate(AppRoutes.todoapp);
            })
            .catch((error) => {
                console.log(error);
                alert('Error while adding todo item! Check the console log.');
            })
            .finally()
    }

    return <div className="App">
        <h2>Add Item to ToDo List</h2>

        <label className="labelCls">Description</label>
        <textarea 
            type="text" 
            id="desc" 
            name="desc" 
            placeholder="Enter details to add to the todo list"
            style={{height: "200px", width: "238px"}}
            className="input-cls"
            value={txtArea}
            onChange={updateTextArea}>
        </textarea>
        <br/>
        <br/>
        <label className="labelCls">Date</label>
        <input type="date" className="inputCls" value={todoDate} onChange={(e) => setTodoDate(e.target.value)}></input>

        <br/>
        <br/>
        <button className="btnCls" onClick={btnAddTodo}>Add Todo</button>
        <button className="btnCls" onClick={btnBack}>Go Back</button>
    </div>
};