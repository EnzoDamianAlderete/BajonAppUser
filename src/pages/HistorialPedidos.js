import { Box, Divider, Grid, Stack, Tab } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const HistorialPedidos = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <Tab
            disablePadding
            sx={{
              backgroundColor:
                location.pathname === "/pedidos" ? "#1B3A4D" : undefined,
            }}
            onClick={() => navigate("/pedidos")}
            label="Pedidos actuales"
            value="1"
          />
          <Tab
            disablePadding
            sx={{
              backgroundColor:
                location.pathname === "/historialpedidos"
                  ? "#1B3A4D"
                  : undefined,
              color: "white",
            }}
            onClick={() => navigate("/historialpedidos")}
            label="Historial pedidos"
            value="2"
          />
        </Stack>
        <Grid container spacing={4} paddingTop={4}>
          ------to do ...mandar los pedidos completados aca
        </Grid>
      </Box>
    </Box>
  );
};

export default HistorialPedidos;
