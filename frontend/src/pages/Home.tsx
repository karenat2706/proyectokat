import { Container, Typography, Stack, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/index";
import { authActions } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const userData = useSelector((state: RootState) => state.authenticator);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log("Datos del usuario desde el store:", userData);

    const handleLogout = () => {
        dispatch(authActions.logout());
        navigate("/");
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 6 }}>
            <Stack spacing={3} alignItems="center">

                <Typography variant="h1" color="primary">
                    Bienvenido/a
                </Typography>

                <Typography variant="body1" align="center" sx={{ maxWidth: 350 }}>
                    Home de Karen: Soy el usuario <strong>"{userData.userName}"</strong> y tengo el rol de <strong>"{userData.userRol}"</strong>.
                </Typography>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogout}
                >
                    Salir
                </Button>

            </Stack>
        </Container>
    );
}