import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Checkbox,
  Typography,
  ListItemText,
  Box,
  Slider,
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

export default function ApplyFilters({
  onFilterChange,
  onPriceRangeChange,
  onResetFilters,
}) {
  const [anchorEl, setAnchorEl] = useState(null); // Controls the dropdown menu
  const [selectedCity, setSelectedCity] = useState(""); // Tracks the selected city
  const [priceRange, setPriceRange] = useState([0, 50000]); // Default price range state

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

  // Handle price range change
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    onPriceRangeChange(newValue); // Notify parent component
  };

  const handleReset = () => {
    setSelectedCity(""); // Reset city filter
    setPriceRange([0, 50000]);
    onResetFilters(); // Call the reset function from parent
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", p: 2, gap: "10px" }}>
      <Typography variant="h6" gutterBottom>
        Apply Filters
      </Typography>

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
          borderRadius: "20px",
          fontWeight: "500",
          border: "2px solid",
          borderColor: selectedCity ? "primary.main" : "grey.400",
          "&:hover": { borderColor: "primary.dark" },
        }}
      >
        <FilterListIcon sx={{ mr: 1 }} />
        {selectedCity ? selectedCity : "Select City"}
      </Button>

      {/* Dropdown menu with city options */}
      <Menu
        id="city-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {cities.map((city) => (
          <MenuItem key={city} onClick={() => handleCitySelect(city)}>
            <Checkbox checked={selectedCity === city} color="primary" />
            <ListItemText primary={city} />
          </MenuItem>
        ))}
      </Menu>

      {/* Price Range Slider */}
      <Box sx={{ width: 300, ml: 2 }}>
        <Typography gutterBottom>Price Range</Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={50000} // Adjust the maximum price limit as per your requirements
        />
      </Box>

      {/* Reset Filters Button */}
      <Button
        onClick={handleReset}
        sx={{
          color: "black", // Text color black
          fontWeight: "bold", // Bold text
          ml: "auto", // Push to the right side
          padding: 0, // No padding
          textTransform: "none", // Avoid capitalizing text
          "&:hover": {
            backgroundColor: "transparent", // No background on hover
          },
        }}
      >
        Reset Filters
      </Button>
    </Box>
  );
}
