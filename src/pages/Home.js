import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Login from "../components/login";
import SingUp from "../components/singup";
import { Paper } from "@mui/material";
import ProfileComponent from "../components/profileAdmin";

export default function Home() {
  const [value, setValue] = React.useState("1");

  const  [token,setToken]  = useState();


	useEffect((token)=>{
		setToken(localStorage.getItem('token'))
	},[token])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    
    token ? <ProfileComponent/>:
    <div className="contenedorlogin">
      <Paper
        sx={{
          width: 580,
          height: 580,
          typography: "body1",
          display: "flex",
          justifyContent: "center",
          borderRadius: 2,
        }}
      >
        <Box>
          <TabContext value={value}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Log In" value="1" />

                <Tab label="Register" value="2" />
              </TabList>
            </Box>

            <TabPanel value="1">
              <Login />
            </TabPanel>
            <TabPanel value="2">
              <SingUp />
            </TabPanel>
          </TabContext>
        </Box>
      </Paper>
    </div>

    
  );
}
