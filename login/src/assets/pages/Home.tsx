import { Typography, Container, Paper } from '@mui/material';

const Home = () => {
    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Página home de karen
                </Typography>
                <Typography variant="body1">
                    Bienvenido/a a la pagina principal de la aplicación
                </Typography>
            </Paper>
        </Container>
    );
};

export default Home;