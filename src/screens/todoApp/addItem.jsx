import React from "react";
import { useNavigate } from "react-router-dom";

export const AddItem = () => {

    const objNavigate = useNavigate();

    const btnBack = () => {
        objNavigate(-1);
    }

    return <div className="App">
        <h2>Add Item to ToDo List</h2>

        <label className="label-cls">Description</label>
        <textarea 
            type="text" 
            id="desc" 
            name="desc" 
            placeholder="Enter details to add to the todo list"
            style={{height: "200px", width: "238px"}}
            className="input-cls"></textarea>
        <br/>
        <br/>
        <label className="label-cls">Date</label>
        <input type="date" className="input-cls"></input>

        <br/>
        <br/>
        <button className="btn-cls">Add Todo</button>
        <button className="btn-cls" onClick={btnBack}>Go Back</button>
    </div>
};