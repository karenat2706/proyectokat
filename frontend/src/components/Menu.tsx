import React, {useEffect} from "react";
//Importamos el useSelector del react-redux
import {useDispatch, useSelector} from 'react-redux'
// Importamos lo que necesitamos para el tipo del selector()
import {type RootState} from '../store'
//Importamos las acciones que están en el fichero authSlice.ts
import {authActions} from '../store/authSlice';
import {useNavigate} from 'react-router-dom'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AdbIcon from '@mui/icons-material/Adb';
import {Drawer, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import CottageIcon from '@mui/icons-material/Cottage';
import FeedIcon from '@mui/icons-material/Feed';
import HelpIcon from '@mui/icons-material/Help';
import OutputIcon from '@mui/icons-material/Output';

import {Link} from 'react-router-dom';

function Menu() {
    //Almacenamos en la variable userData lo que obtenemos del store usando el hook useSelector
    const userData = useSelector((state: RootState) => state.authenticator)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Evitar que se pueda acceder a paginas sin estar autenticado
    const isLoggedin = userData.isAutenticated
    useEffect(() => {
        if (!isLoggedin) {
            navigate('/')
        }
    }, [isLoggedin, navigate])

    //Comprobamos por la consola qué obtenemos del store
    console.log(userData)

    //Drawer
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    //cerrar sesion
    function handleLogOut() {
        dispatch(authActions.logout())
        navigate('/')
    }

    const DrawerList = (
        <Box sx={{width: 250}} role="presentation" onClick={toggleDrawer(false)}>
            {/*Link a las distintas paginas de la app*/}
            <List>
                <Link to={'/home'}>
                    <ListItemButton>
                        <ListItemIcon sx={{color: 'secondary.main'}}>
                            <CottageIcon/>
                        </ListItemIcon>
                        <ListItemText sx={{color: 'primary.main'}}>Inicio</ListItemText>
                    </ListItemButton>
                </Link>

                {/*Solo el usuario admin puede ver la seccion reports*/}

                    <Link to={'/reports'}>
                        <ListItemButton>
                            <ListItemIcon sx={{color: 'secondary.main'}}>
                                <FeedIcon/>
                            </ListItemIcon>
                            <ListItemText sx={{color: 'primary.main'}}>Informes</ListItemText>
                        </ListItemButton>
                    </Link>

                {/*Solo el usuario admin puede gestionar usuarios*/}
                {userData.userRol == "admin" &&
                    <Link to={'/gestionusuarios'}>
                        <ListItemButton>
                            <ListItemIcon sx={{color: 'secondary.main'}}>
                                <ManageAccountsIcon/>
                            </ListItemIcon>
                            <ListItemText sx={{color: 'primary.main'}}>Gestionar Usuarios</ListItemText>
                        </ListItemButton>
                    </Link>
                }
                <Link to={'/help'}>
                    <ListItemButton>
                        <ListItemIcon sx={{color: 'secondary.main'}}>
                            <HelpIcon/>
                        </ListItemIcon>
                        <ListItemText sx={{color: 'primary.main'}}>Ayuda</ListItemText>
                    </ListItemButton>
                </Link>

                <ListItemButton onClick={handleLogOut}>
                    <ListItemIcon sx={{color: 'secondary.main'}}>
                        <OutputIcon/>
                    </ListItemIcon>
                    <ListItemText sx={{color: 'primary.main'}}>Salir</ListItemText>
                </ListItemButton>
            </List>
        </Box>
    );

    return (
        <>
            <Box sx={{width: '100%', maxWidth: '100%'}}>
                <AppBar>
                    <Toolbar>
                        {/*Icono de usuario*/}
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        {/*Nombre de usuario*/}
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            {userData.userName}
                        </Typography>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}>
                            {userData.userRol == "admin" ?
                                <AdminPanelSettingsIcon/> : <AdbIcon/> }
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>
            {/*Drawer*/}
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </>
    );
}

export default Menu;