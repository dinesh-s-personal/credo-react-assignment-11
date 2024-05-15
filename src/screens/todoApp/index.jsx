import React from "react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../router/routes";
import axios from "axios";
import { Table } from "react-bootstrap";

export const TodoApp = () => {

    const objNavigate = useNavigate();
    
    const [ToDoData, setData] = React.useState([]);
    const [isLoading, setLoading] = React.useState(false);
    const [isError, setError] = React.useState(false);
    const [isDelError, setDelError] = React.useState(false);

    const btnBack = () => {
        localStorage.removeItem('loginStatus');
        objNavigate(AppRoutes.login);
    };

    const btnAddItem = () => {
        objNavigate(AppRoutes.additem);
    };

    const btnEditClick = (id) => {
        objNavigate('/editTodo/' + id);
    }

    const btnDeleteClick = (id) => {
        setLoading(true);
        if (window.confirm('Are you sure, you want to delete this todo item?'))
        {
            axios.delete('https://664189a13d66a67b34341c2e.mockapi.io/api/v1/todos/' + id)
                .then((response) => {
                    alert('Todo item deleted successfully');
                    reloadData();
                })
                .catch((error) => {
                    console.log(error);
                    setDelError(true);
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    }

    const btnMarkStatus = (id, status, completed_on) => {
        setLoading(true);
        axios.put('https://664189a13d66a67b34341c2e.mockapi.io/api/v1/todos/' + id, {
            "is_completed": status,
            "updated_at": new Date().toString(),
            "completed_on": status ? new Date().toString() : completed_on
          })
            .then((response) => {
                reloadData();
                if (status){
                    alert('Todo item marked as completed successfully');
                }else {
                    alert('Todo item marked as NOT completed successfully');
                }
            })
            .catch((error) => {
                console.log(error);
                setDelError(true);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const reloadData = () => {
        axios.get('https://664189a13d66a67b34341c2e.mockapi.io/api/v1/todos')
            .then((response) => {
                setData(response.data);
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
        setLoading(true);
        reloadData();
        // eslint-disable-next-line
    }, []);

    return <div className="App">
        <h2 className="show-heading-with-btn">TodoApp Page</h2>
        <button className="show-heading-with-btn btnCls button-container" onClick={btnBack}>Logout</button>
        <br/>
        <br/>
        {
            isLoading && <div style={{height: "200px", width: "100%"}}>
                <span><b>Loading...</b></span>
            </div>
        }
        {
            isError && <div style={{height: "200px", width: "100%"}}>
                <span><b>Error while loading the todo list through API!!! Please check the console log.</b></span>
            </div>
        }
        {
            isDelError && <div style={{height: "200px", width: "100%"}}>
                <span><b>Error while deleting the todo item!!! Please check the console log.</b></span>
            </div>
        }
        {
            !isLoading && !isError && !isDelError && <div className="scrollable-div">
                <Table>
                    <thead>
                        <tr>
                        <th>Sl.No</th>
                        <th>Description</th>
                        <th>Complete By</th>
                        <th>Is Completed</th>
                        <th>Completed On</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ToDoData.map((item) => {
                                return <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{new Date(item.date).toString()}</td>
                                    <td>{item.is_completed ? "Yes" : "No"}</td>
                                    <td>{item.completed_on}</td>
                                    <td>{new Date(item.created_at).toString()}</td>
                                    <td>{new Date(item.updated_at).toString()}</td>
                                    <td>
                                        <button onClick={() => btnEditClick(item.id)}>Edit</button>
                                        <button className="errorBtn" onClick={() => btnDeleteClick(item.id)}>Delete</button>
                                        <button className="btnSpace" onClick={() => btnMarkStatus(item.id, true, item.completed_on)}>Mark Completed</button>
                                        <button className="btnSpace" onClick={() => btnMarkStatus(item.id, false, null)}>Undo</button>
                                    </td>
                                </tr>
                            })}
                    </tbody>
                </Table>
            </div>
        }

        <br/>
        <button className="btnCls" onClick={btnAddItem}>Add Item</button>
    </div>
};