import { Typography, Container, Button, Stack } from '@mui/material';
import { useRouteError, useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    let errorMessage = "Página no encontrada.";

    if (error && typeof error === 'object') {
        if ('statusText' in error && error.statusText) {
            errorMessage = error.statusText as string;
        } else if ('message' in error && error.message) {
            errorMessage = error.message as string;
        }
    }

    return (
        <Container
            sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Stack spacing={3} alignItems="center">
                <Typography variant="h3" sx={{ color: '#6A1B9A', fontWeight: 'bold' }}>
                    Error, algo salio mal
                </Typography>

                <Typography
                    variant="body1"
                    sx={{ color: '#4A148C' }}
                >
                    {errorMessage}
                </Typography>

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate("/")}
                >
                    Volver al inicio
                </Button>
            </Stack>
        </Container>
    );
};

export default ErrorPage;