import React, { useState } from 'react';
import {Container, TextField, Button, Typography, Card, CardContent, Stack, Box, Alert} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    // Datos de usuario válidos
    const bduser = 'karen';
    const bdpasswd = '1234';

    // Estado unificado para los datos del formulario
    const [data, setData] = useState({usuario: '', password: '',});

    // Estado para mostrar error
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    // Función que recoge lo que escribimos en los TextField
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({...data, [e.target.name]: e.target.value,}); ////actualiza el campo correspondiente
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Comprobamos si el usuario y contraseña son correctos
        if (data.usuario === bduser && data.password === bdpasswd) {
            setSuccess(true);
            setError(false);

            // Navegamos a la página home después de 1 segundo
            setTimeout(() => {navigate('/home');}, 1000);

        } else {
            setSuccess(false);
            setError(true);
        }
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',//para que coja la pantalla
            }}
        >
            <Card sx={{ width: '100%', borderRadius: 3, boxShadow: 4 }}>
                <CardContent>
                    <Stack spacing={2} alignItems="center">
                        <Typography variant="h6" color="primary">
                            Sistema de acceso
                        </Typography>

                        <LockIcon color="secondary" />

                        {/* formulario */}
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{ width: '100%' }}
                        >
                            {/* Campo usuario */}
                            <TextField
                                fullWidth
                                label="usuario"
                                name="usuario"
                                value={data.usuario}
                                onChange={handleChange}
                                required
                                autoComplete="username"
                                autoFocus
                                sx={{ backgroundColor: 'white', borderRadius: 1, mb: 2 }}
                            />

                            {/* Campo contraseña */}
                            <TextField
                                fullWidth
                                type="password"
                                label="Contraseña"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                required
                                autoComplete="current-password"
                                sx={{ backgroundColor: 'white', borderRadius: 1, mb: 2 }}
                            />

                            {/* Botón Acceder */}
                            <Button variant="contained" fullWidth type="submit">
                                acceder
                            </Button>
                        </Box>

                        {/* Alertas de exito y errores */}
                        {success && (
                            <Alert severity="success" sx={{ width: '100%' }}>
                                Acceso correcto
                            </Alert>
                        )}

                        {error && (
                            <Alert severity="error" sx={{ width: '100%' }}>
                                Usuario o contraseña incorrectos
                            </Alert>
                        )}
                    </Stack>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Login;