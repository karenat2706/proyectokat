import { Container, Typography, Button, Stack } from "@mui/material";

export default function Login() {
  return (
      <main>
        <Container
            sx={{
              textAlign: "center",
              mt: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
        >
          <Typography variant="h1" color="primary" gutterBottom>
            Página de Login - Karen Acosta Tse
          </Typography>

          <Typography variant="h2" color="secondary" gutterBottom>
            Bienvenida a tu aplicación React con MUI
          </Typography>

          <Typography variant="h3" color="error" gutterBottom>
            Accede al sistema para continuar
          </Typography>

          <Typography variant="body1">
            Este es el inicio de sesión del sistema desarrollado con React, Vite y TypeScript.
          </Typography>

          <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
            Proyecto realizado por Karen Acosta Tse
          </Typography>

          <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
            <Button variant="text" color="primary">Entrar</Button>
            <Button variant="contained" color="secondary">Registrar</Button>
            <Button variant="outlined" color="success">Más información</Button>
            <Button variant="contained" color="error">Cancelar</Button>
          </Stack>
        </Container>
      </main>
  );
}
