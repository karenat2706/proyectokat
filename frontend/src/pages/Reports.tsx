import { Typography, Container, Paper } from '@mui/material';
import Menu from '../components/Menu';

const Reports = () => {
    return (
        <>
            <Menu/>
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Pagina de reportes de Karen
                </Typography>
                <Typography variant="body1">
                    Esta es la página de reportes y estadísticas
                </Typography>
            </Paper>
        </Container>
        </>
    );
};

export default Reports;