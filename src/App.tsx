import './App.css'
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Importar páginas
import Login from './assets/pages/Login';
import Home from './assets/pages/Home';
import Reports from './assets/pages/Reports';
import ErrorPage from './assets/pages/ErrorPage';
//import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Crear la estructura de navegación
const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
        errorElement: <ErrorPage />
    },
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/reports',
        element: <Reports />
    }
]);

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;