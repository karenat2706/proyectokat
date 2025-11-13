import { Container, Typography, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (user === 'admin' && password === '1234') {
            dispatch(authActions.login({
                name: user,
                rol: 'admin'
            }));
            alert('Login correcto');
            navigate('/home');
        } else if (user === 'karen' && password === '1234') {
            dispatch(authActions.login({
                name: user,
                rol: 'karen'
            }));
            alert('Login correcto');
            navigate('/home');
        } else {
            alert('Usuario y/o contraseña incorrectos');
        }
    };

    const handleInfo = () => {
        alert('Credenciales de prueba:\n• admin / 1234 (rol: admin)\n• karen / 1234 (rol: karen)');
    };

    const handleCancel = () => {
        setUser('');
        setPassword('');
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 6 }}>
            <Stack spacing={3} alignItems="center">

                <Typography variant="h1" color="primary">
                    Login
                </Typography>

                <Typography variant="h2" color="secondary">
                    Bienvenido/a a la pagina de karen
                </Typography>

                <Typography variant="subtitle1" color="text.primary">
                    Accede para continuar
                </Typography>

                <Typography variant="body1" align="center" sx={{ maxWidth: 350 }}>
                    Esto está diseñado con React + Typescript y Redux Toolkit.
                </Typography>

                <Stack spacing={2} sx={{ width: '100%' }}>
                    <TextField
                        label="Usuario"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        fullWidth
                        placeholder="admin o karen"
                    />
                    <TextField
                        label="Contraseña"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        placeholder="1234"
                    />
                </Stack>

                <Stack direction="row" spacing={2}>
                    <Button variant="contained" color="primary" onClick={handleLogin}>
                        Entrar
                    </Button>
                    <Button variant="outlined" color="secondary">
                        Registrarse
                    </Button>
                    <Button variant="outlined" color="success" onClick={handleInfo}>
                        mas informacion
                    </Button>
                    <Button variant="contained" color="error" onClick={handleCancel}>
                        Cancelar
                    </Button>
                </Stack>

                <Typography variant="caption" color="primary">
                    Proyecto desarrollado por Karen
                </Typography>

            </Stack>
        </Container>
    );
}