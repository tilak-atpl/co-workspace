import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { updateProperty } from "../redux/slices/propertySlice"; // Import your update action

const EditPropertyModal = ({ open, onClose, property }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ ...property }); // Pre-fill with property data

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Update form data on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProperty(formData)); // Dispatch update action
    onClose(); // Close the modal after submitting
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Property</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="dense"
            name="name"
            label="Property Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="location"
            label="Location"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.location}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.price}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.description}
            onChange={handleChange}
          />
          {/* You can add more fields as necessary */}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPropertyModal;
