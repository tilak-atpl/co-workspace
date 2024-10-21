import React, { useEffect } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const PropertyCard = ({ property, onEdit, onDelete }) => {
  useEffect(() => {
    console.log("property", property);
    console.log("url", `${SERVER_URL}${property.image}`);
  }, [property]);

  const imageUrl = `${SERVER_URL}${property.images[0]}`; // URL of the property image

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
      {/* Image Section */}
      <img
        src={imageUrl} // Corrected image URL
        alt={property.name} // Alt text for accessibility
        style={{
          width: "100%", // Full width to maintain layout
          height: "200px", // Fixed height
          objectFit: "cover", // Cover the area while maintaining aspect ratio
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        }}
      />
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
