import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormProducto from "../components/formProducto";

const EditProducto = () => {
  const { id } = useParams();
  const [product, setProducto] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3100/products/${id}`)
        .then((res) => {
          setProducto(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  // useEffect(() => {
  //   if (id) {
  //     const idNum = parseInt(id);
  //     //TODO: CUANDO ESTE LA API ACA VA EL BUSCAR EL PRODUCTO POR ID
  //     const target = productos.find((producto) => producto.id === idNum);
  //     if (target) {
  //       setProducto(target);
  //     }
  //   }
  // }, [id]);

  if (product) {
    return (
      <div>
        <FormProducto product={product} tipoOperacion="edicion"></FormProducto>
      </div>
    );
  }
  return <div>no existe</div>;
};
export default EditProducto;
