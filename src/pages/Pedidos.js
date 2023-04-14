import React, { useEffect, useState } from 'react';
import './pedidos.css';
import Pedidos from '../components/pedido';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Divider, Grid, Stack } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Pedidos2 = () => {
  const [orderData, setOrderData] = useState([]);
  const location = useLocation();
  console.log(location.pathname);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://bajonappbackend-production.up.railway.app/orders')
      .then(res => {
        setOrderData(res.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Stack
          direction='row'
          divider={<Divider orientation='vertical' flexItem />}
          spacing={2}>
          <Tab
            disablePadding
            sx={{
              backgroundColor: location.pathname === '/pedidos' ? '#1B3A4D' : undefined,
              color: 'white',
            }}
            label='Pedidos actuales'
            value='1'
          />
          <Tab
            disablePadding
            sx={{
              backgroundColor:
                location.pathname === '/historialpedidos' ? '#1B3A4D' : undefined,
            }}
            onClick={() => navigate('/historialpedidos')}
            label='Historial pedidos'
            value='2'
          />
        </Stack>
        <Grid container spacing={4} paddingTop={4}>
          {orderData.map((order, index) => {
            return (
              <Grid item md={6} xs={12} lg={4} zeroMinWidth>
                <span key={index}>
                  <Pedidos order={order} />
                </span>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};
export default Pedidos2;
