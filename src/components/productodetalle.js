import { Divider } from "@mui/material";
import React from "react";
import "./pedido.css";

const ProductoDetalle = ({ producto, cantidad }) => {
  console.log(producto, cantidad);

  return (
    <div className="pedido">
      <div>
        - Producto: {producto.name_product}
        <p />
        Descripcion: {producto.description_product}
      </div>
      <div className="precioycant">
        Precio: {producto.price}
        <p />
        Cantidad:{cantidad}
      </div>
      <Divider
        variant="middle"
        sx={{ justifyContent: "center", display: "flex" }}
      />
    </div>
  );
};

export default ProductoDetalle;
