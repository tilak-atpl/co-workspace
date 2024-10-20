import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import logo from "../assets/logo.svg"; // Add your logo here
import { useNavigate } from "react-router-dom";

const Header = () => {
  let navigate = useNavigate();
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      style={{ borderBottom: "1px solid #ddd" }}
    >
      <Toolbar>
        <Box display="flex" flexGrow={1} alignItems="center">
          {/* Logo */}
          <img
            src={logo}
            alt="Logo"
            style={{ width: "100px", marginRight: "20px" }}
          />

          {/* Search Bar */}
          <TextField
            variant="outlined"
            placeholder="Search properties..."
            size="small"
            fullWidth
            style={{ maxWidth: "500px" }}
          />
        </Box>

        {/* Right-side Buttons */}
        <Box>
          <Button
            variant="text"
            style={{ marginRight: "15px" }}
            onClick={() => {
              navigate("/add-property");
            }}
          >
            Add Your-Property
          </Button>
          <Button
            variant="text"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
