import React from "react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../router/routes";

export const LoginPage = () => {

    const objNavigate = useNavigate();    

    const [username, setUsername] = React.useState('');
    const [pwd, setPwd] = React.useState('');
    const [outputDtls, setOutput] = React.useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePwdChange = (e) => {
        setPwd(e.target.value);
    };

    const btnLoginClick = () => {
        setOutput(username === 'test@gmail.com' && pwd === '12345678' ? 
                                localStorage.setItem('loginStatus','Login successful') : 
                                localStorage.setItem('loginStatus','Login Failed. Try again!!!'));
        
        setUsername('');
        setPwd('');
        if (localStorage.getItem('loginStatus') === 'Login successful'){
            objNavigate(AppRoutes.todoapp);
        }
        else{
            setOutput('Login unsuccessful. Try again!!!');
        }
    }

    const btnClearClick = () => {
        setUsername('');
        setPwd('');
        setOutput('');
        localStorage.removeItem('loginStatus')
    }

    return <div className="App App-margin">
        <h2> ToDo App Login</h2>
        <label className="labelCls">User Name: </label>
        <input 
            className="inputCls" 
            type="text" 
            name="uName" 
            id="uName" 
            placeholder="Enter user name"
            value={username}
            onChange={handleUsernameChange}>
        </input> <br/>

        <label className="labelCls">Password: </label>
        <input 
            className="inputCls" 
            type="password" 
            name="pwd" 
            id="pwd" 
            placeholder="Enter password"
            value={pwd}
            onChange={handlePwdChange}>
        </input> <br/>
        <br/>

        <button className="btnCls" onClick={btnLoginClick}>Login</button>
        <button className="btnCls" onClick={btnClearClick}>Clear</button>

        <br />
        <br />
        <label>{outputDtls}</label>
    </div>
};