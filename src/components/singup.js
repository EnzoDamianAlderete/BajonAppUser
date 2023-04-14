import { Box, Button, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const currencies = [
  {
    value: "Admin",
    label: "Admin",
  },
  {
    value: "Mozo",
    label: "Mozo",
  },
];
//to do .. completar el registro de admins

const Register = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    repassword: "",
  });
  const [mensaje, setMensaje] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { email, password, repassword } = inputs;

  const HandleChange = (e) => {
    setInputs({ ...inputs, [e.target.email]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (email === "" && password === "") {
      setMensaje("Por favor completa todos los campos");
      setTimeout(() => {
        setMensaje("");
      }, 3000);
    } else if (email !== "" && password !== "") {
      const Admin = {
        email,
        password,
      };
      setLoading(true);
      await axios
        .post("http://localhost:3100/admins", Admin)
        .then((res) => {
          const { data } = res;
          setMensaje(data.mensaje);
          setInputs({ name: "", email: "", password: "" });
          setTimeout(() => {
            setMensaje("");
            navigate("/login");
          }, 1500);
        })
        .catch((error) => {
          setMensaje("Hubo un error");
          setTimeout(() => {
            setMensaje("");
          }, 1500);
        });
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignContent: "center",
        flexDirection: "column",
        p: 2,
      }}
    >
      {/* <Paper
          sx={{
            elevation: 3,
            background: "#FCFCFC",
            width: "100%",
            height: "100%",
          }}
        /> */}
      <div className="div1">
        <h1>Register your account</h1>
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="inputslogin">
          <TextField
            onChange={(e) => HandleChange(e)}
            margin="normal"
            placeholder="Email"
            type="email"
            value={email}
            name="email"
            id="outlined-basic"
            label="Usuario"
            variant="outlined"
          />

          <TextField
            onChange={(e) => HandleChange(e)}
            margin="normal"
            id="outlined-select-currency"
            select
            label="Select"
            defaultValue="Admin"
            helperText="Por favor elija el tipo de usuario"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            onChange={(e) => HandleChange(e)}
            value={password}
            margin="normal"
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            name="password"
          />
          <TextField
            onChange={(e) => HandleChange(e)}
            value={repassword}
            margin="normal"
            id="outlined-password-input"
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
            name="repassword"
          />
        </div>
        <div className="div3buton">
          <Button
            type="submit"
            variant="contained"
            sx={(thema) => ({
              background: thema.palette.primary.light,
              "&:hover": { background: "#0094F1" },
              width: "100%",
            })}
          >
            Crear cuenta
          </Button>
        </div>
      </form>
    </Box>
  );
};
export default Register;
