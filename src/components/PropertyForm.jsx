import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

// Validation schema using yup
const validationSchema = yup.object({
  name: yup.string().required("Property name is required"),
  location: yup.string().required("Location is required"),
  price: yup
    .number()
    .required("Price is required")
    .typeError("Price must be a number"),
  description: yup.string().required("Description is required"),
  propertyType: yup.string().required("Property type is required"),
});
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const PropertyForm = () => {
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);

  // Formik hook for handling form validation and state
  const formik = useFormik({
    initialValues: {
      name: "",
      location: "",
      price: "",
      description: "",
      propertyType: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("location", values.location);
      formData.append("price", values.price);
      formData.append("description", values.description);
      formData.append("propertyType", values.propertyType);

      // Append all selected images
      images.forEach((image) => {
        formData.append("images", image); // Append each image file
      });

      setLoading(true);
      try {
        await axios.post(`${SERVER_URL}/api/properties`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setOpenSnackbar(true);
        formik.resetForm();
        setImages([]); // Clear images after successful submission
        setImagePreviews([]); // Clear previews after submission
      } catch (error) {
        console.error(error);
        setErrorSnackbar(true);
      } finally {
        setLoading(false);
      }
    },
  });

  // Handle image change and preview
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files); // Set images with all selected files
    setImagePreviews(files.map((file) => URL.createObjectURL(file))); // Create previews for all files
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setErrorSnackbar(false);
  };

  return (
    <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
      <Grid container spacing={2}>
        {/* Property Name */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Property Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>

        {/* Location */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
          />
        </Grid>

        {/* Price */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Price"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />
        </Grid>

        {/* Description */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
        </Grid>

        {/* Property Type */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Property Type"
            name="propertyType"
            value={formik.values.propertyType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.propertyType && Boolean(formik.errors.propertyType)
            }
            helperText={
              formik.touched.propertyType && formik.errors.propertyType
            }
          />
        </Grid>

        {/* Image Upload */}
        <Grid item xs={12}>
          <Typography variant="body2">Upload Images:</Typography>
          <input
            accept="image/*"
            type="file"
            multiple
            onChange={handleImageChange}
          />
          {imagePreviews.length > 0 && (
            <div style={{ marginTop: "10px" }}>
              {imagePreviews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  style={{ width: "200px", marginRight: "10px" }}
                />
              ))}
            </div>
          )}
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Add Property"}
          </Button>
        </Grid>
      </Grid>

      {/* Success Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Property added successfully!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={errorSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          Failed to add property. Please try again.
        </Alert>
      </Snackbar>
    </form>
  );
};

export default PropertyForm;
