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
  const error = useSelector((state) => state.properties.error);

  // State for modal, confirmation dialog, city, and price range
  const [open, setOpen] = useState(false);
  const [currentProperty, setCurrentProperty] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 50000]); // State for price range

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  const handleEdit = (property) => {
    setCurrentProperty(property);
    setOpen(true);
  };

  const handleDeleteClick = (propertyId) => {
    setPropertyToDelete(propertyId);
    setOpenConfirmDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (propertyToDelete) {
      dispatch(deleteProperty(propertyToDelete));
      setPropertyToDelete(null);
    }
    setOpenConfirmDialog(false);
  };

  const handleDeleteCancel = () => {
    setPropertyToDelete(null);
    setOpenConfirmDialog(false);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentProperty(null);
  };

  // Handle city filter change
  const handleFilterChange = (city) => {
    setSelectedCity(city);
  };

  // Handle price range filter change
  const handlePriceRangeChange = (range) => {
    setSelectedPriceRange(range);
  };
// Handle reset filters
const handleResetFilters = () => {
  setSelectedCity("");
  setSelectedPriceRange([0, 50000]); // Reset price range
};
  // Filter properties based on search key, selected city, and price range
  const filteredData = properties.filter((item) => {
    const locationMatch =
      item.location &&
      item.location.toLowerCase().includes(searchKey.toLowerCase());
    const workspaceMatch =
      item.workspaceName &&
      item.workspaceName.toLowerCase().includes(searchKey.toLowerCase());
    const cityMatch =
      selectedCity === "" ||
      item.location.toLowerCase() === selectedCity.toLowerCase();
    const priceMatch =
      item.price >= selectedPriceRange[0] &&
      item.price <= selectedPriceRange[1]; // Price range filter
    return (locationMatch || workspaceMatch) && cityMatch && priceMatch;
  });
  
  return (
    <>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : (
        <>
          {error && <Alert severity="error">{error}</Alert>}
          <ApplyFilters
            onFilterChange={handleFilterChange}
            onPriceRangeChange={handlePriceRangeChange}
            onResetFilters={handleResetFilters}
            setSelectedCity={setSelectedCity}
          />

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
            <p>No properties found.</p>
          )}
        </>
      )}
      {currentProperty && (
        <EditPropertyModal
          open={open}
          onClose={handleClose}
          property={currentProperty}
        />
      )}
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
