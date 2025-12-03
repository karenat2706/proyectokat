import React, { useState, useMemo } from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Button, TextField, Checkbox, FormControlLabel, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Chip} from '@mui/material';
import {SaveAlt as SaveAltIcon, FilterList as FilterListIcon, DragIndicator as DragIndicatorIcon, ViewColumn as ViewColumnIcon, GetApp as GetAppIcon} from '@mui/icons-material';
import jsPDF from 'jspdf';

interface ItemType {
    id: number;
    nombre: string;
    marca: string;
    tipo: string;
    precio: number | string;
}

interface InformeColeccionProps {
    datos: ItemType[];
}

const InformeColeccion: React.FC<InformeColeccionProps> = ({ datos }) => {
    if (!datos || !Array.isArray(datos) || datos.length === 0) {
        return (
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                No hay datos para mostrar en el informe
            </Typography>
        );
    }

    // Estados para las nuevas funcionalidades
    const [filtroMarca, setFiltroMarca] = useState('');
    const [filtroTipo, setFiltroTipo] = useState('');
    const [columnasVisibles, setColumnasVisibles] = useState({id: true, nombre: true, marca: true, tipo: true, precio: true});
    const [ordenColumnas, setOrdenColumnas] = useState(['id', 'nombre', 'marca', 'tipo', 'precio']);
    const [showConfigDialog, setShowConfigDialog] = useState(false);

    // Convertimos precios a número seguro
    const datosConPrecioNumero = datos.map(item => ({...item, precio: typeof item.precio === 'string' ? parseFloat(item.precio) : item.precio}));

    // Calcular estadísticas
    const totalItems = datosConPrecioNumero.length;
    const precioTotal = datosConPrecioNumero.reduce((sum, item) => {
        const precio = Number(item.precio);
        return sum + (isNaN(precio) ? 0 : precio);
    }, 0);

    const precioPromedio = totalItems > 0 ? precioTotal / totalItems : 0;

    const itemMasCaro = datosConPrecioNumero.reduce((max, item) => {
        const precioActual = Number(item.precio);
        const precioMax = Number(max.precio);
        return precioActual > precioMax ? item : max;
    }, datosConPrecioNumero[0]);

    const itemMasBarato = datosConPrecioNumero.reduce((min, item) => {
        const precioActual = Number(item.precio);
        const precioMin = Number(min.precio);
        return precioActual < precioMin ? item : min;
    }, datosConPrecioNumero[0]);

    // Filtramos los datos segun los filtros aplicados
    const datosFiltrados = useMemo(() => {
        return datosConPrecioNumero.filter(item => {
            const marcaMatch = filtroMarca
                ? item.marca.toLowerCase().includes(filtroMarca.toLowerCase())
                : true;

            const tipoMatch = filtroTipo
                ? item.tipo.toLowerCase().includes(filtroTipo.toLowerCase())
                : true;

            return marcaMatch && tipoMatch;
        });
    }, [datosConPrecioNumero, filtroMarca, filtroTipo]);

    // Funcion para exportar a pdf
    const exportarPDF = () => {
        const doc = new jsPDF();

        // Título
        doc.setFontSize(20);
        doc.text('Informe de Colección', 20, 20);

        // Estadísticas
        doc.setFontSize(12);
        doc.text('ESTADÍSTICAS GENERALES', 20, 40);
        doc.text(`• Total de ítems: ${totalItems}`, 20, 50);
        doc.text(`• Precio total: $${precioTotal.toFixed(2)}`, 20, 58);
        doc.text(`• Precio promedio: $${precioPromedio.toFixed(2)}`, 20, 66);
        doc.text(`• Ítem más caro: ${itemMasCaro.nombre} ($${Number(itemMasCaro.precio).toFixed(2)})`, 20, 74);
        doc.text(`• Ítem más barato: ${itemMasBarato.nombre} ($${Number(itemMasBarato.precio).toFixed(2)})`, 20, 82);

        // Filtros
        doc.text('FILTROS APLICADOS', 20, 100);
        doc.text(`• Marca: ${filtroMarca || 'Ninguno'}`, 20, 108);
        doc.text(`• Tipo: ${filtroTipo || 'Ninguno'}`, 20, 116);
        doc.text(`• Ítems mostrados: ${datosFiltrados.length}`, 20, 124);

        // Tabla de datos
        let y = 140;
        doc.text('DETALLES DE LA COLECCIÓN', 20, y);
        y += 10;

        datosFiltrados.forEach((item) => {
            if (y > 280) { // Si llega al final de la página
                doc.addPage();
                y = 20;
            }
            const texto = `${item.id}. ${item.nombre} | ${item.marca} | ${item.tipo} | $${Number(item.precio).toFixed(2)}`;
            doc.text(texto, 20, y);
            y += 8;
        });

        // Resumen
        y += 10;
        doc.text('RESUMEN', 20, y);
        y += 8;
        doc.text(`• Total filtrado: $${datosFiltrados.reduce((sum, item) => sum + Number(item.precio), 0).toFixed(2)}`, 20, y);

        // Fecha
        y += 20;
        doc.setFontSize(10);
        doc.text(`Generado el ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}`, 20, y);

        // Guardar
        doc.save(`informe-coleccion-${new Date().toISOString().split('T')[0]}.pdf`);
    };

    // Función para exportar a CSV
    const exportarCSV = () => {
        const headers = ['ID', 'Nombre', 'Marca', 'Tipo', 'Precio'];
        const csvRows = [
            headers.join(','),
            ...datosFiltrados.map(item =>
                [item.id, `"${item.nombre}"`, `"${item.marca}"`, `"${item.tipo}"`, `$${Number(item.precio).toFixed(2)}`].join(',')
            ),
            `Total,,,Suma total,$${datosFiltrados.reduce((sum, item) => sum + Number(item.precio), 0).toFixed(2)}`
        ];

        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `informe-coleccion-${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        window.URL.revokeObjectURL(url);
    };

    // Funciones para arrastrar columnas
    const handleDragStart = (e: React.DragEvent, index: number) => {
        e.dataTransfer.setData('text/plain', index.toString());
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent, dropIndex: number) => {
        e.preventDefault();
        const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
        const newOrden = [...ordenColumnas];
        const [removed] = newOrden.splice(dragIndex, 1);
        newOrden.splice(dropIndex, 0, removed);
        setOrdenColumnas(newOrden);
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Paper elevation={2} sx={{
                p: 3,
                mb: 3,
                background: 'linear-gradient(145deg, #f8e1e5, #f4d2d7)',
                border: '1px solid #e8bcc2',
                borderRadius: 2
            }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#5d4037' }}>
                    Estadísticas del Informe
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                    <Box>
                        <Typography variant="body2" sx={{ color: '#795548' }}>
                            Total de items
                        </Typography>
                        <Typography variant="h5" sx={{ color: '#3f51b5' }}>
                            {totalItems}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="body2" sx={{ color: '#795548' }}>
                            Precio total
                        </Typography>
                        <Typography variant="h5" sx={{ color: '#3f51b5' }}>
                            ${precioTotal.toFixed(2)}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="body2" sx={{ color: '#795548' }}>
                            Precio promedio
                        </Typography>
                        <Typography variant="h5" sx={{ color: '#3f51b5' }}>
                            ${precioPromedio.toFixed(2)}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="body2" sx={{ color: '#795548' }}>
                            Item mas caro
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#3f51b5' }}>
                            {itemMasCaro.nombre} (${Number(itemMasCaro.precio).toFixed(2)})
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="body2" sx={{ color: '#795548' }}>
                            Item mas barato
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#3f51b5' }}>
                            {itemMasBarato.nombre} (${Number(itemMasBarato.precio).toFixed(2)})
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="body2" sx={{ color: '#795548' }}>
                            Items filtrados
                        </Typography>
                        <Typography variant="h5" sx={{ color: '#3f51b5' }}>
                            {datosFiltrados.length}
                        </Typography>
                    </Box>
                </Box>
            </Paper>

            {/* este es el segundo recuadro (detalle de la coleccion) */}
            <Paper elevation={2} sx={{
                p: 3,
                mb: 3,
                background: 'linear-gradient(145deg, #f8e1e5, #f4d2d7)',
                border: '1px solid #e8bcc2',
                borderRadius: 2
            }}>
                {/* Barra de herramientas */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                    flexWrap: 'wrap',
                    gap: 2
                }}>
                    <Box>
                        <Typography variant="h6" gutterBottom sx={{ color: '#5d4037' }}>
                            Tabla Interactiva de la Colección ({totalItems} ítems)
                        </Typography>
                        <Chip
                            label={`${datosFiltrados.length} ítems filtrados`}
                            size="small"
                            sx={{
                                backgroundColor: '#ff80ab',
                                color: 'white',
                                fontWeight: 'bold'
                            }}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {/* Boton para configurar columnas */}
                        <Tooltip title="Configurar columnas visibles">
                            <IconButton
                                onClick={() => setShowConfigDialog(true)}
                                sx={{ color: '#d81b60' }}
                            >
                                <ViewColumnIcon />
                            </IconButton>
                        </Tooltip>

                        {/* Botones para exportar */}
                        <Tooltip title="Exportar a PDF">
                            <IconButton
                                onClick={exportarPDF}
                                sx={{ color: '#d81b60' }}
                            >
                                <GetAppIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Exportar a CSV">
                            <IconButton
                                onClick={exportarCSV}
                                sx={{ color: '#d81b60' }}
                            >
                                <SaveAltIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>

                {/* Filtros */}
                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    mb: 3,
                    flexWrap: 'wrap',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    p: 2,
                    borderRadius: 1
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FilterListIcon sx={{ color: '#d81b60' }} />
                        <Typography variant="body2" sx={{ color: '#795548' }}>
                            Filtros:
                        </Typography>
                    </Box>

                    <TextField
                        label="Filtrar por Marca"
                        variant="outlined"
                        size="small"
                        value={filtroMarca}
                        onChange={(e) => setFiltroMarca(e.target.value)}
                        sx={{width: 200, '& .MuiInputLabel-root': {color: '#795548',}, '& .MuiInputBase-input': {color: '#795548',}}}
                    />

                    <TextField
                        label="Filtrar por Tipo"
                        variant="outlined"
                        size="small"
                        value={filtroTipo}
                        onChange={(e) => setFiltroTipo(e.target.value)}
                        sx={{width: 200, '& .MuiInputLabel-root': {color: '#795548',}, '& .MuiInputBase-input': {color: '#795548',}}}
                    />

                    <Button
                        size="small"
                        onClick={() => { setFiltroMarca(''); setFiltroTipo(''); }}
                        sx={{ color: '#d81b60' }}
                    >
                        Limpiar filtros
                    </Button>
                </Box>

                {/* Tabla dentro del recuadro rosa */}
                <TableContainer component={Paper} elevation={3} sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #e8bcc2',
                    maxHeight: 500,
                    overflow: 'auto'
                }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {ordenColumnas.map((field, index) => {
                                    if (!columnasVisibles[field as keyof typeof columnasVisibles]) return null;

                                    const getTitulo = (field: string) => {
                                        switch(field) {
                                            case 'id': return 'ID';
                                            case 'nombre': return 'Nombre';
                                            case 'marca': return 'Marca';
                                            case 'tipo': return 'Tipo';
                                            case 'precio': return 'Precio';
                                            default: return field;
                                        }
                                    };

                                    return (
                                        <TableCell
                                            key={field}
                                            sx={{
                                                backgroundColor: '#ff80ab',
                                                color: 'white',
                                                fontWeight: 'bold',
                                                cursor: 'move',
                                                minWidth: field === 'nombre' ? 150 : 100
                                            }}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, index)}
                                            onDragOver={handleDragOver}
                                            onDrop={(e) => handleDrop(e, index)}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <DragIndicatorIcon sx={{ fontSize: 16, opacity: 0.7 }} />
                                                {getTitulo(field)}
                                            </Box>
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {datosFiltrados.map((item) => {
                                const precioNum = Number(item.precio);
                                const precioFormateado = isNaN(precioNum) ? '0.00' : precioNum.toFixed(2);

                                return (
                                    <TableRow key={item.id} hover sx={{
                                        '&:nth-of-type(odd)': {
                                            backgroundColor: 'rgba(248, 225, 229, 0.3)'
                                        }
                                    }}>
                                        {ordenColumnas.map((field) => {
                                            if (!columnasVisibles[field as keyof typeof columnasVisibles]) return null;

                                            if (field === 'precio') {
                                                return (
                                                    <TableCell key={`${item.id}-${field}`}>
                                                        <Typography
                                                            variant="body1"
                                                            sx={{fontWeight: 'bold', color: precioNum > 100 ? '#d32f2f' : '#2e7d32'}}
                                                        >
                                                            ${precioFormateado}
                                                        </Typography>
                                                    </TableCell>
                                                );
                                            }

                                            return (
                                                <TableCell
                                                    key={`${item.id}-${field}`}
                                                    sx={{ color: '#5d4037' }}
                                                >
                                                    {item[field as keyof ItemType]}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}

                            {/* Fila de total */}
                            <TableRow sx={{
                                backgroundColor: 'rgba(255, 128, 171, 0.1)',
                                '& td': {
                                    fontWeight: 'bold',
                                    borderTop: '2px solid #ff80ab'
                                }
                            }}>
                                {ordenColumnas.map((field) => {
                                    if (!columnasVisibles[field as keyof typeof columnasVisibles]) return null;

                                    if (field === 'nombre') {
                                        return (
                                            <TableCell key={`total-${field}`} sx={{ color: '#5d4037' }}>
                                                SUMA TOTAL ({datosFiltrados.length} ítems)
                                            </TableCell>
                                        );
                                    }

                                    if (field === 'precio') {
                                        const totalFiltrado = datosFiltrados.reduce((sum, item) =>
                                            sum + Number(item.precio), 0
                                        );
                                        return (
                                            <TableCell key={`total-${field}`}>
                                                <Typography variant="body1" sx={{fontWeight: 'bold', color: '#3f51b5'}}>
                                                    ${totalFiltrado.toFixed(2)}
                                                </Typography>
                                            </TableCell>
                                        );
                                    }

                                    return <TableCell key={`total-${field}`} />;
                                })}
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Informacion de funcionalidades */}
                <Box sx={{
                    mt: 2,
                    p: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: 1
                }}>
                    <Typography variant="body2" sx={{ color: '#795548' }}>
                        <strong>Funcionalidades disponibles:</strong>
                        <br/> Arrastrar columnas (icono ⋮⋮ en cabecera)
                        <br/> Seleccionar columnas visibles
                        <br/> Filtros en "Marca" y "Tipo"
                        <br/> Exportar a PDF y CSV
                        <br/> Fila final con suma total
                    </Typography>
                </Box>

                {/* Pie de pagina */}
                <Typography variant="caption" sx={{
                    display: 'block',
                    mt: 2,
                    color: '#795548',
                    backgroundColor: 'rgba(248, 225, 229, 0.5)',
                    p: 1,
                    borderRadius: 1
                }}>
                    Informe generado el {new Date().toLocaleDateString()} a las {new Date().toLocaleTimeString()}
                </Typography>
            </Paper>

            {/* dialogo para configurar columnas */}
            <Dialog
                open={showConfigDialog}
                onClose={() => setShowConfigDialog(false)}
                PaperProps={{
                    sx: {
                        background: 'linear-gradient(145deg, #f8e1e5, #f4d2d7)',
                        border: '1px solid #e8bcc2'
                    }
                }}
            >
                <DialogTitle sx={{ color: '#5d4037' }}>
                    Configurar Columnas Visibles
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2 }}>
                        {Object.keys(columnasVisibles).map((columna) => (
                            <FormControlLabel
                                key={columna}
                                control={
                                    <Checkbox
                                        checked={columnasVisibles[columna as keyof typeof columnasVisibles]}
                                        onChange={(e) => setColumnasVisibles({
                                            ...columnasVisibles,
                                            [columna]: e.target.checked
                                        })}
                                        sx={{
                                            color: '#d81b60',
                                            '&.Mui-checked': { color: '#d81b60' }
                                        }}
                                    />
                                }
                                label={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        {columna === 'id'}
                                        {columna === 'nombre'}
                                        {columna === 'marca'}
                                        {columna === 'tipo'}
                                        {columna === 'precio'}
                                        {columna.charAt(0).toUpperCase() + columna.slice(1)}
                                    </Box>
                                }
                                sx={{
                                    color: '#5d4037',
                                    display: 'block',
                                    mb: 1
                                }}
                            />
                        ))}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setShowConfigDialog(false)}
                        sx={{ color: '#d81b60' }}
                    >
                        Cerrar
                    </Button>
                    <Button
                        onClick={() => {
                            setColumnasVisibles({
                                id: true,
                                nombre: true,
                                marca: true,
                                tipo: true,
                                precio: true
                            });
                        }}
                        sx={{ color: '#d81b60' }}
                    >
                        Restablecer todas
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default InformeColeccion;