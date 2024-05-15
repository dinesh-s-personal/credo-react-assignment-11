import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppRoutes } from "../../router/routes";
import axios from "axios";

export const EditItem = () => {
    const objNavigate = useNavigate();

    const { id } = useParams();

    const [txtArea, setTextArea] = React.useState('');
    const [todoDate, setTodoDate] = React.useState(new Date());
    const [isLoading, setLoading] = React.useState(false);
    const [isError, setError] = React.useState(false);
    
    const updateTextArea = (e) => {
        setTextArea(e.target.value);
    }

    const btnBack = () => {
        objNavigate(AppRoutes.todoapp);
    }

    const getItemToEdit = () => {
        setLoading(true);
        setError(false);
        axios.get('https://664189a13d66a67b34341c2e.mockapi.io/api/v1/todos/' + id)
            .then((response) => {
                setTextArea(response.data.title);
                setTodoDate(response.data.date.toString());
            })
            .catch((error) => {
                console.log(error);
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    React.useEffect(() => {
        getItemToEdit();
        // eslint-disable-next-line
    },[id]);



    const btnUpdateTodo = () => {
        setLoading(true);
        setError(false);
        axios.put('https://664189a13d66a67b34341c2e.mockapi.io/api/v1/todos/' + id, {
            "title": txtArea,
            "date": todoDate,
            "updated_at": new Date().toString()
          })
        .then((response) => {
            alert('Todo item edited successfully');
            objNavigate(AppRoutes.todoapp);
        })
        .catch((error) => {
            console.log(error);
            alert('Error while editting todo item! Check the console log.');
            setError(true);
        })
        .finally(() => {
            setLoading(false);
        })
    }

    return <div className="App">
        <h2>Edit ToDo List Item</h2>

        {
            isLoading && <div style={{height: "200px", width: "100%"}}>
                <span><b>Loading...</b></span>
            </div>
        }
        {
            isError && <div style={{height: "200px", width: "100%"}}>
                <span><b>Error while fetching/updating the todo item through API!!! Please check the console log.</b></span>
            </div>
        }

        {
            !isLoading && !isError && <div>
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
            </div>
        }
        <br/>
        <br/>
        <button className="btnCls" onClick={btnUpdateTodo}>Update Todo</button>
        <button className="btnCls" onClick={btnBack}>Go Back</button>
    </div>
};