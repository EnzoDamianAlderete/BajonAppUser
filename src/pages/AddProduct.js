import * as React from "react";

import FormProducto from "../components/formProducto";

export default function FormPropsTextFields() {
  return (
    <div>
      <FormProducto onSubmit={() => alert("Producto agregado con exito")} />
    </div>
  );
}
