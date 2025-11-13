import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from './store/index';

function ProtectedRoute({ children }: { children: any }) {
    const isAuth = useSelector((state: RootState) => state.authenticator.isAutenticated);
    return isAuth ? children : <Navigate to="/" replace />;
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route 
                    path="/home" 
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </Router>
    );
}

export default App;