import './App.css';
import { LoginPage, TodoApp } from './screens';
import React from 'react';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import { AppRoutes } from './router/routes';
import { AddItem } from './screens/todoApp/addItem';
import { EditItem } from './screens/todoApp/editItem';

const protectedRouteLoader = () => {
  if (localStorage.getItem('loginStatus') !== 'Login successful'){
    return redirect(AppRoutes.login);
  }
  return null;
}

const publicRouteLoader = () => {
  if (localStorage.getItem('loginStatus') === 'Login successful'){
    return redirect(AppRoutes.todoapp);
  }
  return null;
}

const router = createBrowserRouter([
  {
    path: AppRoutes.login,
    loader: publicRouteLoader,
    element: <LoginPage /> 
  },
  {
    path: '/',
    loader: publicRouteLoader,
    element: <LoginPage /> 
  },
  {
    path: AppRoutes.todoapp,
    loader: protectedRouteLoader,
    element: <TodoApp />
  },
  {
    path: AppRoutes.additem,
    loader: protectedRouteLoader,
    element: <AddItem />
  },
  {
    path: AppRoutes.edititem,
    loader: protectedRouteLoader,
    element: <EditItem />
  }
])

function App() {
  return <RouterProvider router={router}/>
}

export default App;
