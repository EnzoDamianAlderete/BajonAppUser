import React from "react";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Box, Button, Grid, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import "./formProducto.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FormProducto = ({ product, tipoOperacion }) => {
  const [mensaje, setMensaje] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const handleSubmit = () => {
  //   onSubmit({ nombre, descripcion, category, precio, stock });
  // };

  const [inputs, setInputs] = useState({
    name_product: product?.name_product ?? "",
    description_product: product?.description_product ?? "",
    category: product?.category ?? "",
    price: product?.price ?? "",
    stock: product?.stock ?? "",
    imgUrl: product?.imgUrl ?? "",
  });
  const { name_product, description_product, category, price, stock, imgUrl } =
    inputs;

  const HandleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  //crear
  const onSubmit = async (e) => {
    e.preventDefault();
    if (name_product === "" && category === "") {
      setMensaje("Por favor complete todos los campos");
      setTimeout(() => {
        setMensaje("");
      }, 3000);
    } else if (name_product !== "" && category !== "") {
      const Product = {
        name_product,
        description_product,
        category,
        price,
        stock,
        imgUrl,
      };
      console.log(inputs);
      console.log(Product);
      setLoading(true);
      await axios
        .post("http://localhost:3100/product", Product)
        .then((res) => {
          const { data } = res;
          setMensaje(data.mensaje);
          setTimeout(() => {
            setMensaje("");
            navigate("/stock");
            alert("se agrego producto!!");
          }, 1500);
        })
        .catch((error) => {
          console.error(error);
          setMensaje("Hubo un error");
          setTimeout(() => {
            setMensaje("");
          }, 3000);
        });
      setInputs({
        name_product: "",
        description_product: "",
        category: "",
        price: "",
        stock: "",
      });
      setLoading(false);
    }
  };

  //edit
  const onEdit = async (e) => {
    e.preventDefault();
    if (name_product === "" && category === "") {
      setMensaje("Por favor complete todos los campos");
      setTimeout(() => {
        setMensaje("");
      }, 3000);
    } else if (name_product !== "" && category !== "") {
      const Product = {
        name_product,
        description_product,
        category,
        price,
        stock,
        imgUrl,
      };
      console.log(inputs);
      console.log(Product);
      setLoading(true);
      await axios
        .put(`http://localhost:3100/product/${product._id}`, Product)
        .then((res) => {
          const { data } = res;
          setMensaje(data.mensaje);
          setTimeout(() => {
            setMensaje("");
            navigate("/stock");
            alert("se edito producto!!");
          }, 1500);
        })
        .catch((error) => {
          console.error(error);
          setMensaje("Hubo un error");
          setTimeout(() => {
            setMensaje("");
          }, 3000);
        });
      setInputs({
        name_product: "",
        description_product: "",
        category: "",
        price: "",
        stock: "",
      });
      setLoading(false);
    }
  };
  //eliminar

  // to do hacer que cargue la imagen del producto
  const onUploadImage = () => alert("Cargar Imagen");
  const [file, setFile] = useState();
  function handleChange2(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  return (
    <form
      onSubmit={(e) => {
        if (tipoOperacion === "edicion") {
          onEdit(e);
        } else {
          onSubmit(e);
        }
      }}
    >
      <Grid>
        <div className="headform">
          <IconButton onClick={() => navigate("/tabla")}>
            <ArrowBackIcon />
          </IconButton>
          {tipoOperacion === "edicion" ? (
            <h1>Editar Producto </h1>
          ) : (
            <h1>Agregar Producto </h1>
          )}
        </div>
        <Grid
          sx={{
            border: 2,
            borderRadius: "8px",
            borderColor: "#e5e7eb",
          }}
        >
          <div className="camposprod">
            <div className="divAdd">
              <Box
              /* component="img"
                sx={{
                  height: 164,
                  width: 164,
                  borderRadius: "100%",
                  "&:hover": { background: "#D9F0FF" },
                }}
                src="addimage.jpg"
                onChange={handleChange2}
                value={file}
                type="file"*/
              />
              <div className="divAdd2">
                <h2>Agregar Imagen:</h2>
                <input type="file" onChange={handleChange2} />
                <img src={file} />
              </div>
              <div className="divbut">
                <Button
                  sx={(thema) => ({
                    background: thema.palette.primary.light,
                    "&:hover": { background: "#0094F1" },
                    width: "100%",
                    color: "whitesmoke",
                  })}
                >
                  Confirmar
                </Button>
              </div>
            </div>

            <TextField
              onChange={(e) => HandleChange(e)}
              value={name_product}
              name="name_product"
              required
              id="name_product"
              label="Nombre"
            />
            {
              <TextField
                onChange={(e) => HandleChange(e)}
                value={description_product}
                name="description_product"
                required
                id="description_product"
                label="Descripcion"
                multiline
                rows={4}
              />
            }
            <TextField
              onChange={(e) => HandleChange(e)}
              value={category}
              name="category"
              required
              id="outlined-required"
              label="category"
            />
            <TextField
              onChange={(e) => HandleChange(e)}
              value={price}
              name="price"
              required
              id="outlined-required"
              label="Precio"
            />
            <TextField
              onChange={(e) => HandleChange(e)}
              value={stock}
              name="stock"
              required
              id="outlined-required"
              label="Stock"
            />
          </div>
        </Grid>
        <div className="divboton">
          <Button
            type="submit"
            startIcon={<SaveIcon />}
            size="large"
            variant="contained"
            sx={(thema) => ({
              background: thema.palette.primary.light,
              "&:hover": { background: "#0094F1" },
            })}
          >
            {/* {producto ? "Editar" : "Agregar Producto"} CAMBIO */}
            Agregar
          </Button>
        </div>
      </Grid>
    </form>
  );
};
export default FormProducto;
