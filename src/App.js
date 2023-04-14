import "./App.css";
import ResponsiveDrawer from "./components/sidebarMui";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home.js";
import Stock from "./pages/Stock";
import Pedidos from "./pages/Pedidos";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Add from "./pages/AddProduct";
import Tabla from "./components/tabla";
import UsersPage from "./pages/Users";
import EditProducto from "./pages/EditProducto";
import HistorialPedidos from "./pages/HistorialPedidos";
import AddImage from "./components/AddImage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
      light: "#009CFF",
      dark: "#292D32",
    },
    secondary: {
      main: "#292D32",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        borderRadius: 3,
      },
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ResponsiveDrawer>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/stock" element={<Stock />} />
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/addproduct" element={<Add />} />
            <Route path="/tabla" element={<Tabla />} />
            <Route path="/editproducto/:id" element={<EditProducto />} />
            <Route path="/historialpedidos" element={<HistorialPedidos />} />
            <Route path="/addimage" element={<AddImage />} />
          </Routes>
        </ResponsiveDrawer>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
