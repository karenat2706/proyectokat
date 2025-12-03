import { useEffect, useState } from "react";
import {Box, Button, Container, TextField, Divider, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Typography} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useSelector } from "react-redux";
import type { RootState } from "../store/index";

// Creamos el tipo itemtype fuera del componente
interface ItemType {
    id: number;
    nombre: string;
    marca: string;
    tipo: string;
    precio: number;
}

// Inicializo los valores del item
const itemInitialState: ItemType = {
    id: 0,
    nombre: '',
    marca: '',
    tipo: '',
    precio: 0,
};

export default function Dashboard() {
    // Estado para los datos de la tabla
    const [tableData, setTableData] = useState<ItemType[]>([]);

    // Estado para el formulario
    const [item, setItem] = useState<ItemType>(itemInitialState);

    // Almacenamos en la variable userData lo que obtenemos del store
    const userData = useSelector((state: RootState) => state.authenticator);

    // Cargar datos al montar el componente
    useEffect(() => {
        getItems();
    }, []);

    // Manejar cambios en los inputs de forma más sencilla
    const handleInputChange = (field: keyof ItemType) => (e: React.ChangeEvent<HTMLInputElement>) => {
        let value;

        if (field === 'precio') {
            const parsedValue = parseFloat(e.target.value);
            if (isNaN(parsedValue)) {
                value = 0;
            } else {
                value = parsedValue;
            }
        } else {
            value = e.target.value;
        }

        setItem(prev => ({
            ...prev,
            [field]: value
        }));
    };
    // Limpiar los datos del formulario
    const handleClear = () => {
        setItem(itemInitialState);
    };

    // Eliminar registro
    const handleDeleteItem = async (row: ItemType) => {
        if (!row.id) return;

        if (confirm('¿Estás seguro de que quieres eliminar este registro?')) {
            try {
                const response = await fetch(`http://localhost:3030/deleteItem?id=${row.id}`);
                const result = await response.json();

                if (result.success && result.affectedRows > 0) {
                    getItems(); // Actualizamos la tabla
                    alert('Registro eliminado con éxito');
                } else {
                    alert('No se han eliminado los datos');
                }
            } catch (error) {
                console.error('Error deleting item:', error);
                alert('Error al eliminar los datos');
            }
        }
    };

    // Mostrar datos en la tabla
    const getItems = async () => {
        try {
            const response = await fetch(`http://localhost:3030/getItems`);
            const result = await response.json();
            setTableData(result.data || []);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    // Enviar datos del formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const queryParams = new URLSearchParams({
                nombre: item.nombre,
                marca: item.marca,
                tipo: item.tipo,
                precio: item.precio.toString()
            });

            const response = await fetch(`http://localhost:3030/addItem?${queryParams}`);
            const result = await response.json();

            if (result.success && result.affectedRows > 0) {
                getItems();
                alert('Datos guardados con éxito');
                handleClear(); //con esto limpiamos los textfield
            } else {
                alert('No se han insertado los datos');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error al insertar los datos');
        }
    };

    return (
        <Container className="container">
            <Box component='form' onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: '100%', mt: '50px' }}>

                {/* Formulario */}
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    gap: 2
                }}>
                    <TextField
                        required
                        label='Nombre'
                        variant='outlined'
                        fullWidth
                        value={item.nombre}
                        onChange={handleInputChange('nombre')}
                    />
                    <TextField
                        required
                        label='Marca'
                        variant='outlined'
                        fullWidth
                        value={item.marca}
                        onChange={handleInputChange('marca')}
                    />
                    <TextField
                        required
                        label='Tipo'
                        variant='outlined'
                        fullWidth
                        value={item.tipo}
                        onChange={handleInputChange('tipo')}
                    />
                    <TextField
                        required
                        type='number'
                        label='Precio'
                        variant='outlined'
                        fullWidth
                        value={item.precio}
                        onChange={handleInputChange('precio')}
                    />
                </Box>

                {/* Botones */}
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    gap: 2,
                    mt: 2
                }}>
                    <Button
                        fullWidth
                        variant="contained"
                        color='secondary'
                        startIcon={<DeleteIcon />}
                        onClick={handleClear}
                    >
                        Limpiar
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        endIcon={<SendIcon />}
                        type="submit"
                        disabled={userData.userRol === 'invitado'}
                    >
                        Insertar Datos
                    </Button>
                </Box>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Tabla */}
            <TableContainer>
                <Table aria-label='Tabla Coleccion'>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: 'primary.main' }}>
                            <TableCell sx={{ color: 'white' }}>Acciones</TableCell>
                            <TableCell sx={{ color: 'white' }}>Nombre</TableCell>
                            <TableCell sx={{ color: 'white' }}>Marca</TableCell>
                            <TableCell sx={{ color: 'white' }}>Tipo</TableCell>
                            <TableCell sx={{ color: 'white' }}>Precio</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {tableData.map((row: ItemType) => (
                            <TableRow key={row.id}>
                                <TableCell>
                                    {/* solo admin puede ver el boton de eliminar*/}
                                    {userData.userRol === "admin" && (
                                        <Button onClick={() => handleDeleteItem(row)}>
                                            <DeleteForeverIcon sx={{ color: 'secondary.main' }} />
                                        </Button>
                                    )}

                                    {/* Si es user, mostrar mensaje o dejar vacío */}
                                    {userData.userRol !== "admin" && (
                                        <Typography variant="caption" color="text.secondary">
                                            No permitido
                                        </Typography>
                                    )}

                                </TableCell>
                                <TableCell>{row.nombre}</TableCell>
                                <TableCell>{row.marca}</TableCell>
                                <TableCell>{row.tipo}</TableCell>
                                <TableCell>{row.precio}</TableCell>
                            </TableRow>
                        ))}

                        {tableData.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    No hay registros disponibles
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}