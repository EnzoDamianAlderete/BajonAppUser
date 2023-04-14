import { Box, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileComponent = () => {
  const [token, setToken] = useState();
  const [nameUser, setNameUser] = useState();
  const [emailUser, setEmailUser] = useState();
  const navigate = useNavigate();

  const sesionClose = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (token) {
      axios
        .get(`http://localhost:3100/user`, {
          headers: {
            token: token,
          },
        })
        .then(({ data }) => {
          console.log(data);
          setNameUser(data.name);
          setEmailUser(data.email);
        })
        .catch((error) => console.error(error));
    }
  }, [token]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 2,
        minHeight: "100vh",
      }}
    >
      <Box>
        <svg
          width="100"
          height="100"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M16 8c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4ZM4 18c0-2.66 5.33-4 8-4s8 1.34 8 4v2H4v-2Z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </Box>
      <Box sx={{ padding: 2 }}>
        Bienvenido{" "}
        <span style={{ color: "red", fontSize: "18 px" }}>{nameUser}</span> de
        nuevo!
        <p>
          Nombre usuario:{" "}
          <span style={{ color: "red", fontSize: "18px" }}>{nameUser}</span>
        </p>
        <p>
          Email:{" "}
          <span style={{ color: "red", fontSize: "18px" }}>{emailUser}</span>
        </p>
        <Button
          onClick={sesionClose}
          variant="contained"
          sx={(thema) => ({
            background: thema.palette.primary.light,
            "&:hover": { background: "#0094F1" },
            marginTop: 2,
          })}
        >
          Cerrar Sesión
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileComponent;
