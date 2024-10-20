import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperties, deleteProperty } from "../redux/slices/propertySlice";
import {
  Grid,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import PropertyCard from "../components/PropertyCard";
import EditPropertyModal from "../components/EditPropertyModal";
import ApplyFilters from "../components/ApplyFilters";

const PropertyListing = () => {
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.properties.list);
  const { searchKey } = useSelector((state) => state.properties);
  const status = useSelector((state) => state.properties.status);
  const error = useSelector((state) => state.properties.error); // Select error state

  // State for modal and confirmation dialog
  const [open, setOpen] = useState(false);
  const [currentProperty, setCurrentProperty] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false); // Confirmation dialog state
  const [propertyToDelete, setPropertyToDelete] = useState(null); // Property ID for deletion
  const [selectedCity, setSelectedCity] = useState(""); // State for selected city

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  const handleEdit = (property) => {
    setCurrentProperty(property); // Set the property to be edited
    setOpen(true); // Open the modal
  };

  const handleDeleteClick = (propertyId) => {
    setPropertyToDelete(propertyId); // Set the property ID for deletion
    setOpenConfirmDialog(true); // Open the confirmation dialog
  };

  const handleDeleteConfirm = () => {
    if (propertyToDelete) {
      dispatch(deleteProperty(propertyToDelete)); // Dispatch delete action
      setPropertyToDelete(null); // Reset property ID
    }
    setOpenConfirmDialog(false); // Close the dialog
  };

  const handleDeleteCancel = () => {
    setPropertyToDelete(null); // Reset property ID
    setOpenConfirmDialog(false); // Close the dialog
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentProperty(null); // Reset the current property
  };
  // Function to apply city filter from ApplyFilters component
  const handleFilterChange = (city) => {
    setSelectedCity(city);
  };
  // Filter properties based on search key and selected city
  const filteredData = properties.filter((item) => {
    const locationMatch =
      item.location &&
      item.location.toLowerCase().includes(searchKey.toLowerCase());
    const workspaceMatch =
      item.workspaceName &&
      item.workspaceName.toLowerCase().includes(searchKey.toLowerCase());
    const cityMatch = selectedCity === "" || item.location.toLowerCase() === selectedCity.toLowerCase(); // Match selected city
    return (locationMatch || workspaceMatch) && cityMatch;
  });
  return (
    <>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : (
        <>
          {error && <Alert severity="error">{error}</Alert>}{" "}
          {/* Show error alert */}
          <ApplyFilters onFilterChange={handleFilterChange} />
          {filteredData && filteredData.length > 0 ? (
            <Grid container spacing={2}>
              {filteredData.map((property) => (
                <Grid item xs={12} sm={6} md={4} key={property._id}>
                  <PropertyCard
                    property={property}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <p>No properties found.</p> // Show message when no properties match
          )}
        </>
      )}
      {/* Edit Property Modal */}
      {currentProperty && (
        <EditPropertyModal
          open={open}
          onClose={handleClose}
          property={currentProperty}
        />
      )}
      {/* Confirmation Dialog for Deletion */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleDeleteCancel}
        aria-labelledby="confirm-delete-title"
      >
        <DialogTitle id="confirm-delete-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <p>
            Are you sure you want to delete this property? This action cannot be
            undone.
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PropertyListing;
