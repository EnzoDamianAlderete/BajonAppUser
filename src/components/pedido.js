import { Button, Grid, Paper, Divider } from "@mui/material";
import React from "react";
import {} from "./pedido.css";
import ProductoDetalle from "./productodetalle";
import axios from "axios";

const Pedidos = ({ order }) => {
  //suma total precio y cantidad
  const getTotal = () => {
    let total = 0;
    const productos = order.detalle_pedido;
    for (const { producto, cantidad } of productos) {
      console.log({ producto, cantidad });
      const totalproducto = cantidad * producto.price;
      total = total + totalproducto;
    }
    return total;
  };
  //to do cambiar el estado del pedido cuando se confirma
  //order campo :completed , default false
  const confirmarPedido = async (order) => {
    try {
      const response = await axios.put(
        `http://localhost:3100/orders/${order._id}`,
        {
          completed: true,
        }
      );
      console.log("Pedido confirmado:", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Paper
      elevation={8}
      sx={{
        display: "flex",
        flexDirection: "column",
        background: "#FCFCFC",
        width: "100%",
        height: "100%",
        p: 2,
      }}
    >
      <div>
        <div className="cabecera">
          <div className="headpedido">
            <h1>Cliente:{order.name_user}</h1>
            <h3>Hora: {order.date}</h3>
          </div>
          <div className="numorden">
            <h2>Num de orden {order._id}</h2>
            <h2>Mesa {order.number_table}</h2>
          </div>
        </div>
        <Divider sx={{ pt: 2 }} />

        <div>
          {order.detalle_pedido?.map(({ producto, cantidad }) => {
            return (
              <ProductoDetalle
                producto={producto}
                cantidad={cantidad}
                key={producto._id}
              />
            );
          })}
        </div>

        <div className="total">Total:{getTotal()}</div>
        <div className="boton">
          <Button
            variant="contained"
            sx={(thema) => ({
              background: thema.palette.primary.light,
              "&:hover": { background: "#0094F1" },
            })}
            onClick={() => confirmarPedido(order._id)}
          >
            Confirmar Pedido
          </Button>
        </div>
      </div>
    </Paper>

    //to do darle estado al boton de confirmar pedido que al hacer click el pedido entre en un estado de procesando hasta q se complete y vaya a historial de pedidos
  );
};
export default Pedidos;
