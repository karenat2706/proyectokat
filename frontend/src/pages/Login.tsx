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
    const [loading] = useState(false);

    const handleLogin = async () => {
        if (!user || !password) {
            alert('Por favor, completa usuario y contraseña');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3030/login?user=${user}&password=${password}`);
            const result = await response.json();

            console.log('Respuesta del backend:', result);

            if (result.data && result.data.length > 0) {
                const userData = result.data[0];

                dispatch(authActions.login({
                    userName: userData.nombre,
                    userRol: userData.rol,
                    isAutenticated: true
                }));

                alert('Login correcto');
                navigate('/home');
            } else {
                alert('Usuario y/o contraseña incorrectos');
            }
        } catch (error) {
            console.error('Error en login:', error);
            alert('Error de conexión con el servidor');
        }
    };

    const handleInfo = () => {
        alert('Usuarios en la base de datos:\n--> admin / admin123\n --> user / user123\n --> invitado / invitado123\n --> karen / 1234');
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
                    />
                    <TextField
                        label="Contraseña"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                    />
                </Stack>

                <Stack direction="row" spacing={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        {loading && 'Conectando...'}
                        {!loading && 'Entrar'}
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