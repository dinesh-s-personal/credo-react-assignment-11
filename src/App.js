import './App.css';
import { LoginPage, TodoApp } from './screens';
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AppRoutes } from './router/routes';
import { AddItem } from './screens/todoApp/addItem';

const router = createBrowserRouter([
  {
    path: AppRoutes.login,
    element: <LoginPage /> 
  },
  {
    path: '/',
    element: <LoginPage /> 
  },
  {
    path: AppRoutes.todoapp,
    element: <TodoApp />
  },
  {
    path: AppRoutes.additem,
    element: <AddItem />
  }
])

function App() {
  return <RouterProvider router={router}/>
}

export default App;
