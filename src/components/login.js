import {
  Box,
  Button,
  FormControlLabel,
  Link,
  Paper,
  Radio,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  // ------------ MI ADAPACION --------------------
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [mensaje, setMensaje] = useState();
  const [mensajeCorrect,setMensajeCorrect] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { email, password } = inputs;

  const HandleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setMensaje("Por favor complete todos los campos");
      setTimeout(() => {
        setMensaje("");
      }, 3000);
    } else if (email !== "" || password !== "") {
      const User = {
        email,
        password,
      };
      console.log(inputs);
      setLoading(true);
      await axios
        .post("http://localhost:3100/login", User)
        .then((res)=>{
          localStorage.setItem("token",res.data?.user.token);
          console.log(res.data);
          setMensajeCorrect('Sesion iniciada correctamente!');
           console.log(`Sesion iniciada correctamente! Bienvenido ${res.data.user.name}`);
                    setTimeout(()=>{
            setMensajeCorrect("");
            navigate('/stock');
                    },2000);
  
         }).catch((error)=>{
          setMensaje("Correo o contraseña incorrecta");
           console.log("Correo o contraseña incorrecta");
                    setTimeout(()=>{
                        setMensaje("");
                    },3000);
          console.error(error);
         })
      setInputs({ email: "", password: "" });
      setLoading(false);
    }
  };
  // ------------ MI ADAPACION --------------------

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
        <h1>Login to your account</h1>
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
            placeholder="Password"
            name="password"
            value={password}
            id="outlined-basic"
            type="password"
            margin="normal"
            label="Password"
            autoComplete="current-password"
          />
        </div>

        <div className="div3">
          <FormControlLabel
            //checked={selectedValue === "a"}
            //onChange={handleChange}
            value="a"
            name="radio"
            control={<Radio />}
            inputProps={{ "aria-label": "A" }}
            label="Mantener conectado"
            labelPlacement="End"
          />
          <Link href="#" underline="hover" color="blue">
            {"Recuperar contraseña"}
          </Link>
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
            Log in
          </Button>
        </div>
      </form>

      {mensaje && <Box
			bgcolor='red'
			sx={{ color:'white' }}
			padding='1em'
      marginTop={"2rem"}
			borderRadius='8px'
			textAlign='center'
			>
				{mensaje}
			</Box>}

			{mensajeCorrect && <Box
			bgcolor='green'
			sx={{ color:'white' }}
			padding='1em'
      marginTop={"2rem"}
			borderRadius='8px'
			textAlign='center'
			>
				{mensajeCorrect}
			</Box>}
    </Box>

    
  );
};
export default Login;
