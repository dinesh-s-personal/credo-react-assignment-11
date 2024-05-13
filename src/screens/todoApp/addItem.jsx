import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppRoutes } from "../../router/routes";

export const AddItem = () => {

    const objNavigate = useNavigate();
    const [txtArea, setTextArea] = React.useState('');
    const updateTextArea = (e) => {
        setTextArea(e.target.value);
    }

    const btnBack = () => {
        objNavigate(-1);
    }

    const btnAddTodo = () => {
        axios.post('https://664189a13d66a67b34341c2e.mockapi.io/api/v1/todos', {
            "title": txtArea,
            "date": "Mon May 14 2024 02:02:51 GMT+0530 (India Standard Time)",
            "is_completed": false,
            "created_at": "Mon May 13 2024 07:32:51 GMT+0530 (India Standard Time)",
            "updated_at": "Mon May 13 2024 07:32:51 GMT+0530 (India Standard Time)"
          })
            .then((response) => {
                alert('Data added successfully');
                objNavigate(AppRoutes.todoapp);
            })
            .catch((error) => {
                console.log(error);
                alert('Error while adding data! Check the error log.');
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
        <input type="date" className="inputCls"></input>

        <br/>
        <br/>
        <button className="btnCls" onClick={btnAddTodo}>Add Todo</button>
        <button className="btnCls" onClick={btnBack}>Go Back</button>
    </div>
};