import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, CircularProgress, Box } from "@mui/material";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"; // Import styles for the gallery
import "./PropertyCard.css"; // Custom styles for the buttons

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const PropertyCard = ({ property, onEdit, onDelete }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Simulate a delay for loading images (replace this with actual async logic if needed)
    setTimeout(() => {
      const galleryImages = property.images.map((image) => ({
        original: `${SERVER_URL}${image}`,
      }));
      setImages(galleryImages);
      setIsLoading(false); // Set loading to false when images are ready
    }, 1000); // Optional delay for demo purposes
  }, [property]);

  return (
    <Card
      style={{
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        transition: "transform 0.3s",
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {/* Show loading spinner or image gallery */}
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="250px">
          <CircularProgress /> {/* Spinner for loading state */}
        </Box>
      ) : (
        images.length > 0 && (
          <ImageGallery
            items={images} // Images in the required format
            showFullscreenButton={true} // Fullscreen preview
            showPlayButton={false} // Hide play button
            showThumbnails={false} // Hide thumbnails
            showBullets={true} // Show bullets for navigation
          />
        )
      )}

      <CardContent>
        <Typography variant="h5" style={{ fontWeight: "bold" }}>
          {property.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Location: {property.location}
        </Typography>
        <Typography variant="h6" color="primary" style={{ margin: "10px 0" }}>
          Price: ₹{property.price}
        </Typography>
        <Typography variant="body2" color="textSecondary" noWrap>
          {property.description}
        </Typography>

        {/* Edit Button */}
        <Button
          onClick={() => onEdit(property)}
          variant="contained"
          color="primary"
          style={{ marginTop: "10px", marginRight: "10px" }} // Add some spacing
        >
          Edit
        </Button>

        {/* Delete Button */}
        <Button
          onClick={() => onDelete(property._id)} // Call the delete function with the property ID
          variant="outlined"
          color="secondary"
          style={{ marginTop: "10px" }}
        >
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
