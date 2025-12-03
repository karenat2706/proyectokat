import { useState } from 'react';
import {
    Typography,
    Container,
    Button,
    Box,
    CircularProgress
} from '@mui/material';
import Menu from '../components/Menu';
import SummarizeIcon from '@mui/icons-material/Summarize';
import InformeColeccion from '../components/InformeColeccion';

const Reports = () => {
    const [mostrarInforme, setMostrarInforme] = useState(false);
    const [datosInforme, setDatosInforme] = useState<any[]>([]);
    const [cargando, setCargando] = useState(false);

    const handleGenerarInforme = async () => {
        console.log('Iniciando...');
        setCargando(true);

        try {
            const response = await fetch('http://localhost:3030/getItems');
            const result = await response.json();

            console.log('Datos recibidos:', result.data);

            if (result.data && Array.isArray(result.data)) {
                setDatosInforme(result.data);
                setMostrarInforme(true);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al obtener datos');
        } finally {
            setCargando(false);
        }
    };

    return (
        <>
            <Menu />
            {/* Añadimos margen superior para que no se tape con el AppBar */}
            <Container maxWidth="md" sx={{ mt: 8 }}>
                {/* Título principal fuera del contenido */}
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    color="primary"
                    sx={{ mb: 3 }}
                >
                    Página de Reportes
                </Typography>

                <Box sx={{p: 4, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 2, boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0'}}>

                    {/* Botón principal */}
                    <Button
                        variant="contained"
                        sx={{
                            mb: 3,
                            background: 'linear-gradient(45deg, #ff80ab 30%, #ff4081 90%)',
                            color: 'white',
                            '&:hover': {background: 'linear-gradient(45deg, #f50057 30%, #c51162 90%)',},
                            py: 1.5, px: 4, fontWeight: 'bold', boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
                        }}
                        startIcon={<SummarizeIcon />}
                        onClick={handleGenerarInforme}
                        disabled={cargando}
                    >
                        {cargando ? 'Cargando' : 'informe coleccion'}
                    </Button>

                    {cargando && (
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 2, mb: 2, p: 2, backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 1}}>
                            <CircularProgress size={20} sx={{ color: '#ff4081' }} />
                            <Typography>
                                Obteniendo datos de la base de datos
                            </Typography>
                        </Box>
                    )}

                    {!mostrarInforme && !cargando && (
                        <Box>
                            <Typography variant="body2" align="center" sx={{ color: '#795548' }}>
                                Presiona el botón "INFORME COLECCIÓN" para generar un informe detallado con estadísticas y análisis.
                            </Typography>
                        </Box>
                    )}

                    {mostrarInforme && !cargando && (
                        <>
                            <Box sx={{
                                mt: 3,
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                borderRadius: 2,
                                border: '2px solid #3f51b5',
                                boxShadow: '0 2px 8px rgba(63, 81, 181, 0.2)'
                            }}>
                                <InformeColeccion datos={datosInforme} />
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                                <Button
                                    variant="outlined"
                                    onClick={() => setMostrarInforme(false)}
                                    sx={{
                                        color: '#ff4081',
                                        borderColor: '#ff4081',
                                        '&:hover': {
                                            borderColor: '#f50057',
                                            backgroundColor: 'rgba(255, 64, 129, 0.04)'
                                        }
                                    }}
                                >
                                    Ocultar Informe
                                </Button>
                            </Box>
                        </>
                    )}
                </Box>

                {/* Información adicional */}
                <Box sx={{
                    p: 3,
                    mt: 4,
                    backgroundColor: 'rgba(232, 245, 233, 0.8)',
                    borderRadius: 2,
                    border: '1px solid #a5d6a7'
                }}>
                    <Typography variant="h6" gutterBottom sx={{ color: '#2e7d32' }}>
                        Información sobre los reportes
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#455a64' }}>
                        Solo usuarios con rol "admin" pueden acceder a esta sección<br/>
                        Los informes incluyen estadísticas completas y análisis detallado<br/>
                        Los datos se obtienen directamente de la base de datos en tiempo real
                    </Typography>
                </Box>
            </Container>
        </>
    );
};

export default Reports;