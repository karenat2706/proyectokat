import { Container, Typography, Button } from "@mui/material";

export default function Login() {
  return (
    <Container>
      <Typography variant="h1" color="primary">Título principal</Typography>
      <Typography variant="h2" color="secondary">Subtítulo</Typography>
      <Typography variant="h3" color="error">Texto destacado</Typography>
      <Typography variant="body1">Texto normal</Typography>
      <Typography variant="caption" color="text.secondary">
        Pie de página
      </Typography>

      <Button variant="text" color="primary">Text Button</Button>
      <Button variant="contained" color="secondary">Contained</Button>
      <Button variant="outlined" color="success">Outlined</Button>
      <Button variant="contained" color="error">Error</Button>
    </Container>
  );
}
