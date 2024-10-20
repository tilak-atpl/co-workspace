import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Checkbox,
  Typography,
  ListItemText,
  Box,
  IconButton,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList"; // Import filter icon

let cities = [
  "Hyderabad",
  "Ahmedabad",
  "Bangalore",
  "Chennai",
  "Pune",
  "Mumbai",
];

export default function ApplyFilters({ onFilterChange }) {
  const [anchorEl, setAnchorEl] = useState(null); // Controls the dropdown menu
  const [selectedCity, setSelectedCity] = useState(""); // Tracks the selected city

  // Open the dropdown when button is clicked
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the dropdown
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle city selection, allowing only one city at a time
  const handleCitySelect = (city) => {
    setSelectedCity(city); // Update the selected city
    onFilterChange(city); // Notify parent component
    handleClose(); // Close dropdown after selection
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        p: 2,
        gap: "10px",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Apply Filters
      </Typography>
      <Box>
        {/* Filter button with icon */}
        <Button
          variant="outlined"
          color="primary"
          onClick={handleClick}
          sx={{
            display: "flex",
            alignItems: "center",
            textTransform: "none",
            padding: "0.6rem 1.5rem",
            borderRadius: "20px", // Rounded corners
            fontWeight: "500",
            border: "2px solid", // Thicker border for emphasis
            borderColor: selectedCity ? "primary.main" : "grey.400", // Color based on selection
            "&:hover": {
              borderColor: "primary.dark", // Darker color on hover
            },
          }}
        >
          <FilterListIcon sx={{ mr: 1 }} /> {/* Filter icon with some margin */}
          {selectedCity ? selectedCity : "Select City"}{" "}
          {/* Selected city or default prompt */}
        </Button>

        {/* Dropdown menu with city options */}
        <Menu
          id="city-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          keepMounted
        >
          {cities.map((city) => (
            <MenuItem key={city} onClick={() => handleCitySelect(city)}>
              {/* Checkbox for each city, but only one city can be checked */}
              <Checkbox
                checked={selectedCity === city}
                color="primary"
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={city} /> {/* City name */}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Box>
  );
}
