import * as React from "react";
import { Box, Checkbox, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import "./tabla.css";
import Search from "./search";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

export default function Tabla() {
  const navigate = useNavigate();
  const [products, setProducts] = React.useState([]);
  const [product, setProduct] = React.useState([]);
  const onEditProducto = (id) => {
    navigate(`/editproducto/${id}`);
  };

  React.useEffect(() => {
    //hace la llamada p obtener los prod de la bd
    axios
      .get("http://localhost:3100/products")
      .then((res) => {
        const products = res.data;
        setProducts(products);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //search
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const [searchQuery, setSearchQuery] = React.useState("");
  const productosFiltrados = React.useMemo(() => {
    const filtro = products.filter((producto) => {
      const targetTerm =
        producto.name_product + "" + producto.description_product;
      return targetTerm.includes(searchQuery);
    });
    return filtro;
  }, [products, searchQuery]);

  React.useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3100/products?q=${searchQuery}`
        );
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [searchQuery]);

  //delete
  const onDeleteProducto = (_id) => {
    axios
      .delete(`http://localhost:3100/product/${_id}`)
      .then((res) => {
        console.log("eliminado", res.data);
        const productosActualizados = products.filter(
          (product) => product._id !== _id
        );
        setProducts(productosActualizados);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //disponible
  /*const onChangeDisponible = (event, _id) => {
    const { checked } = event.target;

    axios
      .put(`http://localhost:3100/product/${_id}`, {
        available: checked,
      })
      .then((res) => {
        const productosActualizados = products.map((product) =>
          product._id === _id ? { ...product, disponible: checked } : product
        );
        setProducts(productosActualizados);
      })
      .catch((error) => {
        console.log(error);
      });
  };*/

  const onChangeDisponible = (_Id, newValue) => {
    axios
      .put(`http://localhost:3100/product/${_Id}`, { available: newValue })
      .then(() => {
        const newProducts = products.map((product) => {
          if (product._id === _Id) {
            return {
              product,
              available: newValue,
            };
          }
          return product;
        });
        setProducts(newProducts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    // {
    //   field: "imagen ",
    //   headerName: "Imagenn",
    //   width: 80,
    //   renderCell: (params) => <Avatar src={params.row.imagen} />,
    // },
    {
      field: "name_product",
      headerName: "Producto",
      width: 200,
    },
    {
      field: "description_product",
      headerName: "Descripcion",
      width: 280,
    },
    {
      field: "category",
      headerName: "Categoria",
      width: 160,
    },
    {
      field: "price",
      headerName: "Precio",
      width: 160,
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 160,
    },
    {
      field: "available",
      headerName: "Disponible",
      width: 160,
      renderCell: ({ value, row }) => (
        <Checkbox
          checked={value}
          onChange={() => onChangeDisponible(row.original._id, value)}
        />
      ),
    },

    {
      field: "acciones",
      type: "actions",
      headerName: "Acciones",
      width: 160,
      cellClassName: "actions",
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => onEditProducto(params.row._id)}>
            <EditIcon src={params.row.imagen} />{" "}
          </IconButton>
          <IconButton onClick={() => onDeleteProducto(params.row._id)}>
            <DeleteIcon src={params.row.imagen} />{" "}
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <Box sx={{ height: "90%", width: "100%" }}>
      <div className="headtabla">
        <Typography>Tabla productos</Typography>

        <Search value={searchQuery} onChange={handleSearchQueryChange}></Search>

        <Button
          startIcon={<AddIcon />}
          variant="contained"
          sx={(thema) => ({
            background: thema.palette.primary.light,
            "&:hover": { background: "#0094F1" },
          })}
          onClick={() => navigate("/addproduct")}
        >
          Agregar Producto
        </Button>
      </div>

      <DataGrid
        rows={productosFiltrados}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
