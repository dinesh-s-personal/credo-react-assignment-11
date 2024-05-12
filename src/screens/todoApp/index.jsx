import React from "react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../router/routes";

export const TodoApp = () => {

    const objNavigate = useNavigate();
    const btnBack = () => {
        objNavigate(-1);
        localStorage.removeItem('loginStatus');
    };

    const btnAddItem = () => {
        objNavigate(AppRoutes.additem);
    };

    return <div className="App">
        <h2>TodoApp Page</h2>

        <button className="btnCls" onClick={btnBack}>Back</button>
        <button className="btnCls" onClick={btnAddItem}>Add Item</button>
    </div>
};