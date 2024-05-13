import React from "react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../router/routes";
import axios from "axios";
import { Table } from "react-bootstrap";

export const TodoApp = () => {

    const [ToDoData, setData] = React.useState([]);

    const objNavigate = useNavigate();
    const btnBack = () => {
        localStorage.removeItem('loginStatus');
        objNavigate(AppRoutes.login);
    };

    const btnAddItem = () => {
        objNavigate(AppRoutes.additem);
    };

    React.useEffect(() => {
        axios.get('https://664189a13d66a67b34341c2e.mockapi.io/api/v1/todos')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally()
    }, []);

    return <div className="App">
        <h2 className="show-heading-with-btn">TodoApp Page</h2>
        <button className="show-heading-with-btn btnCls button-container" onClick={btnBack}>Logout</button>
        <br/>
        <br/>
        <div className="scrollable-div">
            <Table>
                <thead>
                    <tr>
                    <th>Sl.No</th>
                    <th>Description</th>
                    <th>Complete By</th>
                    <th>Is Completed</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    </tr>
                </thead>
                <tbody>
                    {ToDoData.map((item) => {
                            return <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{new Date(item.date).toString()}</td>
                                <td>{item.is_completed ? "Yes" : "No"}</td>
                                <td>{new Date(item.created_at).toString()}</td>
                                <td>{new Date(item.updated_at).toString()}</td>
                            </tr>
                        })}
                </tbody>
            </Table>
        </div>

        <br/>
        <button className="btnCls" onClick={btnAddItem}>Add Item</button>
    </div>
};