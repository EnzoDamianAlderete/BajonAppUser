import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

const User = ({ user }) => {
  return (
    <Grid container spacing={2} paddingTop={2}>
      <Grid item xs={8} padding={2}>
        <Card sx={{ minWidth: 275, maxWidth: 400, elevation: 2 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              id: {user._id}
            </Typography>
            <Typography variant="h5" component="div">
              Nombre: {user.name}
            </Typography>

            <Typography variant="body2">Rol: {"Admin"}</Typography>
            <Typography variant="body2">Email: {user.email}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Editar Perfil</Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default User;
