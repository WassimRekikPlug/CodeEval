import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";


const App = lazy(() => import("./App"));
const HomePage = lazy(() => import("./Pages/HomePage"));
const SignIn = lazy(() => import("./Pages/Login"));
const Register = lazy(() => import("./Pages/Register"));
const AddAndEditTask = lazy(() => import("./Pages/AddAndEditTask"));


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'signin',
                element: <SignIn />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'addTask',
                element: <AddAndEditTask />
            },
            {
                path: 'editTask',
                element: <AddAndEditTask />
            }
        ]
    }
]);