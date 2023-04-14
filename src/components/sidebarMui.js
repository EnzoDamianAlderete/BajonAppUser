import * as React from "react";
import "./sidebarmui.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import { Inventory } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLocation, useNavigate } from "react-router-dom";
import { color } from "@mui/system";

const drawerWidth = 280;

export default function ResponsiveDrawer(props) {
  const { window } = props;
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //sidebar
  const drawer = (
    <div className="sidebar">
      <Toolbar className="logo">
        <img src="/logo.png" />
      </Toolbar>
      <Divider />
      <List className="listanav">
        <ListItem
          disablePadding
          sx={{
            backgroundColor: location.pathname === "/" ? "#1B3A4D" : undefined,
          }}
        >
          <ListItemButton onClick={() => navigate("/")} className="listitem">
            <ListItemIcon>
              <HomeIcon sx={{ color: "#FCFCFC" }} />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding
          sx={{
            backgroundColor:
              location.pathname === "/pedidos" ||
              location.pathname === "/historialpedidos"
                ? "#1B3A4D"
                : undefined,
          }}
        >
          <ListItemButton
            onClick={() => navigate("/pedidos")}
            className="listitem"
          >
            <ListItemIcon sx={{ color: "#FCFCFC" }}>
              <AddShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary={"Pedidos"} />
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding
          sx={{
            backgroundColor:
              location.pathname === "/stock" ? "#1B3A4D" : undefined,
          }}
        >
          <ListItemButton
            onClick={() => navigate("/stock")}
            className="listitem"
          >
            <ListItemIcon sx={{ color: "#FCFCFC" }}>
              <Inventory />
            </ListItemIcon>
            <ListItemText primary={"Stock"} />
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          sx={{
            backgroundColor:
              location.pathname === "/users" ? "#1B3A4D" : undefined,
          }}
        >
          <ListItemButton
            onClick={() => navigate("/users")}
            className="listitem"
          >
            <ListItemIcon sx={{ color: "#FCFCFC" }}>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary={"Users"} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  //contenedor body
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{
        minHeight: "0",
        height: "100%",
        display: "flex",
        background: "whitesmoke",
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ display: "flex", background: "#E63946" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Vista Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}
