import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Box,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; // Import SearchIcon
import logo from "../assets/logo.svg"; // Add your logo here
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchKey } from "../redux/slices/propertySlice";

const Header = () => {
  let navigate = useNavigate();
  const [search, setSearch] = useState("");
  let dispatch = useDispatch();
  useEffect(() => {
      dispatch(setSearchKey(search));
  }, [search]);
  // Handle search input change
  const handleSearchChange = (event) => {
    setSearch(event.target.value); // Update search state
  };

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
            placeholder="Search location or workspace..."
            size="small"
            fullWidth
            style={{ maxWidth: "500px" }}
            value={search} // Set value to search state
            onChange={handleSearchChange} // Handle input change
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon /> {/* Search icon */}
                </InputAdornment>
              ),
            }}
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
            Add Your Property
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
